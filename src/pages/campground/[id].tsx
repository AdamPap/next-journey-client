import React from "react";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import {
  useCampgroundQuery,
  useCampgroundsQuery,
} from "../../generated/graphql";
import { Layout } from "../../components/Layout";
import { Box, Heading } from "@chakra-ui/layout";

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
      <Heading>{data?.campground?.name}</Heading>
      <Box>{data?.campground?.location}</Box>
      <Box>Points: {data.campground.points}</Box>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Campground);
