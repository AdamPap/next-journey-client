import { Box, Flex, Link } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import router from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import Wrapper from "../components/Wrapper";
import { useCreateCampgroundMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { toErrorMap } from "../utils/toErrorMap";
import login from "./login";

const CreateCampground: React.FC<{}> = ({}) => {
  const [, createCampground] = useCreateCampgroundMutation();

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ name: "", location: "" }}
        onSubmit={async (values, { setErrors }) => {
          const res = await createCampground({
            name: values.name,
            location: values.location,
          });
          console.log(res);
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
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(CreateCampground);
