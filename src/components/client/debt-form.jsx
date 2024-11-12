import { Button, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import usePostDebt from "./service/mutation/usePostDebt";

const DebtForm = ({ Submit, id }) => {
  const { mutate } = usePostDebt();
  const { register, handleSubmit } = useForm();

  const submit = (data) => {
    Submit(false);
    mutate({ ...data, UserId: id });
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <TextField
        sx={{ my: 2 }}
        variant="outlined"
        fullWidth
        label="Debt"
        {...register("debt", { required: true })}
      />
      <Button fullWidth type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default DebtForm;
