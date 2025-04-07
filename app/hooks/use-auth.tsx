import { toast } from "sonner";
import { useNavigate } from "react-router";
import { unauthenticate } from "#app/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { PATH } from "#app/constants/path";

export function useSignOut() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      return await unauthenticate();
    },
    onSuccess: () => {
      navigate(PATH.SIGN_IN);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
