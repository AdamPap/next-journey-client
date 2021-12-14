import { Text } from "@chakra-ui/layout";
import React from "react";

interface CampgroundDateProps {
  timestamp: string;
}

export const CampgroundDate: React.FC<CampgroundDateProps> = ({
  timestamp,
}) => {
  const newDate = new Date(timestamp);

  const dayDate = newDate.getDate();
  const month = newDate.getMonth();
  const year = newDate.getFullYear();

  const formattedDate = `${dayDate}/${month}/${year}`;

  return (
    <Text as="i" fontSize="sm" textColor="gray.400">
      {formattedDate}
    </Text>
  );
};
