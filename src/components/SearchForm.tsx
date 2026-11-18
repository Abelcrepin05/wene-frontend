import { ArrowRight, CalendarDays, MapPin, Search, Wallet } from "lucide-react";
import { DISCIPLINES } from "@/lib/types";

export default function SearchForm({
  action = "/talents",
  avecBudget = false,
  valeurs = {},
}: {
  action?: string;
  avecBudget?: boolean;
  valeurs?: { discipline?: string; ville?: string; budget?: string; date?: string };
}) {
  return (
    <form
      action={action}
      method="get"
      className={`glass rounded-[1.75rem] p-4 shadow-lift sm:p-5 ${
        avecBudget ? "grid gap-3 sm:grid-cols-2 xl:grid-cols-5" : "grid gap-3 sm:grid-cols-2 xl:grid-cols-3"
      }`}
    >
      <label className="label-champ">
        <span className="flex items-center gap-1.5"><Search size={14} className="text-forest-2" /> Métier recherché</span>
        <select name="discipline" defaultValue={valeurs.discipline ?? ""} className="champ">
          <option value="">Tous les métiers</option>
          {DISCIPLINES.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </label>

      <label className="label-champ">
        <span className="flex items-center gap-1.5"><MapPin size={14} className="text-forest-2" /> Ville</span>
        <input name="ville" defaultValue={valeurs.ville ?? ""} placeholder="Cotonou, Porto-Novo..." className="champ" />
      </label>

      {avecBudget && (
        <>
          <label className="label-champ">
            <span className="flex items-center gap-1.5"><Wallet size={14} className="text-forest-2" /> Budget max. (FCFA)</span>
            <input name="budget" type="number" min={0} step={1000} required defaultValue={valeurs.budget ?? ""} placeholder="100 000" className="champ" />
          </label>
          <label className="label-champ">
            <span className="flex items-center gap-1.5"><CalendarDays size={14} className="text-forest-2" /> Date de l&apos;événement</span>
            <input name="date" type="date" defaultValue={valeurs.date ?? ""} className="champ" />
          </label>
        </>
      )}

      <button className="btn btn-primary col-span-full w-full xl:col-span-1 xl:mt-[1.65rem]">
        Voir les profils <ArrowRight size={16} />
      </button>
    </form>
  );
}
