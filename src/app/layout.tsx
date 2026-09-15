import type { Metadata, Viewport } from "next";
import { Analytics } from "@/components/layout/Analytics";
import { site } from "@/content/site";
import { organizationSchema } from "@/lib/seo";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.signature}`,
    // Toda página interna herda este sufixo; nenhuma repete o nome da marca.
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  formatDetection: { telephone: false, address: false, email: false },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.name,
    url: site.url,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#070707",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        {/* A fonte da marca é crítica para o primeiro paint do hero. */}
        <link
          rel="preload"
          href="/fonts/AtiplaND-Medium.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* Marca que o JS está ativo ANTES do primeiro paint. Sem isso, o
            estado inicial das revelações causaria flash de conteúdo. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('bv-js')`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
        />
      </head>
      <body>
        <a href="#conteudo" className="bv-skip">
          Pular para o conteúdo
        </a>
        {/* Header, main e footer são definidos por cada grupo de rota:
            (site) tem navegação completa; /lp tem chrome reduzido. */}
        {children}
        <Analytics />
      </body>
    </html>
  );
}
