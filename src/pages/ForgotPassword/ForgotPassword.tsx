import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

   useEffect(() => {
      document.title = "ForgotPassword - My App";
    }, []);

  const validateEmail = () => {
    if (!email.trim()) {
      setEmailError("Email is required");
      return false;
    } else if (
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email)
    ) {
      setEmailError("Enter a valid email");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateEmail()) {
      alert("Password reset link sent to your email.");
      navigate("/");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
        backgroundImage: "linear-gradient(to right,#e2ef26,#076653,#0c342c)",
      }}
    >
      <Card sx={{
        maxWidth: 400, p: 3, borderRadius: 4,
        backgroundColor: "rgba(255, 255, 255, 0.92)", boxShadow: 6,
      }}>
        <CardContent>
          <Typography variant="h5" textAlign="center" fontWeight={700} mb={3} color="rgb(5, 74, 60)">
            Forgot Password
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              variant="standard"
              type="email"
              className="login-field"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!emailError}
              helperText={emailError}
              required
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#076653",
                color: "#fff",
                fontWeight: "bold",
                borderRadius: "50px",
                py: 1.2,
                "&:hover": {
                  backgroundColor: "#054d3e",
                },
              }}
            >
              Send Reset Link
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ForgotPassword;
