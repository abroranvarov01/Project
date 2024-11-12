import request from "../../../../config/request/request";
import { useQuery } from "@tanstack/react-query";

const useGetDebt = (id) => {
  return useQuery({
    queryKey: ["debt"],
    queryFn: () =>
      request
        .get("/debt", {
          params: {
            UserId_like: id,
          },
        })
        .then((res) => res.data),
  });
};

export default useGetDebt;
