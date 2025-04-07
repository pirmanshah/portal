import { useMutation, useQuery } from "@tanstack/react-query";
import type { ComboboxData } from "@mantine/core";
import {
  fetchTransactionCode,
  getInventory,
  getLocations,
  getProduction,
  register,
} from "../service/issued.create.service";
import type {
  Inventory,
  IssuedCreate,
  ProductionOrder,
} from "../types/issued.create.types";
import { useIssuedCodeStore } from "../store/issued-code-store";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useIssuedStore } from "../store/issued-store";

export function useGenerteCode() {
  const { setTransactionCode } = useIssuedCodeStore();

  return useMutation({
    mutationFn: async () => {
      return await fetchTransactionCode();
    },
    onSuccess: (code) => {
      setTransactionCode(code);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export function useLocationQuery() {
  return useQuery<ComboboxData>({
    queryKey: ["issued-locations"],
    queryFn: async () => getLocations(),
  });
}

export function useInventoryQuery() {
  return useQuery<Inventory[]>({
    queryKey: ["issued-inventory"],
    queryFn: async () => getInventory(),
  });
}

export function useProductionQuery() {
  return useQuery<ProductionOrder[]>({
    queryKey: ["issued-production"],
    queryFn: async () => getProduction(),
  });
}

export function useIssuedRegister() {
  const navigate = useNavigate();
  const { reset } = useIssuedStore();
  const { setTransactionCode } = useIssuedCodeStore();

  return useMutation({
    mutationFn: async ({
      cpwi,
      code,
      move_to,
      payload,
    }: {
      cpwi: string;
      move_to: string;
      code: string;
      payload: IssuedCreate[];
    }) => {
      return await register({ code, payload, cpwi, move_to });
    },
    onSuccess: (response: any) => {
      reset();
      setTransactionCode("");
      toast.success(response.message);
      navigate(`/warehouse/issued/${response.data}/detail`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
