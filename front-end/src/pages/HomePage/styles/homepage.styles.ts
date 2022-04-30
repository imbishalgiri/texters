import { chakra, Box, Flex, Button } from "@chakra-ui/react";
import chat from "assets/chat.jpg";

const HomepageBox = chakra(Box, {
  baseStyle: {
    backgroundImage: `url(${chat})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
});

const CenterFlex = chakra(Flex, {
  baseStyle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});

const Overlay = chakra(Box, {
  baseStyle: {
    position: "absolute",
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
    backgroundColor: "rgba(62, 69, 202, 0.6)",
  },
});

const MiddleBox = chakra(Box, {
  baseStyle: {
    width: "40vw",
    background: "rgba(230, 230, 239)",
    color: "rgba(69, 69, 73, 1)",
    zIndex: "3",
    borderRadius: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "4.5rem",
    boxShadow: "1px 1px 33px rgba(0,0,0,0.3)",
  },
});
const CleanButton = chakra(Button, {
  baseStyle: {
    background: "blue",
    color: "#fff",
  },
});
export { HomepageBox, CenterFlex, Overlay, MiddleBox, CleanButton };
