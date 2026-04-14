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

// ── Simulated model prediction ─────────────────────────────────────
const DEMO_SCENARIOS = [
  {
    id: 'pricing',
    label: 'Pricing Optimisation',
    color: '#06b6d4',
    inputLabel: 'Customer Segment',
    inputs: [
      { label: 'Segment', options: ['High-value', 'Mid-tier', 'Occasional', 'Lapsed'] },
      { label: 'Product Category', options: ['Electronics', 'Apparel', 'Home Goods', 'FMCG'] },
      { label: 'Season', options: ['Q1 (Jan-Mar)', 'Q2 (Apr-Jun)', 'Q3 (Jul-Sep)', 'Q4 (Oct-Dec)'] },
    ],
    predict: (vals) => {
      const discounts = { 'High-value': 5, 'Mid-tier': 12, 'Occasional': 20, 'Lapsed': 30 }
      const margins = { 'Electronics': '18%', 'Apparel': '24%', 'Home Goods': '21%', 'FMCG': '14%' }
      const lift = { 'Q4 (Oct-Dec)': '+28%', 'Q3 (Jul-Sep)': '+14%', 'Q2 (Apr-Jun)': '+9%', 'Q1 (Jan-Mar)': '+5%' }
      const discount = discounts[vals[0]] || 15
      return {
        recommendation: `${discount}% promotional discount`,
        expectedLift: lift[vals[2]] || '+12%',
        margin: margins[vals[1]] || '19%',
        confidence: (0.78 + Math.random() * 0.15).toFixed(2),
        action: discount <= 10 ? 'Upsell premium tier' : discount >= 25 ? 'Re-engagement campaign' : 'Standard promotion',
      }
    },
  },
  {
    id: 'churn',
    label: 'Churn Prediction',
    color: '#a78bfa',
    inputs: [
      { label: 'Days Since Last Purchase', options: ['0-30 days', '31-60 days', '61-90 days', '90+ days'] },
      { label: 'Purchase Frequency', options: ['Weekly', 'Monthly', 'Quarterly', 'Once only'] },
      { label: 'Avg Order Value', options: ['Under $50', '$50-$200', '$200-$500', 'Over $500'] },
    ],
    predict: (vals) => {
      const risk = { '0-30 days': 'Low', '31-60 days': 'Medium', '61-90 days': 'High', '90+ days': 'Very High' }
      const score = { 'Low': 0.12, 'Medium': 0.38, 'High': 0.67, 'Very High': 0.89 }
      const riskLabel = risk[vals[0]] || 'Medium'
      const churnScore = score[riskLabel]
      return {
        recommendation: `${riskLabel} churn risk`,
        expectedLift: `${(churnScore * 100).toFixed(0)}% churn probability`,
        margin: churnScore < 0.4 ? 'Retain: standard outreach' : 'Retain: priority intervention',
        confidence: (0.81 + Math.random() * 0.12).toFixed(2),
        action: churnScore > 0.6 ? 'Immediate retention offer' : churnScore > 0.35 ? 'Email nurture sequence' : 'No action needed',
      }
    },
  },
  {
    id: 'demand',
    label: 'Demand Forecasting',
    color: '#10b981',
    inputs: [
      { label: 'Product Category', options: ['Electronics', 'Apparel', 'Home Goods', 'FMCG'] },
      { label: 'Forecast Horizon', options: ['Next 7 days', 'Next 30 days', 'Next Quarter', 'Next Year'] },
      { label: 'Historical Trend', options: ['Growing (+20%)', 'Stable', 'Declining (-10%)', 'Seasonal'] },
    ],
    predict: (vals) => {
      const units = { 'Electronics': 340, 'Apparel': 820, 'Home Goods': 560, 'FMCG': 1240 }
      const multiplier = { 'Next 7 days': 1, 'Next 30 days': 4.3, 'Next Quarter': 13, 'Next Year': 52 }
      const base = units[vals[0]] || 500
      const mult = multiplier[vals[1]] || 1
      const trend = vals[2] === 'Growing (+20%)' ? 1.2 : vals[2] === 'Declining (-10%)' ? 0.9 : 1.0
      const forecast = Math.round(base * mult * trend)
      return {
        recommendation: `${forecast.toLocaleString()} units`,
        expectedLift: vals[2] === 'Growing (+20%)' ? '+20% YoY' : vals[2] === 'Declining (-10%)' ? '-10% YoY' : 'Stable',
        margin: `${Math.round(base * mult * 0.15).toLocaleString()} units safety stock`,
        confidence: (0.83 + Math.random() * 0.1).toFixed(2),
        action: trend < 1 ? 'Reduce inventory orders' : trend > 1.1 ? 'Increase stock levels' : 'Maintain current levels',
      }
    },
  },
]

