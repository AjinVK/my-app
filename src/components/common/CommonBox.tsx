import React from "react";
import { Box, type SxProps, type Theme } from "@mui/material";

type BoxVariant = "login" | "signup" | "dashboard" | "default";

interface CommonBoxProps {
  children: React.ReactNode;
  variant?: BoxVariant;
  centerContent?: boolean;
  flexDirection?: "row" | "column";
  paddingX?: number;
  paddingY?: number;
  position?: "relative" | "absolute" | "static" | "fixed" | "sticky";
  minHeight?: string | number;
  sx?: SxProps<Theme>;
}

const variantStyles: Record<BoxVariant, string> = {
  login: "linear-gradient(to right, rgb(226, 239, 38), rgb(7, 102, 83), rgb(12, 52, 44))",
  signup: "linear-gradient(159deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)",
  dashboard: "linear-gradient(to right, rgba(78, 38, 239, 0.69), rgba(86, 7, 102, 0.71))",
  default: "white",
};

const CommonBox: React.FC<CommonBoxProps> = ({
  children,
  variant = "default",
  centerContent = true,
  flexDirection = "row",
  paddingX = 2,
  paddingY = 0,
  position = "static",
  minHeight = "100vh",
  sx = {},
}) => {
  return (
    <Box
      sx={{
        minHeight,
        backgroundImage: variantStyles[variant],
        px: paddingX,
        py: paddingY,
        position,
        display: centerContent ? "flex" : undefined,
        justifyContent: centerContent ? "center" : undefined,
        alignItems: centerContent ? "center" : undefined,
        flexDirection: centerContent ? flexDirection : undefined,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

export default CommonBox;
