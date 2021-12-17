import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import NextImage from "next/image";
import { Image } from "@chakra-ui/react";
import {
  useCreateCampgroundMutation,
  useCurrentUserQuery,
} from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const CreateCampground: React.FC<{}> = ({}) => {
  const [imageUrl, setImageUrl] = useState(
    "https://res.cloudinary.com/dnrjcvoom/image/upload/v1639138544/next-journey/avxmjme81irphoatsgpu.jpg"
  );

  const [{ data, fetching }] = useCurrentUserQuery();
  const [, createCampground] = useCreateCampgroundMutation();
  const router = useRouter();

  useEffect(() => {
    if (!fetching && !data?.currentUser) {
      router.replace("/login?next=" + router.pathname);
    }
  }, [fetching, data, router]);

  return (
    <Layout variant="small">
      <Box mt={10} pb={{ base: 4, sm: 0 }} px={{ base: 4, sm: 0 }}>
        <Heading textAlign="center" pb={6}>
          Add a New Place
        </Heading>
        <Formik
          initialValues={{ name: "", location: "", image: "" }}
          onSubmit={async (values) => {
            const { error } = await createCampground({
              name: values.name,
              location: values.location,
              image: values.image,
            });

            if (error?.message.includes("Not authenticated")) {
              router.push("/login");
            } else {
              router.push("/");
            }
          }}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form>
              <InputField name="name" label="Name" placeholder="Name" />
              <Box mt={4}>
                <InputField
                  name="location"
                  label="Location"
                  placeholder="Location, Area/City, Country"
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
                width={{ base: "360", sm: "400px" }}
                border="1px"
                borderColor="teal.600"
                justifyContent="center"
              >
                {values.image && (
                  <Image
                    src={values.image}
                    fallbackSrc="https://res.cloudinary.com/dnrjcvoom/image/upload/v1639588648/next-journey/%CE%A0%CF%81%CE%BF%CF%83%CE%B8%CE%AD%CF%83%CF%84%CE%B5_%CE%B5%CF%80%CE%B9%CE%BA%CE%B5%CF%86%CE%B1%CE%BB%CE%AF%CE%B4%CE%B1_tkwm84.jpg"
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
                Add a new place
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreateCampground);
