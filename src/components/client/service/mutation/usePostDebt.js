import request from "../../../../config/request/request";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const usePostDebt = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const existingDebts = await request
        .get(`/debt`, { params: { UserId_like: data.UserId_like } })
        .then((res) => res.data);

      const debtExists = existingDebts.some((debt) => debt.id === data.id);

      if (debtExists) {
        throw new Error("Debt with the same ID already exists");
      }

      return request.post("/debt", data).then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["debt"]);
    },
  });
};

export default usePostDebt;
