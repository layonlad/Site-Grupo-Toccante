import type { ComponentProps } from "react";

/**
 * Link comum. O site é publicado em páginas estáticas, sem servidor para a
 * navegação do lado do cliente; `prefetch` é aceito só por compatibilidade.
 */
export default function Link({
  prefetch,
  children,
  ...props
}: ComponentProps<"a"> & { prefetch?: boolean }) {
  void prefetch;
  return <a {...props}>{children}</a>;
}
