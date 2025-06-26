// components/common/CommonCard.tsx
import React from "react";
import { Card, type CardProps, type SxProps, type Theme } from "@mui/material";

type CardType = "login" | "signup" | "table" | "default";

interface CommonCardProps extends CardProps {
  cardType?: CardType;
  sx?: SxProps<Theme>;
  children: React.ReactNode;
}

const variantStyles: Record<CardType, SxProps<Theme>> = {
  login: {
    width: { xs: "100%", sm: "80%", md: "600px" },
    borderRadius: 3,
    boxShadow: 6,
    backgroundColor: "rgba(255, 255, 255, 0.92)",
  },
  signup: {
    width: { xs: "90%", sm: "60%", md: "400px" },
    borderRadius: 2,
    boxShadow: 6,
    backgroundColor: "rgb(237, 237, 237)",
    mx: "auto",
  },
  table: {
    width: "100%",
    maxWidth: 800,
    borderRadius: 4,
    boxShadow: 8,
    backgroundColor: "#fff",
  },
  default: {
    width: "100%",
    borderRadius: 2,
    boxShadow: 4,
    backgroundColor: "#fff",
  },
};

const CommonCard: React.FC<CommonCardProps> = ({
  children,
  cardType = "default",
  sx,
  ...rest
}) => {
  const baseStyle = variantStyles[cardType];
  const finalSx: SxProps<Theme> = Array.isArray(sx)
    ? [baseStyle, ...sx]
    : [baseStyle, ...(sx ? [sx] : [])];

  return (
    <Card sx={finalSx} {...rest}>
      {children}
    </Card>
  );
};

export default CommonCard;
