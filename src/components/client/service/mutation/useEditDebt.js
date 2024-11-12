import request from "../../../../config/request/request";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

const useEditDebt = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }) =>
      request.put(`/debt/${id}`, data).then((res) => res.data),
    onSuccess: () => client.invalidateQueries(["debt"]),
  });
};
export default useEditDebt;
