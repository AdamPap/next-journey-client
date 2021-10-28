import { Box, Flex, Link, Text } from "@chakra-ui/layout";
import { withUrqlClient } from "next-urql";
import { useCampgroundsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import NextLink from "next/link";
import { Stack, Heading } from "@chakra-ui/react";
import { Layout } from "../components/Layout";
import { Button } from "@chakra-ui/button";
import { useState } from "react";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string,
  });

  const [{ data, fetching }] = useCampgroundsQuery({
    variables,
  });

  if (!fetching && !data) {
    return <div>There are no campgrounds</div>;
  }

  return (
    <Layout>
      <Flex p={5} justifyContent="space-between" alignItems="end">
        <Heading fontSize="xx-large">Campgrounds</Heading>
        {/* <Box p={4}> */}
        <NextLink href="/create-campground">
          <Link color="blue">Create Campground</Link>
        </NextLink>
        {/* </Box> */}
      </Flex>

      <Box px={5}>
        {data && !fetching ? (
          <Stack spacing={8}>
            {data.campgrounds.campgrounds.map((camp) => (
              <Box p={5} shadow="md" borderWidth="1px" key={camp.id}>
                <Heading fontSize="lg"> {camp.name} </Heading>
                <Text mt={4}>{camp.location}</Text>
              </Box>
            ))}
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
