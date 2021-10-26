import { Box, Flex } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import {
  useCreateCampgroundMutation,
  useCurrentUserQuery,
} from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const CreateCampground: React.FC<{}> = ({}) => {
  const [{ data, fetching }] = useCurrentUserQuery();
  const [, createCampground] = useCreateCampgroundMutation();
  const router = useRouter();

  useEffect(() => {
    if (!fetching && !data?.currentUser) {
      router.replace("/login");
    }
  }, [fetching, data, router]);

  return (
    <Layout variant="small">
      <Formik
        initialValues={{ name: "", location: "" }}
        onSubmit={async (values) => {
          const { error } = await createCampground({
            name: values.name,
            location: values.location,
          });

          if (error?.message.includes("Not authenticated")) {
            router.push("/login");
          } else {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="name"
              label="Campground Name"
              placeholder="Campground Name"
            />
            <Box mt={4}>
              <InputField
                name="location"
                label="Location"
                placeholder="Location"
              />
            </Box>
            <Button
              mt={4}
              isLoading={isSubmitting}
              colorScheme="teal"
              type="submit"
            >
              Create Campground
            </Button>
            <Flex mt={3}></Flex>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreateCampground);
