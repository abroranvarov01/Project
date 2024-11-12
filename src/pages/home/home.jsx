import { Container, Grid2, Typography } from "@mui/material";
import React from "react";
import useGetClient from "../../components/client/service/query/useGetClient";
import ClientCard from "../../components/client/client";
import ClientForm from "../../components/client/client-form";

const Home = () => {
  const { data, isLoading } = useGetClient();
  return (
    <div>
      <Container>
        <Typography textAlign={"center"} variant="h4">
          Home
        </Typography>
        <ClientForm />
        <Grid2 direction={"column"} container>
          {isLoading ? (
            <Typography>Loading...</Typography>
          ) : (
            data?.map((client) => (
              <Grid2 key={client.id} size={1}>
                <ClientCard {...client} />
              </Grid2>
            ))
          )}
        </Grid2>
      </Container>
    </div>
  );
};

export default Home;
