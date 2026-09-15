import Script from "next/script";
import { analyticsIds } from "@/lib/analytics";

/* GTM é o único container carregado. GA4, Meta Pixel e Google Ads são
   configurados DENTRO do GTM — é o que evita quatro scripts concorrendo
   pelo main thread e mantém os IDs fora do código.

   Sem NEXT_PUBLIC_GTM_ID definido, nada é injetado. */
export function Analytics() {
  if (!analyticsIds.gtm) return null;

  return (
    <>
      <Script id="gtm" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${analyticsIds.gtm}');`}
      </Script>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${analyticsIds.gtm}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
          title="Google Tag Manager"
        />
      </noscript>
    </>
  );
}
