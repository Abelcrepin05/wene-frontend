import { cookies } from "next/headers";
import type { DemandeRow, PortfolioProjet, Role, Talent } from "@/lib/types";

/**
 * Couche de données FRONTEND (démonstration).
 * Aucune base de données : les talents sont fictifs, la « session » et les demandes
 * sont simulées avec des cookies. Pour brancher un vrai backend, remplacer le contenu
 * de ce fichier et de `app/actions.ts` en gardant les mêmes signatures.
 */

const TALENTS_BASE: Omit<Talent, "portfolio">[] = [
  { id: "demo-1", nom: "Kossi Ahouansou", discipline: "Musicien", ville: "Cotonou", presentation: "Batteur gospel et jazz, habitué des mariages et des grandes scènes. Ambiance chaleureuse et rythme au rendez-vous.", tarif_depart: 8000, photo_url: null },
  { id: "demo-2", nom: "DJ Sèdji", discipline: "DJ", ville: "Porto-Novo", presentation: "DJ pour mariages, anniversaires et soirées privées. Un set adapté à chaque génération, du slow aux tubes du moment.", tarif_depart: 40000, photo_url: null },
  { id: "demo-3", nom: "Studio Ayé", discipline: "Photographe", ville: "Cotonou", presentation: "Reportage photo d'événements, portraits et photos de couple. Des images naturelles et lumineuses à conserver longtemps.", tarif_depart: 30000, photo_url: null },
  { id: "demo-4", nom: "Marius Kinto", discipline: "Chanteur", ville: "Abomey-Calavi", presentation: "Leader vocal au répertoire gospel et variété. Une voix puissante pour donner vie à vos plus beaux moments.", tarif_depart: 50000, photo_url: null },
  { id: "demo-5", nom: "Charly Adjo", discipline: "Animateur / MC", ville: "Cotonou", presentation: "Maître de cérémonie bilingue français / fon pour mariages, conférences et réceptions. Énergie, élégance et bonne humeur.", tarif_depart: 25000, photo_url: null },
  { id: "demo-6", nom: "Yann Sossou", discipline: "Vidéaste", ville: "Porto-Novo", presentation: "Captation vidéo, clips et aftermovies d'événements. Des films cinématographiques pour revivre le jour J.", tarif_depart: 60000, photo_url: null },
  { id: "demo-7", nom: "Chef Tassin", discipline: "Traiteur", ville: "Cotonou", presentation: "Cuisine béninoise revisitée et buffets pour 50 à 300 personnes. Des saveurs qui racontent notre culture.", tarif_depart: 150000, photo_url: null },
  { id: "demo-8", nom: "Compagnie Awa", discipline: "Danseur", ville: "Abomey-Calavi", presentation: "Troupe de danse traditionnelle et contemporaine. Des chorégraphies vibrantes pour tous vos événements.", tarif_depart: 35000, photo_url: null },
];

