import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Button, Flex, IconButton, Box } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { useDeleteCampgroundMutation } from "../generated/graphql";

interface EditDeleteCampgroundButtonsProps {
  id: number;
}

export const EditDeleteCampgroundButtons: React.FC<EditDeleteCampgroundButtonsProps> =
  ({ id }) => {
    const [, deleteCampground] = useDeleteCampgroundMutation();

    return (
      <Flex justifyContent="end">
        <NextLink href={"/campground/edit/[id]"} as={`/campground/edit/${id}`}>
          <Button
            size="sm"
            leftIcon={<EditIcon />}
            colorScheme="teal"
            px={2}
            // pt={1}
          >
            <Box pt={1}>Edit</Box>
          </Button>
        </NextLink>

        <Button
          size="sm"
          leftIcon={<DeleteIcon />}
          colorScheme="red"
          px={2}
          // pt={1}
          ml={2}
          onClick={() => deleteCampground({ id })}
        >
          <Box pt={1}>Delete</Box>
        </Button>
        {/* <IconButton
          aria-label="Delete campground"
          icon={<DeleteIcon />}
          colorScheme="red"
          ml={2}
          onClick={() => deleteCampground({ id })}
        /> */}
      </Flex>
    );
  };
