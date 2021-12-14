import { Button } from "@chakra-ui/button";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import { InputField } from "../../components/InputField";
import Wrapper from "../../components/Wrapper";
import { useChangePasswordMutation } from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import { useRouter } from "next/router";
import { useState } from "react";
import { Box, Heading, Link } from "@chakra-ui/layout";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import Error from "../../components/Error";
import NextLink from "next/link";
import { Layout } from "../../components/Layout";

type ConfirmPasswordError = {
  confirmNewPassword?: string;
};

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  const router = useRouter();
  const [, changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState("");

  return (
    <Layout variant="small">
      <Box mt={10}>
        <Heading textAlign="center" pb={6}>
          Password Reset
        </Heading>
        <Formik
          initialValues={{ newPassword: "", confirmNewPassword: "" }}
          validate={(values) => {
            const errors = {} as ConfirmPasswordError;

            if (
              values.newPassword !== values.confirmNewPassword &&
              values.confirmNewPassword
            ) {
              errors.confirmNewPassword = "Passwords don't match";
            }

            return errors;
          }}
          onSubmit={async (values, { setErrors }) => {
            const res = await changePassword({
              newPassword: values.newPassword,
              token,
            });

            if (res.data?.changePassword.errors) {
              const errorMap = toErrorMap(res.data.changePassword.errors);

              if ("token" in errorMap) {
                setTokenError(errorMap.token);
              }

              setErrors(errorMap);
            } else if (res.data?.changePassword.user) {
              router.push("/");
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField
                name="newPassword"
                label="New Password"
                placeholder="New Password"
                type="password"
              />
              <Box mt={4}>
                <InputField
                  name="confirmNewPassword"
                  label="Confirm New Password"
                  placeholder="Confirm New Password"
                  type="password"
                />
              </Box>
              {tokenError ? <Error tokenError={tokenError} /> : null}
              <Button
                mt={4}
                width="100%"
                isLoading={isSubmitting}
                colorScheme="teal"
                type="submit"
              >
                Change Password
              </Button>
              {tokenError ? (
                <Box mt={4}>
                  <NextLink href="/forgot-password">
                    <Link color="teal">Invalid token? Send email again.</Link>
                  </NextLink>
                </Box>
              ) : null}
            </Form>
          )}
        </Formik>
      </Box>
    </Layout>
  );
};

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default withUrqlClient(createUrqlClient, { ssr: false })(ChangePassword);
