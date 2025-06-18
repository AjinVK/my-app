import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Grid,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import VisibilityOutlined from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlined from '@mui/icons-material/VisibilityOffOutlined';
import './style.css';

interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface SignUpProps {
    onSubmitUser: (user: User) => void;
    onUpdateUser: (user: User) => void;
    editingUser?: User | null;
}

const SignUp: React.FC<SignUpProps> = (props) => {
    const { onSubmitUser, onUpdateUser, editingUser } = props;
    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState<boolean>(false);

    const initialFormState: User = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    };

    const initialErrorState = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    };

    const [formData, setFormData] = useState<User>(initialFormState);
    const [errors, setErrors] = useState(initialErrorState);

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
        } else if (!/^[a-zA-Z ]+$/.test(formData.lastName)) {
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;
        try {
            if (isEditing) {
                onUpdateUser(formData);
                alert("User updated successfully!");
            } else {
                onSubmitUser(formData);
                alert("Sign Up Successful!");
            }

            setFormData(initialFormState);
            setErrors(initialErrorState);
            setIsEditing(false);

            navigate("/usertable");
        } catch (error) {
            alert("Something went wrong!");
        }
    };

    useEffect(() => {
        document.title = "SignUp - My App";
        if (editingUser) {
            setFormData(editingUser);
            setIsEditing(true);
            document.title = "EditingUser - My App";
        } else {
            setIsEditing(false);
        }
    }, [editingUser]);

    const handleClear = () => {
        setFormData(initialFormState);
        setErrors(initialErrorState);
        setIsEditing(false);
        document.title = "SignUp - My App";
    };
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                backgroundImage:
                    "linear-gradient(159deg, rgba(131, 58, 180, 1) 0%, rgba(253, 29, 29, 1) 50%, rgba(252, 176, 69, 1) 100%)",
                px: 2,
                py: 4,
                position: "relative",
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
                                color="rgb(108, 0, 0)"
                            >
                                {isEditing ? "Edit User" : "Sign Up"}
                            </Typography>

                            <form onSubmit={handleSubmit} noValidate>
                                <TextField
                                    label="First Name"
                                    name="firstName"
                                    variant="standard"
                                    required
                                    fullWidth
                                    className="signup-password-field"
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
                                    className="signup-password-field"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    error={!!errors.lastName}
                                    helperText={errors.lastName}
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    label="Email"
                                    name="email"
                                    type="email"
                                    variant="standard"
                                    required
                                    fullWidth
                                    className="signup-password-field"
                                    value={formData.email}
                                    onChange={handleChange}
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    sx={{ mb: 2 }}
                                    disabled={isEditing}
                                />
                                <TextField
                                    label="Password"
                                    name="password"
                                    variant="standard"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    fullWidth
                                    className="signup-password-field"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => setShowPassword((prev) => !prev)}
                                                    edge="end" className="signup-icon-button">
                                                    {showPassword ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    value={formData.password}
                                    onChange={handleChange}
                                    error={!!errors.password}
                                    helperText={errors.password}
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    variant="standard"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    required
                                    fullWidth
                                    className="signup-password-field"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => setShowConfirmPassword((prev) => !prev)}
                                                    edge="end" className="signup-icon-button">
                                                    {showConfirmPassword ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
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
                                            ml: 1,
                                            mt: 1,
                                            px: 2.5,
                                            py: 1,
                                            fontSize: "1rem",
                                            backgroundColor: "rgba(123, 6, 6, 0.96)",
                                            color: "#fff",
                                            fontWeight: "600",
                                            borderRadius: "7px",
                                            textTransform: "none",
                                            transition: "all 0.3s ease-in-out",
                                            "&:hover": {
                                                backgroundColor: "rgb(111, 2, 2)",
                                                color: "rgba(255, 255, 255, 0.95)",
                                            },
                                        }}
                                    >
                                        {isEditing ? "Update" : "Sign Up"}
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outlined"
                                        sx={{
                                            borderColor: "rgba(123, 6, 6, 0.96)",
                                            color: "rgba(123, 6, 6, 0.96)",
                                            ml: 1,
                                            mt: 1,
                                            px: 2.5,
                                            py: 1,
                                            fontSize: "1rem",
                                            fontWeight: "600",
                                            borderRadius: "7px",
                                            "&:hover": {
                                                backgroundColor: "rgb(111, 2, 2)",
                                                color: "rgba(255, 255, 255, 0.95)",
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
