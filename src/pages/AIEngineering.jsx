import { useEffect, useState, useRef } from 'react'
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

// ── Simulated RAG responses ───────────────────────────────
const RAG_RESPONSES = {
  default: {
    query: null,
    thinking: 'Retrieving from 500+ Texas SNAP regulatory documents…',
    sources: ['Texas SNAP Policy Manual §4.2,Categorical Eligibility', 'USDA FNS Handbook 501, Chapter 3'],
    answer: 'Based on the retrieved policy context, I can answer your question. For detailed eligibility criteria, income thresholds, and benefit calculation, the relevant provisions are outlined in the Texas SNAP Policy Manual with cross-references to federal FNS guidelines.',
    confidence: 0.91,
  },
  income: {
    query: 'What are the income limits for SNAP eligibility in Texas?',
    thinking: 'Querying vector index with hybrid retrieval (FAISS + BM25)…',
    sources: ['Texas SNAP Policy Manual §2.1,Gross Income Limits', 'FNS Table 1: 2024 Income Eligibility Guidelines'],
    answer: 'In Texas, SNAP eligibility requires gross monthly income at or below 130% of the Federal Poverty Level (FPL). For a household of 4, this is approximately $3,250/month (2024 guidelines). Net income must be at or below 100% FPL after deductions. Categorical eligibility may allow households receiving TANF or SSI to bypass standard income tests.',
    confidence: 0.96,
  },
  documents: {
    query: 'What documents do I need to apply for SNAP?',
    thinking: 'Performing semantic + keyword retrieval across application requirements…',
    sources: ['Texas SNAP Application Guide,Required Documentation', 'H1010 Texas Works Advisor Form'],
    answer: 'To apply for SNAP in Texas, you typically need: (1) Proof of identity,government-issued ID or birth certificate. (2) Proof of residency,utility bill or lease agreement. (3) Proof of income,recent pay stubs or employer letter. (4) Social Security numbers for all household members. (5) Immigration documents if applicable. Documentation requirements may vary; the Texas HHS online portal accepts digital submissions.',
    confidence: 0.94,
  },
  benefits: {
    query: 'How are SNAP benefit amounts calculated?',
    thinking: 'Retrieving benefit calculation methodology from policy documents…',
    sources: ['Texas SNAP Policy Manual §6.4,Allotment Calculations', 'FNS Thrifty Food Plan 2024 Update'],
    answer: 'SNAP benefits are calculated as: Maximum Benefit (based on household size) minus 30% of net income = monthly allotment. Net income is gross income minus applicable deductions: standard deduction, earned income deduction (20%), dependent care, shelter costs over 50% of net income, and medical expenses for elderly/disabled members. The 2024 maximum monthly allotment for a family of 4 is $973.',
    confidence: 0.93,
  },
}

const SAMPLE_QUERIES = [
  { key: 'income',    label: 'Income limits for eligibility' },
  { key: 'documents', label: 'Required documents to apply' },
  { key: 'benefits',  label: 'How benefit amounts are calculated' },
]

