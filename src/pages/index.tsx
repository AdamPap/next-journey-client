import { Box, Flex, Link, Text } from "@chakra-ui/layout";
import { withUrqlClient } from "next-urql";
import { Navbar } from "../components/Navbar";
import { useCampgroundsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import NextLink from "next/link";
import { Stack, Heading } from "@chakra-ui/react";

const Index = () => {
  const [{ data }] = useCampgroundsQuery({
    variables: {
      limit: 10,
    },
  });
  return (
    <>
      <Navbar />
      <Flex p={5} justifyContent="space-between">
        <Heading fontSize="xl">Campgrounds</Heading>
        {/* <Box p={4}> */}
        <NextLink href="/create-campground">
          <Link color="blue">Create Campground</Link>
        </NextLink>
        {/* </Box> */}
      </Flex>

      <Box px={5}>
        {data ? (
          <Stack spacing={8}>
            {data.campgrounds.map((camp) => (
              <Box p={5} shadow="md" borderWidth="1px" key={camp.id}>
                <Heading fontSize="lg"> {camp.name} </Heading>
                <Text mt={4}>{camp.location}</Text>
              </Box>
            ))}
          </Stack>
        ) : (
          <div>...loading</div>
        )}
      </Box>
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
