import request from "../../../../config/request/request";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteDebt = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (id) => request.delete(`/debt/${id}`).then((res) => res.data),
    onSuccess: () => client.invalidateQueries([`debt`]),
  });
};

export default useDeleteDebt;
