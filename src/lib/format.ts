/** RG6 : tarif en FCFA avec séparateur de milliers (ex. 50 000 FCFA). */
export function formatFcfa(montant: number): string {
  const texte = Math.round(montant)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${texte} FCFA`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
