import request from "../../../../config/request/request";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
const usePostClient = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (data) =>
      request.post("/clients", data).then((res) => res.data),
    onSuccess: () => client.invalidateQueries(["client"]),
  });
};

export default usePostClient;
