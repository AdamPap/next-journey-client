import { Box, Flex, Heading } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import React, { useEffect, useState } from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import Wrapper from "../components/Wrapper";
import { useForgotPasswordMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useToast } from "@chakra-ui/react";
import { toErrorMap } from "../utils/toErrorMap";

const ForgotPassword: React.FC<{}> = ({}) => {
  const [, forgotPassword] = useForgotPasswordMutation();
  const [isComplete, setIsComplete] = useState(false);

  const toast = useToast();

  useEffect(() => {
    if (isComplete) {
      toast({
        title: "An email has been sent to you.",
        description:
          "If there is an account associated with this email, you will receive a link and instructions to change your password.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setIsComplete(false);
    }
  }, [isComplete]);

  return (
    <Layout variant="small">
      <Box mt={10}>
        <Heading textAlign="center" pb={6}>
          Password Reset
        </Heading>
        <Formik
          initialValues={{ email: "" }}
          onSubmit={async (values, { setErrors }) => {
            const res = await forgotPassword(values);
            if (res.data?.forgotPassword.errors) {
              setErrors(toErrorMap(res.data.forgotPassword.errors));
            } else if (res.data?.forgotPassword.success) {
              setIsComplete(true);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField
                name="email"
                label="Email"
                placeholder="Email"
                type="email"
              />
              <Button
                mt={6}
                width="100%"
                pt={1}
                isLoading={isSubmitting}
                colorScheme="teal"
                type="submit"
              >
                Send Email
              </Button>
              {/* {isComplete ? (
                <Box mt={5} color="teal">
                  If there is an account associated with this email, you will
                  receive a link and instructions to change your password.
                </Box>
              ) : null} */}
            </Form>
          )}
        </Formik>
      </Box>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
