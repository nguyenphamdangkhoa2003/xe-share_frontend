"use client";

import { getUserSessionQueryFn } from "@/api/auths/auth";
import { useQuery } from "@tanstack/react-query";

const useAuth = () => {
  const query = useQuery({
    queryKey: ["authUser"],
    queryFn: getUserSessionQueryFn,
    staleTime: Infinity,
  });
  return query;
};

export default useAuth;