/** Réalisations de démonstration, une galerie par profil. */
const PROJETS: Record<string, PortfolioProjet[]> = {
  "demo-1": [
    { id: "p1-1", titre: "Mariage Sèdoho", categorie: "Mariage", description: "Animation live acoustique pour une cérémonie de 250 invités, du vin d'honneur à la fin de soirée.", annee: "2025", lieu: "Cotonou" },
    { id: "p1-2", titre: "Jazz au coucher du soleil", categorie: "Concert", description: "Set jazz et gospel en trio pour une soirée culturelle en plein air.", annee: "2025", lieu: "Porto-Novo" },
    { id: "p1-3", titre: "Gospel Night", categorie: "Scène", description: "Accompagnement rythmique d'une grande célébration gospel avec chœur et cuivres.", annee: "2024", lieu: "Abomey-Calavi" },
  ],
  "demo-2": [
    { id: "p2-1", titre: "Mariage de A. et K.", categorie: "Mariage", description: "Set complet de la cérémonie à la piste de danse, avec une transition Douala / Cotonou.", annee: "2025", lieu: "Porto-Novo" },
    { id: "p2-2", titre: "Anniversaire 30 ans", categorie: "Fête privée", description: "Une soirée rétro dansante pour 120 invités, entre classiques et tubes actuels.", annee: "2025", lieu: "Cotonou" },
    { id: "p2-3", titre: "Closing festival", categorie: "Festival", description: "Clôture d'un festival culturel devant plus de 2 000 personnes.", annee: "2024", lieu: "Lomé" },
  ],
  "demo-3": [
    { id: "p3-1", titre: "Reportage mariage A.&K.", categorie: "Reportage", description: "Une journée entière racontée en images, des préparatifs à la dernière danse.", annee: "2025", lieu: "Cotonou" },
    { id: "p3-2", titre: "Portraits lumière d'or", categorie: "Portrait", description: "Série de portraits en lumière naturelle pour des artistes et des entrepreneurs.", annee: "2025", lieu: "Cotonou" },
    { id: "p3-3", titre: "Campagne culturelle", categorie: "Campagne", description: "Visuels photographiques pour la promotion d'un festival de musique au Bénin.", annee: "2024", lieu: "Porto-Novo" },
  ],
  "demo-4": [
    { id: "p4-1", titre: "Variété au Palais", categorie: "Concert", description: "Une soirée de reprises gospel et variété pour un gala d'entreprise.", annee: "2025", lieu: "Cotonou" },
    { id: "p4-2", titre: "Célébration gospel", categorie: "Cérémonie", description: "Prestation vocale avec chœur pour un grand rassemblement dominical.", annee: "2025", lieu: "Abomey-Calavi" },
    { id: "p4-3", titre: "Duo acoustique", categorie: "Live", description: "Un duo voix et guitare pour un cocktail élégant en bord de mer.", annee: "2024", lieu: "Cotonou" },
  ],
  "demo-5": [
    { id: "p5-1", titre: "Mariage bilingue", categorie: "Mariage", description: "Animation française / fon d'un mariage traditionnel et civil, sans un temps mort.", annee: "2025", lieu: "Cotonou" },
    { id: "p5-2", titre: "Conférence impact", categorie: "Conférence", description: "Présentation et animation d'une journée pour une ONG internationale.", annee: "2025", lieu: "Abidjan" },
    { id: "p5-3", titre: "Ouverture de festival", categorie: "Événement", description: "Cérémonie d'ouverture rythmée pour un festival de musiques urbaines.", annee: "2024", lieu: "Porto-Novo" },
  ],
  "demo-6": [
    { id: "p6-1", titre: "Aftermovie festival", categorie: "Film", description: "Film de 3 minutes immersif pour la promotion de l'édition suivante.", annee: "2025", lieu: "Lomé" },
    { id: "p6-2", titre: "Clip artiste", categorie: "Clip", description: "Réalisation et montage d'un clip musical en extérieur et en studio.", annee: "2025", lieu: "Cotonou" },
    { id: "p6-3", titre: "Film de mariage", categorie: "Reportage", description: "Captation multi-caméras et montage cinématographique du jour J.", annee: "2024", lieu: "Porto-Novo" },
  ],
  "demo-7": [
    { id: "p7-1", titre: "Buffet royal 300 pers.", categorie: "Banquet", description: "Buffet complet pour un mariage de 300 personnes, cuisine béninoise et internationale.", annee: "2025", lieu: "Cotonou" },
    { id: "p7-2", titre: "Dîner d'entreprise", categorie: "Réception", description: "Menu assis et service à table pour un séminaire de direction.", annee: "2025", lieu: "Abidjan" },
    { id: "p7-3", titre: "Table béninoise", categorie: "Cuisine", description: "Atelier découverte des saveurs du pays pour un événement culturel.", annee: "2024", lieu: "Porto-Novo" },
  ],
  "demo-8": [
    { id: "p8-1", titre: "Chorégraphie traditionnelle", categorie: "Scène", description: "Une création mêlant danses traditionnelles et scénographie contemporaine.", annee: "2025", lieu: "Abomey-Calavi" },
    { id: "p8-2", titre: "Danse contemporaine", categorie: "Spectacle", description: "Pièce collective présentée lors d'une soirée de création culturelle.", annee: "2025", lieu: "Cotonou" },
    { id: "p8-3", titre: "Flash mob de mariage", categorie: "Événement", description: "Surprise chorégraphiée avec les invités pour clore une réception.", annee: "2024", lieu: "Cotonou" },
  ],
};

export const DEMO_TALENTS: Talent[] = TALENTS_BASE.map((talent) => ({
  ...talent,
  portfolio: PROJETS[talent.id] ?? [],
}));

export interface Filtres {
  discipline?: string;
  ville?: string;
  budget?: number;
  date?: string;
  limite?: number;
}

/** Répertoire public : recherche par métier, ville, budget (RG5). */
export async function getTalents(filtres: Filtres = {}): Promise<Talent[]> {
  const { discipline, ville, budget, limite } = filtres;
  return DEMO_TALENTS.filter(
    (t) =>
      (!discipline || t.discipline === discipline) &&
      (!ville || t.ville.toLowerCase().includes(ville.toLowerCase())) &&
      (!budget || t.tarif_depart <= budget),
  )
    .sort((a, b) => a.tarif_depart - b.tarif_depart)
    .slice(0, limite ?? 100);
}

export async function getTalent(id: string): Promise<Talent | null> {
  return DEMO_TALENTS.find((t) => t.id === id) ?? null;
}

/* ---------- Session et demandes simulées (cookies) ---------- */

export interface SessionUser {
  id: string;
  nom: string;
  email: string;
  telephone: string;
  role: Role;
}

export interface Demande extends DemandeRow {
  talent_id: string;
  organisateur_contact: { nom: string; email: string; telephone: string };
}

export const COOKIE_USER = "wene_user";
export const COOKIE_DEMANDES = "wene_demandes";

export async function getUser(): Promise<SessionUser | null> {
  const brut = (await cookies()).get(COOKIE_USER)?.value;
  if (!brut) return null;
  try {
    return JSON.parse(decodeURIComponent(brut)) as SessionUser;
  } catch {
    return null;
  }
}

export async function getDemandes(): Promise<Demande[]> {
  const brut = (await cookies()).get(COOKIE_DEMANDES)?.value;
  if (!brut) return [];
  try {
    return JSON.parse(decodeURIComponent(brut)) as Demande[];
  } catch {
    return [];
  }
}
