import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const ROLES = ['AI/ML Engineer', 'LLM Systems Builder', 'RAG Architect', 'MLOps Engineer']

const SPECIALTIES = [
  {
    to: '/ai-engineering',
    color: '#60a5fa',
    gradFrom: '#1e3a5f', gradTo: '#0f2040',
    title: 'AI Engineering',
    desc: 'Production LLM systems, RAG pipelines, fine-tuning (QLoRA/PEFT), responsible AI, and cloud-native deployment at enterprise scale.',
    tags: ['LangChain', 'RAG', 'FastAPI', 'AWS'],
    label: 'Primary Focus',
  },
  {
    to: '/data-science',
    color: '#a78bfa',
    gradFrom: '#2d1b69', gradTo: '#1a0f40',
    title: 'Data Science',
    desc: 'End-to-end ML model development — classification, regression, NLP, and deep learning with PyTorch and HuggingFace.',
    tags: ['PyTorch', 'Scikit-learn', 'HuggingFace', 'MLflow'],
    label: 'Core Skill',
  },
  {
    to: '/data-analytics',
    color: '#06b6d4',
    gradFrom: '#0c3340', gradTo: '#061a20',
    title: 'Data Analytics',
    desc: 'SQL, Python, and BI tools to transform raw data into actionable business intelligence — dashboards, pipelines, and insights.',
    tags: ['SQL', 'Python', 'Tableau', 'dbt'],
    label: 'Foundation',
  },
]

const PROJECTS = [
  {
    title: 'Texas SNAP Policy RAG System',
    company: 'Personal Project',
    desc: 'Production RAG pipeline over 500+ regulatory documents using Llama 3.0, LangChain, FAISS with hybrid retrieval — achieving 40% MRR improvement and confidence-scoring refusal gates.',
    tags: ['Llama 3.0', 'LangChain', 'FAISS', 'Docker', 'AWS'],
    metric: '40% MRR improvement',
    color: '#60a5fa',
    github: 'https://github.com/AbdulRasheed1011',
  },
  {
    title: 'Enterprise LLM Fine-tuning Pipeline',
    company: 'SF Global',
    desc: 'Fine-tuned transformer-based LLMs using HuggingFace PEFT (QLoRA) and structured prompt engineering — improving production task accuracy by 18% with ONNX/INT8 optimization.',
    tags: ['QLoRA', 'PEFT', 'PyTorch', 'HuggingFace', 'ONNX'],
    metric: '18% accuracy improvement',
    color: '#a78bfa',
    github: 'https://github.com/AbdulRasheed1011',
  },
  {
    title: 'ML-Driven Pricing Optimisation',
    company: 'Al-Hashmi Traders',
    desc: 'Machine learning–driven promotion and pricing models using Scikit-learn and statistical segmentation — growing sales by 44% and revenue by 37%.',
    tags: ['Scikit-learn', 'Python', 'SQL', 'Tableau'],
    metric: '44% sales increase',
    color: '#06b6d4',
    github: 'https://github.com/AbdulRasheed1011',
  },
]

const TICKER_ITEMS = [
  'PyTorch', 'LangChain', 'RAG', 'FAISS', 'QLoRA/PEFT', 'FastAPI',
  'Docker', 'AWS SageMaker', 'HuggingFace', 'MLflow', 'Kubernetes',
  'Python', 'Spring Boot', 'Pinecone', 'LLMs', 'Responsible AI',
]

function useTypewriter(words, speed = 85, pause = 2200) {
  const [text, setText]    = useState('')
  const [wIdx, setWIdx]    = useState(0)
  const [deleting, setDel] = useState(false)
  useEffect(() => {
    const word = words[wIdx]
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(word.slice(0, text.length + 1))
        if (text.length + 1 === word.length) setTimeout(() => setDel(true), pause)
      } else {
        setText(word.slice(0, text.length - 1))
        if (text.length - 1 === 0) { setDel(false); setWIdx((wIdx + 1) % words.length) }
      }
    }, deleting ? speed / 2 : speed)
    return () => clearTimeout(timeout)
  }, [text, deleting, wIdx, words, speed, pause])
  return text
}

function useReveal() {
  useEffect(() => {
    const run = () => {
      document.querySelectorAll('.reveal').forEach(el => {
        const obs = new IntersectionObserver(entries => {
          entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
        }, { threshold: 0.1 })
        obs.observe(el)
      })
    }
    run()
  }, [])
}

