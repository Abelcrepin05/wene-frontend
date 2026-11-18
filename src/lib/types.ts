export const DISCIPLINES = [
  "Musicien",
  "Chanteur",
  "DJ",
  "Humoriste",
  "Danseur",
  "Comédien",
  "Animateur / MC",
  "Photographe",
  "Vidéaste",
  "Maquilleur / coiffeur",
  "Couturier / styliste",
  "Peintre / plasticien",
  "Conteur",
  "Poète / slameur",
  "Magicien",
  "Modèle",
  "Technicien son & lumière",
  "Régisseur / organisateur",
  "Traiteur",
  "Sécurité événementielle",
] as const;

export type Role = "organisateur" | "talent" | "admin";

export type RequestStatus =
  | "en_attente"
  | "confirmee"
  | "refusee"
  | "expiree"
  | "annulee"
  | "terminee";

export const STATUS_LABELS: Record<RequestStatus, string> = {
  en_attente: "En attente",
  confirmee: "Confirmée",
  refusee: "Refusée",
  expiree: "Expirée",
  annulee: "Annulée",
  terminee: "Terminée",
};

export interface PortfolioProjet {
  id: string;
  titre: string;
  categorie: string;
  description: string;
  annee: string;
  lieu: string;
  image_url?: string | null;
}

export interface Talent {
  id: string;
  nom: string;
  discipline: string;
  ville: string;
  presentation: string;
  tarif_depart: number;
  photo_url: string | null;
  portfolio: PortfolioProjet[];
}

export interface DemandeRow {
  id: string;
  date_evenement: string;
  heure_debut: string | null;
  heure_fin: string | null;
  lieu: string;
  type_evenement: string;
  message: string;
  statut: RequestStatus;
  organisateur: { nom: string } | null;
  talent: { nom: string } | null;
}
