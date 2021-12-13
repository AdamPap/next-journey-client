import React from "react";
import { Form, Formik } from "formik";
import { InputField } from "../components/InputField";
import { Box, Flex, Heading, Link, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/dist/client/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import NextLink from "next/link";
import { Layout } from "../components/Layout";

const Login = () => {
  const router = useRouter();
  const [{}, login] = useLoginMutation();

  return (
    <Layout>
      <Flex height="100%" minHeight="90vh">
        <Box
          display={{ base: "none", lg: "block" }}
          width="50%"
          backgroundImage="url('https://res.cloudinary.com/dnrjcvoom/image/upload/v1639422996/next-journey/photo-1498889444388-e67ea62c464b_kfyz9i.jpg')"
          backgroundPosition="center"
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
              Sign In
            </Heading>
            <Text textAlign="center" pb={6}>
              Welcome back!
            </Text>
            <Formik
              initialValues={{ username: "", password: "" }}
              onSubmit={async (values, { setErrors }) => {
                const res = await login({ options: values });
                if (res.data?.login.errors) {
                  setErrors(toErrorMap(res.data.login.errors));
                } else if (res.data?.login.user) {
                  if (typeof router.query.next === "string") {
                    router.push(router.query.next);
                  } else {
                    router.push("/");
                  }
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <InputField
                    name="username"
                    label="Username"
                    placeholder="Username"
                  />
                  <Box mt={4}>
                    <InputField
                      name="password"
                      label="Password"
                      placeholder="Password"
                      type="password"
                    />
                  </Box>
                  <Button
                    width="100%"
                    pt={1}
                    mt={8}
                    isLoading={isSubmitting}
                    colorScheme="teal"
                    type="submit"
                  >
                    Login
                  </Button>
                  <Flex mt={5}>
                    <NextLink href="/forgot-password">
                      <Link ml="auto" color="teal">
                        Forgot your Password?
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

export default withUrqlClient(createUrqlClient)(Login);
