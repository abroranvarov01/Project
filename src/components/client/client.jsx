import React, { useState } from "react";
import { Button, Stack, Typography, Box, IconButton } from "@mui/material";
import useDeleteClient from "./service/mutation/useDeleteClient";
import ClientForm from "./client-form";
import DebtForm from "./debt-form";
import useGetDebt from "./service/query/useGetDebt";
import DebtEdit from "./debt-edit";
import useDeleteDebt from "./service/mutation/useDeleteDebt";
const ClientCard = (props) => {
  const deleteMutation = useDeleteClient();
  const { data, error, isLoading } = useGetDebt({ userId: props.id });
  const { mutate: deleteDebt } = useDeleteDebt();
  const [isEditing, setIsEditing] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [debt, setDebt] = useState(false);
  const [isDebtEditing, setIsDebtEditing] = useState(false);
  const debtExists = data?.some((item) => item.id === props.id);

  const handleDelete = () => {
    deleteMutation.mutate(props.id);
    deleteDebt(props.id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleEditClose = () => {
    setIsEditing(false);
  };

  const handleShow = () => {
    setIsShow(true);
  };

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error.message}</Typography>;
  }

  return (
    <Box
      borderRadius={"10px"}
      border={"2px solid #d0e16fca"}
      textAlign={"center"}
      width={"400px"}
      padding={"10px"}
      margin={"10px"}
    >
      {isEditing ? (
        <ClientForm client={props} onClose={handleEditClose} />
      ) : (
        <>
          <Typography>{props.name}</Typography>
          <Typography>{props.phoneNumber}</Typography>
          {isShow && data && data.length > 0 && (
            <Box>
              <Stack
                direction={"row"}
                justifyContent={"center"}
                alignItems={"center"}
                spacing={1}
                mb={"10px"}
                sx={{ transition: "all 0.6s ease-in-out" }}
                border={"2px solid #d0e16fca"}
                padding={"6px"}
                borderRadius={"10px"}
              >
                <Button
                  variant="contained"
                  onClick={() => setIsDebtEditing(true)}
                  color="secondary"
                >
                  Edit Debt
                </Button>
                {/* <Button
                  variant="contained"
                  onClick={() => }
                  color="warning"
                >
                  Delete Debt
                </Button> */}
                <Typography>
                  {data.find((item) => item.id === props.id).debt}$
                </Typography>
                <IconButton onClick={() => setIsShow(false)} color="error">
                  x
                </IconButton>
              </Stack>
              {isDebtEditing && (
                <DebtEdit Submit={setIsDebtEditing} id={props.id} />
              )}
            </Box>
          )}
          <Stack
            direction={"row"}
            spacing={1}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Button variant="contained" onClick={handleDelete} color="error">
              Delete
            </Button>
            <Button variant="contained" onClick={handleShow} color="success">
              Show
            </Button>
            <Button variant="contained" onClick={handleEdit} color="warning">
              Edit
            </Button>
            {!debtExists && (
              <Button
                variant="contained"
                onClick={() => setDebt(true)}
                color="info"
              >
                Add Debt
              </Button>
            )}
          </Stack>
          {debt && <DebtForm Submit={setDebt} id={props.id} />}
        </>
      )}
    </Box>
  );
};

export default ClientCard;
