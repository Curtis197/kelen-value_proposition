import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   DONNÉES — Ibrahima Diallo, Électricien, Dakar
───────────────────────────────────────────── */
const PRO = {
  name: "Ibrahima Diallo",
  slug: "ibrahima-diallo-dakar",
  specialty: "Électricien · Installations haute et basse tension",
  zone: "Dakar · Thiès · Mbour",
  years: 14,
  phone: "+221 77 843 22 10",
  whatsapp: "+221 77 843 22 10",
  email: "ibrahima.diallo@gmail.com",
  status: "gold",
  accroche: "Je câble ce que vous construisez — proprement, dans les règles, du premier coup.",
  presentation:
    "Électricien depuis 2010, j'ai commencé sur les chantiers de Pikine avant de m'établir à Dakar-Plateau. Je travaille exclusivement sur devis signé : pas de modification orale, pas de surprise en fin de chantier. Mes interventions couvrent le résidentiel haut standing, les locaux commerciaux et les installations solaires hybrides. Trois chantiers sur quatre me sont recommandés par d'anciens clients.",
  values: ["Rigueur", "Transparence", "Fiabilité"],
};

const PROJECTS = [
  {
    id: 1,
    title: "Villa Almadies — Installation complète",
    location: "Almadies, Dakar",
    category: "Résidentiel haut standing",
    duration: "6 semaines",
    year: 2023,
    description:
      "Installation électrique complète d'une villa R+2 de 420 m². Tableau général, 14 circuits indépendants, 3 tableaux divisionnaires, domotique partielle sur le salon et la cuisine. Passage de gaines en apparent cuivre sur les parties visibles — choix architectural du maître d'œuvre.",
    photos: [
      { id: "p1a", color: "#1a1008", accent: "#c8602a", label: "Tableau général 63A", sub: "Salon distribution" },
      { id: "p1b", color: "#0d1a0e", accent: "#2d7a3a", label: "Gaines cuivre apparent", sub: "Finition architecturale" },
      { id: "p1c", color: "#0e0e1a", accent: "#3a4ab8", label: "Domotique salon", sub: "Variateurs et scènes" },
      { id: "p1d", color: "#1a0e0e", accent: "#a83232", label: "Prise de terre générale", sub: "Sécurité normative" },
    ],
    cover: { color: "#0e0a04", accent: "#c8602a" },
  },
  {
    id: 2,
    title: "Boutique Médina — Rénovation électrique",
    location: "Médina, Dakar",
    category: "Local commercial",
    duration: "2 semaines",
    year: 2023,
    description:
      "Remise aux normes complète d'un local commercial de 180 m² — remplacement du câblage vétuste, installation d'un tableau neuf, éclairage LED encastré sur rail, 8 prises triphasées pour les équipements de cuisson. Travaux réalisés de nuit pour ne pas interrompre l'activité.",
    photos: [
      { id: "p2a", color: "#14080a", accent: "#e05070", label: "Tableau commercial neuf", sub: "63A triphasé" },
      { id: "p2b", color: "#080d14", accent: "#4080c0", label: "Rail LED en cuisine", sub: "Éclairage fonctionnel" },
      { id: "p2c", color: "#0a1408", accent: "#40a060", label: "Prises triphasées", sub: "Équipements lourds" },
    ],
    cover: { color: "#140810", accent: "#e05070" },
  },
  {
    id: 3,
    title: "Résidence Thiès — Solaire hybride",
    location: "Thiès",
    category: "Installation solaire",
    duration: "3 semaines",
    year: 2024,
    description:
      "Installation d'un système solaire hybride 5 kWc couplé au réseau SENELEC sur une maison de 240 m². 16 panneaux, onduleur hybride, batterie 10 kWh, supervision via application mobile. Le client réduit sa facture SENELEC de 70%.",
    photos: [
      { id: "p3a", color: "#0a0e14", accent: "#f0a020", label: "16 panneaux 320Wc", sub: "Toit incliné 15°" },
      { id: "p3b", color: "#14100a", accent: "#d08010", label: "Onduleur hybride", sub: "5 kW — réseau + batterie" },
      { id: "p3c", color: "#080e0a", accent: "#30a050", label: "Batterie lithium 10kWh", sub: "Autonomie 8h" },
      { id: "p3d", color: "#0e0a14", accent: "#8050d0", label: "Monitoring mobile", sub: "Supervision temps réel" },
    ],
    cover: { color: "#0a0c14", accent: "#f0a020" },
  },
];

