"use client";

/* Imagem de comp para o modo de visualização.
   Client component porque precisa de onError: se o comp em 1000px não
   existir para aquele item da Adobe Stock, cai para o de 240px em vez de
   mostrar imagem quebrada. Fica isolado aqui para que o `Media` continue
   sendo server component — nenhuma página paga JavaScript por isso em
   produção, onde o modo de visualização está desligado. */
export function PreviewImage({
  src,
  alt,
  priority,
  cinematic,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  cinematic?: boolean;
}) {
  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      onError={(e) => {
        const img = e.currentTarget;
        if (img.dataset.fallback) return;
        img.dataset.fallback = "1";
        img.src = img.src.replace("/1000_F_", "/240_F_");
      }}
      className={`h-full w-full object-cover ${
        cinematic ? "contrast-[1.06] saturate-[0.92] brightness-[0.98]" : ""
      }`}
    />
  );
}
