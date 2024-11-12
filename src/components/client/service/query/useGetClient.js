import request from "../../../../config/request/request";
import { useQuery } from "@tanstack/react-query";

const useGetClient = () => {
  return useQuery({
    queryKey: ["client"],
    queryFn: () => request.get("/clients").then((res) => res.data),
  });
};
export default useGetClient;