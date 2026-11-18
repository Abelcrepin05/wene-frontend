import { STATUS_LABELS, type RequestStatus } from "@/lib/types";

const STYLES: Record<RequestStatus, string> = {
  en_attente: "bg-[#fff4d6] text-[#8a5a00] ring-[#f3d995]",
  confirmee: "bg-[#e3f4ea] text-forest ring-[#b9dfc9]",
  refusee: "bg-[#fdeaea] text-danger ring-[#f3c3c3]",
  expiree: "bg-cream-2 text-muted ring-line",
  annulee: "bg-cream-2 text-muted ring-line",
  terminee: "bg-[#e8f1f6] text-[#27617e] ring-[#c2dbe8]",
};

/** La couleur ne suffit jamais seule : le libellé est toujours affiché. */
export default function StatusBadge({ statut }: { statut: RequestStatus }) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-[0.68rem] font-bold uppercase tracking-wider ring-1 ${STYLES[statut]}`}>
      {STATUS_LABELS[statut]}
    </span>
  );
}
