import React from "react";
import { Button, type ButtonProps } from "@mui/material";

interface CustomButtonProps extends ButtonProps {
  children: React.ReactNode;
  className?: string;
  variantType?: "filled" | "outlined" | "contained";
  isSignup?: boolean;
}
const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  className = "",
  variantType = "",
  isSignup = false,
  ...props
}) => {
  const appliedClass = `${isSignup ? 'signup-btn' : 'login-btn'} ${variantType} ${className}`.trim();
  const applyClass = `table-btn ${variantType || ''} ${className || ''}`.trim();

  return (
    <Button fullWidth className={appliedClass ? appliedClass : applyClass} {...props}>
      {children}
    </Button>
  );
};

export default CustomButton;
