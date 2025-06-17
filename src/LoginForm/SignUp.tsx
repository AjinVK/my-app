import React, { useState, useEffect } from "react";
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

    useEffect(() => {
        if (editingUser) {
            setFormData(editingUser);
            setIsEditing(true);
        } else {
            setIsEditing(false);
        }
    }, [editingUser]);

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

            navigate("/usermanagement/usertable");
        } catch (error) {
            alert("Something went wrong!");
        }
    };

    const handleClear = () => {
        setFormData(initialFormState);
        setErrors(initialErrorState);
        setIsEditing(false);
    };

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
                                color="rgb(164, 20, 20)"
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
                                    type="email"
                                    variant="standard"
                                    required
                                    fullWidth
                                    value={formData.email}
                                    onChange={handleChange}
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    sx={{ mb: 2 }}
                                    disabled={isEditing}
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
                                            ml: 1,
                                            backgroundColor: "black",
                                            color: "white",
                                            mt: 1,
                                            fontWeight: "bold",
                                            px: 2.5,
                                            py: 1,
                                            "&:hover": {
                                                backgroundColor: "rgb(0, 0, 0)",
                                                color: "rgb(232, 242, 235)",
                                            },
                                        }}
                                    >
                                        {isEditing ? "Update" : "Sign Up"}
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outlined"
                                        sx={{
                                            borderColor: "black",
                                            color: "black",
                                            mt: 1,
                                            fontWeight: "bold",
                                            px: 2.5,
                                            py: 1,
                                            "&:hover": {
                                                backgroundColor: "black",
                                                color: "rgb(232, 242, 235)",
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
