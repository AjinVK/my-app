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
        backgroundImage: "linear-gradient(to right,rgba(78, 38, 239, 0.69),rgba(86, 7, 102, 0.71))",
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
          >
            Registered User Details
          </Typography>

          <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table sx={{ minWidth: 650 }} size="medium">
              <TableHead sx={{ backgroundColor: "rgba(72, 49, 134, 0.83)" }}>
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
              sx={{
                backgroundColor: "rgba(51, 21, 140, 0.86)", color: "#fff",
                mt: 2, fontWeight: "bold",
                px: 3, py: 1.3,
                "&:hover": {
                  backgroundColor: "rgb(51, 21, 140)", color: "rgb(255, 255, 255)",
                },
              }}
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
