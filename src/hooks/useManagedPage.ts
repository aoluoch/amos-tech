import { useEffect, useState } from "react";
import { getManagedPage, subscribeToManagedPages } from "../lib/appwrite";
import { emptyManagedPage } from "../lib/managedPage";
import type { ManagedPage, ManagedPageKey } from "../types/content";

export function useManagedPage(key: ManagedPageKey | string) {
  const [page, setPage] = useState<ManagedPage>(() => emptyManagedPage(key));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    getManagedPage(key).then((nextPage) => {
      if (mounted) {
        setPage(nextPage);
        setLoading(false);
      }
    });

    const unsubscribe = subscribeToManagedPages((nextPage) => {
      if (nextPage.key === key) setPage(nextPage);
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, [key]);

  return { page, loading };
}
