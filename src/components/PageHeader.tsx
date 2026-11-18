import type { ReactNode } from "react";

export default function PageHeader({
  eyebrow,
  titre,
  description,
  children,
  centre = false,
}: {
  eyebrow: string;
  titre: string;
  description?: string;
  children?: ReactNode;
  centre?: boolean;
}) {
  return (
    <section className={`relative overflow-hidden pb-4 pt-12 md:pt-16 ${centre ? "text-center" : ""}`}>
      <div className="pointer-events-none absolute -right-32 -top-40 h-96 w-96 rounded-full bg-gold/15 blur-3xl" aria-hidden />
      <div className="site-container relative">
        <p className={`eyebrow ${centre ? "eyebrow-centered justify-center" : ""}`}>{eyebrow}</p>
        <h1 className="mt-5 text-[clamp(2.2rem,4.5vw,3.6rem)]">{titre}</h1>
        {description && <p className={`section-lead mt-4 ${centre ? "mx-auto" : ""}`}>{description}</p>}
        {children}
      </div>
    </section>
  );
}