/* ─────────────────────────────────────────────
   HOOKS
───────────────────────────────────────────── */
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

function useScroll() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const h = () => setY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return y;
}

/* ─────────────────────────────────────────────
   PHOTO PLACEHOLDER — rendu de faux visuels
   avec gradient + icône + label
───────────────────────────────────────────── */
function PhotoPlaceholder({ color, accent, label, sub, width = "100%", height = "100%", onClick, style = {} }) {
  return (
    <div
      onClick={onClick}
      style={{
        width,
        height,
        background: `radial-gradient(ellipse at 30% 40%, ${accent}22 0%, ${color} 70%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: onClick ? "pointer" : "default",
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      {/* Texture grain */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E")`,
        opacity: 0.6,
      }} />
      {/* Icône électricité */}
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" style={{ marginBottom: 10, opacity: 0.7 }}>
        <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z" fill={accent} opacity="0.9" />
      </svg>
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: accent, letterSpacing: "0.1em", textAlign: "center", padding: "0 12px", opacity: 0.9 }}>{label}</div>
      {sub && <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "#ffffff55", marginTop: 4, letterSpacing: "0.08em", textAlign: "center" }}>{sub}</div>}
      {/* Lignes décoratives */}
      <div style={{ position: "absolute", top: 16, left: 16, width: 24, height: 1, background: `${accent}44` }} />
      <div style={{ position: "absolute", top: 16, left: 16, width: 1, height: 24, background: `${accent}44` }} />
      <div style={{ position: "absolute", bottom: 16, right: 16, width: 24, height: 1, background: `${accent}44` }} />
      <div style={{ position: "absolute", bottom: 16, right: 16, width: 1, height: 24, background: `${accent}44` }} />
    </div>
  );
}

