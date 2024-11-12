import request from "../../../../config/request/request";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useEditClient = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }) =>
      request.put(`/clients/${id}`, data).then((res) => res.data),
    onSuccess: () => client.invalidateQueries(["client"]),
  });
};

export default useEditClient;
