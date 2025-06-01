import React from "react";
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
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface TableFormProps {
  users: Array<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }>;
}

const TableForm: React.FC<TableFormProps> = ({ users }) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
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
          boxShadow: 6,
          borderRadius: 4,
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", textAlign: "center", mb: 3 }}
          >
            Registered User Details
          </Typography>

          <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table sx={{ minWidth: 650 }} size="medium">
              <TableHead sx={{ backgroundColor: "rgb(0, 0, 0)" }}>
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
                </TableRow>
              </TableHead>
              <TableBody>
                {users.length > 0 ? (
                  users.map((user, index) => (
                    <TableRow key={index}>
                      <TableCell>{user.firstName}</TableCell>
                      <TableCell>{user.lastName}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>••••••••</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
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
              sx={{ backgroundColor: "#076653", color: "#fff" }}
              onClick={() => navigate("/")}
            >
              Back to Login
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TableForm;