/* ─────────────────────────────────────────────
   LIGHTBOX
───────────────────────────────────────────── */
function Lightbox({ photo, onClose }) {
  useEffect(() => {
    const h = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.94)",
        display: "flex", alignItems: "center", justifyContent: "center",
        animation: "fadeIn 0.25s ease",
      }}
    >
      <div onClick={(e) => e.stopPropagation()} style={{ width: "min(680px, 90vw)", aspectRatio: "4/3", position: "relative" }}>
        <PhotoPlaceholder {...photo} width="100%" height="100%" style={{ borderRadius: 2 }} />
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: -40, right: 0,
            background: "none", border: "none", color: "#ffffff66",
            fontFamily: "'DM Mono', monospace", fontSize: 11,
            letterSpacing: "0.12em", cursor: "pointer",
            textTransform: "uppercase",
          }}
        >
          ESC — Fermer
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   STATUS BADGE
───────────────────────────────────────────── */
function StatusBadge({ status }) {
  const cfg = {
    gold: { label: "Liste Or", color: "#c9963a", bg: "rgba(184,136,42,0.15)", border: "rgba(184,136,42,0.4)" },
    grey: { label: "Non classé", color: "#9a938a", bg: "rgba(255,255,255,0.06)", border: "rgba(255,255,255,0.15)" },
    red: { label: "Liste Rouge", color: "#d97070", bg: "rgba(139,32,32,0.2)", border: "rgba(139,32,32,0.4)" },
  }[status];
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 7,
      padding: "6px 14px",
      background: cfg.bg, border: `1px solid ${cfg.border}`,
    }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: cfg.color, display: "block" }} />
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: cfg.color, letterSpacing: "0.12em", textTransform: "uppercase" }}>
        {cfg.label} — Kelen
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SECTION HERO
───────────────────────────────────────────── */
function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 60); }, []);

  return (
    <section id="hero" style={{
      minHeight: "100vh",
      background: "#080705",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Lueur cuivre */}
      <div style={{
        position: "absolute", top: "-10%", right: "10%",
        width: "50vw", height: "50vw",
        background: "radial-gradient(ellipse, rgba(200,96,42,0.11) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      {/* Colonne gauche — texte */}
      <div style={{
        padding: "clamp(40px,6vw,80px)",
        display: "flex", flexDirection: "column",
        justifyContent: "space-between",
        borderRight: "1px solid rgba(255,255,255,0.05)",
        opacity: mounted ? 1 : 0,
        transform: mounted ? "none" : "translateY(24px)",
        transition: "opacity 0.9s ease 0.1s, transform 0.9s ease 0.1s",
      }}>
        <div>
          {/* Kelen tag */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "clamp(48px,8vh,96px)" }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#3a3530", letterSpacing: "0.18em", textTransform: "uppercase" }}>
              kelen.com / pro / {PRO.slug}
            </div>
            <StatusBadge status={PRO.status} />
          </div>

          {/* Nom */}
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(52px, 6.5vw, 92px)",
            fontWeight: 300,
            lineHeight: 0.9,
            letterSpacing: "-0.03em",
            color: "#f0ece4",
            marginBottom: 24,
          }}>
            {PRO.name.split(" ").map((w, i) => (
              <span key={i} style={{ display: "block", color: i === 0 ? "#f0ece4" : "#c8602a" }}>{w}</span>
            ))}
          </h1>

          {/* Spécialité */}
          <div style={{
            fontFamily: "'DM Mono', monospace", fontSize: 11,
            color: "#5a5450", letterSpacing: "0.12em",
            textTransform: "uppercase", marginBottom: 40,
          }}>
            {PRO.specialty}
          </div>

          {/* Accroche */}
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(20px, 2.2vw, 28px)",
            fontStyle: "italic", fontWeight: 300,
            color: "#9a9088", lineHeight: 1.4,
            maxWidth: 420, marginBottom: 48,
          }}>
            "{PRO.accroche}"
          </p>

          {/* Stats horizontales */}
          <div style={{ display: "flex", gap: 40 }}>
            {[
              { num: `${PRO.years} ans`, label: "d'expérience" },
              { num: "3", label: "projets présentés" },
              { num: "Or", label: "statut Kelen" },
            ].map(({ num, label }) => (
              <div key={label}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 300, color: "#c8602a", lineHeight: 1 }}>{num}</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "#3a3530", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Zone */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 24, marginTop: 48 }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#3a3530", letterSpacing: "0.1em", marginBottom: 4 }}>ZONE D'INTERVENTION</div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#9a9088" }}>{PRO.zone}</div>
        </div>
      </div>

      {/* Colonne droite — visual cover */}
      <div style={{
        position: "relative",
        opacity: mounted ? 1 : 0,
        transition: "opacity 1.2s ease 0.3s",
      }}>
        <PhotoPlaceholder
          color={PROJECTS[0].cover.color}
          accent={PROJECTS[0].cover.accent}
          label="Villa Almadies — Tableau général"
          sub="Réalisation principale"
          width="100%"
          height="100%"
        />
        {/* Overlay bas */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: "40%",
          background: "linear-gradient(to top, rgba(8,7,5,0.9) 0%, transparent 100%)",
          display: "flex", alignItems: "flex-end",
          padding: "clamp(20px,3vw,40px)",
        }}>
          <div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "#5a5450", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 4 }}>Réalisation phare · 2023</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: "#f0ece4", fontWeight: 300 }}>Villa Almadies — Installation complète</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SECTION PORTFOLIO
