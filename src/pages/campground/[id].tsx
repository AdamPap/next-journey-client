import React from "react";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import {
  useCampgroundQuery,
  useCurrentUserQuery,
} from "../../generated/graphql";
import { Layout } from "../../components/Layout";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import { EditDeleteCampgroundButtons } from "../../components/EditDeleteCampgroundButtons";
import NextImage from "next/image";
import { isServer } from "../../utils/isServer";

const Campground: React.FC = ({}) => {
  const router = useRouter();
  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  const [{ fetching, data, error }] = useCampgroundQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });

  const [{ data: userData }] = useCurrentUserQuery({
    // NOTE: the query is not gonna run on the server
    // because we don't need it. CurrentUser doesn't affect
    // SEO
    pause: isServer(),
  });

  if (fetching) {
    return (
      <Layout>
        <Box>loading...</Box>
      </Layout>
    );
  }

  if (error) {
    return <Box>{error.message}</Box>;
  }

  if (!data?.campground) {
    return <Box>Could not find campground</Box>;
  }

  return (
    <Layout>
      <Flex
        justifyContent="center"
        flexDirection="column"
        alignItems="flex-start"
        px={4}
      >
        <Flex justifyContent="space-between" alignItems="flex-end" width="100%">
          <Heading>{data?.campground?.name}</Heading>
          <Text
            color={
              data?.campground?.creator.id === userData?.currentUser?.id
                ? `teal`
                : "black"
            }
          >
            Posted by
            {data?.campground?.creator.id === userData?.currentUser?.id
              ? " you"
              : ` ${data?.campground?.creator.username}`}
          </Text>
        </Flex>
        <Box
          mt={3}
          position="relative"
          width="100%"
          maxHeight="500px"
          height="500px"
          borderRadius="md"
          overflow="hidden"
        >
          <NextImage
            src={data?.campground.image}
            layout="fill"
            objectFit="cover"
            objectPosition="center center"
          />
        </Box>
        <Flex
          my={3}
          justifyContent="space-between"
          alignItems="flex-end"
          width="100%"
        >
          <Box>Points: {data.campground.points}</Box>
          <EditDeleteCampgroundButtons id={data.campground.id} />
        </Flex>
        <Box>{data?.campground?.location}</Box>
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Campground);
