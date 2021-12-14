import React from "react";
import { Form, Formik } from "formik";
import Wrapper from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { Box, Flex, Heading, Link, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/dist/client/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Layout } from "../components/Layout";
import NextLink from "next/link";
import { Checkbox } from "@chakra-ui/checkbox";

const Register = () => {
  const router = useRouter();
  const [{}, register] = useRegisterMutation();

  return (
    <Layout>
      <Flex height="100%" minHeight="90vh">
        <Box
          display={{ base: "none", lg: "block" }}
          width="50%"
          backgroundImage="url('https://res.cloudinary.com/dnrjcvoom/image/upload/v1639403772/next-journey/photo-1463693396721-8ca0cfa2b3b5_fi2lld.jpg')"
          backgroundPosition="20% 50%"
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
        ></Box>
        <Flex
          width={{ base: "100%", lg: "50%" }}
          justifyContent="center"
          alignItems="center"
        >
          <Box maxWidth="400px" width="100%" p={8}>
            <Heading textAlign="center" pb={2}>
              Sign Up
            </Heading>
            <Text textAlign="center" pb={6}>
              Join now and embark on your next amazing journey!
            </Text>
            <Formik
              initialValues={{
                username: "",
                password: "",
                name: "",
                email: "",
              }}
              onSubmit={async (values, { setErrors }) => {
                const res = await register(values);
                if (res.data?.register.errors) {
                  setErrors(toErrorMap(res.data.register.errors));
                } else if (res.data?.register.user) {
                  router.push("/");
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <InputField
                    name="name"
                    label="Name"
                    placeholder="Name"
                    type="name"
                  />

                  <Box mt={4}>
                    <InputField
                      name="username"
                      label="Username"
                      placeholder="Username"
                      type="text"
                    />
                  </Box>
                  <Box mt={4}>
                    <InputField
                      name="email"
                      label="Email"
                      placeholder="Email"
                      type="email"
                    />
                  </Box>
                  <Box mt={4}>
                    <InputField
                      name="password"
                      label="Password"
                      placeholder="Password"
                      type="password"
                    />
                  </Box>
                  <Checkbox
                    display="flex"
                    alignItems="flex-start"
                    my={6}
                    size="md"
                    colorScheme="teal"
                  >
                    <Box>I agree to NextJourney's terms and conditions</Box>
                  </Checkbox>
                  <Button
                    width="100%"
                    isLoading={isSubmitting}
                    colorScheme="teal"
                    type="submit"
                  >
                    Register
                  </Button>
                  <Flex mt={5} justifyContent="flex-end">
                    Already have an account?
                    <NextLink href="/login">
                      <Link ml={2} color="teal">
                        Sign In
                      </Link>
                    </NextLink>
                  </Flex>
                </Form>
              )}
            </Formik>
          </Box>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Register);