───────────────────────────────────────────── */
function Portfolio() {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(null);

  const proj = PROJECTS[active];
  const [headerRef, headerVis] = useReveal();

  return (
    <section id="portfolio" style={{ background: "#0a0907" }}>
      {/* Header portfolio */}
      <div
        ref={headerRef}
        style={{
          padding: "clamp(48px,7vw,96px) clamp(24px,5vw,72px) 48px",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
          opacity: headerVis ? 1 : 0,
          transform: headerVis ? "none" : "translateY(20px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "#c8602a", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 16, display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ width: 24, height: 1, background: "#c8602a", display: "block" }} />
              Portfolio
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px,4vw,58px)", fontWeight: 300, color: "#f0ece4", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
              3 réalisations<br /><em style={{ fontStyle: "italic", color: "#c8602a" }}>documentées</em>
            </h2>
          </div>
          {/* Sélecteur de projet */}
          <div style={{ display: "flex", gap: 2 }}>
            {PROJECTS.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setActive(i)}
                style={{
                  padding: "10px 20px",
                  background: active === i ? "#c8602a" : "transparent",
                  border: `1px solid ${active === i ? "#c8602a" : "rgba(255,255,255,0.08)"}`,
                  color: active === i ? "#f0ece4" : "#5a5450",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 10, letterSpacing: "0.1em",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                }}
              >
                0{p.id}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projet actif */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 480 }}>
        {/* Infos projet */}
        <div style={{
          padding: "clamp(32px,5vw,64px)",
          borderRight: "1px solid rgba(255,255,255,0.04)",
          display: "flex", flexDirection: "column", justifyContent: "space-between",
        }}>
          <div>
            <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "#5a5450", padding: "4px 10px", border: "1px solid rgba(255,255,255,0.06)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{proj.category}</span>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "#5a5450", padding: "4px 10px", border: "1px solid rgba(255,255,255,0.06)", letterSpacing: "0.08em" }}>{proj.location}</span>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "#5a5450", padding: "4px 10px", border: "1px solid rgba(255,255,255,0.06)", letterSpacing: "0.08em" }}>{proj.year}</span>
            </div>
            <h3 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(24px,2.8vw,38px)",
              fontWeight: 300, color: "#f0ece4",
              lineHeight: 1.15, marginBottom: 24,
              letterSpacing: "-0.015em",
            }}>
              {proj.title}
            </h3>
            <p style={{ fontSize: 14, fontWeight: 300, color: "#7a7068", lineHeight: 1.8, maxWidth: 420, marginBottom: 32 }}>
              {proj.description}
            </p>
          </div>
          {/* Durée */}
          <div style={{ paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.04)" }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "#3a3530", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 4 }}>Durée de chantier</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: "#c8602a", fontWeight: 300 }}>{proj.duration}</div>
          </div>
        </div>

        {/* Grille photos */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: proj.photos.length === 3 ? "1fr 1fr" : "1fr 1fr",
          gap: 2,
          background: "#050403",
        }}>
          {proj.photos.map((ph, i) => (
            <PhotoPlaceholder
              key={ph.id}
              {...ph}
              width="100%"
              height="100%"
              onClick={() => setLightbox(ph)}
              style={{
                minHeight: 120,
                gridColumn: proj.photos.length === 3 && i === 0 ? "1 / span 2" : "auto",
                cursor: "pointer",
                transition: "filter 0.3s",
              }}
            />
          ))}
        </div>
      </div>

      {lightbox && <Lightbox photo={lightbox} onClose={() => setLightbox(null)} />}
    </section>
  );
}

/* ─────────────────────────────────────────────
   SECTION À PROPOS
───────────────────────────────────────────── */
function About() {
  const [ref, vis] = useReveal(0.1);
  return (
    <section id="about" style={{ background: "#080705", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
      <div
        ref={ref}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.4fr",
          gap: 0,
          opacity: vis ? 1 : 0,
          transform: vis ? "none" : "translateY(28px)",
          transition: "opacity 0.85s ease, transform 0.85s ease",
        }}
      >
        {/* Colonne gauche — label + valeurs */}
        <div style={{
          padding: "clamp(48px,7vw,96px) clamp(24px,5vw,72px)",
          borderRight: "1px solid rgba(255,255,255,0.04)",
        }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "#c8602a", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 16, display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ width: 24, height: 1, background: "#c8602a", display: "block" }} />
            À Propos
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px,3.5vw,52px)", fontWeight: 300, color: "#f0ece4", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 48 }}>
            Ce qui<br />me <em style={{ fontStyle: "italic", color: "#c8602a" }}>définit</em>
          </h2>

          {/* Valeurs */}
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {PRO.values.map((v, i) => (
              <div key={v} style={{
                padding: "16px 20px",
                background: "rgba(200,96,42,0.06)",
                borderLeft: "2px solid #c8602a",
                display: "flex", alignItems: "center", gap: 16,
              }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, color: "#c8602a44" }}>0{i + 1}</span>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#9a9088", letterSpacing: "0.1em", textTransform: "uppercase" }}>{v}</span>
              </div>
            ))}
          </div>

          {/* Expérience */}
          <div style={{ marginTop: 40, paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.04)" }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "#3a3530", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>Depuis</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 48, fontWeight: 300, color: "#3a3530", lineHeight: 1 }}>2010</div>
          </div>
        </div>

        {/* Colonne droite — texte présentation */}
        <div style={{ padding: "clamp(48px,7vw,96px) clamp(24px,5vw,72px)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(20px, 2.2vw, 28px)",
            fontWeight: 300,
            color: "#9a9088",
            lineHeight: 1.65,
            marginBottom: 40,
          }}>
            {PRO.presentation}
          </p>

          {/* Ligne décorative + citation */}
          <div style={{ paddingLeft: 24, borderLeft: "2px solid rgba(200,96,42,0.3)" }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontStyle: "italic", color: "#5a5450", lineHeight: 1.6 }}>
              "Trois clients sur quatre me contactent sur recommandation — jamais par hasard."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SECTION CONTACT
