import { useState, useEffect } from "react";


/* ─── Verification seal (signature accent) ─────────────────── */
function VerificationSeal({className}) {
  return (
    <div className={`shrink-0 mx-auto md:mx-0 rotate-[7deg] ${className}`}>
      <svg width="168" height="168" viewBox="0 0 168 168">
        <defs>
          <path id="sealRing" d="M84,84 m-66,0 a66,66 0 1,1 132,0 a66,66 0 1,1 -132,0" />
        </defs>
        <circle cx="84" cy="84" r="80" fill="none" stroke="var(--color-gold)" strokeWidth="1" opacity="0.35" />
        <circle cx="84" cy="84" r="66" fill="none" stroke="var(--color-gold)" strokeWidth="1" strokeDasharray="2 4" opacity="0.6" />
        <circle cx="84" cy="84" r="56" fill="none" stroke="var(--color-gold)" strokeWidth="1" opacity="0.35" />
        <text fill="var(--color-gold-pale)" fontSize="8.5" letterSpacing="3" fontFamily="var(--font-baskerville)">
          <textPath href="#sealRing" startOffset="2%">
            CERTIFICATE OF ANALYSIS · INDEPENDENTLY VERIFIED ·
          </textPath>
        </text>
        <text x="84" y="80" textAnchor="middle" fill="var(--color-gold)" fontSize="30" fontFamily="var(--font-garamond)" fontWeight="300">
          &gt;35
        </text>
        <text x="84" y="98" textAnchor="middle" fill="var(--color-text-muted)" fontSize="7" letterSpacing="2" fontFamily="var(--font-baskerville)">
          % PHENOL EQUIV.
        </text>
        <text x="84" y="112" textAnchor="middle" fill="var(--color-gold-pale)" fontSize="6" letterSpacing="1.5" fontFamily="var(--font-baskerville)" fontStyle="italic">
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
          <line key={i} x1="0" x2="900" y1={60 + i * 40} y2={60 + i * 40} stroke="var(--color-rule)" strokeWidth="1" />
        ))}
        {/* trace */}
        <path d={d} fill="none" stroke="var(--color-gold)" strokeWidth="1.75" />
        <path d={d} fill="none" stroke="var(--color-gold-light)" strokeWidth="1.75" opacity="0.25" strokeDasharray="0 0" />

        {/* peak markers */}
        {peaks.map((p) => (
          <g
            key={p.key}
            onMouseEnter={() => setHover(p.key)}
            onMouseLeave={() => setHover(null)}
            className="cursor-pointer"
          >
            <line
              x1={p.x} x2={p.x}
              y1={baseline - p.height} y2={baseline + 14}
              stroke={hover === p.key ? "var(--color-gold-light)" : "var(--color-rule)"}
              strokeWidth="1"
              strokeDasharray="3 3"
            />
            <circle cx={p.x} cy={baseline - p.height} r={hover === p.key ? 4 : 3} fill="var(--color-gold)" />
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
            <div className="text-[0.62rem] tracking-[2px] uppercase text-gold-pale">{p.label}</div>
            <div className="font-mono text-[0.68rem] mt-1 text-gold">{p.value}</div>
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
    <div className="font-mono max-w-[620px] mx-auto">
      <div className="flex justify-between text-[0.6rem] tracking-[2px] uppercase pb-3 mb-3 text-text-muted border-b border-rule">
        <span>Analyte</span>
        <span>Result</span>
      </div>
      {rows.map((r, i) => (
        <div
          key={i}
          className={`flex justify-between items-baseline py-3 text-[0.78rem] ${i < rows.length - 1 ? 'border-b border-gold/8' : ''}`}
        >
          <span className={`tracking-[1px] ${r.strong ? 'text-gold-pale' : 'text-text-muted'}`}>{r.k}</span>
          <span className="flex items-baseline gap-2">
            <span className={r.strong ? 'text-gold text-[1rem]' : 'text-text text-[0.85rem]'}>{r.v}</span>
            <span className="text-[0.6rem] text-text-muted">{r.u}</span>
            {r.flagged && (
              <span className="font-baskerville text-[0.55rem] italic ml-2 text-gold-light">
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
          <div className="font-garamond text-[0.95rem] tracking-[1px] text-gold-pale">
            {l.name}
          </div>
          <div className="text-[0.52rem] tracking-[1.5px] uppercase mt-1 text-text-muted">
            {l.sub}
          </div>
          <div className="text-[0.5rem] tracking-[2px] uppercase mt-1 text-gold">
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
    <div className="flex flex-wrap max-w-[1000px] mx-auto mb-24 border border-rule">
      {stats.map((s, i) => (
        <div
          key={i}
          className={`flex-1 min-w-[140px] text-center py-9 px-4 ${i < stats.length - 1 ? '[&:not(:last-child)]:border-r [&:not(:last-child)]:border-rule' : ''}`}
        >
          <div className="font-garamond text-[2.1rem] font-light leading-none text-gold">
            {s.num}
          </div>
          <div className="text-[0.55rem] tracking-[2.5px] uppercase mt-3 text-gold-pale">
            {s.label}
          </div>
          <div className="text-[0.62rem] italic mt-1 text-text-muted">
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
          className={`font-baskerville px-7 py-3 text-[0.58rem] tracking-[3px] uppercase transition-all duration-300 cursor-pointer border ${
            active === t.id
              ? 'bg-gold text-dark border-gold font-bold'
              : 'bg-transparent text-text-muted border-rule font-normal hover:border-gold hover:text-gold-pale'
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

/* ─── Antimicrobial Activity panel (signature element) ─────── */
function ActivityPanel() {
  const scaleMax = 40;
  const curveLimit = 35;
  const measurablePct = (curveLimit / scaleMax) * 100; // 87.5%

  return (
    <div className="max-w-[860px] mx-auto mb-24">
      <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-8 md:gap-16 items-center">
        {/* Gauge / overflow bar */}
        <div>
          <p className="text-[0.52rem] tracking-[4px] uppercase mb-8 text-text-muted">
            Total Antimicrobial Activity — Method VM1.29
          </p>

          <div className="relative h-[70px] mb-3 bg-dark3 border border-rule">
            {/* measurable zone fill */}
            <div
              className="absolute inset-y-0 left-0 bg-[linear-gradient(90deg,#A89060_55,#A89060)]"
              style={{ width: `${measurablePct}%` }}
            />
            {/* boundary line at the standard curve's limit */}
            <div
              className="absolute inset-y-0 w-px bg-dark"
              style={{ left: `${measurablePct}%` }}
            />
            {/* beyond-range zone */}
            <div
              className="absolute inset-y-0 right-0 flex items-center justify-center overflow-visible bg-[repeating-linear-gradient(135deg,#C4AA7A22_0_6px,transparent_6px_12px)]"
              style={{ left: `${measurablePct}%` }}
            >
              <div className="w-3 h-3 rotate-45 animate-pulse bg-gold-light [box-shadow:0_0_18px_4px_#C4AA7A88]" />
            </div>
          </div>

          {/* ticks */}
          <div className="relative h-4 mb-8">
            {[0, 10, 20, 30].map((v) => (
              <span
                key={v}
                className="absolute text-[0.5rem] text-text-muted -translate-x-1/2"
                style={{ left: `${(v / scaleMax) * 100}%` }}
              >
                {v}
              </span>
            ))}
            <span
              className="absolute text-[0.5rem] font-bold text-gold -translate-x-1/2"
              style={{ left: `${measurablePct}%` }}
            >
              35
            </span>
          </div>

          <p className="text-[0.75rem] leading-[1.9] text-text-muted">
            <span className="text-gold-pale">Result: &gt;35% phenol equivalent.</span> The
            testing laboratory's standard curve is calibrated only to 35% — our Jarrah honey's
            activity sits above the top of that curve, so the certified result is reported as
            &ldquo;greater than&rdquo; rather than an exact figure.
          </p>
        </div>

        {/* explainer card */}
        <div className="p-9 border border-rule bg-[linear-gradient(145deg,#1a120a,#0e0a05)]">
          <p className="text-[0.5rem] tracking-[3px] uppercase mb-4 text-gold">
            What Total Activity Means
          </p>
          <p className="text-[0.75rem] leading-[1.9] mb-5 text-text-muted">
            Total Activity (TA) measures a honey's overall antimicrobial strength, expressed as
            a phenol equivalent percentage. Jarrah's activity is naturally hydrogen
            peroxide-based rather than the MGO-driven activity found in Manuka — a different,
            stable chemistry unique to this forest.
          </p>
          <div className="h-px my-5 bg-rule" />
          <ul className="text-[0.68rem] leading-[1.9] space-y-1 text-text-muted">
            <li><span className="text-gold">Tested by:</span> National Measurement Institute, Port Melbourne VIC</li>
            <li><span className="text-gold">Date tested:</span> 13 Sep 2024</li>
            <li><span className="text-gold">Sample:</span> M/0924-775JH — Jarrah</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ─── Sugar Profile panel ────────────────────────────────────── */
function SugarPanel() {
  const rows = [
    { label: "Fructose",  value: 40.6, color: "var(--color-gold)" },
    { label: "Glucose",   value: 20.6, color: "var(--color-gold-light)" },
    { label: "Sucrose",   value: 0.1,  display: "<0.10", color: "var(--color-gold-pale)" },
  ];
  const measured = 63.7;
  const remainder = +(100 - measured).toFixed(1);

  return (
    <div className="max-w-[860px] mx-auto mb-24">
      <p className="text-[0.52rem] tracking-[4px] uppercase mb-8 text-center text-text-muted">
        Sugar Composition — Method ORG155F (HPLC), per 100g
      </p>

      {/* stacked composition bar */}
      <div className="flex w-full h-12 mb-6 overflow-hidden border border-rule">
        {rows.map((r, i) => (
          <div
            key={i}
            style={{ width: `${(r.value / 100) * 100}%`, background: r.color, minWidth: r.value > 0 ? "2px" : 0 }}
            title={`${r.label}: ${r.display ?? r.value + "g"}`}
          />
        ))}
        <div className="flex-1 bg-dark3" />
      </div>

      {/* legend */}
      <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-14">
        {rows.map((r, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="w-3 h-3 inline-block" style={{ background: r.color }} />
            <span className="text-[0.62rem] tracking-[1px] uppercase text-text">
              {r.label}
            </span>
            <span className="text-[0.62rem] text-text-muted">
              {r.display ?? `${r.value}g`}
            </span>
          </div>
        ))}
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 inline-block bg-dark3 border border-rule" />
          <span className="text-[0.62rem] tracking-[1px] uppercase text-text">
            Water &amp; minor constituents
          </span>
          <span className="text-[0.62rem] text-text-muted">~{remainder}g</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        {rows.map((r, i) => (
          <div key={i} className="py-8 px-4 border border-rule">
            <div className="font-garamond text-[1.9rem] font-light" style={{ color: r.color }}>
              {r.display ?? `${r.value}g`}
            </div>
            <div className="text-[0.55rem] tracking-[2.5px] uppercase mt-2 text-text-muted">
              {r.label} / 100g
            </div>
          </div>
        ))}
      </div>

      <p className="text-[0.72rem] leading-[1.9] mt-10 max-w-[600px] mx-auto text-center text-text-muted">
        Sucrose sits below the lab's limit of quantitation — a signature of raw, unadulterated
        honey. Total simple sugars measured <span className="text-gold-pale">63.7g per 100g</span>,
        with the balance made up of water and the trace compounds native to Jarrah forest nectar.
      </p>
    </div>
  );
}

/* ─── Certificate detail cards ───────────────────────────────── */
function CertificateGrid() {
  const [activePdf, setActivePdf] = useState(null);
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLabTests = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/lab-tests`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        
        const mappedCerts = data.map(test => ({
          org: test.title || "Independent Laboratory",
          tag: test.subtitle || "Certificate of Analysis",
          rows: [
            ["Reference", test.reference || "N/A"],
            ["Sample ID", test.sample_id || "N/A"],
            ["Sampled", test.sampled_at ? new Date(test.sampled_at).toLocaleDateString("en-AU", { day: 'numeric', month: 'short', year: 'numeric' }) : "N/A"],
            ["Analysed", test.analyzed_at ? new Date(test.analyzed_at).toLocaleDateString("en-AU", { day: 'numeric', month: 'short', year: 'numeric' }) : "N/A"],
            ["Method", test.method || "N/A"],
          ].filter(row => row[1] !== "N/A" && row[1] !== ""),
          signoff: test.signed_by || "Authorized Signatory",
          pdfUrl: test.pdf_path
        }));
        
        setCerts(mappedCerts);
      } catch (err) {
        console.error("Failed to fetch lab tests:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchLabTests();
  }, []);

  return (
    <div className="max-w-[1000px] mx-auto mb-16">
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-[6px] h-[6px] rotate-45 animate-pulse bg-gold" />
          <p className="font-baskerville text-[0.6rem] tracking-[4px] uppercase text-text-muted">Loading certificates…</p>
        </div>
      ) : certs.length === 0 ? (
        <div className="text-center py-20">
          <p className="font-baskerville text-[0.8rem] text-text-muted">No lab certificates have been uploaded yet.</p>
        </div>
      ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {certs.map((c, i) => (
          <div key={i} className={`relative p-10 flex flex-col h-full transition-colors duration-300 bg-[linear-gradient(145deg,#1a120a,#0e0a05)] ${activePdf === c.pdfUrl ? 'border border-gold' : 'border border-rule'}`}>
            <div className="absolute -top-px -left-px w-5 h-5 border-t border-l opacity-50 border-gold" />
            <div className="absolute -bottom-px -right-px w-5 h-5 border-b border-r opacity-50 border-gold" />

            <div className="font-garamond text-[1.15rem] mb-1 text-white">
              {c.org}
            </div>
            <div className="text-[0.5rem] tracking-[2.5px] uppercase mb-7 text-gold">
              {c.tag}
            </div>

            <div className="mb-7 flex-1">
              {c.rows.map(([k, v], j) => (
                <div key={j} className="flex justify-between py-[10px] text-[0.72rem] border-b border-gold/7">
                  <span className="text-text-muted">{k}</span>
                  <span className="text-text">{v}</span>
                </div>
              ))}
            </div>

            <p className="text-[0.62rem] italic leading-[1.7] mb-6 text-text-muted">
              Signed — {c.signoff}
            </p>

            <div className="mt-auto pt-5 border-t border-dashed border-rule">
              <button 
                onClick={() => setActivePdf(activePdf === c.pdfUrl ? null : c.pdfUrl)}
                className={`font-baskerville inline-flex items-center gap-3 text-[0.55rem] tracking-[3px] uppercase transition-colors duration-300 cursor-pointer bg-transparent border-none p-0 font-bold hover:text-gold-light ${activePdf === c.pdfUrl ? 'text-gold-light' : 'text-gold-pale'}`}
              >
                {activePdf === c.pdfUrl ? (
                  <>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                    Close PDF
                  </>
                ) : (
                  <>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="12" y1="18" x2="12" y2="12"></line>
                      <line x1="9" y1="15" x2="15" y2="15"></line>
                    </svg>
                    View Original PDF
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
      )}

      {activePdf && (
        <div className="mt-12 animate-in fade-in slide-in-from-top-4 duration-700 border border-gold bg-dark2">
          <div className="flex justify-between items-center px-6 py-4 border-b border-rule bg-dark3">
            <span className="text-[0.6rem] tracking-[2px] uppercase text-gold-pale">Document Viewer</span>
            <div className="flex gap-4">
              <a 
                href={activePdf}
                target="_blank"
                rel="noreferrer"
                className="text-[0.55rem] tracking-[2px] uppercase transition-colors duration-300 no-underline text-text-muted hover:text-gold-light"
              >
                Open in new tab ↗
              </a>
              <button 
                onClick={() => setActivePdf(null)}
                className="text-[0.55rem] tracking-[2px] uppercase transition-colors duration-300 cursor-pointer bg-transparent border-none p-0 text-gold-pale hover:text-gold-light"
              >
                Close ✕
              </button>
            </div>
          </div>
          <div className="w-full h-[80vh] min-h-[600px] p-2">
            <iframe 
              src={`${activePdf}#view=FitH`} 
              title="Lab Result PDF Document"
              className="w-full h-full rounded-sm border-none bg-white"
            />
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Root export ─────────────────────────────────────────────── */
export default function LabResults() {
  const [tab, setTab] = useState("activity");

  return (
    <section id="lab-results" className="font-baskerville w-full pb-20 bg-dark text-text">
      {/* Hero */}
      <div className="relative flex flex-col items-center justify-center text-center h-screen w-full bg-[linear-gradient(to_bottom,#120d07,#0e0a05)]">
        <img src="/images/waffle.webp" className="absolute inset-0 w-full h-full object-cover z-0" />
        
        <div className="relative z-8 bg-linear-to-t from-[rgba(14,10,5,1)] from-10% to-[rgba(26,18,10,0)] h-full w-full flex flex-col items-center justify-end px-6">
          {/* Decorative diamond */}
          <div className="w-[6px] h-[6px] rotate-45 mx-auto mb-6 bg-gold" />
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12.5 h-px bg-linear-to-r from-transparent to-gold" />
            <p className="font-baskerville text-[0.55rem] tracking-[6px] uppercase text-white">
              Beyond The Label
            </p>
            <div className="w-12.5 h-px bg-linear-to-l from-transparent to-gold" />
          </div>
          <h1 className="font-garamond font-light leading-[1.05] mb-6 text-white tracking-[-0.5px] text-[clamp(2.8rem,6vw,5rem)]">
            The Proof <em className="text-gold italic">Behind The Jar</em>
          </h1>
          <p className="max-w-xl text-[0.9rem] leading-relaxed text-text-muted">
            Every jar of Jarrah honey carries results from two government-accredited laboratories. No rounding, no marketing gloss. Below is the certificate, unfolded.
          </p>

          {/* Bottom rule */}
          <div className="flex items-center gap-4 my-8">
            <div className="w-16 h-px opacity-30 bg-gold" />
            <div className="w-[4px] h-[4px] rotate-45 opacity-50 bg-gold" />
            <div className="w-16 h-px opacity-30 bg-gold" />
          </div>

          <VerificationSeal className="absolute top-25 right-20" />
        </div>
      </div>

      <div className="px-6 md:px-12">
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
              <p className="text-center text-[0.6rem] italic mb-24 text-text-muted">
                Sugar profile, illustrative trace scaled to lab results · Method ORG155F (HPLC) · run 06.09.2024
              </p>
              <div className="mb-24">
                <DataTable />
              </div>
            </div>
          )}
        </div>

        <div className="h-px max-w-[1000px] mx-auto mb-16 bg-rule" />

        <p className="text-center text-[0.5rem] tracking-[3px] uppercase mb-10 text-gold">
          The Certificates
        </p>
        <CertificateGrid />

        <p className="text-center text-[0.65rem] italic max-w-[600px] mx-auto mt-16 text-text-muted">
          Results apply only to the sample as received and tested. Full Certificates of Analysis
          are available on request.
        </p>
      </div>
    </section>
  );
}