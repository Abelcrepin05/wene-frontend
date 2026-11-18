# Wênê – reprise du site

Plateforme de réservation d'artistes et de prestataires pour événements au Bénin.
Stack : Next.js (App Router) + TypeScript + Tailwind CSS, déployée sur Vercel.
Référence : cahier des charges « Plateforme Wênê » (sections 3, 4, 6 et 8).

## Démarrer

```bash
npm install
npm run dev                  # http://localhost:3000
```

Ce projet est **frontend uniquement** : il n'y a plus de backend. Les 8 profils talents sont fictifs
(`src/lib/data.ts`), et la connexion, les demandes et le profil artiste sont simulés avec des cookies.

- Connexion de démo : n'importe quel e-mail/mot de passe. Un e-mail contenant « talent » ouvre un compte artiste (reçoit les demandes du profil « Kossi Ahouansou »), sinon un compte organisateur.
- Brancher un vrai backend plus tard : remplacer le contenu de `src/lib/data.ts` et `src/app/actions.ts` en gardant les mêmes fonctions.

## Structure

| Dossier | Contenu |
| --- | --- |
| `src/app` | Pages : accueil, talents, fiche talent, selon mon budget, connexion, inscription, espace, pages légales |
| `src/app/actions.ts` | Actions serveur simulées (cookies) : inscription, connexion, demande de date, réponse du talent, profil talent |
| `src/components` | En-tête, pied de page, intro animée, reveal, carte talent, visuels, portfolio/lightbox, badge de statut, formulaire de recherche |
| `src/lib` | Types, formats FCFA, données de démonstration |

## Règles de gestion appliquées

- **RG1** : coordonnées visibles seulement si la demande est « confirmée » (fonction SQL `contacts_demande`).
- **RG3** : un talent ne confirme pas deux demandes le même jour (index unique partiel).
- **RG4** : seuls les profils vérifiés et publiés apparaissent dans le répertoire (vue `talents_publics`).
- **RG5** : la recherche par budget ne retient que les tarifs de départ inférieurs ou égaux à l'enveloppe.
- **RG6** : tarifs affichés en FCFA avec séparateur de milliers.

## Refonte visuelle

- Charte or / noir / vert forêt, typographies Fraunces + Plus Jakarta Sans chargées via `next/font`.
- Écran d'introduction animé avec le logo (4,2 s, une fois par session, bouton « Passer »).
- Page d'accueil et toutes les pages reconstruites en composants responsive (`src/components`).
- Illustrations de talents générées localement (dégradés + icônes) ; un `photo_url` reste pris en charge.
- Portfolio par profil : 3 réalisations de démonstration dans `src/lib/data.ts`, page dédiée `/talents/[id]/portfolio`, galerie avec lightbox et accès depuis les cartes et les fiches.
- Responsivité vérifiée de 280 à 2560 px sur toutes les pages, y compris menu mobile, lightbox et espace connecté : aucun débordement horizontal ni texte coupé.

## Reste à faire (frontend)

- Photos locales réelles et galerie médias.
- Back-office administrateur et agenda de disponibilités.
- Textes légaux validés par un juriste.
