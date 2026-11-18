"use client";

import { useCallback, useEffect, useState } from "react";

const DUREE_INTRO = 4200;
const DUREE_FONDU = 550;

export default function Intro() {
  const [visible, setVisible] = useState(true);
  const [sortie, setSortie] = useState(false);

  const terminer = useCallback(() => {
    document.documentElement.classList.add("intro-seen");
    try {
      sessionStorage.setItem("wene-intro", "1");
    } catch {}
    setSortie(true);
    window.setTimeout(() => setVisible(false), DUREE_FONDU);
  }, []);

  useEffect(() => {
    if (document.documentElement.classList.contains("intro-seen")) {
      setVisible(false);
      return;
    }
    const fondu = window.setTimeout(() => setSortie(true), DUREE_INTRO - DUREE_FONDU);
    const fin = window.setTimeout(terminer, DUREE_INTRO);
    return () => {
      window.clearTimeout(fondu);
      window.clearTimeout(fin);
    };
  }, [terminer]);

  useEffect(() => {
    if (!visible) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className={`intro-overlay${sortie ? " intro-exit" : ""}`}
      role="status"
      aria-label="Chargement de Wênê"
    >
      <div className="intro-glow" aria-hidden />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.png" alt="Wênê" className="intro-logo" />
      <div className="intro-progress" aria-hidden />
      <p className="intro-caption">Le meilleur de l&apos;événementiel</p>
      <button type="button" onClick={terminer} className="intro-skip">
        Passer l&apos;introduction
      </button>
    </div>
  );
}
