"use client";

import { useEffect } from "react";
import { track, type BluverEvent } from "@/lib/analytics";

/* Dispara um evento de visualização uma única vez por página.
   Componente sem render — existe só para manter o dataLayer consistente
   sem transformar as páginas em client components. */
export function PageView({
  event,
  itemId,
  itemName,
}: {
  event: BluverEvent;
  itemId: string;
  itemName: string;
}) {
  useEffect(() => {
    track(event, { item_id: itemId, item_name: itemName });
  }, [event, itemId, itemName]);

  return null;
}
