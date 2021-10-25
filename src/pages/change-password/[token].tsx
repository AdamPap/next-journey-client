import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import { InputField } from "../../components/InputField";
import Wrapper from "../../components/Wrapper";

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ newPassword: "" }}
        onSubmit={async (values, { setErrors }) => {
          // const res = await login({ options: values });
          // if (res.data?.login.errors) {
          //   setErrors(toErrorMap(res.data.login.errors));
          // } else if (res.data?.login.user) {
          //   router.push("/");
          // }
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
            <Button
              mt={4}
              isLoading={isSubmitting}
              colorScheme="teal"
              type="submit"
            >
              Change Password
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default ChangePassword;