// ── Avatar — uses real photo if available, falls back to initials ──
function Avatar({ size = 260 }) {
  const [loaded, setLoaded] = useState(true)
  return (
    <div style={{ position: 'relative', flexShrink: 0 }}>
      {loaded ? (
        <>
          <img
            src="photo.jpg"
            alt="Abdul Rasheed"
            className="avatar-photo"
            style={{ width: size, height: size }}
            onError={() => setLoaded(false)}
          />
          <div style={{
            position: 'absolute', inset: -10, borderRadius: '50%',
            border: '1px dashed rgba(124,58,237,0.35)', pointerEvents: 'none',
          }} />
        </>
      ) : (
        <div style={{
          width: size, height: size, borderRadius: '50%',
          background: 'linear-gradient(135deg, #1e1e3a, #0d0d1f)',
          border: '2px solid var(--border-h)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          position: 'relative', flexShrink: 0,
          boxShadow: '0 0 60px rgba(124,58,237,0.15)',
        }}>
          <div style={{ fontSize: size * 0.28, fontWeight: 900, letterSpacing: -2, lineHeight: 1 }} className="gt">AR</div>
          <div style={{ fontSize: size * 0.06, color: 'var(--muted2)', marginTop: 6, fontWeight: 600 }}>Abdul Rasheed</div>
          <div style={{ position: 'absolute', inset: -12, borderRadius: '50%', border: '1px dashed var(--border)', pointerEvents: 'none' }} />
        </div>
      )}
    </div>
  )
}

