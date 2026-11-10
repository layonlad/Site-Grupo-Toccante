import { notFound } from "next/navigation";
import Site from "../site";
import { branches, pageMeta, site } from "../content";
import { metadataFor } from "../metadata";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return metadataFor(slug);
}
export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { slug } = await params;
  if (!pageMeta[slug] || slug === "inicio") notFound();
  const query =
    slug === "contato" || slug === "portfolio"
      ? (await searchParams).vertente
      : undefined;
  const key = Array.isArray(query) ? query[0] : query;
  const initialBranch = branches.find((branch) => branch.key === key)?.key;
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Grupo Toccante",
        item: site.origin,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: pageMeta[slug].title,
        item: site.origin + "/" + slug,
      },
    ],
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <Site
        key={slug + (initialBranch ?? "")}
        page={slug}
        initialBranch={initialBranch}
      />
    </>
  );
}
