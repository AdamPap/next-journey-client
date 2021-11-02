import {
  dedupExchange,
  fetchExchange,
  gql,
  ssrExchange,
  stringifyVariables,
} from "@urql/core";
import { cacheExchange, Resolver } from "@urql/exchange-graphcache";

import {
  LogoutMutation,
  CurrentUserQuery,
  CurrentUserDocument,
  LoginMutation,
  RegisterMutation,
  VoteMutationVariables,
} from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";
import { isServer } from "./isServer";

export type MergeMode = "before" | "after";

export interface PaginationParams {
  cursorArgument?: string;
}

export const cursorPagination = (): Resolver<any, any, any> => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info;

    const allFields = cache.inspectFields(entityKey);

    const fieldInfos = allFields.filter((info) => info.fieldName === fieldName);
    const size = fieldInfos.length;
    // NOTE: in case of cache miss
    if (size === 0) {
      return undefined;
    }

    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;
    const isItInCache = cache.resolve(
      cache.resolve(entityKey, fieldKey) as string,
      "campgrounds"
    );

    // console.log("Field name: ", fieldName);
    // console.log("My field key: ", fieldKey);
    // console.log("Is it in cache: ", isItInCache);

    info.partial = !isItInCache;
    // console.log("info partial: ", info.partial);

    const results: string[] = [];
    let hasMore = true;
    fieldInfos.forEach((fi) => {
      const key = cache.resolve(entityKey, fi.fieldKey) as string;
      const data = cache.resolve(key, "campgrounds") as string[];
      const _hasMore = cache.resolve(key, "hasMore");
      if (!_hasMore) {
        hasMore = _hasMore as boolean;
      }

      results.push(...data);
    });

    return {
      __typename: "PaginatedCampgrounds",
      hasMore,
      campgrounds: results,
    };
  };
};

export const createUrqlClient = (ssrExchange: any, ctx: any) => {
  let cookie = "";
  if (isServer()) {
    cookie = ctx.req.headers.cookie;
  }

  return {
    url: "http://localhost:3001/graphql",
    fetchOptions: {
      credentials: "include" as const,
      // add cookie in header when it's ssr
      headers: cookie ? { cookie } : undefined,
    },
    exchanges: [
      dedupExchange,
      cacheExchange({
        keys: {
          PaginatedCampgrounds: () => null,
        },
        resolvers: {
          Query: {
            campgrounds: cursorPagination(),
          },
        },
        updates: {
          Mutation: {
            vote: (_result, args, cache, info) => {
              const { campgroundId, value } = args as VoteMutationVariables;

              const data = cache.readFragment(
                gql`
                  fragment _ on Campground {
                    id
                    points
                    voteStatus
                  }
                `,
                { id: campgroundId }
              );

              console.log("DATA: ", data);

              if (data) {
                if (data.voteStatus === value) {
                  return;
                }

                const newPoints =
                  data.points + (!data.voteStatus ? 1 : 2) * value;

                cache.writeFragment(
                  gql`
                    fragment _ on Campground {
                      points
                      voteStatus
                    }
                  `,
                  { id: campgroundId, points: newPoints, voteStatus: value }
                );
              }
            },
            createCampground: (_result, args, cache, info) => {
              const allFields = cache.inspectFields("Query");
              const fieldInfos = allFields.filter(
                (info) => info.fieldName === "campgrounds"
              );

              fieldInfos.forEach((fi) => {
                // NOTE: value of limit has to match pagination query
                // on index page
                cache.invalidate("Query", "campgrounds", fi.arguments || {});
              });
            },
            logout: (_result, args, cache, info) => {
              betterUpdateQuery<LogoutMutation, CurrentUserQuery>(
                cache,
                { query: CurrentUserDocument },
                _result,
                () => ({ currentUser: null })
              );
            },
            login: (_result, args, cache, info) => {
              betterUpdateQuery<LoginMutation, CurrentUserQuery>(
                cache,
                { query: CurrentUserDocument },
                _result,
                (result, query) => {
                  if (result.login.errors) {
                    return query;
                  } else {
                    return {
                      currentUser: result.login.user,
                    };
                  }
                }
              );
            },
            register: (_result, args, cache, info) => {
              betterUpdateQuery<RegisterMutation, CurrentUserQuery>(
                cache,
                { query: CurrentUserDocument },
                _result,
                (result, query) => {
                  if (result.register.errors) {
                    return query;
                  } else {
                    return {
                      currentUser: result.register.user,
                    };
                  }
                }
              );
            },
          },
        },
      }),
      ssrExchange,
      fetchExchange,
    ],
  };
};
