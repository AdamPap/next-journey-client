import { Text } from "@chakra-ui/layout";
import { Box, Flex, Heading, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { CampgroundsQuery, CurrentUserQuery } from "../generated/graphql";
import { EditDeleteCampgroundButtons } from "./EditDeleteCampgroundButtons";
import { UpvoteSection } from "./UpvoteSection";
import NextImage from "next/image";

interface CampgroundCardProps {
  camp: CampgroundsQuery["campgrounds"]["campgrounds"][0];
  userData?: CurrentUserQuery;
}

export const CampgroundCard: React.FC<CampgroundCardProps> = ({
  camp,
  userData,
}) => {
  return (
    <Flex
      p={5}
      rounded="lg"
      shadow="xl"
      // borderWidth="1px"
      key={camp.id}
    >
      <UpvoteSection camp={camp} />
      <Box w="100%" py={3}>
        <Flex justifyContent="space-between" height="full">
          <Box>
            <NextLink href="campground/[id]" as={`/campground/${camp.id}`}>
              <Link>
                <Heading fontSize="lg"> {camp.name} </Heading>
              </Link>
            </NextLink>
            <Text mt={4}>{camp.location}</Text>
            <Box position="relative" width="100%" height="100%">
              <NextImage
                src={camp.image}
                layout="intrinsic"
                objectFit="contain"
                width={1500}
                height={1000}
              />
            </Box>
          </Box>
          <Box>
            <Flex
              height="full"
              flexDirection="column"
              justifyContent="space-between"
            >
              <Text
                color={
                  camp.creator.id === userData?.currentUser?.id
                    ? `teal`
                    : "black"
                }
              >
                Posted by{" "}
                {camp.creator.id === userData?.currentUser?.id
                  ? "you"
                  : camp.creator.username}
              </Text>

              {camp.creator.id === userData?.currentUser?.id && (
                <EditDeleteCampgroundButtons id={camp.id} />
              )}
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};
