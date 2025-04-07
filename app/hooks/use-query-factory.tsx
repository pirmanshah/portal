import {
  useQuery,
  type QueryKey,
  type QueryFunction,
  type UseQueryOptions,
} from "@tanstack/react-query";

export const useQueryFactory =
  <
    TQueryFnData = unknown,
    TError = unknown,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey
  >(
    queryKey: TQueryKey,
    queryFn: QueryFunction<TQueryFnData, TQueryKey>
  ) =>
  <SelectType = TData,>(
    options?: Partial<
      Omit<
        UseQueryOptions<TQueryFnData, TError, SelectType, TQueryKey>,
        "queryKey" | "queryFn"
      >
    >
  ) => {
    return useQuery({
      queryKey,
      queryFn,
      ...options,
    });
  };
