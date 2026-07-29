import { useState } from "react";

/* ─── Design tokens (matching the PureWest Australia theme) ─── */
const C = {
  gold: "#A89060",
  goldLight: "#C4AA7A",
  goldPale: "#C8AE80",
  dark: "#0e0a05",
  dark2: "#120d07",
  dark3: "#1a120a",
  rule: "rgba(168,144,96,0.12)",
  text: "#d4c4a8",
  textMuted: "#7a6a55",
};

const MONO = "'JetBrains Mono','IBM Plex Mono',ui-monospace,monospace";
const SERIF = "'Cormorant Garamond', serif";
const BODY = "'Libre Baskerville', serif";

/* ─── Shared helpers ───────────────────────────────────────── */
function SectionRule() {
  return (
    <div className="flex items-center justify-center gap-4 mb-16">
      <div className="w-10 h-px opacity-50" style={{ background: C.gold }} />
      <div className="w-[5px] h-[5px] rotate-45" style={{ background: C.gold }} />
      <div className="w-10 h-px opacity-50" style={{ background: C.gold }} />
    </div>
  );
}

function Eyebrow({ children }) {
  return (
    <p className="text-[0.55rem] tracking-[6px] uppercase text-center mb-6" style={{ color: C.gold }}>
      {children}
    </p>
  );
}

function Heading({ children }) {
  return (
    <h2
      className="text-center font-light mb-5 leading-[1.1]"
      style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)", color: "#fff", letterSpacing: "-0.5px" }}
    >
      {children}
    </h2>
  );
}

/* ─── Verification seal (signature accent) ─────────────────── */
function VerificationSeal() {
  return (
    <div className="shrink-0 mx-auto md:mx-0" style={{ transform: "rotate(-7deg)" }}>
      <svg width="168" height="168" viewBox="0 0 168 168">
        <defs>
          <path id="sealRing" d="M84,84 m-66,0 a66,66 0 1,1 132,0 a66,66 0 1,1 -132,0" />
        </defs>
        <circle cx="84" cy="84" r="80" fill="none" stroke={C.gold} strokeWidth="1" opacity="0.35" />
        <circle cx="84" cy="84" r="66" fill="none" stroke={C.gold} strokeWidth="1" strokeDasharray="2 4" opacity="0.6" />
        <circle cx="84" cy="84" r="56" fill="none" stroke={C.gold} strokeWidth="1" opacity="0.35" />
        <text fill={C.goldPale} fontSize="8.5" letterSpacing="3" fontFamily={BODY}>
          <textPath href="#sealRing" startOffset="2%">
            CERTIFICATE OF ANALYSIS · INDEPENDENTLY VERIFIED ·
          </textPath>
        </text>
        <text x="84" y="80" textAnchor="middle" fill={C.gold} fontSize="30" fontFamily={SERIF} fontWeight="300">
          &gt;35
        </text>
        <text x="84" y="98" textAnchor="middle" fill={C.textMuted} fontSize="7" letterSpacing="2" fontFamily={BODY}>
          % PHENOL EQUIV.
        </text>
        <text x="84" y="112" textAnchor="middle" fill={C.goldPale} fontSize="6" letterSpacing="1.5" fontFamily={BODY} fontStyle="italic">
          off the standard curve
        </text>
      </svg>
    </div>
  );
}

