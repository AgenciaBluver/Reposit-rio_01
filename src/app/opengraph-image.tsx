import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name}, ${site.signature}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Imagem social gerada no build, com a identidade da marca.
   Usa fontes do sistema em vez da Figtree: o runtime de OG exige o
   binário da fonte carregado e isso pesa no build para um ganho pequeno
   numa peça de 1200×630. A composição — preto, régua de gradiente e
   hierarquia — mantém a marca reconhecível. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#070707",
          color: "#F2F2F2",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 3,
              background: "linear-gradient(90deg, #00FFE2 0%, #00B4CE 50%, #007AEE 100%)",
            }}
          />
          <div style={{ fontSize: 22, letterSpacing: 6, textTransform: "uppercase" }}>
            {site.name}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 86,
            lineHeight: 1.02,
            letterSpacing: -3,
            maxWidth: 900,
          }}
        >
          Autoridade que movimenta negócios.
        </div>

        <div style={{ display: "flex", fontSize: 24, color: "#9A9A9E" }}>
          {site.base} · {site.reach}
        </div>
      </div>
    ),
    size,
  );
}
