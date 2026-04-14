import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function useReveal() {
  useEffect(() => {
    document.querySelectorAll('.reveal').forEach(el => {
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
      }, { threshold: 0.1 })
      obs.observe(el)
    })
  }, [])
}

// ── SVG Bar Chart component ────────────────────────────────────────
function BarChart({ data, color, height = 160, title, unit = '%' }) {
  const max = Math.max(...data.map(d => d.value))
  return (
    <div>
      {title && <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--muted2)', marginBottom: '0.75rem', letterSpacing: '0.3px' }}>{title}</div>}
      <svg width="100%" height={height} viewBox={`0 0 ${data.length * 70} ${height}`} style={{ overflow: 'visible' }}>
        {data.map((d, i) => {
          const barH = (d.value / max) * (height - 40)
          const x = i * 70 + 10
          const y = height - barH - 30
          return (
            <g key={d.label}>
              <rect x={x} y={y} width={50} height={barH} rx={4} fill={color} opacity={0.85} />
              <text x={x + 25} y={y - 6} textAnchor="middle" fontSize="11" fontWeight="800" fill={color}>{d.value}{unit}</text>
              <text x={x + 25} y={height - 10} textAnchor="middle" fontSize="9" fill="var(--muted2)" style={{ fontFamily: 'Inter, sans-serif' }}>{d.label}</text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

// ── Line chart (sparkline) ─────────────────────────────────────────
function SparkLine({ data, color, height = 80 }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const w = 280
  const step = w / (data.length - 1)
  const points = data.map((v, i) => `${i * step},${height - ((v - min) / range) * (height - 10) - 5}`)
  return (
    <svg width="100%" height={height} viewBox={`0 0 ${w} ${height}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id={`grad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,${height} ${points.join(' ')} ${w},${height}`} fill={`url(#grad-${color.replace('#', '')})`} />
      <polyline points={points.join(' ')} fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx={data.length > 1 ? (data.length - 1) * step : 0} cy={points[data.length - 1]?.split(',')[1] || 0}
        r="4" fill={color} />
    </svg>
  )
}

const FINDINGS = [
  {
    id: 'pricing',
    label: 'Pricing Optimisation',
    color: '#06b6d4',
    company: 'Al-Hashmi Traders',
    headline: 'ML pricing models added 37% revenue in one engagement cycle',
    finding: 'Customer segmentation via Scikit-learn clustering revealed 6 distinct buyer personas. Personalised promotion timing across segments drove the largest single-period revenue gain in the business history.',
    chart: {
      type: 'bar',
      title: 'Revenue and Sales Performance',
      data: [
        { label: 'Baseline Rev', value: 100 },
        { label: 'After Model', value: 137 },
        { label: 'Sales Vol +', value: 144 },
        { label: 'Margin', value: 118 },
      ],
    },
    trend: [62, 71, 68, 75, 80, 95, 112, 130, 137],
    trendLabel: 'Revenue index over engagement period',
    insights: [
      'High-value segment responded best to early access promotions (not discounts)',
      'Lapsed customers required 25%+ discount to re-engage, but converted at 3x rate',
      'Q4 seasonal demand was undercapitalised by 34% before model deployment',
    ],
  },
  {
    id: 'reporting',
    label: 'Reporting Automation',
    color: '#f59e0b',
    company: 'Al-Hashmi Traders',
    headline: 'Automated dashboards cut executive reporting time by 30%',
    finding: 'Manual weekly reporting required 12+ hours of analyst time. Tableau automation pipelines and SQL-driven feeds reduced this to under 8 hours while adding real-time KPI visibility that previously did not exist.',
    chart: {
      type: 'bar',
      title: 'Reporting Turnaround (Hours)',
      data: [
        { label: 'Manual', value: 100 },
        { label: 'Semi-auto', value: 78 },
        { label: 'Full auto', value: 70 },
        { label: 'Target', value: 65 },
      ],
    },
    trend: [100, 95, 88, 80, 74, 70, 70, 70, 70],
    trendLabel: 'Reporting time reduction index',
    insights: [
      'C-suite decision cycle shortened from 5 days to same-day with live dashboards',
      'Budget allocation accuracy improved because actuals vs targets were visible weekly',
      '3 manual processes fully automated: daily sales summary, weekly P and L, monthly KPI pack',
    ],
  },
  {
    id: 'sql',
    label: 'Query Performance',
    color: '#10b981',
    company: 'Al-Hashmi Traders',
    headline: 'SQL optimisation reduced reporting turnaround by 30%',
    finding: 'Large transactional tables were running full table scans. Index tuning, query restructuring, and denormalisation of reporting tables cut average query time from 4.2 seconds to under 1 second.',
    chart: {
      type: 'bar',
      title: 'Query Execution Improvement',
      data: [
        { label: 'Before', value: 100 },
        { label: 'Indexed', value: 72 },
        { label: 'Rewritten', value: 58 },
        { label: 'Optimised', value: 70 },
      ],
    },
    trend: [100, 98, 91, 80, 72, 64, 58, 70, 70],
    trendLabel: 'Query execution time index',
    insights: [
      'Composite indexes on (date, product_id, customer_id) reduced 80% of slow queries',
      'Materialised views for monthly aggregates eliminated repeated expensive calculations',
      'Reporting layer moved to dedicated read replica, removing load from transactional DB',
    ],
  },
]

export default function DataAnalytics() {
  useReveal()
  const [activeFinding, setActiveFinding] = useState(0)
  const f = FINDINGS[activeFinding]

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <div className="page-hero bg-dots" style={{ background: 'var(--surface)', overflow: 'hidden', position: 'relative' }}>
        <div className="orb" style={{ width: 500, height: 500, background: 'var(--cyan)', top: -150, right: -100 }} />
        <div className="page-hero-inner" style={{ position: 'relative' }}>
          <span className="sec-tag" style={{ color: 'var(--cyan)' }}>Data Analytics</span>
          <h1 style={{ fontSize: 'clamp(2.4rem,6vw,4.2rem)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '1.25rem', lineHeight: 1.1, maxWidth: 700 }}>
            Real findings from{' '}
            <span style={{ background: 'linear-gradient(135deg,#06b6d4,#60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              production analytics work.
            </span>
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--muted2)', maxWidth: 580, lineHeight: 1.85 }}>
            Abdul Rasheed's analytics engagements surface the insights that move revenue, compress reporting cycles, and give leadership a real-time view of the business. Explore the charts and findings below.
          </p>
          <div style={{ display: 'flex', gap: '2.5rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
            {[['44%', 'Sales Lift'], ['37%', 'Revenue Gain'], ['30%', 'Faster Reporting'], ['30%', 'Query Speed']].map(([v, l]) => (
              <div key={l}>
                <div style={{ fontSize: '1.8rem', fontWeight: 900, background: 'linear-gradient(135deg,#06b6d4,#60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{v}</div>
                <div style={{ fontSize: '0.73rem', color: 'var(--muted2)', marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Findings Explorer ────────────────────────────── */}
      <section style={{ background: 'var(--bg)' }}>
        <div className="section-inner">
          <span className="sec-tag reveal" style={{ color: 'var(--cyan)' }}>Charts and Findings</span>
          <h2 className="sec-title reveal reveal-delay-1">Explore the results</h2>
          <p className="sec-sub reveal reveal-delay-2">
            Select an engagement to see the actual charts, trends, and insights from the analysis.
          </p>

          <div className="tab-bar reveal reveal-delay-3">
            {FINDINGS.map((fi, i) => (
              <button key={fi.id} className={`tab-btn${activeFinding === i ? ' active' : ''}`}
                onClick={() => setActiveFinding(i)}
                style={activeFinding === i ? { borderColor: fi.color + '66', color: fi.color, background: fi.color + '18' } : {}}>
                {fi.label}
              </button>
            ))}
          </div>

          {/* Finding card */}
          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--rl)', overflow: 'hidden' }} className="reveal">
            <div style={{ height: 3, background: `linear-gradient(90deg, ${f.color}, transparent)` }} />
            <div style={{ padding: '2.5rem' }}>
              <div style={{ fontSize: '0.68rem', fontWeight: 800, color: f.color, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                {f.company}
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 900, lineHeight: 1.2, marginBottom: '1rem' }}>{f.headline}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--muted2)', lineHeight: 1.85, marginBottom: '2rem', maxWidth: 680 }}>{f.finding}</p>

              {/* Charts row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                <div style={{ background: 'var(--card2)', borderRadius: 'var(--r)', border: '1px solid var(--border)', padding: '1.5rem' }}>
                  <BarChart data={f.chart.data} color={f.color} title={f.chart.title} />
                </div>
                <div style={{ background: 'var(--card2)', borderRadius: 'var(--r)', border: '1px solid var(--border)', padding: '1.5rem' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--muted2)', marginBottom: '0.75rem' }}>{f.trendLabel}</div>
                  <SparkLine data={f.trend} color={f.color} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                    <span style={{ fontSize: '0.68rem', color: 'var(--muted)' }}>Start</span>
                    <span style={{ fontSize: '0.68rem', color: 'var(--muted)' }}>End of engagement</span>
                  </div>
                </div>
              </div>

              {/* Key insights */}
              <div style={{ padding: '1.25rem', background: `${f.color}08`, border: `1px solid ${f.color}20`, borderRadius: 'var(--r)' }}>
                <div style={{ fontSize: '0.68rem', fontWeight: 800, color: f.color, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                  Key Insights
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {f.insights.map((ins, i) => (
                    <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                      <span style={{ color: f.color, flexShrink: 0, marginTop: 2, fontWeight: 900 }}>›</span>
                      <span style={{ fontSize: '0.85rem', color: 'var(--muted2)', lineHeight: 1.7 }}>{ins}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Industry impact ──────────────────────────────── */}
      <section className="bg-grid" style={{ background: 'var(--surface)', position: 'relative' }}>
        <div className="section-inner" style={{ position: 'relative' }}>
          <span className="sec-tag reveal" style={{ color: 'var(--cyan)' }}>Industries</span>
          <h2 className="sec-title reveal reveal-delay-1">Where analytics drives the biggest impact</h2>
          <div className="grid-2">
            {[
              { name: 'Retail and Commerce', color: '#06b6d4', impact: 'Pricing intelligence, inventory analytics, promotion optimisation. Transaction data converted into margin gains and customer retention.' },
              { name: 'Finance and Operations', color: '#f59e0b', impact: 'Budget allocation models, cash flow analytics, cost centre visibility. Spend aligned with strategy through real-time dashboards.' },
              { name: 'Manufacturing', color: '#10b981', impact: 'Throughput analytics, defect tracking, supply chain visibility. Data pipelines that surface operational bottlenecks before they escalate.' },
              { name: 'Enterprise SaaS', color: '#a78bfa', impact: 'Product usage analytics, cohort analysis, churn signals. Visibility into where users succeed and where they leave.' },
            ].map((ind, i) => (
              <div key={ind.name} className={`outcome-card reveal reveal-delay-${i + 1}`}>
                <div style={{ width: 36, height: 3, background: ind.color, borderRadius: 2, marginBottom: '1.25rem' }} />
                <div style={{ fontWeight: 800, fontSize: '1rem', marginBottom: '0.5rem' }}>{ind.name}</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--muted2)', lineHeight: 1.8 }}>{ind.impact}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────── */}
      <section style={{ background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
        <div className="orb" style={{ width: 400, height: 400, background: 'var(--cyan)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', opacity: 0.07 }} />
        <div className="section-inner" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', position: 'relative' }}>
          <Link to="/contact" className="btn btn-primary">Discuss your analytics needs</Link>
          <Link to="/data-science" className="btn btn-ghost">Data Science (ML Models)</Link>
          <Link to="/ai-engineering" className="btn btn-ghost">AI Engineering (GenAI)</Link>
        </div>
      </section>
    </>
  )
}
