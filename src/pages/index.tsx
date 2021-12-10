import { Button } from "@chakra-ui/button";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Flex, Link, Text } from "@chakra-ui/layout";
import { Heading, IconButton, Stack } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import { useState } from "react";
import { CampgroundCard } from "../components/CampgroundCard";
import { EditDeleteCampgroundButtons } from "../components/EditDeleteCampgroundButtons";
import { Layout } from "../components/Layout";
import { UpvoteSection } from "../components/UpvoteSection";
import {
  useCampgroundsQuery,
  useCurrentUserQuery,
  useDeleteCampgroundMutation,
} from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { isServer } from "../utils/isServer";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string,
  });

  const [{ data, fetching }] = useCampgroundsQuery({
    variables,
  });

  const [{ data: userData }] = useCurrentUserQuery({
    // NOTE: the query is not gonna run on the server
    // because we don't need it. CurrentUser doesn't affect
    // SEO
    pause: isServer(),
  });

  // TODO:
  // if (!fetching && !data) {
  //   return <div>There are no campgrounds</div>;
  // }

  return (
    <Layout>
      <Flex p={5} justifyContent="space-between" alignItems="center">
        <Heading fontSize="xx-large">Campgrounds</Heading>
        {/* <Box p={4}> */}
        <NextLink href="/create-campground">
          <Button
            colorScheme="blackAlpha"
            as={Link}
            style={{ textDecoration: "none" }}
          >
            Create Campground
          </Button>
        </NextLink>
        {/* </Box> */}
      </Flex>

      <Box px={5}>
        {data && !fetching ? (
          <Stack spacing={8}>
            {data.campgrounds.campgrounds.map((camp) =>
              /*NOTE: this prevents error when deleted campgrounds
                      are in cache
              */
              !camp ? null : (
                <CampgroundCard camp={camp} userData={userData} key={camp.id} />
              )
            )}
          </Stack>
        ) : (
          <div>...loading</div>
        )}

        {data && data.campgrounds.hasMore ? (
          <Button
            onClick={() => {
              setVariables({
                limit: variables.limit,
                cursor:
                  data.campgrounds.campgrounds[
                    data.campgrounds.campgrounds.length - 1
                  ].createdAt,
              });
            }}
            isLoading={fetching}
            my={8}
            colorScheme="teal"
          >
            Load More
          </Button>
        ) : null}
      </Box>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
