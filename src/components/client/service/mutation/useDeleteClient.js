import request from "../../../../config/request/request";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const useDeleteClient = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (id) =>
      request.delete(`/clients/${id}`).then((res) => res.data),
    onSuccess: () => client.invalidateQueries(["client"]),
  });
};

export default useDeleteClient;
