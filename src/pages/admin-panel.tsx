import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import React from "react";
import { Layout } from "../components/Layout";
import { useUsersQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

interface AdminPanelProps {}

const AdminPanel: React.FC<AdminPanelProps> = ({}) => {
  const [{ data, fetching }] = useUsersQuery();

  if (fetching) {
    return <Box>...loading</Box>;
  }

  if (!data) {
    return <Box>No Data</Box>;
  }

  return (
    <Layout variant="small">
      <Heading mt={8} textAlign="center">
        All Users
      </Heading>
      <Flex flexDirection="column" mt={6}>
        {data.users?.map((user) => (
          <Box
            fontWeight="bold"
            color={user.isAdmin ? "white" : "gray.900"}
            pt={10}
            backgroundColor={
              user.isAccepted
                ? "green.600"
                : user.isAdmin
                ? "gray.900"
                : "red.600"
            }
            py={4}
            px={6}
            my={2}
            borderRadius="md"
          >
            <Flex justifyContent="space-between" alignItems="center">
              <Text my={3} fontSize="xl">
                {user.name}
              </Text>
              {!user.isAccepted && (
                <Button colorScheme="green" size="sm">
                  Accept
                </Button>
              )}
            </Flex>
            <Divider />
            <Box mt={2}> {user.isAccepted ? "Accepted" : "Pending"}</Box>
            <Box>{user.isAdmin ? "ADMIN" : "Not Admin"}</Box>
          </Box>
        ))}
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(AdminPanel);