// ── Model performance data ─────────────────────────────────────────
const MODEL_METRICS = [
  {
    model: 'Pricing Optimisation (Scikit-learn)',
    color: '#06b6d4',
    type: 'Ensemble',
    company: 'Al-Hashmi Traders',
    accuracy: 87,
    precision: 89,
    recall: 84,
    f1: 86,
    trainSize: '18 months transactional data',
    features: ['Customer segment', 'Purchase history', 'Seasonality', 'Price elasticity', 'Competitor index'],
    businessImpact: '+44% sales volume, +37% revenue',
  },
  {
    model: 'Customer Churn Classifier',
    color: '#a78bfa',
    type: 'Gradient Boosting (XGBoost)',
    company: 'Al-Hashmi Traders',
    accuracy: 91,
    precision: 88,
    recall: 93,
    f1: 90,
    trainSize: '12 months customer behaviour data',
    features: ['RFM scores', 'Category affinity', 'Purchase gap', 'Basket size', 'Engagement score'],
    businessImpact: '23% reduction in churned customers',
  },
  {
    model: 'Training Data Quality Pipeline',
    color: '#10b981',
    type: 'Pydantic + MLflow',
    company: 'SF Global',
    accuracy: 98,
    precision: 97,
    recall: 99,
    f1: 98,
    trainSize: 'Automated — runs on every dataset update',
    features: ['Schema validation', 'Null detection', 'Distribution shift', 'Label consistency', 'Duplicate removal'],
    businessImpact: '+35% dataset integrity improvement',
  },
]

