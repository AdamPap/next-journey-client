import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Campground = {
  __typename?: 'Campground';
  createdAt: Scalars['DateTime'];
  creator: User;
  creatorId: Scalars['Float'];
  id: Scalars['Float'];
  location: Scalars['String'];
  name: Scalars['String'];
  points: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
  voteStatus?: Maybe<Scalars['Int']>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type LoginInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: UserResponse;
  createCampground: Campground;
  deleteCampground: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  updateCampground?: Maybe<Campground>;
  vote: Scalars['Boolean'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationCreateCampgroundArgs = {
  location: Scalars['String'];
  name: Scalars['String'];
};


export type MutationDeleteCampgroundArgs = {
  id: Scalars['Int'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  options: LoginInput;
};


export type MutationRegisterArgs = {
  options: RegisterInput;
};


export type MutationUpdateCampgroundArgs = {
  id: Scalars['Int'];
  location: Scalars['String'];
  name: Scalars['String'];
};


export type MutationVoteArgs = {
  campgroundId: Scalars['Int'];
  value: Scalars['Int'];
};

export type PaginatedCampgrounds = {
  __typename?: 'PaginatedCampgrounds';
  campgrounds: Array<Campground>;
  hasMore: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  campground?: Maybe<Campground>;
  campgrounds: PaginatedCampgrounds;
  currentUser?: Maybe<User>;
};


export type QueryCampgroundArgs = {
  id: Scalars['Int'];
};


export type QueryCampgroundsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};

export type RegisterInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['Float'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type RegularErrorFragment = { __typename?: 'FieldError', field: string, message: string };

export type RegularUserFragment = { __typename?: 'User', id: number, username: string, name: string, email: string };

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', id: number, username: string, name: string, email: string } | null | undefined } };

export type CreateCampgroundMutationVariables = Exact<{
  name: Scalars['String'];
  location: Scalars['String'];
}>;


export type CreateCampgroundMutation = { __typename?: 'Mutation', createCampground: { __typename?: 'Campground', id: number, name: string, location: string } };

export type DeleteCampgroundMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteCampgroundMutation = { __typename?: 'Mutation', deleteCampground: boolean };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type LoginMutationVariables = Exact<{
  options: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', id: number, username: string, name: string, email: string } | null | undefined } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
  email: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', id: number, username: string, name: string, email: string } | null | undefined } };

export type UpdateCampgroundMutationVariables = Exact<{
  id: Scalars['Int'];
  location: Scalars['String'];
  name: Scalars['String'];
}>;


export type UpdateCampgroundMutation = { __typename?: 'Mutation', updateCampground?: { __typename?: 'Campground', id: number, name: string, location: string } | null | undefined };

export type VoteMutationVariables = Exact<{
  value: Scalars['Int'];
  campgroundId: Scalars['Int'];
}>;


export type VoteMutation = { __typename?: 'Mutation', vote: boolean };

export type CampgroundQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type CampgroundQuery = { __typename?: 'Query', campground?: { __typename?: 'Campground', id: number, name: string, location: string, points: number, createdAt: any, updatedAt: any, creatorId: number, voteStatus?: number | null | undefined, creator: { __typename?: 'User', id: number, username: string } } | null | undefined };

export type CampgroundsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type CampgroundsQuery = { __typename?: 'Query', campgrounds: { __typename?: 'PaginatedCampgrounds', hasMore: boolean, campgrounds: Array<{ __typename?: 'Campground', id: number, name: string, location: string, points: number, voteStatus?: number | null | undefined, creatorId: number, createdAt: any, updatedAt: any, creator: { __typename?: 'User', id: number, name: string, username: string } }> } };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', id: number, username: string, name: string, email: string } | null | undefined };

export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  username
  name
  email
}
    `;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
    errors {
      ...RegularError
    }
    user {
      ...RegularUser
    }
  }
}
    ${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}`;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
export const CreateCampgroundDocument = gql`
    mutation CreateCampground($name: String!, $location: String!) {
  createCampground(name: $name, location: $location) {
    id
    name
    location
  }
}
    `;

export function useCreateCampgroundMutation() {
  return Urql.useMutation<CreateCampgroundMutation, CreateCampgroundMutationVariables>(CreateCampgroundDocument);
};
export const DeleteCampgroundDocument = gql`
    mutation DeleteCampground($id: Int!) {
  deleteCampground(id: $id)
}
    `;

export function useDeleteCampgroundMutation() {
  return Urql.useMutation<DeleteCampgroundMutation, DeleteCampgroundMutationVariables>(DeleteCampgroundDocument);
};
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const LoginDocument = gql`
    mutation Login($options: LoginInput!) {
  login(options: $options) {
    errors {
      ...RegularError
    }
    user {
      ...RegularUser
    }
  }
}
    ${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($username: String!, $password: String!, $name: String!, $email: String!) {
  register(
    options: {username: $username, password: $password, name: $name, email: $email}
  ) {
    errors {
      ...RegularError
    }
    user {
      ...RegularUser
    }
  }
}
    ${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const UpdateCampgroundDocument = gql`
    mutation UpdateCampground($id: Int!, $location: String!, $name: String!) {
  updateCampground(id: $id, location: $location, name: $name) {
    id
    name
    location
  }
}
    `;

export function useUpdateCampgroundMutation() {
  return Urql.useMutation<UpdateCampgroundMutation, UpdateCampgroundMutationVariables>(UpdateCampgroundDocument);
};
export const VoteDocument = gql`
    mutation Vote($value: Int!, $campgroundId: Int!) {
  vote(value: $value, campgroundId: $campgroundId)
}
    `;

export function useVoteMutation() {
  return Urql.useMutation<VoteMutation, VoteMutationVariables>(VoteDocument);
};
export const CampgroundDocument = gql`
    query Campground($id: Int!) {
  campground(id: $id) {
    id
    name
    location
    points
    createdAt
    updatedAt
    creatorId
    voteStatus
    creator {
      id
      username
    }
  }
}
    `;

export function useCampgroundQuery(options: Omit<Urql.UseQueryArgs<CampgroundQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CampgroundQuery>({ query: CampgroundDocument, ...options });
};
export const CampgroundsDocument = gql`
    query Campgrounds($limit: Int!, $cursor: String) {
  campgrounds(limit: $limit, cursor: $cursor) {
    hasMore
    campgrounds {
      id
      name
      location
      points
      voteStatus
      creatorId
      createdAt
      updatedAt
      creator {
        id
        name
        username
      }
    }
  }
}
    `;

export function useCampgroundsQuery(options: Omit<Urql.UseQueryArgs<CampgroundsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CampgroundsQuery>({ query: CampgroundsDocument, ...options });
};
export const CurrentUserDocument = gql`
    query CurrentUser {
  currentUser {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useCurrentUserQuery(options: Omit<Urql.UseQueryArgs<CurrentUserQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CurrentUserQuery>({ query: CurrentUserDocument, ...options });
};