import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CommonBox, CustomButton, TextInput } from "../../components/common";
import { validateEmail } from "../../utils/validation";
import type { FormErrors } from "../../utils/validation";
import { useSnackbar } from "../../context/SnackBarContext";

const ForgotPassword: React.FC = () => {
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState({
    email: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "ForgotPassword - My App";
  }, []);

  const validateForm = (): boolean => {

    const newErrors: FormErrors = {
      email: validateEmail(formData.email),
    };

    setErrors(newErrors);

    if (newErrors.email) showSnackbar(newErrors.email, "error");

    return Object.values(newErrors).every((error) => error === "");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const { showSnackbar } = useSnackbar();

  const handleSubmit = (e: React.FormEvent) => {

    e.preventDefault();
    if (!validateForm()) {
      showSnackbar("Please fix validation errors", "error");
      return;
    }
    showSnackbar("Password reset link sent to your email.");
    navigate("/");

    setFormData({
      email: "",
    });
    setErrors({});
  };

  return (

    <CommonBox variant="login">
      <Card sx={{
        maxWidth: 400, p: 3, borderRadius: 4,
        backgroundColor: "rgba(255, 255, 255, 0.92)", boxShadow: 6,
      }}>
        <CardContent>
          <Typography variant="h5" textAlign="center" fontWeight={700} mb={3} color="rgb(5, 74, 60)">
            Forgot Password
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextInput
              label="Email"
              name="email"
              type="email"
              className="login-field"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
            />
            <CustomButton type="submit" variantType="filled" className="login-btn">
              Send Reset Link
            </CustomButton>
          </form>
        </CardContent>
      </Card>
    </CommonBox>
  );
};

export default ForgotPassword;