const PRODUCTION_SYSTEMS = [
  {
    title: 'Enterprise RAG Platform',
    sub: 'for Regulatory Compliance',
    color: '#60a5fa',
    company: 'Personal Project,Texas SNAP Policy',
    problem: 'Navigating 500+ pages of regulatory documents manually creates compliance risk and slows caseworker decisions.',
    solution: 'Production RAG pipeline with hierarchical chunking, metadata-aware embeddings, and hybrid vector + keyword retrieval. Confidence-scoring refusal gates prevent hallucinations in compliance-sensitive contexts.',
    results: [
      { val: '40%', label: 'MRR improvement', detail: 'Hybrid retrieval vs. naive vector search' },
      { val: '500+', label: 'Documents indexed', detail: 'Regulatory + policy corpus, chunked and embedded' },
    ],
    stack: ['Llama 3.0', 'LangChain', 'FAISS', 'Docker', 'AWS EC2'],
  },
  {
    title: 'LLM Fine-tuning Pipeline',
    sub: 'for Enterprise NLP',
    color: '#a78bfa',
    company: 'SF Global,Production System',
    problem: 'General-purpose LLMs produce inconsistent outputs on specialized enterprise NLP tasks,hallucinating domain terminology and failing edge cases.',
    solution: 'End-to-end fine-tuning pipeline using HuggingFace PEFT (QLoRA) on curated enterprise datasets. ONNX export + INT8 quantization deployed to SageMaker with auto-scaling endpoints and CI/CD via GitHub Actions.',
    results: [
      { val: '18%', label: 'Task accuracy gain', detail: 'Production NLP accuracy improvement post-fine-tuning' },
      { val: '25%', label: 'Latency reduction', detail: 'ONNX + INT8 quantization, no accuracy degradation' },
    ],
    stack: ['QLoRA/PEFT', 'HuggingFace', 'ONNX', 'SageMaker', 'GitHub Actions'],
  },
  {
    title: 'AI Data Pipeline & Observability',
    sub: 'Responsible AI Governance',
    color: '#06b6d4',
    company: 'SF Global,Production System',
    problem: 'Models trained on unvalidated data fail silently in production. Without observability, drift goes undetected until it becomes a business problem.',
    solution: 'YAML-driven data pipelines with Pydantic validation, automated benchmarking, and quality gates. Integrated drift detection, prediction logging, and model versioning to enable responsible AI governance post-deployment.',
    results: [
      { val: '35%', label: 'Data integrity gain', detail: 'Downstream model reliability from validated pipelines' },
      { val: '100%', label: 'Governance coverage', detail: 'Full observability: drift, logging, version tracking' },
    ],
    stack: ['Python', 'Pydantic', 'MLflow', 'Docker', 'AWS EC2'],
  },
]

