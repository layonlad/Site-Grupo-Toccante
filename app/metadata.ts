import type { Metadata } from "next";
import { branches, pageMeta, site } from "./content";
import { photographs } from "./photographs";
export function metadataFor(page: string): Metadata {
  const data = pageMeta[page];
  if (!data)
    return {
      title: "Página não encontrada",
      robots: { index: false, follow: false },
    };
  const url = page === "inicio" ? site.origin : `${site.origin}/${page}`;
  const branch = branches.find((item) => item.key === page);
  const name = branch?.image ?? "decoracao-mesa-bolo";
  const photo = photographs[name]!.files.at(-1)!;
  const image = {
    url: site.origin + photo.src,
    width: photo.width,
    height: photo.height,
    alt:
      branch?.alt ??
      "Mesa de bolo e flores em uma celebração do Grupo Toccante.",
  };
  return {
    title: page === "inicio" ? { absolute: data.title } : data.title,
    description: data.description,
    alternates: { canonical: url },
    openGraph: {
      title: data.title,
      description: data.description,
      url,
      type: "website",
      locale: "pt_BR",
      siteName: site.name,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description,
      images: [image.url],
    },
  };
}
