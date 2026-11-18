"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import PortfolioVisual from "@/components/PortfolioVisual";
import type { PortfolioProjet } from "@/lib/types";

export default function PortfolioGallery({
  projets,
  discipline,
}: {
  projets: PortfolioProjet[];
  discipline: string;
}) {
  const [actif, setActif] = useState<number | null>(null);
  const boutonFermer = useRef<HTMLButtonElement>(null);

  const fermer = useCallback(() => setActif(null), []);
  const precedent = useCallback(
    () => setActif((i) => (i === null ? null : (i - 1 + projets.length) % projets.length)),
    [projets.length],
  );
  const suivant = useCallback(
    () => setActif((i) => (i === null ? null : (i + 1) % projets.length)),
    [projets.length],
  );

  useEffect(() => {
    if (actif === null) return;
    const surTouche = (evenement: KeyboardEvent) => {
      if (evenement.key === "Escape") fermer();
      if (evenement.key === "ArrowLeft") precedent();
      if (evenement.key === "ArrowRight") suivant();
    };
    window.addEventListener("keydown", surTouche);
    document.body.style.overflow = "hidden";
    boutonFermer.current?.focus();
    return () => {
      window.removeEventListener("keydown", surTouche);
      document.body.style.overflow = "";
    };
  }, [actif, fermer, precedent, suivant]);

  if (projets.length === 0) {
    return <p className="text-sm text-muted">Ce talent n&apos;a pas encore publié de réalisation.</p>;
  }

  const projetActif = actif === null ? null : projets[actif];

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projets.map((projet, index) => (
          <button
            key={projet.id}
            type="button"
            onClick={() => setActif(index)}
            className="card card-hover group overflow-hidden text-left"
            aria-label={`Agrandir le projet ${projet.titre}`}
          >
            <PortfolioVisual projet={projet} discipline={discipline} index={index} className="aspect-[4/3] w-full transition-transform duration-700 group-hover:scale-[1.04]" />
            <div className="p-5">
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-forest-2">{projet.categorie}</p>
              <h3 className="mt-1.5 text-xl transition-colors group-hover:text-forest-2">{projet.titre}</h3>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{projet.description}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-forest-2">
                <Maximize2 size={14} /> Voir en grand
              </span>
            </div>
          </button>
        ))}
      </div>

      {projetActif && actif !== null && (
        <div
          className="fixed inset-0 z-[150] flex items-center justify-center overflow-y-auto bg-ink/90 p-3 backdrop-blur-md sm:p-6"
          onClick={fermer}
        >
          <div
            className="relative my-auto max-h-[calc(100dvh-1.5rem)] w-full max-w-5xl overflow-y-auto rounded-[1.75rem] bg-white shadow-2xl sm:max-h-[calc(100dvh-3rem)]"
            role="dialog"
            aria-modal="true"
            aria-label={`Réalisation : ${projetActif.titre}`}
            onClick={(evenement) => evenement.stopPropagation()}
          >
            <button
              ref={boutonFermer}
              type="button"
              onClick={fermer}
              className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-ink shadow-md transition hover:bg-gold"
              aria-label="Fermer la galerie"
            >
              <X size={19} />
            </button>

            <div className="grid md:grid-cols-[1.2fr_0.8fr]">
              <PortfolioVisual projet={projetActif} discipline={discipline} index={actif} className="h-56 w-full sm:h-80 md:h-[30rem]" />
              <div className="flex flex-col p-6 md:p-8">
                <span className="pill w-fit">{projetActif.categorie}</span>
                <h3 className="mt-4 font-display text-3xl">{projetActif.titre}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted">{projetActif.description}</p>
                <dl className="filet mt-6 grid grid-cols-2 gap-4 pt-5 text-sm">
                  <div><dt className="text-xs text-muted">Année</dt><dd className="mt-0.5 font-bold">{projetActif.annee}</dd></div>
                  <div><dt className="text-xs text-muted">Lieu</dt><dd className="mt-0.5 font-bold">{projetActif.lieu}</dd></div>
                </dl>
                <div className="mt-auto flex items-center justify-between gap-3 pt-8">
                  <span className="text-xs font-semibold text-muted">{actif + 1} / {projets.length}</span>
                  <div className="flex gap-2">
                    <button type="button" onClick={precedent} className="flex h-10 w-10 items-center justify-center rounded-full border border-line transition hover:border-forest hover:text-forest" aria-label="Projet précédent">
                      <ChevronLeft size={18} />
                    </button>
                    <button type="button" onClick={suivant} className="flex h-10 w-10 items-center justify-center rounded-full bg-forest text-white transition hover:bg-forest-2" aria-label="Projet suivant">
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
