"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { nav } from "@/content/nav";
import { primaryCta } from "@/content/site";
import { track } from "@/lib/analytics";

/* Navegação: simples, rápida e sem mega menu.
   Desktop — painel de dois grupos que abre no hover/foco e fecha no Esc.
   Mobile  — overlay de tela inteira com alvos de toque generosos. */

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState<null | "solutions" | "segments">(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Fecha tudo ao navegar.
  useEffect(() => {
    setOpen(null);
    setMobileOpen(false);
  }, [pathname]);

  // Trava o scroll do body enquanto o menu mobile estiver aberto.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      ref={headerRef}
      data-surface="paper"
      onMouseLeave={() => setOpen(null)}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${
        scrolled || open || mobileOpen
          ? "border-b border-line bg-bg"
          : "border-b border-transparent bg-bg/0"
      }`}
    >
      <div className="bv-shell flex h-[4.5rem] items-center justify-between gap-6 lg:h-[5.25rem]">
        <Link
          href="/"
          aria-label="Bluver — página inicial"
          className="relative z-10 -ml-0.5 py-2"
        >
          <Logo />
        </Link>

        {/* ── Desktop ─────────────────────────────────────────────── */}
        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {(["solutions", "segments"] as const).map((key) => (
              <li key={key}>
                <button
                  type="button"
                  aria-expanded={open === key}
                  aria-haspopup="true"
                  onMouseEnter={() => setOpen(key)}
                  onFocus={() => setOpen(key)}
                  onClick={() => setOpen(open === key ? null : key)}
                  className="bv-link py-2 text-[0.9375rem] tracking-[-0.01em]"
                >
                  {nav[key].label}
                </button>
              </li>
            ))}
            {nav.simple.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onMouseEnter={() => setOpen(null)}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={`bv-link py-2 text-[0.9375rem] tracking-[-0.01em] ${
                    pathname === item.href ? "text-fg" : "text-fg/70"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <Link
            href={primaryCta.href}
            onClick={() => track("cta_click", { location: "nav", label: primaryCta.label, destination: primaryCta.href })}
            className="inline-flex items-center bg-fg px-5 py-3 text-[0.875rem] font-medium tracking-[-0.01em] text-bg transition-opacity hover:opacity-85"
          >
            {primaryCta.label}
          </Link>
        </div>

        {/* ── Mobile ──────────────────────────────────────────────── */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-controls="menu-mobile"
          className="relative z-10 -mr-2 flex h-11 w-11 items-center justify-center lg:hidden"
        >
          <span className="sr-only">{mobileOpen ? "Fechar menu" : "Abrir menu"}</span>
          <span aria-hidden className="relative block h-3 w-6">
            <span
              className={`absolute left-0 block h-px w-6 bg-fg transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                mobileOpen ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-6 bg-fg transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                mobileOpen ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </div>

      {/* Painel desktop */}
      <div
        className={`absolute inset-x-0 top-full hidden overflow-hidden border-b border-line bg-bg transition-[max-height,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] lg:block ${
          open ? "max-h-[28rem] opacity-100" : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        {open && (
          <div className="bv-shell py-10">
            <ul className="grid grid-cols-12 gap-x-gutter gap-y-8">
              {nav[open].items.map((item, i) => (
                <li key={item.href} className="col-span-3">
                  <Link href={item.href} className="group block">
                    <span className="bv-eyebrow text-fg-muted">
                      {item.index || String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="bv-display mt-3 block text-[1.375rem] leading-tight transition-colors group-hover:text-accent">
                      {item.label}
                    </span>
                    <span className="mt-2.5 block max-w-[30ch] text-[0.875rem] leading-relaxed text-fg-muted">
                      {item.hint}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Overlay mobile */}
      <div
        id="menu-mobile"
        hidden={!mobileOpen}
        className="fixed inset-0 top-[4.5rem] z-40 overflow-y-auto overscroll-contain bg-bg lg:hidden"
      >
        <nav aria-label="Principal (mobile)" className="bv-shell flex min-h-full flex-col pb-10 pt-6">
          <MobileGroup label={nav.solutions.label} items={nav.solutions.items} />
          <MobileGroup label={nav.segments.label} items={nav.segments.items} />
          <ul className="mt-8 border-t border-line pt-6">
            {nav.simple.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="bv-display block py-3 text-[1.5rem] leading-tight"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-10">
            <Link
              href={primaryCta.href}
              onClick={() => track("cta_click", { location: "nav_mobile", label: primaryCta.label })}
              className="flex w-full items-center justify-center bg-fg px-6 py-4 text-[1rem] font-medium text-bg"
            >
              {primaryCta.label}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

function MobileGroup({
  label,
  items,
}: {
  label: string;
  items: readonly { label: string; href: string; hint: string; index: string }[];
}) {
  return (
    <div className="border-t border-line pt-6 first:border-t-0 first:pt-0 [&+&]:mt-8">
      <p className="bv-eyebrow text-fg-muted">{label}</p>
      <ul className="mt-4">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="block py-3">
              <span className="bv-display block text-[1.5rem] leading-tight">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
