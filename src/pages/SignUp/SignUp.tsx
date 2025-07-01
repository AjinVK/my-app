import React, { useState, useEffect } from "react";
import {
    Box,
    CardActions,
    CardContent,
    Grid,
    Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { TextInput, CustomButton, CommonBox, CommonCard } from '../../components/common';
import { getPasswordStrength, type PasswordStrength } from "../../utils/passwordUtil";
import {
    validateFirstName,
    validateLastName,
    validateEmail,
    validatePassword,
    validateConfirmPassword,
} from "../../utils/validation";
import './style.css';
import { useSnackbar } from "../../context/SnackBarContext";
import PasswordStrengthSnackbar from "../../components/common/PasswordStrengthHint";

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
    registeredUsers: User[];
}

const SignUp: React.FC<SignUpProps> = (props) => {
    const { onSubmitUser, onUpdateUser, editingUser, registeredUsers } = props;
    const navigate = useNavigate();

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const { showSnackbar } = useSnackbar();

    const handlePrevent = (e: React.ClipboardEvent<any>) => {
        e.preventDefault();
        showSnackbar(`${e.type} action is disabled for security.`, "warning");
    };

    const validateForm = () => {
        const newErrors = {
            firstName: validateFirstName(formData.firstName),
            lastName: validateLastName(formData.lastName),
            email: validateEmail(formData.email),
            password: validatePassword(formData.password),
            confirmPassword: validateConfirmPassword(formData.password, formData.confirmPassword),
        };

        if (
            !isEditing &&
            registeredUsers.some(
                (user) => user.email.toLowerCase() === formData.email.toLowerCase()
            )
        ) {
            newErrors.email = "Email already exists";
        }

        setErrors(newErrors);
        if (newErrors.firstName) {
            showSnackbar(newErrors.firstName, 'error');
            return false;
        }
        if (newErrors.lastName) {
            showSnackbar(newErrors.lastName, 'error');
            return false;
        }
        if (newErrors.email) {
            showSnackbar(newErrors.email, 'error');
            return false;
        }
        if (newErrors.password) {
            showSnackbar(newErrors.password, 'error');
            return false;
        }
        if (newErrors.confirmPassword) {
            showSnackbar(newErrors.confirmPassword, 'error');
            return false;
        }

        return Object.values(newErrors).every((error) => error === "");
    };

    const [isEditing, setIsEditing] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;
        try {
            if (isEditing) {
                onUpdateUser(formData);
                showSnackbar("User updated successfully!", "success");
            } else {
                onSubmitUser(formData);
                showSnackbar("User registered successfully!", "success");
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
        if (editingUser) {
            setFormData(editingUser);
            setIsEditing(true);
            document.title = "EditingUser - My App";
        } else {
            setIsEditing(false);
            document.title = "SignUp - My App";
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
    const [showStrengthHint, setShowStrengthHint] = useState(false);

    const passwordStrength = getPasswordStrength(formData.password);

    return (
        <CommonBox variant="signup">
            <CommonCard cardType="signup">
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
                                <TextInput
                                    label="First Name"
                                    name="firstName"
                                    className="signup-password-field"
                                    value={formData.firstName}
                                    error={!!errors.firstName}
                                    onChange={handleChange}
                                />
                                <TextInput
                                    label="Last Name"
                                    name="lastName"
                                    className="signup-password-field"
                                    value={formData.lastName}
                                    error={!!errors.lastName}
                                    onChange={handleChange}
                                />
                                <TextInput
                                    label="Email"
                                    name="email"
                                    type="email"
                                    className="signup-password-field"
                                    value={formData.email}
                                    error={!!errors.email}
                                    onChange={handleChange}
                                    disabled={isEditing}
                                />
                                <Box sx={{ position: 'relative' }}>
                                    <TextInput
                                        label="Password"
                                        name="password"
                                        type="password"
                                        className="signup-password-field"
                                        iconButtonClassName="signup-icon-button"
                                        isPasswordField
                                        value={formData.password}
                                        error={!!errors.password}
                                        showPassword={showPassword}
                                        setShowPassword={setShowPassword}
                                        onFocus={() => setShowStrengthHint(true)}
                                        onBlur={() => setTimeout(() => setShowStrengthHint(false), 150)}
                                        onChange={(e) => {
                                            handleChange(e);
                                            setShowStrengthHint(true);
                                        }}
                                        onCopy={handlePrevent}
                                        onCut={handlePrevent}
                                        onPaste={handlePrevent}
                                    />
                                    <PasswordStrengthSnackbar show={showStrengthHint}
                                        password={formData.password}
                                        strength={{
                                            ...passwordStrength,
                                            color: passwordStrength.color as PasswordStrength['color'],
                                        }}
                                        onClose={() => setShowStrengthHint(false)}
                                        autoHideDuration={1000}
                                    />
                                </Box>
                                <TextInput
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    type="password"
                                    className="signup-password-field"
                                    value={formData.confirmPassword}
                                    error={!!errors.confirmPassword}
                                    showPassword={showConfirmPassword}
                                    setShowPassword={setShowConfirmPassword}
                                    isPasswordField={true}
                                    iconButtonClassName="signup-icon-button"
                                    onBlur={() => setTimeout(() => setShowStrengthHint(false), 150)}
                                    onChange={(e) => {
                                        handleChange(e);
                                    }}
                                    onPaste={handlePrevent}
                                />
                                <CardActions>
                                    <CustomButton
                                        type="submit"
                                        isSignup
                                        variantType="contained"
                                        className="signup-button"
                                    >
                                        {isEditing ? "Update" : "Sign Up"}
                                    </CustomButton>
                                    <CustomButton
                                        type="button"
                                        isSignup
                                        variantType="outlined"
                                        className="signup-button"
                                        onClick={handleClear}
                                    >
                                        Clear
                                    </CustomButton>
                                </CardActions>
                            </form>
                        </CardContent>
                    </Grid>
                </Grid>
            </CommonCard>
        </CommonBox>
    );
};

export default SignUp;
