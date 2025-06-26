import React, { useEffect } from "react";
import {
    Box,
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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CustomButton, CommonBox, CommonCard } from '../../components/common';
import './style.css';

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
    useEffect(() => {
        document.title = "UserTable - My App";
    }, []);

    const navigate = useNavigate();

    const handleEdit = (user: User) => {
        navigate("/signup", { state: { user } });
    };

    const handleDelete = (email: string) => {
        onDeleteUser(email);
    };

    const handleHomeClick = () => {
        navigate("/");
    };

    return (
        <CommonBox variant="dashboard" sx={{ p: 4 }}>
            <CommonCard cardType="table">
                <CardContent>
                    <Typography
                        variant="h4"
                        sx={{ fontWeight: "bold", textAlign: "center", mb: 3 }}
                        color="rgba(71, 1, 85, 0.78)"
                        fontSize={{ xs: "1.5rem", sm: "2rem", md: "2.5rem" }}
                    >
                        Registered User Details
                    </Typography>

                    <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 3 }}>
                        <Table sx={{ minWidth: 700 }} size="medium">
                            <TableHead>
                                <TableRow sx={{ backgroundColor: "rgba(72, 49, 134, 0.93)" }}>
                                    {["First Name", "Last Name", "Email", "Password", "Actions"].map((header) => (
                                        <TableCell key={header} sx={{ color: "#fff", fontWeight: 600 }}>
                                            {header}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.length > 0 ? (
                                    users.map((user, index) => (
                                        <TableRow key={index}
                                            sx={{
                                                backgroundColor: "rgba(243, 239, 255, 0.6)",
                                                "&:hover": {
                                                    backgroundColor: "rgba(224, 213, 255, 0.7)",
                                                },
                                            }}
                                        >
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
                                                        px: 2.3,
                                                        py: 0.8,
                                                        textTransform: "none",
                                                        "&:hover": { backgroundColor: "rgb(46, 125, 50)" },
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
                                                        px: 2,
                                                        py: 1,
                                                        textTransform: "none",
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
                        <CustomButton type="button" variantType="contained" className="table-btn"
                            onClick={handleHomeClick}
                        >
                            Back to Login
                        </CustomButton>
                    </Box>
                </CardContent>
            </CommonCard>
        </CommonBox>
    );
};

export default TableForm;
