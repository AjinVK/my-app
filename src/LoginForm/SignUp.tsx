import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface SignUpProps {
  onSubmitUser: (user: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSubmitUser }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
    let isValid = true;

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
      isValid = false;
    } else if (!/^[a-zA-Z ]+$/.test(formData.firstName)) {
      newErrors.firstName = "First name must contain only letters";
      isValid = false;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
      isValid = false;
    } else if (!/^[a-zA-Z]+$/.test(formData.lastName)) {
      newErrors.lastName = "Last name must contain only letters";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm your password";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmitUser(formData);
      alert("Sign Up Successful!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      navigate("/usermanagement/usertable");
    }
  };

  const handleClear = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setErrors({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundImage:
          "linear-gradient(to right,rgba(255, 0, 0, 0.48),rgba(255, 0, 0, 0.57))",
        px: 2,
        py: 4,
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: "400px",
          borderRadius: "16px",
          boxShadow: 6,
          backgroundColor: "rgb(237, 237, 237)",
        }}
      >
        <Grid container>
          <Grid
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            p={3}
          >
            <CardContent>
              <Typography
                sx={{ fontWeight: "bold", fontSize: "24px" }}
                variant="h5"
                textAlign={"center"}
                mb={2}
              >
                Sign Up
              </Typography>

              <form onSubmit={handleSubmit} noValidate>
                <TextField
                  label="First Name"
                  name="firstName"
                  variant="standard"
                  required
                  fullWidth
                  value={formData.firstName}
                  onChange={handleChange}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Last Name"
                  name="lastName"
                  variant="standard"
                  required
                  fullWidth
                  value={formData.lastName}
                  onChange={handleChange}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Email"
                  name="email"
                  variant="standard"
                  required
                  fullWidth
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Password"
                  type="password"
                  name="password"
                  variant="standard"
                  required
                  fullWidth
                  value={formData.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  variant="standard"
                  required
                  fullWidth
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                  sx={{ mb: 2 }}
                />

                <CardActions>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      ml: 1, backgroundColor: "black", color: "white",
                      mt: 1, fontWeight: "bold",
                      px: 2.5, py: 1,
                      "&:hover": {
                        backgroundColor: "rgb(0, 0, 0)", color: "rgb(232, 242, 235)",
                      },
                    }}
                  >
                    Sign Up
                  </Button>
                  <Button
                    type="button"
                    variant="outlined"
                    sx={{
                      borderColor: "black", color: "black",
                      mt: 1, fontWeight: "bold",
                      px: 2.5, py: 1,
                      "&:hover": {
                        backgroundColor: "black", color: "rgb(232, 242, 235)",
                      },
                    }}
                    onClick={handleClear}
                  >
                    Clear
                  </Button>
                </CardActions>
              </form>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default SignUp;
