import React from "react";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import {
  useCampgroundQuery,
  useCampgroundsQuery,
} from "../../generated/graphql";
import { Layout } from "../../components/Layout";

const Campground: React.FC = ({}) => {
  const router = useRouter();
  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  const [{ fetching, data }] = useCampgroundQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });

  if (fetching) {
    return (
      <Layout>
        <div>loading...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div>{data?.campground?.name}</div>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Campground);
