import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../lib/api";

const useLogout = () => {
  const queryClient = useQueryClient();

  const {
    mutate: logoutMutation,
    isLoading,
    error,
  } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["authUser"] });
      window.location.href = "/login";
    },
  });

  return { logoutMutation, isPending: isLoading, error };
};

export default useLogout;
