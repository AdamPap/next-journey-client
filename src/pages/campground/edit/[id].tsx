import { Box, Button, Flex } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../../../components/InputField";
import { Layout } from "../../../components/Layout";
import {
  useCampgroundQuery,
  useUpdateCampgroundMutation,
} from "../../../generated/graphql";
import { createUrqlClient } from "../../../utils/createUrqlClient";

interface EditCampgroundProps {}

const EditCampground: React.FC<EditCampgroundProps> = ({}) => {
  const router = useRouter();

  const [, updateCampground] = useUpdateCampgroundMutation();

  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;

  const [{ fetching: campFetching, data: campData, error }] =
    useCampgroundQuery({
      pause: intId === -1,
      variables: {
        id: intId,
      },
    });

  if (campFetching) {
    return (
      <Layout>
        <Box>Loading...</Box>
      </Layout>
    );
  }

  if (!campData?.campground) {
    <Layout>
      <Box>Could not find campground</Box>
    </Layout>;
  }

  return (
    <Layout variant="small">
      <Formik
        initialValues={{
          name: campData?.campground?.name || "",
          location: campData?.campground!.location || "",
        }}
        onSubmit={async (values) => {
          const { error } = await updateCampground({
            id: intId,
            name: values.name,
            location: values.location,
          });

          if (error?.message.includes("Not authenticated")) {
            router.push("/login");
          } else {
            router.push(`/campground/${intId}`);
            // router.back();
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
              Update Campground
            </Button>
            <Flex mt={3}></Flex>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(EditCampground);
