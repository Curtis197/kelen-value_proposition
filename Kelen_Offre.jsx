import { useState, useEffect, useRef } from "react";

// ─── HOOK: Intersection Observer pour les révélations au scroll ───
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ─── COMPOSANTS UI ───

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function Eyebrow({ children, light = false }) {
  return (
    <div style={{
      fontFamily: "'DM Mono', monospace",
      fontSize: 10,
      letterSpacing: "0.22em",
      textTransform: "uppercase",
      color: light ? "#c9963a" : "#b8882a",
      marginBottom: 40,
      display: "flex",
      alignItems: "center",
      gap: 16,
    }}>
      <span style={{ width: 32, height: 1, background: light ? "#c9963a" : "#b8882a", display: "block", flexShrink: 0 }} />
      {children}
    </div>
  );
}

function SectionTitle({ children, light = false, style = {} }) {
  return (
    <h2 style={{
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: "clamp(38px, 4.5vw, 62px)",
      fontWeight: 300,
      lineHeight: 1.08,
      letterSpacing: "-0.02em",
      color: light ? "#faf7f2" : "#0e0d0b",
      marginBottom: 20,
      ...style,
    }}>
      {children}
    </h2>
  );
}

function Lead({ children, light = false }) {
  return (
    <p style={{
      fontSize: 16,
      fontWeight: 300,
      color: light ? "#9a938a" : "#7a7469",
      lineHeight: 1.8,
      maxWidth: 560,
      marginBottom: 56,
    }}>
      {children}
    </p>
  );
}

// ─── SECTIONS ───

function Hero({ onNavigateToPro }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 80); }, []);

  const stats = [
    { num: "20k€", label: "investissement moyen" },
    { num: "0", label: "recours légal à distance" },
    { num: "1", label: "signal = carrière terminée" },
  ];

  return (
    <section style={{
      minHeight: "100vh",
      background: "#0e0d0b",
      display: "grid",
      gridTemplateRows: "1fr auto",
      padding: "56px clamp(32px, 6vw, 96px)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Lueurs dorées */}
      <div style={{ position: "absolute", top: "-15%", right: "-8%", width: "55vw", height: "55vw", background: "radial-gradient(ellipse, rgba(184,136,42,0.13) 0%, transparent 68%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-12%", left: "-6%", width: "38vw", height: "38vw", background: "radial-gradient(ellipse, rgba(184,136,42,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div>
        {/* Nav */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 80 }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 400, color: "#c9963a", letterSpacing: "0.16em" }}>KELEN</span>
          <button
            onClick={onNavigateToPro}
            style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "'DM Mono', monospace", fontSize: 10,
              color: "#4a4540", letterSpacing: "0.1em", textTransform: "uppercase",
              transition: "color 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.color = "#c9963a"}
            onMouseLeave={e => e.currentTarget.style.color = "#4a4540"}
          >
            Exemple de profil →
          </button>
        </div>

        {/* Titre principal */}
        <div style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(32px)",
          transition: "opacity 0.9s ease 0.1s, transform 0.9s ease 0.1s",
          maxWidth: 820,
        }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#b8882a", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 28, display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ width: 36, height: 1, background: "#b8882a", display: "block" }} />
            Plateforme de découverte et de vérification
          </div>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(54px, 7.5vw, 104px)",
            fontWeight: 300,
            lineHeight: 0.93,
            color: "#faf7f2",
            letterSpacing: "-0.025em",
            marginBottom: 36,
          }}>
            Le travail bien fait<br />
            <em style={{ fontStyle: "italic", color: "#c9963a" }}>mérite d'être</em><br />
            bien présenté.
          </h1>
          <p style={{ fontSize: 17, fontWeight: 300, color: "#9a938a", maxWidth: 520, lineHeight: 1.72 }}>
            Kelen connecte la diaspora africaine en Europe avec des artisans et professionnels de confiance en Afrique francophone. Chaque professionnel reçoit un mini-site commercial. Gratuit. Indexé. Professionnel.
          </p>
        </div>
      </div>

      {/* Footer hero */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        paddingTop: 48,
        borderTop: "1px solid rgba(184,136,42,0.18)",
        opacity: mounted ? 1 : 0,
        transition: "opacity 1s ease 0.6s",
      }}>
        <div style={{ display: "flex", gap: "clamp(32px, 5vw, 80px)" }}>
          {stats.map(({ num, label }) => (
            <div key={label}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 300, color: "#c9963a", lineHeight: 1 }}>{num}</div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "#4a4540", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 6 }}>{label}</div>
            </div>
          ))}
        </div>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "#3a3530", letterSpacing: "0.18em", textTransform: "uppercase", writingMode: "vertical-rl", display: "flex", alignItems: "center", gap: 10 }}>
          Défiler
          <span style={{ width: 1, height: 36, background: "linear-gradient(to bottom, #3a3530, transparent)", display: "block" }} />
        </div>
      </div>
    </section>
  );
}