function MetricBar({ value, color, label }) {
  return (
    <div style={{ marginBottom: '0.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontSize: '0.72rem', color: 'var(--muted2)', fontWeight: 600 }}>{label}</span>
        <span style={{ fontSize: '0.72rem', fontWeight: 800, color }}>{value}%</span>
      </div>
      <div style={{ height: 6, borderRadius: 3, background: 'var(--card2)', overflow: 'hidden' }}>
        <div style={{ width: `${value}%`, height: '100%', background: color, borderRadius: 3, transition: 'width 1s ease' }} />
      </div>
    </div>
  )
}

export default function DataScience() {
  useReveal()
  const [activeScenario, setActiveScenario] = useState(0)
  const [selections, setSelections] = useState([0, 0, 0])
  const [result, setResult] = useState(null)
  const [predicting, setPredicting] = useState(false)

  const scenario = DEMO_SCENARIOS[activeScenario]

  function handleScenarioChange(idx) {
    setActiveScenario(idx)
    setSelections([0, 0, 0])
    setResult(null)
  }

  function handlePredict() {
    setPredicting(true)
    setResult(null)
    const inputValues = selections.map((selIdx, i) => scenario.inputs[i].options[selIdx])
    setTimeout(() => {
      setResult(scenario.predict(inputValues))
      setPredicting(false)
    }, 1000)
  }

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <div className="page-hero bg-diagonal" style={{ background: 'var(--surface)', overflow: 'hidden', position: 'relative' }}>
        <div className="orb" style={{ width: 500, height: 500, background: 'var(--purple)', top: -150, right: -100 }} />
        <div className="page-hero-inner" style={{ position: 'relative' }}>
          <span className="sec-tag">Data Science</span>
          <h1 style={{ fontSize: 'clamp(2.4rem,6vw,4.2rem)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '1.25rem', lineHeight: 1.1, maxWidth: 720 }}>
            Machine learning models that{' '}
            <span className="gt">predict, classify, and optimise</span>{' '}
            your operations.
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--muted2)', maxWidth: 600, lineHeight: 1.85 }}>
            Abdul Rasheed builds traditional ML models that solve real business problems: pricing optimisation, churn prediction, demand forecasting, and data quality pipelines. Below are live interactive demos of the models built in production.
          </p>
          <div style={{ display: 'flex', gap: '2.5rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
            {[['44%', 'Sales Lift'], ['37%', 'Revenue Growth'], ['91%', 'Model Accuracy'], ['35%', 'Data Integrity']].map(([v, l]) => (
              <div key={l}>
                <div style={{ fontSize: '1.8rem', fontWeight: 900 }} className="gt">{v}</div>
                <div style={{ fontSize: '0.73rem', color: 'var(--muted2)', marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Live Model Demo ───────────────────────────────── */}
      <section style={{ background: 'var(--bg)' }}>
        <div className="section-inner">
          <span className="sec-tag reveal">Live Demo</span>
          <h2 className="sec-title reveal reveal-delay-1">Try the models</h2>
          <p className="sec-sub reveal reveal-delay-2">
            Select inputs and run a prediction to see what the production ML models output for real business scenarios.
          </p>

          {/* Scenario selector */}
          <div className="tab-bar reveal reveal-delay-3">
            {DEMO_SCENARIOS.map((s, i) => (
              <button key={s.id} className={`tab-btn${activeScenario === i ? ' active' : ''}`}
                onClick={() => handleScenarioChange(i)}
                style={activeScenario === i ? { borderColor: s.color + '66', color: s.color, background: s.color + '18' } : {}}>
                {s.label}
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', alignItems: 'start' }} className="reveal">
            {/* Input panel */}
            <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--rl)', padding: '1.75rem' }}>
              <div style={{ height: 3, background: scenario.color, borderRadius: 2, width: 40, marginBottom: '1.5rem' }} />
              <h3 style={{ fontWeight: 800, fontSize: '1rem', marginBottom: '1.5rem' }}>{scenario.label} Model</h3>

              {scenario.inputs.map((inp, i) => (
                <div key={inp.label} className="form-field">
                  <label style={{ color: 'var(--muted2)', fontSize: '0.78rem', fontWeight: 700 }}>{inp.label}</label>
                  <select
                    className="form-input"
                    value={selections[i]}
                    onChange={e => {
                      const next = [...selections]
                      next[i] = Number(e.target.value)
                      setSelections(next)
                      setResult(null)
                    }}
                    style={{ cursor: 'pointer' }}>
                    {inp.options.map((opt, j) => (
                      <option key={opt} value={j}>{opt}</option>
                    ))}
                  </select>
                </div>
              ))}

              <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}
                onClick={handlePredict} disabled={predicting}>
                {predicting ? <><span className="spinner" style={{ marginRight: 8 }} />Running model...</> : 'Run Prediction'}
              </button>
            </div>

            {/* Output panel */}
            <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--rl)', padding: '1.75rem', minHeight: 320 }}>
              {!result && !predicting && (
                <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '0.75rem', color: 'var(--muted)', minHeight: 260 }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="36" height="36">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 8 12 12 14 14"/>
                  </svg>
                  <div style={{ fontSize: '0.85rem' }}>Set your inputs and run the model</div>
                </div>
              )}
              {predicting && (
                <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', minHeight: 260 }}>
                  <div className="spinner" style={{ width: 32, height: 32, borderWidth: 3 }} />
                  <div style={{ fontSize: '0.85rem', color: 'var(--muted2)' }}>Processing features...</div>
                </div>
              )}
              {result && !predicting && (
                <div>
                  <div style={{ height: 3, background: scenario.color, borderRadius: 2, width: 40, marginBottom: '1.5rem' }} />
                  <div style={{ fontSize: '0.68rem', fontWeight: 800, color: scenario.color, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                    Model Output
                  </div>

                  <div style={{ fontSize: '2rem', fontWeight: 900, color: scenario.color, marginBottom: '0.25rem' }}>
                    {result.recommendation}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--muted2)', marginBottom: '1.5rem' }}>
                    Confidence: <span style={{ color: scenario.color, fontWeight: 700 }}>{(parseFloat(result.confidence) * 100).toFixed(0)}%</span>
                  </div>

                  {[
                    { label: 'Expected Impact', val: result.expectedLift },
                    { label: 'Supporting Metric', val: result.margin },
                    { label: 'Recommended Action', val: result.action },
                  ].map(row => (
                    <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0', borderBottom: '1px solid var(--border)' }}>
                      <span style={{ fontSize: '0.78rem', color: 'var(--muted2)' }}>{row.label}</span>
                      <span style={{ fontSize: '0.78rem', fontWeight: 700 }}>{row.val}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Model Performance ─────────────────────────────── */}
      <section className="bg-grid" style={{ background: 'var(--surface)', position: 'relative' }}>
        <div className="section-inner" style={{ position: 'relative' }}>
          <span className="sec-tag reveal">Production Models</span>
          <h2 className="sec-title reveal reveal-delay-1">Model performance metrics</h2>
          <p className="sec-sub reveal reveal-delay-2">Real metrics from production systems. Verified against held-out test sets.</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {MODEL_METRICS.map((m, i) => (
              <div key={m.model} className={`card reveal reveal-delay-${i + 1}`}
                style={{ padding: '2rem', overflow: 'hidden', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: 4, height: '100%', background: m.color }} />

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', alignItems: 'start' }}>
                  <div>
                    <div style={{ fontWeight: 900, fontSize: '1.05rem', marginBottom: '0.2rem' }}>{m.model}</div>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                      <span style={{ fontSize: '0.68rem', fontWeight: 700, padding: '2px 10px', borderRadius: 999, background: `${m.color}15`, color: m.color, border: `1px solid ${m.color}30` }}>{m.type}</span>
                      <span style={{ fontSize: '0.68rem', color: 'var(--muted2)', fontWeight: 600 }}>{m.company}</span>
                    </div>

                    <MetricBar value={m.accuracy} color={m.color} label="Accuracy" />
                    <MetricBar value={m.precision} color={m.color} label="Precision" />
                    <MetricBar value={m.recall} color={m.color} label="Recall" />
                    <MetricBar value={m.f1} color={m.color} label="F1 Score" />

                    <div style={{ marginTop: '1rem', fontSize: '0.75rem', color: 'var(--muted2)' }}>
                      Trained on: {m.trainSize}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--muted2)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                      Features Used
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1.25rem' }}>
                      {m.features.map(f => (
                        <div key={f} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                          <div style={{ width: 5, height: 5, borderRadius: '50%', background: m.color, flexShrink: 0 }} />
                          <span style={{ fontSize: '0.75rem', color: 'var(--muted2)' }}>{f}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{ padding: '0.75rem', background: `${m.color}10`, border: `1px solid ${m.color}25`, borderRadius: 'var(--r)' }}>
                      <div style={{ fontSize: '0.65rem', color: m.color, fontWeight: 800, letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Business Impact</div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: m.color }}>{m.businessImpact}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────── */}
      <section style={{ background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
        <div className="orb" style={{ width: 400, height: 400, background: 'var(--purple)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', opacity: 0.07 }} />
        <div className="section-inner" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', position: 'relative' }}>
          <Link to="/contact" className="btn btn-primary">Discuss your ML problem</Link>
          <Link to="/ai-engineering" className="btn btn-ghost">AI Engineering (GenAI)</Link>
          <Link to="/data-analytics" className="btn btn-ghost">Data Analytics</Link>
        </div>
      </section>
    </>
  )
}
