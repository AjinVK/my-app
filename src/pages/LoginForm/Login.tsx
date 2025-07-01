import React, { useEffect, useState } from "react";
import {
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { TextInput, CustomButton, CommonBox, CommonCard } from '../../components/common';
import { validateEmail, validatePassword, type FormErrors } from "../../utils/validation";
import img from "../../assets/vite.svg";
import './style.css'
import { useSnackbar } from "../../context/SnackBarContext";

const Login: React.FC = () => {
  useEffect(() => {
    document.title = "Login - My App";
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const handleSignUpClick = () => {
    navigate("/signup");
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

  const validateForm = (): boolean => {

    const newErrors: FormErrors = {
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
    };

    setErrors(newErrors);

    if (newErrors.email) showSnackbar(newErrors.email, "error");
    if (newErrors.password) showSnackbar(newErrors.password, "error");

    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      // showSnackbar("Please fix validation errors", "error");
      return;
    }

    showSnackbar("Login Successful!", "success");

    setFormData({
      email: "",
      password: "",
    });
    setErrors({});
  };

  return (

    <CommonBox variant="login">
      <CommonCard cardType="login">
        <Grid container direction={{ xs: "column", sm: "row" }}>
          <Grid size={{ xs: 12, sm: 6 }} p={3}>
            <CardContent>
              <Typography
                variant="h5"
                fontWeight={700}
                textAlign="center"
                mb={2}
                color="rgb(5, 74, 60)"
              >
                Login Form
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
                <TextInput
                  label="Password"
                  name="password"
                  type="password"
                  className="login-field"
                  isPasswordField
                  iconButtonClassName="login-icon-button"
                  value={formData.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword} />

                <Typography
                  variant="body2"
                  sx={{
                    color: "#076653", textAlign: "right",
                    textDecoration: "underline", cursor: "pointer", mb: 2,
                  }}
                  onClick={() => navigate("/forgot-password")}
                >
                  Forgot Password?
                </Typography>

                <CardActions sx={{ flexDirection: "column", gap: 2 }}>
                  <CustomButton type="submit" variantType="filled" className="login-btn">
                    Log in
                  </CustomButton>
                  <CustomButton type="button" variantType="outlined" onClick={handleSignUpClick}>
                    Sign up
                  </CustomButton>
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
              image={img}
              alt="Login illustration"
              sx={{
                width: { xs: 140, sm: 200 },
                height: { xs: 140, sm: 200 },
                mx: "auto",
              }}
            />
          </Grid>
        </Grid>
      </CommonCard>
    </CommonBox>
  );
};

export default Login;
