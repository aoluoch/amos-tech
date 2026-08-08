import { useEffect, useState } from "react";

export function useContentfulList<T>(loader: () => Promise<T[]>, fallback: T[]) {
  const [items, setItems] = useState<T[]>(fallback);

  useEffect(() => {
    let mounted = true;
    loader().then((nextItems) => {
      if (mounted) setItems(nextItems);
    });
    return () => {
      mounted = false;
    };
  }, [loader]);

  return items;
}
