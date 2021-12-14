import { Box, Button, Flex, Heading, Text, Image } from "@chakra-ui/react";
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

  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;

  const [{ fetching: campFetching, data: campData, error }] =
    useCampgroundQuery({
      pause: intId === -1,
      variables: {
        id: intId,
      },
    });

  const [, updateCampground] = useUpdateCampgroundMutation();

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
      <Box mt={10}>
        <Heading textAlign="center" pb={6}>
          Edit {campData?.campground?.name}
        </Heading>
        <Formik
          initialValues={{
            name: campData?.campground?.name || "",
            location: campData?.campground!.location || "",
            image: campData?.campground?.image || "",
          }}
          onSubmit={async (values) => {
            const { error } = await updateCampground({
              id: intId,
              name: values.name,
              location: values.location,
              image: values.image,
            });

            if (error?.message.includes("Not authenticated")) {
              router.push("/login");
            } else {
              // router.push(`/campground/${intId}`);
              router.back();
            }
          }}
        >
          {({ isSubmitting, values }) => (
            <Form>
              <InputField name="name" label="Name" placeholder="Name" />
              <Box mt={4}>
                <InputField
                  name="location"
                  label="Location"
                  placeholder="Location"
                />
              </Box>
              <Box mt={4}>
                <InputField
                  name="image"
                  label="Image Url"
                  placeholder="Image Url"
                />
              </Box>

              <Text mt={6} mb={3}>
                Image Preview
              </Text>
              <Flex
                borderRadius={5}
                mx="auto"
                height="280px"
                width="400px"
                border="1px"
                borderColor="teal.600"
                justifyContent="center"
              >
                {values.image && (
                  <Image
                    src={values.image}
                    fallbackSrc="https://res.cloudinary.com/dnrjcvoom/image/upload/v1639508916/next-journey/%CE%A0%CF%81%CE%BF%CF%83%CE%B8%CE%AD%CF%83%CF%84%CE%B5_%CE%B5%CF%80%CE%B9%CE%BA%CE%B5%CF%86%CE%B1%CE%BB%CE%AF%CE%B4%CE%B1_n1sfqw.jpg"
                    fit="contain"
                    htmlWidth="360px"
                    htmlHeight="280px"
                  />
                )}
              </Flex>
              <Button
                width="100%"
                mt={6}
                isLoading={isSubmitting}
                colorScheme="teal"
                type="submit"
              >
                Update {campData?.campground?.name}
              </Button>
              <Flex mt={3}></Flex>
            </Form>
          )}
        </Formik>
      </Box>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(EditCampground);