export default function Home() {
  const role = useTypewriter(ROLES)
  useReveal()

  return (
    <>
      {/* ── Hero ───────────────────────────────────────── */}
      <section className="bg-dots" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: 'var(--nav)', position: 'relative', overflow: 'hidden' }}>
        <div className="orb" style={{ width: 700, height: 700, background: 'var(--purple)', top: -250, left: -200 }} />
        <div className="orb" style={{ width: 500, height: 500, background: 'var(--blue)', bottom: -150, right: -150 }} />

        <div className="container" style={{ width: '100%', paddingTop: '5rem', paddingBottom: '5rem', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4rem', flexWrap: 'wrap' }}>

            {/* Text */}
            <div style={{ flex: 1, minWidth: 300 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 999, border: '1px solid var(--border)', background: 'rgba(255,255,255,0.03)', fontSize: '0.78rem', color: 'var(--muted2)', marginBottom: '2rem', letterSpacing: '0.5px' }}>
                <span className="dot-green" style={{ flexShrink: 0 }} />
                Available for new opportunities · Dallas, TX
              </div>

              <h1 style={{ fontSize: 'clamp(2.8rem,7vw,5.5rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: '1.25rem' }}>
                Abdul Rasheed
              </h1>

              <div style={{ fontSize: 'clamp(1.1rem,2.5vw,1.6rem)', fontWeight: 700, color: 'var(--muted2)', marginBottom: '1.5rem', minHeight: '2rem' }}>
                {role}<span style={{ color: 'var(--purple-l)', animation: 'blink 1s step-end infinite' }}>|</span>
              </div>

              <p style={{ fontSize: '1rem', color: 'var(--muted2)', maxWidth: 520, marginBottom: '2.5rem', lineHeight: 1.8 }}>
                Artificial Intelligence and Machine Learning Engineer with 3+ years building enterprise-grade intelligent systems, from fine-tuned LLMs and production RAG pipelines to scalable ML deployment on AWS.
              </p>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
                <Link to="/ai-engineering" className="btn btn-primary">View My Work</Link>
                <Link to="/contact" className="btn btn-outline">Get In Touch</Link>
                <a href="https://github.com/AbdulRasheed1011" target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                  GitHub
                </a>
              </div>

              {/* Stats */}
              <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap' }}>
                {[['3+', "Years' Experience"], ['2', 'Companies'], ['40%', 'RAG MRR Gain'], ['18%', 'LLM Accuracy Gain']].map(([n, l]) => (
                  <div key={l}>
                    <div style={{ fontSize: '1.8rem', fontWeight: 900 }} className="gt">{n}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--muted2)', marginTop: 2, lineHeight: 1.3 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Avatar */}
            <div style={{ flexShrink: 0 }} className="reveal reveal-delay-2">
              <Avatar size={260} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Ticker ─────────────────────────────────────── */}
      <div style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}>
        <div className="ticker-wrap">
          <div className="ticker-inner">
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
              <span key={i} className="ticker-item">{item}<span className="ticker-dot" /></span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Specialties ────────────────────────────────── */}
      <section style={{ background: 'var(--surface)' }}>
        <div className="section-inner">
          <span className="sec-tag reveal">Expertise</span>
          <h2 className="sec-title reveal reveal-delay-1">Three Areas of Depth</h2>
          <p className="sec-sub reveal reveal-delay-2">From LLM fine-tuning and RAG architecture to analytics pipelines and production deployment. Full-stack AI capability across the enterprise.</p>

          <div className="grid-3">
            {SPECIALTIES.map((s, i) => (
              <Link to={s.to} key={s.title} style={{ textDecoration: 'none' }}>
                <div className={`card card-glow reveal reveal-delay-${i + 1}`}
                  style={{ padding: '2rem', height: '100%', cursor: 'pointer', background: `linear-gradient(160deg, ${s.gradFrom}, ${s.gradTo})` }}>
                  <div style={{ display: 'inline-block', padding: '4px 12px', borderRadius: 6, background: `${s.color}22`, border: `1px solid ${s.color}44`, fontSize: '0.68rem', fontWeight: 800, color: s.color, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
                    {s.label}
                  </div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.6rem' }}>{s.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--muted2)', lineHeight: 1.75, marginBottom: '1.25rem' }}>{s.desc}</p>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {s.tags.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                  <div style={{ marginTop: '1.5rem', fontSize: '0.82rem', color: s.color, fontWeight: 700 }}>Explore →</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Projects ───────────────────────────────────── */}
      <section>
        <div className="section-inner">
          <span className="sec-tag reveal">Projects</span>
          <h2 className="sec-title reveal reveal-delay-1">Real Work. Measurable Results.</h2>
          <p className="sec-sub reveal reveal-delay-2">Production systems with quantified outcomes. Not demos, not toy models.</p>

          <div className="grid-3">
            {PROJECTS.map((p, i) => (
              <div key={p.title} className={`card card-glow reveal reveal-delay-${i + 1}`} style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--muted2)', textTransform: 'uppercase', letterSpacing: '1px' }}>{p.company}</div>
                  <a href={p.github} target="_blank" rel="noopener noreferrer"
                    style={{ color: 'var(--muted2)', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--muted2)'}>
                    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                  </a>
                </div>
                <div style={{ fontWeight: 800, fontSize: '1rem', lineHeight: 1.3 }}>{p.title}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--muted2)', lineHeight: 1.75, flex: 1 }}>{p.desc}</div>
                {/* Metric pill */}
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 999, background: `${p.color}15`, border: `1px solid ${p.color}35`, fontSize: '0.75rem', fontWeight: 700, color: p.color, alignSelf: 'flex-start' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="12" height="12"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
                  {p.metric}
                </div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/ai-engineering" className="btn btn-outline">See All Projects</Link>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────── */}
      <section style={{ background: 'var(--surface)', position: 'relative', overflow: 'hidden' }}>
        <div className="orb" style={{ width: 500, height: 500, background: 'var(--purple)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', opacity: 0.08 }} />
        <div className="section-inner" style={{ textAlign: 'center', position: 'relative' }}>
          <div style={{ maxWidth: 620, margin: '0 auto' }}>
            <span className="sec-tag reveal" style={{ display: 'block', textAlign: 'center' }}>Open to Opportunities</span>
            <h2 className="sec-title reveal reveal-delay-1">
              Building <span className="gt">intelligent systems</span> that ship.
            </h2>
            <p style={{ color: 'var(--muted2)', marginBottom: '2.5rem', fontSize: '1rem', lineHeight: 1.8 }} className="reveal reveal-delay-2">
              Whether your team needs a production RAG system, fine-tuned LLM, or an end-to-end ML pipeline, Abdul Rasheed brings the engineering depth to deliver it.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }} className="reveal reveal-delay-3">
              <Link to="/contact" className="btn btn-primary">Start a Conversation</Link>
              <a href="https://www.linkedin.com/in/abdul-rasheed-12382b196/" target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