───────────────────────────────────────────── */
function Contact() {
  const [ref, vis] = useReveal(0.1);
  const [copied, setCopied] = useState(null);

  const copy = (text, key) => {
    navigator.clipboard?.writeText(text).catch(() => {});
    setCopied(key);
    setTimeout(() => setCopied(null), 1800);
  };

  return (
    <section id="contact" style={{
      background: "#050403",
      borderTop: "1px solid rgba(255,255,255,0.04)",
    }}>
      <div
        ref={ref}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          opacity: vis ? 1 : 0,
          transform: vis ? "none" : "translateY(24px)",
          transition: "opacity 0.85s ease, transform 0.85s ease",
        }}
      >
        {/* Gauche — avatar + infos */}
        <div style={{
          padding: "clamp(48px,7vw,96px) clamp(24px,5vw,72px)",
          borderRight: "1px solid rgba(255,255,255,0.04)",
          display: "flex", flexDirection: "column", justifyContent: "space-between",
        }}>
          {/* Avatar stylisé */}
          <div>
            <div style={{
              width: 80, height: 80,
              background: "radial-gradient(ellipse at 40% 35%, rgba(200,96,42,0.3) 0%, rgba(8,7,5,1) 70%)",
              border: "1px solid rgba(200,96,42,0.25)",
              display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: 24,
              position: "relative",
            }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 300, color: "#c8602a" }}>
                {PRO.name.split(" ").map(w => w[0]).join("")}
              </span>
            </div>

            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "#c8602a", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 8, display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ width: 24, height: 1, background: "#c8602a", display: "block" }} />
              Contact
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px,3vw,44px)", fontWeight: 300, color: "#f0ece4", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 12 }}>
              {PRO.name}
            </h2>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#5a5450", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>
              {PRO.specialty}
            </div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#3a3530", letterSpacing: "0.08em" }}>
              {PRO.zone}
            </div>
          </div>

          <div>
            <div style={{ marginBottom: 20 }}>
              <StatusBadge status={PRO.status} />
            </div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#2a2520", lineHeight: 1.8 }}>
              Profil vérifié par Kelen<br />
              5 recommandations contractuelles validées
            </div>
          </div>
        </div>

        {/* Droite — boutons de contact */}
        <div style={{ padding: "clamp(48px,7vw,96px) clamp(24px,5vw,72px)", display: "flex", flexDirection: "column", justifyContent: "center", gap: 12 }}>
          {/* Téléphone */}
          <button
            onClick={() => copy(PRO.phone, "phone")}
            style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "20px 24px",
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.06)",
              color: "#f0ece4",
              cursor: "pointer",
              transition: "all 0.25s ease",
              textAlign: "left",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#c8602a"; e.currentTarget.style.background = "rgba(200,96,42,0.06)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.background = "transparent"; }}
          >
            <div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "#5a5450", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 4 }}>Téléphone</div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 14, color: "#c8602a" }}>{PRO.phone}</div>
            </div>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: copied === "phone" ? "#40a060" : "#3a3530", letterSpacing: "0.1em" }}>
              {copied === "phone" ? "COPIÉ ✓" : "COPIER"}
            </span>
          </button>

          {/* WhatsApp */}
          <a
            href={`https://wa.me/${PRO.whatsapp.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "20px 24px",
              background: "rgba(37,211,102,0.06)",
              border: "1px solid rgba(37,211,102,0.18)",
              color: "#f0ece4",
              textDecoration: "none",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(37,211,102,0.12)"; e.currentTarget.style.borderColor = "rgba(37,211,102,0.35)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(37,211,102,0.06)"; e.currentTarget.style.borderColor = "rgba(37,211,102,0.18)"; }}
          >
            <div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "#25d366aa", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 4 }}>WhatsApp</div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 14, color: "#25d366" }}>{PRO.whatsapp}</div>
            </div>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "#25d366aa", letterSpacing: "0.1em" }}>→ OUVRIR</span>
          </a>

          {/* Email */}
          <button
            onClick={() => copy(PRO.email, "email")}
            style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "20px 24px",
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.06)",
              color: "#f0ece4",
              cursor: "pointer",
              transition: "all 0.25s ease",
              textAlign: "left",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#c8602a"; e.currentTarget.style.background = "rgba(200,96,42,0.06)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.background = "transparent"; }}
          >
            <div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "#5a5450", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 4 }}>Email</div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: "#9a9088" }}>{PRO.email}</div>
            </div>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: copied === "email" ? "#40a060" : "#3a3530", letterSpacing: "0.1em" }}>
              {copied === "email" ? "COPIÉ ✓" : "COPIER"}
            </span>
          </button>

          {/* Note bas */}
          <div style={{ marginTop: 16, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.04)" }}>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#2a2520", lineHeight: 1.7 }}>
              Travail exclusivement sur devis signé.<br />
              Pas de modification orale — pas de surprise en fin de chantier.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   NAV STICKY
───────────────────────────────────────────── */
function Nav({ onBack }) {
  const scrollY = useScroll();
  const visible = scrollY > 80;

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 500,
      background: "rgba(8,7,5,0.92)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid rgba(255,255,255,0.04)",
      padding: "0 clamp(24px,5vw,72px)",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      height: 52,
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(-100%)",
      transition: "opacity 0.35s ease, transform 0.35s ease",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        {onBack && (
          <button
            onClick={onBack}
            style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "'DM Mono', monospace", fontSize: 10,
              color: "#3a3530", letterSpacing: "0.12em", textTransform: "uppercase",
              transition: "color 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.color = "#c8602a"}
            onMouseLeave={e => e.currentTarget.style.color = "#3a3530"}
          >
            ← Offre
          </button>
        )}
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#5a5450", letterSpacing: "0.15em", textTransform: "uppercase" }}>
          {PRO.name} <span style={{ color: "#2a2520" }}>· Kelen</span>
        </div>
      </div>
      <div style={{ display: "flex", gap: 32 }}>
        {[["portfolio", "Portfolio"], ["about", "À Propos"], ["contact", "Contact"]].map(([id, label]) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "'DM Mono', monospace", fontSize: 10,
              color: "#3a3530", letterSpacing: "0.12em", textTransform: "uppercase",
              transition: "color 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.color = "#c8602a"}
            onMouseLeave={e => e.currentTarget.style.color = "#3a3530"}
          >
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
}

/* ─────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{
      background: "#030302",
      borderTop: "1px solid rgba(255,255,255,0.03)",
      padding: "32px clamp(24px,5vw,72px)",
      display: "flex", justifyContent: "space-between", alignItems: "center",
    }}>
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "#1a1815", letterSpacing: "0.14em", textTransform: "uppercase" }}>
        kelen.com / pro / {PRO.slug}
      </div>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, fontWeight: 300, color: "#1a1815", letterSpacing: "0.1em" }}>
        KELEN — <em style={{ fontStyle: "italic" }}>La vérité, documentée.</em>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   APP ROOT
───────────────────────────────────────────── */
export default function KelendProProfile({ onBack }) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Mono:wght@300;400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #080705; }
        button { font-family: inherit; }
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }

        @media (max-width: 700px) {
          section > div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
      <div style={{ background: "#080705", minHeight: "100vh" }}>
        <Nav onBack={onBack} />
        <Hero />
        <Portfolio />
        <About />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