export default function AIEngineering() {
  useReveal()
  const [activeQuery, setActiveQuery] = useState(null)
  const [inputVal, setInputVal] = useState('')
  const [ragState, setRagState] = useState('idle') // idle | thinking | done
  const [ragData, setRagData] = useState(null)
  const inputRef = useRef(null)

  function runQuery(key, label) {
    const response = RAG_RESPONSES[key] || RAG_RESPONSES.default
    setActiveQuery(key)
    setInputVal(label || response.query || '')
    setRagState('thinking')
    setRagData(null)
    setTimeout(() => {
      setRagState('done')
      setRagData(response)
    }, 1800)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!inputVal.trim()) return
    const match = SAMPLE_QUERIES.find(q => inputVal.toLowerCase().includes(q.key))
    runQuery(match?.key || 'default', inputVal)
  }

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <div className="page-hero bg-circuit" style={{ background: 'var(--surface)', overflow: 'hidden', position: 'relative' }}>
        <div className="orb" style={{ width: 600, height: 600, background: 'var(--blue)', top: -200, right: -100 }} />
        <div className="orb" style={{ width: 350, height: 350, background: 'var(--purple)', bottom: -100, left: -50 }} />
        <div className="page-hero-inner" style={{ position: 'relative' }}>
          <span className="sec-tag" style={{ color: 'var(--blue-l)' }}>AI Engineering</span>
          <h1 style={{ fontSize: 'clamp(2.4rem,6vw,4.2rem)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '1.25rem', lineHeight: 1.1, maxWidth: 720 }}>
            I build enterprise AI that{' '}
            <span style={{ background: 'linear-gradient(135deg,#60a5fa,#a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              actually works in production.
            </span>
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--muted2)', maxWidth: 600, lineHeight: 1.85 }}>
            RAG pipelines with hybrid retrieval and refusal gates. Fine-tuned LLMs on enterprise datasets. ML infrastructure with observability and governance. Not demos,shipped systems with measured outcomes.
          </p>
          <div style={{ display: 'flex', gap: '2.5rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
            {[['40%', 'RAG MRR Gain'], ['18%', 'LLM Accuracy Gain'], ['25%', 'Latency Reduction'], ['35%', 'Data Integrity Gain']].map(([v, l]) => (
              <div key={l}>
                <div style={{ fontSize: '1.8rem', fontWeight: 900, background: 'linear-gradient(135deg,#60a5fa,#a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{v}</div>
                <div style={{ fontSize: '0.73rem', color: 'var(--muted2)', marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RAG Demo ─────────────────────────────────────── */}
      <section style={{ background: 'var(--bg)' }}>
        <div className="section-inner">
          <span className="sec-tag reveal" style={{ color: 'var(--blue-l)' }}>Live Demo</span>
          <h2 className="sec-title reveal reveal-delay-1">Query a production RAG system</h2>
          <p className="sec-sub reveal reveal-delay-2">
            This is a simulation of the Texas SNAP Policy RAG system I built,500+ regulatory documents, hybrid retrieval, confidence scoring, and structured citations. Try a query below.
          </p>

          <div className="rag-terminal reveal reveal-delay-3">
            {/* Terminal title bar */}
            <div className="rag-terminal-bar">
              <div className="rag-terminal-dot" style={{ background: '#ff5f57' }} />
              <div className="rag-terminal-dot" style={{ background: '#febc2e' }} />
              <div className="rag-terminal-dot" style={{ background: '#28c840' }} />
              <span style={{ marginLeft: '0.75rem', fontSize: '0.75rem', color: 'var(--muted2)', fontFamily: 'monospace' }}>
                texas-snap-rag · llama-3.0 + faiss · hybrid retrieval
              </span>
            </div>

            {/* Query input */}
            <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--muted)', marginBottom: '0.5rem', fontFamily: 'monospace' }}>
                # Try a sample query or type your own:
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                {SAMPLE_QUERIES.map(q => (
                  <button key={q.key}
                    onClick={() => runQuery(q.key, q.label)}
                    style={{
                      padding: '5px 14px', borderRadius: 6, fontSize: '0.78rem', fontWeight: 600,
                      cursor: 'pointer', border: '1px solid',
                      borderColor: activeQuery === q.key ? '#60a5fa66' : 'var(--border)',
                      background: activeQuery === q.key ? 'rgba(96,165,250,0.12)' : 'var(--card)',
                      color: activeQuery === q.key ? '#60a5fa' : 'var(--muted2)',
                      transition: 'all 0.2s',
                    }}>
                    {q.label}
                  </button>
                ))}
              </div>
              <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  ref={inputRef}
                  value={inputVal}
                  onChange={e => setInputVal(e.target.value)}
                  placeholder="Ask about Texas SNAP policy…"
                  className="form-input"
                  style={{ flex: 1, fontFamily: 'monospace', fontSize: '0.82rem' }}
                />
                <button type="submit" className="btn btn-primary btn-sm" style={{ flexShrink: 0, gap: 6 }}
                  disabled={ragState === 'thinking'}>
                  {ragState === 'thinking' ? <span className="spinner" /> : '→'}
                </button>
              </form>
            </div>

            {/* Output */}
            <div className="rag-output">
              {ragState === 'idle' && (
                <span style={{ color: 'var(--muted)' }}>
                  {'> '}Select a query above or type your own to see the RAG pipeline in action.{'\n'}
                  {'  '}Documents: 500+ Texas SNAP policy files{'\n'}
                  {'  '}Retrieval: Hybrid (FAISS vector + BM25 keyword){'\n'}
                  {'  '}Model: Llama 3.0 · Confidence threshold: 0.85
                </span>
              )}
              {ragState === 'thinking' && (
                <span>
                  <span className="rag-highlight">{'> '}</span>
                  <span className="rag-highlight">
                    {RAG_RESPONSES[activeQuery]?.thinking || 'Retrieving from vector index…'}
                  </span>
                  {'\n\n'}
                  <span style={{ color: 'var(--muted)' }}>⟳ Running hybrid retrieval (FAISS + BM25)…{'\n'}⟳ Scoring and re-ranking top-k chunks…{'\n'}⟳ Generating grounded response…</span>
                </span>
              )}
              {ragState === 'done' && ragData && (
                <span>
                  <span className="rag-highlight">{'> '}</span>
                  <span style={{ color: 'var(--text)', fontWeight: 700 }}>Query:</span>
                  {' '}{inputVal}{'\n\n'}
                  <span className="rag-highlight">Sources retrieved:{'\n'}</span>
                  {ragData.sources.map((s, i) => (
                    <span key={i} className="rag-source">  [{i + 1}] {s}{'\n'}</span>
                  ))}
                  {'\n'}
                  <span className="rag-highlight">Response (confidence: {(ragData.confidence * 100).toFixed(0)}%):{'\n'}</span>
                  <span className="rag-answer">{ragData.answer}</span>
                  {'\n\n'}
                  <span style={{ color: 'var(--muted)', fontSize: '0.72rem' }}>
                    ✓ Confidence gate passed · No hallucination flags · Response grounded in retrieved documents
                  </span>
                </span>
              )}
            </div>
          </div>

          <p style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '1rem', lineHeight: 1.6 }}>
            Simulated responses based on the production RAG architecture. The real system processes live regulatory documents with automated evaluation pipelines and golden dataset benchmarks.
          </p>
        </div>
      </section>

      {/* ── Production Systems ───────────────────────────── */}
      <section className="bg-dots" style={{ background: 'var(--surface)', position: 'relative' }}>
        <div className="section-inner" style={{ position: 'relative' }}>
          <span className="sec-tag reveal" style={{ color: 'var(--blue-l)' }}>What I Build</span>
          <h2 className="sec-title reveal reveal-delay-1">Production AI systems,shipped and measured</h2>
          <p className="sec-sub reveal reveal-delay-2">Every system below is in production. Each metric is verified. No toy models.</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            {PRODUCTION_SYSTEMS.map((sys, i) => (
              <div key={sys.title}
                className={`reveal reveal-delay-${i + 1}`}
                style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--rl)', overflow: 'hidden' }}>
                <div style={{ height: 3, background: `linear-gradient(90deg, ${sys.color}, transparent)` }} />
                <div style={{ padding: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.25rem' }}>
                        <span style={{ fontWeight: 900, fontSize: '1.05rem' }}>{sys.title}</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--muted2)', fontStyle: 'italic' }}>{sys.sub}</span>
                      </div>
                      <span style={{ fontSize: '0.68rem', fontWeight: 700, padding: '2px 10px', borderRadius: 999, background: `${sys.color}15`, color: sys.color, border: `1px solid ${sys.color}30` }}>
                        {sys.company}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                      {sys.results.map(r => (
                        <div key={r.label} style={{ textAlign: 'center', padding: '0.6rem 1rem', background: 'var(--card2)', borderRadius: 10, border: '1px solid var(--border)' }}>
                          <div style={{ fontSize: '1.2rem', fontWeight: 900, color: sys.color }}>{r.val}</div>
                          <div style={{ fontSize: '0.65rem', color: 'var(--muted2)', marginTop: 1 }}>{r.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.25rem' }}>
                    <div>
                      <div style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--pink)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Problem</div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--muted2)', lineHeight: 1.75 }}>{sys.problem}</p>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.68rem', fontWeight: 800, color: sys.color, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Solution</div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--muted2)', lineHeight: 1.75 }}>{sys.solution}</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {sys.stack.map(t => <span key={t} className="tag tag-blue">{t}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────── */}
      <section style={{ background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
        <div className="orb" style={{ width: 400, height: 400, background: 'var(--blue)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', opacity: 0.07 }} />
        <div className="section-inner" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', position: 'relative' }}>
          <Link to="/contact" className="btn btn-primary">Build something with me</Link>
          <Link to="/data-science" className="btn btn-ghost">Data Science</Link>
          <Link to="/data-analytics" className="btn btn-ghost">Data Analytics</Link>
        </div>
      </section>
    </>
  )
}
