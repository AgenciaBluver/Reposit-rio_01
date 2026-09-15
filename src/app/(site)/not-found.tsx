import Link from "next/link";
import { Section, Shell } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Type";
import { nav } from "@/content/nav";

export const metadata = { title: "Página não encontrada" };

export default function NotFound() {
  return (
    <Section
      surface="paper"
      density="lg"
      className="pt-[calc(4.5rem+clamp(3rem,8vw,7rem))] lg:pt-[calc(5.25rem+clamp(4rem,8vw,8rem))]"
    >
      <Shell>
        <div className="flex items-center gap-4">
          <span aria-hidden className="bv-rule-signal w-10 shrink-0" />
          <Eyebrow>Erro 404</Eyebrow>
        </div>

        <h1 className="bv-display mt-[clamp(1.5rem,3vw,2.5rem)] max-w-[16ch] text-display-2">
          Esta página não existe.
        </h1>
        <p className="bv-measure mt-8 text-lead leading-relaxed text-fg-muted">
          O endereço pode ter mudado ou o link pode estar incompleto. Estes são os caminhos
          principais do site:
        </p>

        <ul className="mt-[clamp(2.5rem,5vw,4rem)] grid grid-cols-6 gap-x-gutter lg:grid-cols-12">
          {[...nav.solutions.items, ...nav.segments.items, ...nav.simple].map((item) => (
            <li
              key={item.href}
              className="col-span-6 border-t border-line lg:col-span-5 lg:[&:nth-child(even)]:col-start-8"
            >
              <Link
                href={item.href}
                className="group flex items-center justify-between gap-4 py-4 text-[1.0625rem]"
              >
                <span>{item.label}</span>
                <span
                  aria-hidden
                  className="text-fg-muted transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Shell>
    </Section>
  );
}
