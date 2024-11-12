import React from "react";
import { useForm } from "react-hook-form";
import { Button, TextField, Container, Typography } from "@mui/material";
import { useLoginUser } from "../../pages/home/service/mutation/useLoginGet";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const { mutate, isLoading, isError, error } = useLoginUser();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: () => {
        reset();
        toast.success("Login successful!");
        navigate("/app");
      },
      onError: () => {
        toast.error("Login failed, please try again.");
      },
    });
  };

  return (
    <Container>
      <form
        style={{ width: "500px", padding: "20px" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          fullWidth
          label="Email"
          type="email"
          {...register("email")}
          margin="normal"
        />
        <TextField
          sx={{ marginTop: "10px", marginBottom: "20px" }}
          fullWidth
          label="Password"
          type="password"
          {...register("password")}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </form>
      {isError && <Typography color="error">Error: {error.message}</Typography>}
    </Container>
  );
};

export default LoginForm;
