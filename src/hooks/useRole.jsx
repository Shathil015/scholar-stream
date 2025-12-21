import { useQuery } from "@tanstack/react-query";
import React from "react";
import UseAxiosSecure from "./UseAxiosSecure";
import UseAuth from "./UseAuth";

const useRole = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();

  const { isLoading: roleLoading, data: role = "user" } = useQuery({
    queryKey: ["role", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}/role`);
      return res.data.role;
    },
  });
  return { roleLoading, role };
};

export default useRole;
