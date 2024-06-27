import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../services";

export const useGetUserInfo = (userId) => {
  return useQuery({
    queryKey: ["users",userId],
    queryFn: () => getUserInfo(userId),
    refetchOnWindowFocus: false,
  });
};
