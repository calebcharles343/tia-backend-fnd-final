import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { UpdateUserType, UserProfileToken } from "../../interfaces";
import { updateUser as updateUserApi } from "../../services/apiAuth"; // Import the API function

interface ErrorResponse {
  message: string; // Assuming the error response has a 'message' field
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const {
    mutate: updateUser,
    isPending: isUpdatingUser,
    isError,
    error,
  } = useMutation<
    UserProfileToken, // Type of the successful mutation response
    AxiosError<ErrorResponse>, // Type of the error response
    { userId: number | undefined; data: UpdateUserType } // Type of the mutation parameters
  >({
    mutationFn: async ({ userId, data }) => {
      console.log(userId, data);

      const response = await updateUserApi(userId, data); // Use the imported API function
      return response; // Return the API response
    },
    onSuccess: (updatedUser) => {
      // Update the React Query cache for the user
      queryClient.setQueryData(["user"], updatedUser);

      // Optionally invalidate queries that depend on user data
      queryClient.invalidateQueries(["user"] as any);
    },
    onError: (err) => {
      console.error(
        "Update User Error:",
        err.response?.data?.message || err.message
      );
    },
  });

  return { updateUser, isUpdatingUser, isError, error };
}
