import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { Shell } from "@/components/primitives/Section";

/* Chrome reduzido, como nas LPs: a ferramenta é uma superfície de trabalho,
   não uma página de navegação. Só o caminho de volta ao site permanece. */
export default function CalculadoraLayout({ children }: { children: React.ReactNode }) {
  return (
    <div data-surface="ink" className="min-h-screen">
      <header className="border-b border-fg/12">
        <Shell>
          <div className="flex items-center justify-between gap-4 py-5">
            <Link href="/" aria-label="Bluver — página inicial">
              <Logo />
            </Link>
            <Link href="/" className="bv-link text-[0.8125rem] text-fg-muted hover:text-fg">
              Voltar ao site
            </Link>
          </div>
        </Shell>
      </header>
      <main id="conteudo">{children}</main>
      <footer className="border-t border-fg/12">
        <Shell>
          <p className="py-6 text-[0.75rem] leading-relaxed text-fg-muted">
            Ferramenta de apoio à decisão. Comissões, custo fixo e tabelas de frete são
            definidos pelo Mercado Livre e mudam por categoria e período — confira sempre na
            sua conta antes de publicar um preço.
          </p>
        </Shell>
      </footer>
    </div>
  );
}
