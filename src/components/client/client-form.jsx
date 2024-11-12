import { Button, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import usePostClient from "./service/mutation/usePostClient";
import useEditClient from "./service/mutation/useEditClient";

const ClientForm = ({ client, onClose }) => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const create = usePostClient();
  const edit = useEditClient();

  useEffect(() => {
    if (client) {
      setValue("name", client.name);
      setValue("phoneNumber", client.phoneNumber);
    }
  }, [client, setValue]);

  const onSubmit = (data) => {
    if (client) {
      edit.mutate(
        { id: client.id, ...data },
        {
          onSuccess: () => {
            console.log("Client updated successfully!");
            reset();
            onClose();
          },
          onError: (error) => {
            console.error("Failed to update client:", error);
          },
        }
      );
    } else {
      create.mutate(data, {
        onSuccess: () => {
          console.log("Client created successfully!");
          reset();
        },
        onError: (error) => {
          console.error("Failed to create client:", error);
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        fullWidth
        label="Name"
        type="text"
        {...register("name", { required: true })}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Phone Number"
        type="tel"
        {...register("phoneNumber", { required: true })}
        margin="normal"
      />
      <Button
        fullWidth
        variant="contained"
        type="submit"
        disabled={create.isLoading || edit.isLoading}
      >
        {client
          ? edit.isLoading
            ? "Updating..."
            : "Update"
          : create.isLoading
          ? "Submitting..."
          : "Submit"}
      </Button>
    </form>
  );
};

export default ClientForm;
