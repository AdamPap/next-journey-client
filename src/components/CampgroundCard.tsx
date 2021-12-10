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
        <Flex justifyContent="center" height="full">
          <Box>
            <Flex justifyContent="space-between">
              <NextLink href="campground/[id]" as={`/campground/${camp.id}`}>
                <Link>
                  <Heading fontSize="lg"> {camp.name} </Heading>
                </Link>
              </NextLink>
              <Text
                color={
                  camp.creator.id === userData?.currentUser?.id
                    ? `teal`
                    : "black"
                }
              >
                Posted by
                {camp.creator.id === userData?.currentUser?.id
                  ? " you"
                  : ` ${camp.creator.username}`}
              </Text>
            </Flex>

            <Box
              mt={3}
              position="relative"
              width="100%"
              maxHeight="400px"
              borderRadius="md"
              overflow="hidden"
            >
              <NextImage
                src={camp.image}
                layout="intrinsic"
                objectFit="contain"
                width={600}
                height={400}
              />
            </Box>
            <Box mt={3}>
              <Flex>
                <Box width="100%">
                  <Text>{camp.location}</Text>
                </Box>
                {camp.creator.id === userData?.currentUser?.id && (
                  <EditDeleteCampgroundButtons id={camp.id} />
                )}
              </Flex>
            </Box>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};
