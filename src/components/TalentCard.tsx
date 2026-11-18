import Link from "next/link";
import { ArrowUpRight, BadgeCheck, Images, MapPin } from "lucide-react";
import TalentVisual from "@/components/TalentVisual";
import { formatFcfa } from "@/lib/format";
import type { Talent } from "@/lib/types";

export default function TalentCard({ talent }: { talent: Talent }) {
  return (
    <article className="card card-hover group flex h-full flex-col overflow-hidden">
      <Link href={`/talents/${talent.id}`} className="block flex-1" aria-label={`Voir la fiche de ${talent.nom}`}>
        <div className="relative">
          <TalentVisual
            discipline={talent.discipline}
            nom={talent.nom}
            photoUrl={talent.photo_url}
            className="aspect-[5/4] w-full transition-transform duration-700 group-hover:scale-[1.04]"
          />
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[0.65rem] font-bold text-forest shadow-sm backdrop-blur">
            <BadgeCheck size={13} /> Vérifié
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-forest-2">{talent.discipline}</p>
          <h3 className="mt-1.5 text-xl transition-colors group-hover:text-forest-2">{talent.nom}</h3>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-muted">
            <MapPin size={13} /> {talent.ville}, Bénin
          </p>
          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">{talent.presentation}</p>

          <div className="filet mt-auto flex items-end justify-between gap-3 pt-4">
            <div>
              <p className="text-[0.68rem] text-muted">À partir de</p>
              <p className="text-sm font-bold text-ink">{formatFcfa(talent.tarif_depart)}</p>
            </div>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cream text-forest transition group-hover:bg-forest group-hover:text-white">
              <ArrowUpRight size={17} />
            </span>
          </div>
        </div>
      </Link>

      <div className="filet flex items-center justify-between gap-2 px-5 py-3">
        <Link href={`/talents/${talent.id}`} className="text-xs font-bold text-muted transition hover:text-forest">
          Voir la fiche
        </Link>
        {talent.portfolio.length > 0 && (
          <Link
            href={`/talents/${talent.id}/portfolio`}
            className="inline-flex items-center gap-1.5 rounded-full bg-forest/5 px-3 py-1.5 text-xs font-bold text-forest transition hover:bg-forest hover:text-white"
          >
            <Images size={14} /> Portfolio ({talent.portfolio.length})
          </Link>
        )}
      </div>
    </article>
  );
}
