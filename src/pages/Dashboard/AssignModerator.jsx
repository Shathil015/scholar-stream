import { useQuery } from "@tanstack/react-query";
import React from "react";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";

const AssignModerator = () => {
  const axiosSecure = UseAxiosSecure();
  const { data: approvedApplications } = useQuery({
    queryKey: ["assignModerator", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/applications?approvedStatus=pending");
      return res.data;
    },
  });
  return <div>Moderator approved : {approvedApplications?.length}</div>;
};

export default AssignModerator;
