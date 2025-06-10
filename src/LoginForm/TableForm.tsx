import React, { useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Paper,
    Button,
    CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface TableFormProps {
    users: User[];
    onDeleteUser: (email: string) => void;
}

const TableForm: React.FC<TableFormProps> = ({ users, onDeleteUser }) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleEdit = (user: User) => {
        navigate("/usermanagement/signup", { state: { user } });
    };

    const handleDelete = (email: string) => {
        onDeleteUser(email);
    };

    const handleHomeClick = () => {
        setIsLoading(true);
        setTimeout(() => {
            navigate("/");
        }, 1500);
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                backgroundImage:
                    "linear-gradient(to right,rgba(78, 38, 239, 0.69),rgba(86, 7, 102, 0.71))",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                p: 4,
            }}
        >
            <Card
                sx={{
                    width: "100%",
                    maxWidth: 800,
                    boxShadow: 8,
                    borderRadius: 4,
                }}
            >
                <CardContent>
                    <Typography
                        variant="h4"
                        sx={{ fontWeight: "bold", textAlign: "center", mb: 3 }}
                        color="rgba(92, 8, 109, 0.78)"
                        fontSize={{ xs: "1.5rem", sm: "2rem", md: "2.5rem" }}
                    >
                        Registered User Details
                    </Typography>

                    <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                        <Table sx={{ minWidth: 650 }} size="medium">
                            <TableHead sx={{ backgroundColor: "rgba(72, 49, 134, 0.93)" }}>
                                <TableRow>
                                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                                        First Name
                                    </TableCell>
                                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                                        Last Name
                                    </TableCell>
                                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                                        Email
                                    </TableCell>
                                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                                        Password
                                    </TableCell>
                                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                                        Actions
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.length > 0 ? (
                                    users.map((user, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{user.firstName}</TableCell>
                                            <TableCell>{user.lastName}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>{user.password}</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    color="success"
                                                    sx={{
                                                        mr: 1,
                                                        fontWeight: "bold",
                                                        mt: 1,
                                                        px: 2.5,
                                                        py: 1,
                                                        "&:hover": { backgroundColor: "rgb(51, 105, 63)" },
                                                    }}
                                                    onClick={() => handleEdit(user)}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    color="error"
                                                    sx={{
                                                        fontWeight: "bold",
                                                        mt: 1,
                                                        px: 2,
                                                        py: 1,
                                                    }}
                                                    onClick={() => handleDelete(user.email)}
                                                >
                                                    Delete
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center">
                                            No user data available
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Box display="flex" justifyContent="center" mt={3}>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "rgba(51, 21, 140, 0.86)",
                                color: "#fff",
                                mt: 2,
                                fontWeight: "bold",
                                px: 3,
                                py: 1.3,
                                "&:hover": {
                                    backgroundColor: "rgb(51, 21, 140)",
                                    color: "rgb(255, 255, 255)",
                                },
                            }}
                            onClick={handleHomeClick}
                        >
                            Back to Login
                        </Button>
                    </Box>
                </CardContent>
            </Card>
            {isLoading && (
                <Box
                    sx={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        backgroundColor: "rgba(0, 0, 0, 0.28)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 9999,
                    }}
                >
                    <CircularProgress size={70} thickness={3} color="inherit" />
                </Box>
            )}
        </Box>
    );
};

export default TableForm;
