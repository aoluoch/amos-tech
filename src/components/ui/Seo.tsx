import { useEffect } from "react";

export function Seo({ title, description }: { title: string; description: string }) {
  useEffect(() => {
    document.title = `${title} | Amos Tech Solutions`;
    let tag = document.querySelector('meta[name="description"]');
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute("name", "description");
      document.head.appendChild(tag);
    }
    tag.setAttribute("content", description);
  }, [description, title]);

  return null;
}
