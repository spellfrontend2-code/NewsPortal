import { useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export interface AdminPaginationOptions {
  defaultPageSize?: number;
  pageParam?: string;
  perPageParam?: string;
}

export function useAdminPagination({
  defaultPageSize = 10,
  pageParam = "page",
  perPageParam = "per_page",
}: AdminPaginationOptions = {}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = useMemo(() => {
    const p = parseInt(searchParams.get(pageParam) || "1", 10);
    return isNaN(p) || p < 1 ? 1 : p;
  }, [searchParams, pageParam]);

  const pageSize = useMemo(() => {
    const ps = parseInt(
      searchParams.get(perPageParam) || String(defaultPageSize),
      10
    );
    return isNaN(ps) || ps < 1 ? defaultPageSize : ps;
  }, [searchParams, perPageParam, defaultPageSize]);

  const pagination = useMemo(
    () => ({
      pageIndex: Math.max(0, page - 1),
      pageSize,
    }),
    [page, pageSize]
  );

  const setPagination = useCallback(
    (updaterOrValue: any) => {
      const current = {
        pageIndex: Math.max(0, page - 1),
        pageSize,
      };

      const next =
        typeof updaterOrValue === "function"
          ? updaterOrValue(current)
          : updaterOrValue;

      const newPage = Math.max(1, (next?.pageIndex ?? 0) + 1);
      const newPageSize = next?.pageSize ?? pageSize;

      setSearchParams(
        (prev) => {
          const params = new URLSearchParams(prev);
          params.set(pageParam, String(newPage));
          if (newPageSize !== defaultPageSize) {
            params.set(perPageParam, String(newPageSize));
          } else {
            params.delete(perPageParam);
          }
          return params;
        },
        { replace: true }
      );
    },
    [page, pageSize, pageParam, perPageParam, defaultPageSize, setSearchParams]
  );

  const resetPage = useCallback(() => {
    setSearchParams(
      (prev) => {
        const params = new URLSearchParams(prev);
        params.set(pageParam, "1");
        return params;
      },
      { replace: true }
    );
  }, [pageParam, setSearchParams]);

  return {
    page,
    pageSize,
    pagination,
    setPagination,
    resetPage,
  };
}
