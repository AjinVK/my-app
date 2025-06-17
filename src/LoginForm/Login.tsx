import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    emailError: "",
    passwordError: "",
  });

  const navigate = useNavigate();

  const handleSignUpClick = () => {
      navigate("/usermanagement/signup");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value, [`${name}Error`]: "" }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { emailError: "", passwordError: "" };

    if (!formData.email.trim()) {
      newErrors.emailError = "Email is required";
      isValid = false;
    } else if (
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(formData.email)
    ) {
      newErrors.emailError = "Enter a valid email";
      isValid = false;
    }

    if (!formData.password.trim()) {
      newErrors.passwordError = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.passwordError = "Password must be at least 6 characters";
      isValid = false;
    }

    setFormData((prev) => ({ ...prev, ...newErrors }));
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Login Successful!");
      setFormData({
        email: "",
        password: "",
        emailError: "",
        passwordError: "",
      });
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "linear-gradient(to right,rgb(226, 239, 38),rgb(7, 102, 83),rgb(12, 52, 44))",
        px: 2,
      }}
    >
      <Card
        sx={{
          width: { xs: "80%", md: "600px" },
          borderRadius: "16px",
          boxShadow: 6,
          backgroundColor: "rgba(255, 255, 255, 0.92)",
        }}
      >
        <Grid
          container
          direction={{ xs: "column", sm: "row" }}
          spacing={0}
        >
          <Grid size={{ xs: 12, sm: 6 }} p={1}>
            <CardContent>
              <Typography variant="h5" fontWeight={700} textAlign="center" mb={2} color="rgb(5, 74, 60)">
                Login Form
              </Typography>

              <form onSubmit={handleSubmit}>
                <Box mb={2}>
                  <TextField
                    label="Email"
                    name="email"
                    variant="standard"
                    size="small"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!formData.emailError}
                    helperText={formData.emailError}
                    fullWidth
                    required
                  />
                </Box>

                <Box mb={2}>
                  <TextField
                    label="Password"
                    type="password"
                    name="password"
                    variant="standard"
                    size="small"
                    value={formData.password}
                    onChange={handleChange}
                    error={!!formData.passwordError}
                    helperText={formData.passwordError}
                    fullWidth
                    required
                  />
                </Box>

                <Typography
                  variant="body2"
                  sx={{
                    color: "#076653",
                    textAlign: "right",
                    cursor: "pointer",
                    textDecoration: "underline",
                    // mb: 1,
                  }}
                  onClick={() => navigate("/usermanagement/forgot-password")}
                >
                  Forgot Password?
                </Typography>

                <CardActions sx={{ flexDirection: "column", gap: 2 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      backgroundColor: "#076653", color: "#fff",
                      mt: 2, fontWeight: "bold", borderRadius: "50px",
                      px: 3, py: 1.3,
                      "&:hover": {
                        backgroundColor: "#054d3e",
                      },
                    }}
                    fullWidth
                  >
                    Log in
                  </Button>
                  <Button
                    type="button"
                    variant="outlined"
                    sx={{
                      borderColor: "#076653", color: "#076653",
                      mt: 1, fontWeight: "bold", borderRadius: "50px",
                      px: 3, py: 1.3,
                      "&:hover": {
                        backgroundColor: "#054d3e", color: "rgb(232, 242, 235)",
                      },
                    }}
                    onClick={handleSignUpClick}
                    fullWidth
                  >
                    Sign up
                  </Button>
                </CardActions>
              </form>
            </CardContent>
          </Grid>

          <Grid
            size={{ xs: 12, sm: 6 }}
            display="flex"
            justifyContent="center"
            alignItems="center"
            p={2}
          >
            <CardMedia
              component="img"
              image="/vite.svg"
              alt="Illustration"
              sx={{
                width: { xs: "150px", sm: "200px" },
                height: { xs: "150px", sm: "200px" },
                mx: "auto",
                mt: 2,
              }}
            />
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default Login;