function ProfileSection() {
  const blocks = [
    { num: "01", title: "Hero", desc: "Photo de réalisation pleine largeur. Le travail parle avant la personne.", items: ["Nom · Accroche IA — 1 phrase directe", "Boutons de contact en surimpression"] },
    { num: "02", title: "Portfolio", desc: "Galerie immersive par projets. Swipe mobile, navigation clavier.", items: ["Grille 3 colonnes sur desktop", "Photo de couverture par projet"] },
    { num: "03", title: "À Propos", desc: "Texte généré par IA depuis le questionnaire. Voix humaine — jamais une liste de compétences.", items: ["3 à 5 phrases, ton personnel", "Badges de valeurs discrets"] },
    { num: "04", title: "Contact", desc: "C'est ici qu'apparaît la photo de profil. On sait à qui on parle avant d'appuyer.", items: ["Spécialité · Zone · Statut Kelen", "Téléphone · WhatsApp · Email"] },
  ];

  return (
    <section style={{ padding: "100px clamp(32px, 6vw, 96px)", background: "#faf7f2" }}>
      <Reveal><Eyebrow>Le Profil</Eyebrow></Reveal>
      <Reveal delay={0.05}><SectionTitle>Une landing page,<br /><em style={{ fontStyle: "italic", color: "#b8882a" }}>pas un CV.</em></SectionTitle></Reveal>
      <Reveal delay={0.1}><Lead>Structure standard d'un site commercial professionnel. L'objectif est la conversion — amener le visiteur à contacter. Le travail parle avant la personne.</Lead></Reveal>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 2, background: "#e0d8cc" }}>
        {blocks.map(({ num, title, desc, items }, i) => (
          <Reveal key={num} delay={i * 0.08}>
            <div style={{
              background: "#faf7f2",
              padding: "40px 36px",
              position: "relative",
              minHeight: 260,
              transition: "background 0.3s",
              cursor: "default",
            }}
              onMouseEnter={e => e.currentTarget.style.background = "#f5ead5"}
              onMouseLeave={e => e.currentTarget.style.background = "#faf7f2"}
            >
              <span style={{ position: "absolute", top: 18, right: 24, fontFamily: "'Cormorant Garamond', serif", fontSize: 72, fontWeight: 300, color: "#e8dfd0", lineHeight: 1 }}>{num}</span>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#b8882a", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 14 }}>{title}</div>
              <p style={{ fontSize: 14, color: "#7a7469", lineHeight: 1.65, marginBottom: 18 }}>{desc}</p>
              {items.map(item => (
                <div key={item} style={{ fontSize: 13, color: "#0e0d0b", display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 6 }}>
                  <span style={{ color: "#b8882a", fontSize: 18, lineHeight: 1.1, flexShrink: 0 }}>·</span>
                  {item}
                </div>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function AISection() {
  const qblocks = [
    { num: "01", title: "Valeurs", desc: "Honnêteté · Rigueur · Excellence · Transparence · Engagement — max 3" },
    { num: "02", title: "Qualités", desc: "Ponctualité · Finition · Écoute · Réactivité · Respect du budget — max 3" },
    { num: "03", title: "Relation client", desc: "Style de travail préféré · Fréquence de communication souhaitée" },
    { num: "04", title: "Fierté", desc: "Le projet qui vous représente le mieux — texte libre optionnel" },
    { num: "05", title: "Limites", desc: "Ce que vous refusez — sans contrat, sans budget, délais irréalistes" },
  ];

  return (
    <section style={{ padding: "100px clamp(32px, 6vw, 96px)", background: "#0e0d0b", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "20%", right: "-10%", width: "40vw", height: "40vw", background: "radial-gradient(ellipse, rgba(184,136,42,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
      <Reveal><Eyebrow light>Copywriting IA</Eyebrow></Reveal>
      <Reveal delay={0.05}><SectionTitle light><em style={{ fontStyle: "italic", color: "#c9963a" }}>Un questionnaire.</em><br />Deux textes générés.</SectionTitle></Reveal>
      <Reveal delay={0.1}><Lead light>Le professionnel répond une fois. L'IA génère son accroche hero et sa présentation complète. Il valide avant de publier — jamais automatique.</Lead></Reveal>

      {/* Grille questionnaire */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 1, background: "rgba(255,255,255,0.05)", marginBottom: 48 }}>
        {qblocks.map(({ num, title, desc }, i) => (
          <Reveal key={num} delay={i * 0.07}>
            <div style={{ background: "rgba(255,255,255,0.02)", padding: "28px 24px", borderLeft: "1px solid rgba(184,136,42,0.1)", transition: "background 0.3s, border-color 0.3s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(184,136,42,0.07)"; e.currentTarget.style.borderColor = "rgba(184,136,42,0.28)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.02)"; e.currentTarget.style.borderColor = "rgba(184,136,42,0.1)"; }}
            >
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 34, fontWeight: 300, color: "#c9963a", lineHeight: 1, marginBottom: 10 }}>{num}</div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "#c9963a", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 10 }}>{title}</div>
              <div style={{ fontSize: 13, color: "#9a938a", lineHeight: 1.6 }}>{desc}</div>
            </div>
          </Reveal>
        ))}
        <Reveal delay={0.35}>
          <div style={{ background: "rgba(184,136,42,0.07)", padding: "28px 24px", borderLeft: "2px solid rgba(184,136,42,0.3)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "#c9963a", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 10 }}>Résultat</div>
            <div style={{ fontSize: 13, color: "#c9963a", lineHeight: 1.6 }}>Deux textes distincts — accroche pour le hero, présentation pour À propos.</div>
          </div>
        </Reveal>
      </div>

      {/* Outputs IA */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {[
          { label: "bio_accroche — Hero section — 1 phrase", ex: "« Je construis ce que vous imaginez, dans les délais que vous fixez. »" },
          { label: "bio_presentation — Section À Propos — 3 à 5 phrases", ex: "« Maçon à Abidjan depuis 2009, je travaille uniquement sur plan validé et budget signé. Ma méthode : point hebdomadaire, remise de clés avec justificatifs. Trois clients sur quatre reviennent. »" },
        ].map(({ label, ex }, i) => (
          <Reveal key={label} delay={i * 0.1}>
            <div style={{ border: "1px solid rgba(184,136,42,0.2)", padding: "28px 32px" }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "#b8882a", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>{label}</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontStyle: "italic", color: "#c4bdb3", lineHeight: 1.55 }}>{ex}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function PricingSection() {
  const freeFeatures = [
    { ok: true, text: "Mini-site web complet" },
    { ok: true, text: "Génération IA du copywriting" },
    { ok: true, text: "Statistiques de base" },
    { ok: true, text: "3 projets maximum" },
    { ok: true, text: "15 photos au total" },
    { ok: false, text: "Vidéos" },
    { ok: false, text: "Branding automatique logo" },
    { ok: false, text: "Indexation Google" },
    { ok: false, text: "Sitemap XML · Google Analytics" },
    { ok: false, text: "Analytics in-app avancées" },
  ];
  const paidFeatures = [
    { ok: true, text: "Mini-site web complet" },
    { ok: true, text: "Génération IA du copywriting" },
    { ok: true, text: "Statistiques de base" },
    { ok: true, text: "Projets illimités" },
    { ok: true, text: "Photos illimitées" },
    { ok: true, text: "Vidéos" },
    { ok: true, text: "Branding automatique logo" },
    { ok: true, text: "Indexation Google" },
    { ok: true, text: "Sitemap XML · Google Analytics" },
    { ok: true, text: "Analytics in-app avancées" },
  ];

  return (
    <section style={{ padding: "100px clamp(32px, 6vw, 96px)", background: "#f5f0ea" }}>
      <Reveal><Eyebrow>Tarification</Eyebrow></Reveal>
      <Reveal delay={0.05}><SectionTitle>Simple.<br /><em style={{ fontStyle: "italic", color: "#b8882a" }}>Justifié.</em></SectionTitle></Reveal>
      <Reveal delay={0.1}><Lead>La qualité de présentation est identique pour tous. Ce qui change : la profondeur du contenu et la visibilité Google.</Lead></Reveal>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, background: "#c4bdb3" }}>
        {/* Gratuit */}
        <Reveal>
          <div style={{ background: "#faf7f2", padding: "48px 40px" }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#7a7469", marginBottom: 8 }}>Gratuit</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 52, fontWeight: 300, color: "#0e0d0b", lineHeight: 1 }}>0€</div>
            <div style={{ fontSize: 13, color: "#7a7469", marginBottom: 40 }}>Pour toujours</div>
            {freeFeatures.map(({ ok, text }) => (
              <div key={text} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12, fontSize: 14, color: ok ? "#0e0d0b" : "#c4bdb3" }}>
                <span style={{ fontSize: 15, color: ok ? "#1e4d35" : "#c4bdb3", flexShrink: 0 }}>{ok ? "✓" : "—"}</span>
                {text}
              </div>
            ))}
            <div style={{ marginTop: 28, padding: "12px 16px", background: "#e8dfd0", fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#7a7469", fontStyle: "italic" }}>
              URL directe — non indexé par Google
            </div>
          </div>
        </Reveal>

        {/* Payant */}
        <Reveal delay={0.1}>
          <div style={{ background: "#0e0d0b", padding: "48px 40px" }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#c9963a", marginBottom: 8 }}>Professionnel</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 52, fontWeight: 300, color: "#c9963a", lineHeight: 1 }}>15€</div>
            <div style={{ fontSize: 13, color: "#4a4540", marginBottom: 40 }}>/ mois · ou 3 000 XOF</div>
            {paidFeatures.map(({ ok, text }) => (
              <div key={text} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12, fontSize: 14, color: ok ? "#e8dfd0" : "#3a3530" }}>
                <span style={{ fontSize: 15, color: ok ? "#c9963a" : "#3a3530", flexShrink: 0 }}>{ok ? "✓" : "—"}</span>
                {text}
              </div>
            ))}
            <div style={{ marginTop: 28, padding: "12px 16px", background: "rgba(184,136,42,0.12)", border: "1px solid rgba(184,136,42,0.25)", fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#c9963a" }}>
              SSR — trouvable sur Google
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function StatusSection() {
  const statuses = [
    {
      badge: "Liste Or",
      color: "#c9963a",
      bg: "rgba(184,136,42,0.12)",
      border: "rgba(184,136,42,0.3)",
      desc: "5 recommandations vérifiées liées à des contrats. Historique documenté. Confiance établie par des preuves, pas par une promesse.",
      rule: "rec ≥ 5 · aucun signal · vérifié admin",
    },
    {
      badge: "Non classé",
      color: "#9a938a",
      bg: "rgba(255,255,255,0.05)",
      border: "rgba(255,255,255,0.1)",
      desc: "Statut par défaut. Pas encore de recommandations vérifiées. Présent sur la plateforme — pas encore d'historique.",
      rule: "État initial de tout professionnel inscrit",
    },
    {
      badge: "Liste Rouge",
      color: "#d97070",
      bg: "rgba(139,32,32,0.15)",
      border: "rgba(139,32,32,0.3)",
      desc: "Un seul signal de manquement contractuel vérifié. Permanent. Irréversible. Les gens investissent leurs économies de vie.",
      rule: "1 signal vérifié → rouge · aucune exception",
    },
  ];

  return (
    <section style={{ padding: "100px clamp(32px, 6vw, 96px)", background: "#0e0d0b" }}>
      <Reveal><Eyebrow light>Système de Vérification</Eyebrow></Reveal>
      <Reveal delay={0.05}><SectionTitle light>La vérité,<br /><em style={{ fontStyle: "italic", color: "#c9963a" }}>documentée.</em></SectionTitle></Reveal>
      <Reveal delay={0.1}><Lead light>Indépendant du système commercial. Ne peut pas être influencé par le paiement. Kelen ne dit jamais « ce professionnel est fiable » — il montre les preuves.</Lead></Reveal>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 2, background: "rgba(255,255,255,0.05)" }}>
        {statuses.map(({ badge, color, bg, border, desc, rule }, i) => (
          <Reveal key={badge} delay={i * 0.1}>
            <div style={{ background: "rgba(255,255,255,0.02)", padding: "36px 32px" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 14px", background: bg, border: `1px solid ${border}`, marginBottom: 20 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: color, display: "block" }} />
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color }}>{badge}</span>
              </div>
              <p style={{ fontSize: 14, color: "#9a938a", lineHeight: 1.7, marginBottom: 20 }}>{desc}</p>
              <div style={{ padding: "10px 14px", background: "rgba(255,255,255,0.04)", fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#4a4540", lineHeight: 1.5 }}>{rule}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function RevenueSection() {
  const phases = [
    {
      label: "Mois 1 – 6",
      title: "Accélération SEO + Google Ads",
      desc: "Plateforme gratuite pour tous les professionnels. Google Ads couvre partiellement l'infrastructure. Focus : accumulation de contenu SEO, autorité de domaine, premières inscriptions en Afrique francophone.",
    },
    {
      label: "Mois 6 – 12",
      title: "Abonnements + Europe francophone",
      desc: "Activation des abonnements (3 000 XOF / 15€). Ouverture France, Belgique, Suisse. À 50 000 visiteurs mensuels : transition vers la publicité directe ciblant la diaspora.",
    },
    {
      label: "Mois 12+",
      title: "Double revenu — publicité ciblée",
      desc: "Abonnements + vente directe d'espaces publicitaires. Transferts d'argent, banques, matériaux de construction, compagnies aériennes. RPM direct 3× supérieur à Google Ads.",
    },
  ];

  return (
    <section style={{ padding: "100px clamp(32px, 6vw, 96px)", background: "#faf7f2" }}>
      <Reveal><Eyebrow>Modèle de Revenus</Eyebrow></Reveal>
      <Reveal delay={0.05}><SectionTitle>Patient.<br /><em style={{ fontStyle: "italic", color: "#b8882a" }}>Justifié.</em></SectionTitle></Reveal>
      <Reveal delay={0.1}><Lead>Gratuit pour les professionnels pendant 6 à 12 mois pour résoudre le problème du démarrage à froid. Les revenus arrivent une fois la valeur prouvée.</Lead></Reveal>

      <div style={{ position: "relative", paddingLeft: 56 }}>
        <div style={{ position: "absolute", left: 13, top: 16, bottom: 16, width: 1, background: "linear-gradient(to bottom, #b8882a, transparent)" }} />
        {phases.map(({ label, title, desc }, i) => (
          <Reveal key={label} delay={i * 0.1}>
            <div style={{ position: "relative", paddingBottom: 48, borderBottom: i < phases.length - 1 ? "1px solid #e8dfd0" : "none", marginBottom: i < phases.length - 1 ? 48 : 0 }}>
              <div style={{ position: "absolute", left: -47, top: 6, width: 10, height: 10, borderRadius: "50%", background: "#b8882a", border: "2px solid #faf7f2" }} />
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "#b8882a", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 8 }}>{label}</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 400, color: "#0e0d0b", marginBottom: 10 }}>{title}</div>
              <p style={{ fontSize: 14, color: "#7a7469", lineHeight: 1.7, maxWidth: 580 }}>{desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function PositioningSection() {
  return (
    <section style={{ padding: "100px clamp(32px, 6vw, 96px)", background: "#f5f0ea" }}>
      <Reveal><Eyebrow>Positionnement</Eyebrow></Reveal>
      <Reveal delay={0.05}>
        <SectionTitle>
          Bark sert la commodité.<br />
          Kelen sert la <em style={{ fontStyle: "italic", color: "#b8882a" }}>décision légitime.</em>
        </SectionTitle>
      </Reveal>
      <Reveal delay={0.1}><Lead>Deux marchés, deux psychologies. Ils coexistent sans se concurrencer directement.</Lead></Reveal>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, background: "#c4bdb3" }}>
        {/* Bark */}
        <Reveal>
          <div style={{ background: "#faf7f2", padding: "48px 40px" }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 300, color: "#7a7469", marginBottom: 6 }}>Bark</div>
            <div style={{ fontSize: 14, fontStyle: "italic", color: "#9a938a", marginBottom: 32 }}>« Faites-nous confiance, on vous met en relation. »</div>
            {[
              "Algorithme choisit à votre place",
              "Optimisé pour la vitesse de connexion",
              "Services à faible enjeu — ménage, design, comptabilité",
              "Récupérable si mauvais choix",
            ].map(item => (
              <div key={item} style={{ display: "flex", gap: 12, marginBottom: 12, fontSize: 14, color: "#7a7469" }}>
                <span style={{ color: "#c4bdb3", flexShrink: 0, fontFamily: "'DM Mono', monospace", fontSize: 10, marginTop: 3 }}>→</span>
                {item}
              </div>
            ))}
          </div>
        </Reveal>

        {/* Kelen */}
        <Reveal delay={0.1}>
          <div style={{ background: "#0e0d0b", padding: "48px 40px" }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 300, color: "#c9963a", marginBottom: 6 }}>Kelen</div>
            <div style={{ fontSize: 14, fontStyle: "italic", color: "#9a938a", marginBottom: 32 }}>« Voici tout. Décidez vous-même. »</div>
            {[
              "Transparence — pas d'algorithme",
              "Optimisé pour la qualité de la décision",
              "Construction, rénovation, immobilier — irréversible",
              "Économies de vie — aucun taux d'échec acceptable",
            ].map(item => (
              <div key={item} style={{ display: "flex", gap: 12, marginBottom: 12, fontSize: 14, color: "#9a938a" }}>
                <span style={{ color: "#c9963a", flexShrink: 0, fontFamily: "'DM Mono', monospace", fontSize: 10, marginTop: 3 }}>→</span>
                {item}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Final() {
  const [ref, visible] = useReveal(0.3);
  return (
    <section style={{ padding: "120px clamp(32px, 6vw, 96px)", background: "#0e0d0b", textAlign: "center" }}>
      <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)", transition: "opacity 1s ease, transform 1s ease" }}>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(30px, 4vw, 52px)",
          fontWeight: 300,
          fontStyle: "italic",
          color: "#e8dfd0",
          maxWidth: 660,
          margin: "0 auto 40px",
          lineHeight: 1.2,
        }}>
          Un maçon à Abidjan depuis 15 ans mérite une présentation aussi soignée que{" "}
          <em style={{ color: "#c9963a", fontStyle: "normal" }}>l'architecte qui signe les plans.</em>
        </p>
        <div style={{ width: 40, height: 1, background: "#b8882a", margin: "0 auto 24px" }} />
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#4a4540", letterSpacing: "0.22em", textTransform: "uppercase" }}>
          Kelen · kelen.com · La vérité, documentée.
        </div>
      </div>
    </section>
  );
}

// ─── APP PRINCIPALE ───
export default function KelendOffre({ onNavigateToPro }) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Mono:wght@300;400;500&family=Outfit:wght@200;300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Outfit', sans-serif; font-weight: 300; }
        em { font-style: italic; }
        @media (max-width: 700px) {
          .pricing-grid, .pos-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}>
        <Hero onNavigateToPro={onNavigateToPro} />
        <ProfileSection />
        <AISection />
        <PricingSection />
        <StatusSection />
        <RevenueSection />
        <PositioningSection />
        <Final />
      </div>
    </>
  );
}
