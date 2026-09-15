import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

/* Layout do site institucional: navegação completa e rodapé.
   As landing pages de campanha (/lp/*) ficam fora deste grupo justamente
   para não herdarem essa navegação — menos saída, mais intenção. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="conteudo">{children}</main>
      <Footer />
    </>
  );
}
