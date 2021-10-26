import React from "react";
import { Form, Formik } from "formik";
import Wrapper from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { Box } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/dist/client/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Layout } from "../components/Layout";

const Register = () => {
  const router = useRouter();
  const [{}, register] = useRegisterMutation();

  return (
    <Layout variant="small">
      <Formik
        initialValues={{ username: "", password: "", name: "", email: "" }}
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
            <Box mt={4}>
              <InputField
                name="name"
                label="name"
                placeholder="name"
                type="name"
              />
            </Box>
            <Box mt={4}>
              <InputField
                name="email"
                label="email"
                placeholder="email"
                type="email"
              />
            </Box>
            <Button
              mt={4}
              isLoading={isSubmitting}
              colorScheme="teal"
              type="submit"
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Register);
