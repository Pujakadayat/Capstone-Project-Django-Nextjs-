"use client";

import {
  createUser,
  deleteUser,
  fetchUsers,
  updateUser,
} from "@/services/userService";
import { User } from "@/types/user";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useState } from "react";

// export const useUsers = () => {
//   const queryClient = useQueryClient();
//   const [pageNum, setpageNum] = useState(1);
//   const { data, isLoading, isError, error } = useQuery<User[]>({
//     queryKey: ["users", pageNum],
//     queryFn: () => fetchUsers(pageNum),
//     placeholderData: keepPreviousData,
//   });

//   const users = Array.isArray(data) ? data : (data ?? []);
//   const createUsers = useMutation({
//     mutationFn: createUser,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["users"] });
//     },
//   });

//   const updateUsers = useMutation({
//     mutationFn: ({ id, data }: { id: string; data: Partial<User> }) =>
//       updateUser(id, data),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["users"] });
//     },
//   });
//   const deleteUsers = useMutation({
//     mutationFn: deleteUser,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["users"] });
//     },
//   });
//   return {
//     data,
//     isLoading,
//     isError,
//     error,
//     createUsers,
//     updateUsers,
//     deleteUsers,
//   };
// };

export const useUsers = () => {
  const queryClient = useQueryClient();
  const [pageNum, setPageNum] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users", pageNum],
    queryFn: () => fetchUsers(pageNum),
    placeholderData: keepPreviousData,
  });

  const users = Array.isArray(data) ? data : (data?.results ?? []);

  const createUsers = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const updateUsers = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<User> }) =>
      updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const deleteUsers = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },

  });

  return {
    users,
    isLoading,
    isError,
    error,
    createUsers,
    updateUsers,
    deleteUsers,
  };
};
