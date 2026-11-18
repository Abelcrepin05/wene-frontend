import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Intro from "@/components/Intro";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wênê — Trouvez le talent parfait pour votre événement",
  description:
    "Artistes, musiciens, photographes et prestataires vérifiés au Bénin et en Afrique de l'Ouest. Tarifs transparents en FCFA et réservation directe avec le talent.",
  openGraph: {
    title: "Wênê — Trouvez le talent parfait pour votre événement",
    description: "Profils vérifiés, tarifs transparents et réservation directe.",
    siteName: "Wênê",
    locale: "fr_FR",
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#050a07" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${jakarta.variable} ${fraunces.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(sessionStorage.getItem('wene-intro')==='1')document.documentElement.classList.add('intro-seen')}catch(e){}",
          }}
        />
      </head>
      <body>
        <Intro />
        <Header />
        <main id="contenu">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
