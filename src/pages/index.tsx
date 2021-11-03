import { Box, Flex, Link, Text } from "@chakra-ui/layout";
import { withUrqlClient } from "next-urql";
import {
  useCampgroundsQuery,
  useCurrentUserQuery,
  useDeleteCampgroundMutation,
} from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import NextLink from "next/link";
import { Stack, Heading, IconButton } from "@chakra-ui/react";
import { Layout } from "../components/Layout";
import { Button } from "@chakra-ui/button";
import { useState } from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  DeleteIcon,
  EditIcon,
} from "@chakra-ui/icons";
import { UpvoteSection } from "../components/UpvoteSection";
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

  const [, deleteCampground] = useDeleteCampgroundMutation();

  if (!fetching && !data) {
    return <div>There are no campgrounds</div>;
  }

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
                <Flex
                  p={5}
                  rounded="lg"
                  shadow="xl"
                  // borderWidth="1px"
                  key={camp.id}
                >
                  <UpvoteSection camp={camp} />
                  <Box w="100%" py={3}>
                    <Flex justifyContent="space-between" height="full">
                      <Box>
                        <NextLink
                          href="campground/[id]"
                          as={`/campground/${camp.id}`}
                        >
                          <Link>
                            <Heading fontSize="lg"> {camp.name} </Heading>
                          </Link>
                        </NextLink>
                        <Text mt={4}>{camp.location}</Text>
                      </Box>
                      <Box>
                        <Flex
                          height="full"
                          flexDirection="column"
                          justifyContent="space-between"
                        >
                          <Text
                            color={
                              camp.creator.id === userData?.currentUser?.id
                                ? `teal`
                                : "black"
                            }
                          >
                            Posted by{" "}
                            {camp.creator.id === userData?.currentUser?.id
                              ? "you"
                              : camp.creator.username}
                          </Text>
                          <Flex justifyContent="end">
                            {camp.creator.id === userData?.currentUser?.id && (
                              <NextLink href={`campground/edit/${camp.id}`}>
                                <Button colorScheme="teal" px={2}>
                                  <EditIcon />
                                </Button>
                              </NextLink>
                            )}
                            {camp.creator.id === userData?.currentUser?.id && (
                              <IconButton
                                aria-label="Delete campground"
                                icon={<DeleteIcon />}
                                colorScheme="red"
                                ml={2}
                                onClick={() =>
                                  deleteCampground({ id: camp.id })
                                }
                              />
                            )}
                          </Flex>
                        </Flex>
                      </Box>
                    </Flex>
                  </Box>
                </Flex>
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