/* ─── Schematic HPLC trace ─────────────────────────────────── */
function ChromatogramTrace() {
  const [hover, setHover] = useState(null);

  const peaks = [
    { key: "fructose", label: "Fructose", value: "40.6 g/100g", x: 230, height: 132 },
    { key: "glucose", label: "Glucose", value: "20.6 g/100g", x: 500, height: 74 },
    { key: "sucrose", label: "Sucrose", value: "<0.10 g/100g", x: 740, height: 10 },
  ];

  const baseline = 190;

  function peakPath(x, h) {
    const w = 60;
    return `C ${x - w},${baseline} ${x - w * 0.4},${baseline - h} ${x},${baseline - h}
            C ${x + w * 0.4},${baseline - h} ${x + w},${baseline} ${x + w},${baseline}`;
  }

  const d = `M 10,${baseline}
    q 20,-2 40,0 q 20,2 40,0
    ${peakPath(peaks[0].x, peaks[0].height)}
    q 40,0 60,0
    ${peakPath(peaks[1].x, peaks[1].height)}
    q 40,0 60,0
    ${peakPath(peaks[2].x, peaks[2].height)}
    q 40,-1 90,0`;

  return (
    <div className="relative">
      <svg viewBox="0 0 900 220" className="w-full h-auto" preserveAspectRatio="none">
        {/* baseline grid */}
        {[0, 1, 2, 3].map((i) => (
          <line key={i} x1="0" x2="900" y1={60 + i * 40} y2={60 + i * 40} stroke={C.rule} strokeWidth="1" />
        ))}
        {/* trace */}
        <path d={d} fill="none" stroke={C.gold} strokeWidth="1.75" />
        <path d={d} fill="none" stroke={C.goldLight} strokeWidth="1.75" opacity="0.25" strokeDasharray="0 0" />

        {/* peak markers */}
        {peaks.map((p) => (
          <g
            key={p.key}
            onMouseEnter={() => setHover(p.key)}
            onMouseLeave={() => setHover(null)}
            style={{ cursor: "pointer" }}
          >
            <line
              x1={p.x} x2={p.x}
              y1={baseline - p.height} y2={baseline + 14}
              stroke={hover === p.key ? C.goldLight : C.rule}
              strokeWidth="1"
              strokeDasharray="3 3"
            />
            <circle cx={p.x} cy={baseline - p.height} r={hover === p.key ? 4 : 3} fill={C.gold} />
          </g>
        ))}
      </svg>

      {/* labels below axis */}
      <div className="relative -mt-2 h-16">
        {peaks.map((p) => (
          <div
            key={p.key}
            className="absolute text-center transition-opacity duration-300"
            style={{ left: `${(p.x / 900) * 100}%`, transform: "translateX(-50%)", opacity: hover && hover !== p.key ? 0.45 : 1 }}
          >
            <div className="text-[0.62rem] tracking-[2px] uppercase" style={{ color: C.goldPale }}>{p.label}</div>
            <div className="text-[0.68rem] mt-1" style={{ fontFamily: MONO, color: C.gold }}>{p.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Typewriter data table ───────────────────────────────────── */
function DataTable() {
  const rows = [
    { k: "FRUCTOSE", v: "40.6", u: "g/100g" },
    { k: "GLUCOSE", v: "20.6", u: "g/100g" },
    { k: "SUCROSE", v: "<0.10", u: "g/100g" },
    { k: "TOTAL SIMPLE SUGARS", v: "63.7", u: "g/100g", strong: true },
    { k: "TOTAL ACTIVITY", v: ">35", u: "% phenol", strong: true, flagged: true },
  ];

  return (
    <div className="max-w-[620px] mx-auto" style={{ fontFamily: MONO }}>
      <div className="flex justify-between text-[0.6rem] tracking-[2px] uppercase pb-3 mb-3" style={{ color: C.textMuted, borderBottom: `1px solid ${C.rule}` }}>
        <span>Analyte</span>
        <span>Result</span>
      </div>
      {rows.map((r, i) => (
        <div
          key={i}
          className="flex justify-between items-baseline py-3 text-[0.78rem]"
          style={{ borderBottom: i < rows.length - 1 ? `1px solid rgba(168,144,96,0.08)` : "none" }}
        >
          <span style={{ color: r.strong ? C.goldPale : C.textMuted, letterSpacing: "1px" }}>{r.k}</span>
          <span className="flex items-baseline gap-2">
            <span style={{ color: r.strong ? C.gold : C.text, fontSize: r.strong ? "1rem" : "0.85rem" }}>{r.v}</span>
            <span className="text-[0.6rem]" style={{ color: C.textMuted }}>{r.u}</span>
            {r.flagged && (
              <span className="text-[0.55rem] italic ml-2" style={{ color: C.goldLight, fontFamily: BODY }}>
                ← exceeds lab's standard curve
              </span>
            )}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ─── Lab identity strip ──────────────────────────────────── */
function LabBadges() {
  const labs = [
    { name: "ChemCentre", sub: "WA Government · Scientific Services Division", ref: "Ref. 24S1051 R0" },
    { name: "National Measurement Institute", sub: "Australian Government · Dept. of Industry, Science & Resources", ref: "Report No. RN1441897" },
  ];
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-14 mb-20">
      {labs.map((l, i) => (
        <div key={i} className="text-center">
          <div className="text-[0.95rem] tracking-[1px]" style={{ fontFamily: "'Cormorant Garamond', serif", color: C.goldPale }}>
            {l.name}
          </div>
          <div className="text-[0.52rem] tracking-[1.5px] uppercase mt-1" style={{ color: C.textMuted }}>
            {l.sub}
          </div>
          <div className="text-[0.5rem] tracking-[2px] uppercase mt-1" style={{ color: C.gold }}>
            {l.ref}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Overview stat row ───────────────────────────────────── */
function StatRow() {
  const stats = [
    { num: "35+", label: "Total Activity", sub: "% phenol equivalent" },
    { num: "63.7g", label: "Total Simple Sugars", sub: "per 100g" },
    { num: "<0.10g", label: "Sucrose", sub: "per 100g · trace only" },
    { num: "2", label: "Independent Labs", sub: "ChemCentre & NMI" },
  ];
  return (
    <div className="flex flex-wrap max-w-[1000px] mx-auto mb-24" style={{ border: `1px solid ${C.rule}` }}>
      {stats.map((s, i) => (
        <div
          key={i}
          className="flex-1 min-w-[140px] text-center py-9 px-4"
          style={{ borderRight: i < stats.length - 1 ? `1px solid ${C.rule}` : "none" }}
        >
          <div className="text-[2.1rem] font-light leading-none" style={{ fontFamily: "'Cormorant Garamond', serif", color: C.gold }}>
            {s.num}
          </div>
          <div className="text-[0.55rem] tracking-[2.5px] uppercase mt-3" style={{ color: C.goldPale }}>
            {s.label}
          </div>
          <div className="text-[0.62rem] italic mt-1" style={{ color: C.textMuted }}>
            {s.sub}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Tab switcher ─────────────────────────────────────────── */
function TabSwitch({ active, onChange }) {
  const tabs = [
    { id: "activity", label: "Antimicrobial Activity" },
    { id: "sugar", label: "Sugar Profile" },
    { id: "trace", label: "Raw Data" },
  ];
  return (
    <div className="flex justify-center gap-3 mb-16">
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className="px-7 py-3 text-[0.58rem] tracking-[3px] uppercase transition-all duration-300 cursor-pointer"
          style={{
            fontFamily: "'Libre Baskerville', serif",
            background: active === t.id ? C.gold : "transparent",
            color: active === t.id ? C.dark : C.textMuted,
            border: `1px solid ${active === t.id ? C.gold : C.rule}`,
            fontWeight: active === t.id ? 700 : 400,
          }}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

/* ─── Antimicrobial Activity panel (signature element) ─────── */
function ActivityPanel() {
  const scaleMax = 40; // nominal frame for the visual, not a lab value
  const curveLimit = 35; // where the standard curve stops
  const measurablePct = (curveLimit / scaleMax) * 100; // 87.5%

  return (
    <div className="max-w-[860px] mx-auto mb-24">
      <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-16 items-center">
        {/* Gauge / overflow bar */}
        <div>
          <p className="text-[0.52rem] tracking-[4px] uppercase mb-8" style={{ color: C.textMuted }}>
            Total Antimicrobial Activity — Method VM1.29
          </p>

          <div className="relative h-[70px] mb-3" style={{ background: C.dark3, border: `1px solid ${C.rule}` }}>
            {/* measurable zone fill */}
            <div
              className="absolute inset-y-0 left-0"
              style={{
                width: `${measurablePct}%`,
                background: `linear-gradient(90deg, ${C.gold}55, ${C.gold})`,
              }}
            />
            {/* boundary line at the standard curve's limit */}
            <div
              className="absolute inset-y-0"
              style={{ left: `${measurablePct}%`, width: "1px", background: C.dark }}
            />
            {/* beyond-range zone: fades, glows, and overflows */}
            <div
              className="absolute inset-y-0 right-0 flex items-center justify-center overflow-visible"
              style={{
                left: `${measurablePct}%`,
                background: `repeating-linear-gradient(135deg, ${C.goldLight}22 0 6px, transparent 6px 12px)`,
              }}
            >
              <div
                className="w-3 h-3 rotate-45 animate-pulse"
                style={{ background: C.goldLight, boxShadow: `0 0 18px 4px ${C.goldLight}88` }}
              />
            </div>
          </div>

          {/* ticks */}
          <div className="relative h-4 mb-8">
            {[0, 10, 20, 30].map((v) => (
              <span
                key={v}
                className="absolute text-[0.5rem]"
                style={{ left: `${(v / scaleMax) * 100}%`, color: C.textMuted, transform: "translateX(-50%)" }}
              >
                {v}
              </span>
            ))}
            <span
              className="absolute text-[0.5rem] font-bold"
              style={{ left: `${measurablePct}%`, color: C.gold, transform: "translateX(-50%)" }}
            >
              35
            </span>
          </div>

          <p className="text-[0.75rem] leading-[1.9]" style={{ color: C.textMuted }}>
            <span style={{ color: C.goldPale }}>Result: &gt;35% phenol equivalent.</span> The
            testing laboratory's standard curve is calibrated only to 35% — our Jarrah honey's
            activity sits above the top of that curve, so the certified result is reported as
            &ldquo;greater than&rdquo; rather than an exact figure.
          </p>
        </div>

        {/* explainer card */}
        <div className="p-9" style={{ border: `1px solid ${C.rule}`, background: `linear-gradient(145deg, ${C.dark3}, ${C.dark})` }}>
          <p className="text-[0.5rem] tracking-[3px] uppercase mb-4" style={{ color: C.gold }}>
            What Total Activity Means
          </p>
          <p className="text-[0.75rem] leading-[1.9] mb-5" style={{ color: C.textMuted }}>
            Total Activity (TA) measures a honey's overall antimicrobial strength, expressed as
            a phenol equivalent percentage. Jarrah's activity is naturally hydrogen
            peroxide-based rather than the MGO-driven activity found in Manuka — a different,
            stable chemistry unique to this forest.
          </p>
          <div className="h-px my-5" style={{ background: C.rule }} />
          <ul className="text-[0.68rem] leading-[1.9] space-y-1" style={{ color: C.textMuted }}>
            <li><span style={{ color: C.gold }}>Tested by:</span> National Measurement Institute, Port Melbourne VIC</li>
            <li><span style={{ color: C.gold }}>Date tested:</span> 13 Sep 2024</li>
            <li><span style={{ color: C.gold }}>Sample:</span> M/0924-775JH — Jarrah</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ─── Sugar Profile panel ────────────────────────────────────── */
function SugarPanel() {
  const rows = [
    { label: "Fructose", value: 40.6, color: C.gold },
    { label: "Glucose", value: 20.6, color: C.goldLight },
    { label: "Sucrose", value: 0.1, display: "<0.10", color: C.goldPale },
  ];
  const measured = 63.7;
  const remainder = +(100 - measured).toFixed(1);

  return (
    <div className="max-w-[860px] mx-auto mb-24">
      <p className="text-[0.52rem] tracking-[4px] uppercase mb-8 text-center" style={{ color: C.textMuted }}>
        Sugar Composition — Method ORG155F (HPLC), per 100g
      </p>

      {/* stacked composition bar */}
      <div className="flex w-full h-12 mb-6 overflow-hidden" style={{ border: `1px solid ${C.rule}` }}>
        {rows.map((r, i) => (
          <div
            key={i}
            style={{ width: `${(r.value / 100) * 100}%`, background: r.color, minWidth: r.value > 0 ? "2px" : 0 }}
            title={`${r.label}: ${r.display ?? r.value + "g"}`}
          />
        ))}
        <div className="flex-1" style={{ background: C.dark3 }} />
      </div>

      {/* legend */}
      <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-14">
        {rows.map((r, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="w-3 h-3 inline-block" style={{ background: r.color }} />
            <span className="text-[0.62rem] tracking-[1px] uppercase" style={{ color: C.text }}>
              {r.label}
            </span>
            <span className="text-[0.62rem]" style={{ color: C.textMuted }}>
              {r.display ?? `${r.value}g`}
            </span>
          </div>
        ))}
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 inline-block" style={{ background: C.dark3, border: `1px solid ${C.rule}` }} />
          <span className="text-[0.62rem] tracking-[1px] uppercase" style={{ color: C.text }}>
            Water &amp; minor constituents
          </span>
          <span className="text-[0.62rem]" style={{ color: C.textMuted }}>~{remainder}g</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        {rows.map((r, i) => (
          <div key={i} className="py-8 px-4" style={{ border: `1px solid ${C.rule}` }}>
            <div className="text-[1.9rem] font-light" style={{ fontFamily: "'Cormorant Garamond', serif", color: r.color }}>
              {r.display ?? `${r.value}g`}
            </div>
            <div className="text-[0.55rem] tracking-[2.5px] uppercase mt-2" style={{ color: C.textMuted }}>
              {r.label} / 100g
            </div>
          </div>
        ))}
      </div>

      <p className="text-[0.72rem] leading-[1.9] mt-10 max-w-[600px] mx-auto text-center" style={{ color: C.textMuted }}>
        Sucrose sits below the lab's limit of quantitation — a signature of raw, unadulterated
        honey. Total simple sugars measured <span style={{ color: C.goldPale }}>63.7g per 100g</span>,
        with the balance made up of water and the trace compounds native to Jarrah forest nectar.
      </p>
    </div>
  );
}

/* ─── Certificate detail cards ───────────────────────────────── */
function CertificateGrid() {
  const certs = [
    {
      org: "ChemCentre",
      tag: "Sugar Analysis · Certificate of Examination",
      rows: [
        ["Reference", "24S1051 R0"],
        ["Sample ID", "M/0924-775JH — Jarrah"],
        ["Sampled", "01 Sep 2024"],
        ["Analysed", "06 Sep 2024"],
        ["Method", "ORG155F (HPLC)"],
      ],
      signoff: "Ashley Tai, Chemist & Research Officer — SSD Organic Chemistry",
      pdfUrl: "/docs/240925 - Chemcentre - CoA (Sugar analysis & TA).pdf"
    },
    {
      org: "National Measurement Institute",
      tag: "Total Activity · Report of Analysis",
      rows: [
        ["Report No.", "RN1441897"],
        ["Sample ID", "M/0924-775JH-Jarrah-Honey"],
        ["Date received", "05 Sep 2024"],
        ["Date tested", "13 Sep 2024"],
        ["Method", "VM1.29"],
      ],
      signoff: "Dean Clarke, Section Manager — Microbiology, VIC",
      pdfUrl: "/docs/240925 - NMI - TA Rating.pdf"
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1000px] mx-auto mb-16">
      {certs.map((c, i) => (
        <div key={i} className="relative p-10 flex flex-col h-full" style={{ border: `1px solid ${C.rule}`, background: `linear-gradient(145deg, ${C.dark3}, ${C.dark})` }}>
          <div className="absolute top-[-1px] left-[-1px] w-5 h-5 border-t border-l opacity-50" style={{ borderColor: C.gold }} />
          <div className="absolute bottom-[-1px] right-[-1px] w-5 h-5 border-b border-r opacity-50" style={{ borderColor: C.gold }} />

          <div className="text-[1.15rem] mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#fff" }}>
            {c.org}
          </div>
          <div className="text-[0.5rem] tracking-[2.5px] uppercase mb-7" style={{ color: C.gold }}>
            {c.tag}
          </div>

          <div className="mb-7 flex-1">
            {c.rows.map(([k, v], j) => (
              <div key={j} className="flex justify-between py-[10px] text-[0.72rem]" style={{ borderBottom: "1px solid rgba(168,144,96,0.07)" }}>
                <span style={{ color: C.textMuted }}>{k}</span>
                <span style={{ color: C.text }}>{v}</span>
              </div>
            ))}
          </div>

          <p className="text-[0.62rem] italic leading-[1.7] mb-6" style={{ color: C.textMuted }}>
            Signed — {c.signoff}
          </p>

          <div className="mt-auto pt-5" style={{ borderTop: `1px dashed ${C.rule}` }}>
            <a 
              href={c.pdfUrl} 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-3 text-[0.55rem] tracking-[3px] uppercase transition-colors duration-300 no-underline"
              style={{ color: C.goldPale, fontFamily: "'Libre Baskerville', serif", fontWeight: 700 }}
              onMouseEnter={(e) => (e.currentTarget.style.color = C.goldLight)}
              onMouseLeave={(e) => (e.currentTarget.style.color = C.goldPale)}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="12" y1="18" x2="12" y2="12"></line>
                <line x1="9" y1="15" x2="15" y2="15"></line>
              </svg>
              View Original PDF
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Root export ─────────────────────────────────────────────── */
export default function LabResults() {
  const [tab, setTab] = useState("activity");

  return (
    <section id="lab-results" className="px-6 sm:px-[72px] py-[120px]" style={{ background: C.dark, color: C.text, fontFamily: "'Libre Baskerville', serif", minHeight: '100vh' }}>
      
      {/* hero header from alt */}
      <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-12 mb-24 mt-8">
        <div className="max-w-[560px] text-center md:text-left">
          <p className="text-[0.55rem] tracking-[6px] uppercase mb-6" style={{ color: C.gold }}>
            Beyond The Label
          </p>
          <h2
            className="font-light mb-6 leading-[1.1]"
            style={{ fontFamily: SERIF, fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)", color: "#fff", letterSpacing: "-0.5px" }}
          >
            The Proof <em style={{ color: C.gold, fontStyle: "italic" }}>Behind The Jar</em>
          </h2>
          <p className="text-[0.82rem] leading-[2.1]" style={{ color: C.textMuted }}>
            We don&apos;t ask you to take our word for it. Every jar of Jarrah honey carries results 
            from two government-accredited laboratories — ChemCentre and the National Measurement 
            Institute. No rounding, no marketing gloss. Below is the certificate, unfolded.
          </p>
        </div>
        <VerificationSeal />
      </div>

      <LabBadges />
      <StatRow />

      <TabSwitch active={tab} onChange={setTab} />
      
      <div className="min-h-[400px]">
        {tab === "activity" && <ActivityPanel />}
        {tab === "sugar" && <SugarPanel />}
        {tab === "trace" && (
          <div className="animate-in fade-in duration-500">
            <div className="max-w-[900px] mx-auto mb-6">
              <ChromatogramTrace />
            </div>
            <p className="text-center text-[0.6rem] italic mb-24" style={{ color: C.textMuted }}>
              Sugar profile, illustrative trace scaled to lab results · Method ORG155F (HPLC) · run 06.09.2024
            </p>
            <div className="mb-24">
              <DataTable />
            </div>
          </div>
        )}
      </div>

      <div className="h-px max-w-[1000px] mx-auto mb-16" style={{ background: C.rule }} />

      <p className="text-center text-[0.5rem] tracking-[3px] uppercase mb-10" style={{ color: C.gold }}>
        The Certificates
      </p>
      <CertificateGrid />

      <p className="text-center text-[0.65rem] italic max-w-[600px] mx-auto mt-16" style={{ color: C.textMuted }}>
        Results apply only to the sample as received and tested. Full Certificates of Analysis
        are available on request.
      </p>
    </section>
  );
}