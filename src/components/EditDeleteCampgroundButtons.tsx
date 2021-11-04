import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Flex, Button, IconButton } from "@chakra-ui/react";
import React from "react";
import {
  Campground,
  useCurrentUserQuery,
  useDeleteCampgroundMutation,
} from "../generated/graphql";
import NextLink from "next/link";
import { isServer } from "../utils/isServer";

interface EditDeleteCampgroundButtonsProps {
  id: number;
}

export const EditDeleteCampgroundButtons: React.FC<EditDeleteCampgroundButtonsProps> =
  ({ id }) => {
    const [, deleteCampground] = useDeleteCampgroundMutation();

    return (
      <Flex justifyContent="end">
        <NextLink href={"campground/edit/[id]"} as={`campground/edit/${id}`}>
          <Button colorScheme="teal" px={2}>
            <EditIcon />
          </Button>
        </NextLink>

        <IconButton
          aria-label="Delete campground"
          icon={<DeleteIcon />}
          colorScheme="red"
          ml={2}
          onClick={() => deleteCampground({ id })}
        />
      </Flex>
    );
  };
