import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { productSlugs } from "@/content/products";
import { segmentSlugs } from "@/content/segments";
import { cases } from "@/content/cases";

/* Sitemap derivado do conteúdo. Adicionar produto, segmento ou case faz a
   URL aparecer aqui sozinha — não existe lista manual para esquecer de
   atualizar. LPs de campanha ficam de fora por serem noindex. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entry = (
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly",
  ) => ({ url: `${site.url}${path}`, lastModified: now, changeFrequency, priority });

  return [
    entry("", 1, "weekly"),
    entry("/solucoes", 0.9),
    ...productSlugs.map((slug) => entry(`/solucoes/${slug}`, 0.9)),
    entry("/segmentos", 0.8),
    ...segmentSlugs.map((slug) => entry(`/segmentos/${slug}`, 0.8)),
    entry("/metodo", 0.7),
    entry("/sobre", 0.7),
    entry("/projetos", 0.7),
    // Cases ainda em produção são noindex — não entram no sitemap.
    ...cases
      .filter((c) => c.status === "published")
      .map((c) => entry(`/projetos/${c.slug}`, 0.6)),
    entry("/contato", 0.8),
    // Ferramenta aberta: entra no sitemap porque é conteúdo de busca.
    entry("/calculadora", 0.6),
  ];
}
