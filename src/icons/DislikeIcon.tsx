import { useColorModeValue } from "@chakra-ui/color-mode";
import Icon from "@chakra-ui/icon";

const DislikeIcon = () => {
  const iconColor = useColorModeValue("red", "red.400");
  return (
    <Icon viewBox="0 0 512 512" color={iconColor}>
      <path
        fill="currentColor"
        d="M480.1 255.8l-212.2 218.8c-6.1 7.251-18.5 7.251-25.62 0L31.01 255.9C-12.49 202.8-10.36 123.5 38.26 73.66l2.5-2.375c42.97-44.03 108.6-50.48 159.1-20.94l40.07 93.5L144 207.8l143.1 143.1L240 223.9l95.97-63.99l-31.55-105.2c51.3-34.89 121.6-29.83 166.8 16.39l2.5 2.5C522.4 123.5 524.5 202.8 480.1 255.8z"
      />
    </Icon>
  );
};

export default DislikeIcon;
