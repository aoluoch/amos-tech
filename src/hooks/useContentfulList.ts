import { useEffect, useState } from "react";

export function useContentfulList<T>(loader: () => Promise<T[]>) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    loader().then((nextItems) => {
      if (mounted) {
        setItems(nextItems);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, [loader]);

  return { items, loading };
}
