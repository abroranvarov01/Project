import { Typography } from "@mui/material";
import React from "react";
import { Container, Box } from "@mui/material";
import RegisterForm from "../../components/register-form/register-form";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <Container>
      <Box>
        <Typography textAlign={"center"} variant="h3">
          Register
        </Typography>
        <Box width={"500px"} marginX={"auto"}>
          <RegisterForm />
        </Box>
        <Typography textAlign={"center"} variant="h6">
          Already have an account? <Link to="/">Login</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Register;
