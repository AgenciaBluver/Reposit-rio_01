"use client";

import { site } from "@/content/site";
import { track } from "@/lib/analytics";

/* Canais diretos. Só renderiza o que realmente existe: nenhum link
   apontando para número ou perfil inexistente. */
export function ContactChannels({ location = "contato" }: { location?: string }) {
  const whatsapp = site.whatsapp ? `https://wa.me/${site.whatsapp.replace(/\D/g, "")}` : null;

  return (
    <ul className="flex flex-wrap gap-x-8 gap-y-3">
      <li>
        <a
          href={`mailto:${site.email}`}
          onClick={() => track("contact_click", { location, destination: "email" })}
          className="bv-link text-[0.9375rem] font-medium"
        >
          {site.email}
        </a>
      </li>
      {whatsapp && (
        <li>
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("whatsapp_click", { location })}
            className="bv-link text-[0.9375rem] font-medium"
          >
            WhatsApp
          </a>
        </li>
      )}
      {site.social.instagram && (
        <li>
          <a
            href={site.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("contact_click", { location, destination: "instagram" })}
            className="bv-link text-[0.9375rem] font-medium"
          >
            Instagram
          </a>
        </li>
      )}
    </ul>
  );
}
