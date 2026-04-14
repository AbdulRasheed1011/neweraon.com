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

const CATEGORIES = [
  {
    id: 'analytics',
    label: 'Data Analytics',
    color: '#06b6d4',
    gradFrom: '#0c3340',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
      </svg>
    ),
    tagline: 'SQL, BI tools, and data storytelling that drives decisions',
    posts: [
      {
        title: 'How ML Pricing Models Increased Revenue by 37%',
        category: 'Case Study',
        desc: 'A breakdown of the Scikit-learn pricing optimisation model built for Al-Hashmi Traders, covering feature engineering, customer segmentation, and promotion timing.',
        readTime: '8 min read',
        status: 'published',
      },
      {
        title: 'Building Executive Dashboards That Actually Get Used',
        category: 'Tutorial',
        desc: 'The design decisions behind Tableau dashboards that reduced reporting turnaround by 30%. Covers KPI selection, layout principles, and automation workflows.',
        readTime: '6 min read',
        status: 'coming-soon',
      },
      {
        title: 'SQL Query Optimisation at Scale: Index Tuning and Restructuring',
        category: 'Deep Dive',
        desc: 'Practical techniques for diagnosing and fixing slow queries on large transactional datasets. Covers execution plans, indexing strategies, and query restructuring.',
        readTime: '10 min read',
        status: 'coming-soon',
      },
    ],
  },
  {
    id: 'science',
    label: 'Data Science',
    color: '#a78bfa',
    gradFrom: '#2d1b69',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
        <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/>
      </svg>
    ),
    tagline: 'Classical ML, model development, and real-world deployment',
    posts: [
      {
        title: 'QLoRA Fine-tuning from Scratch: 18% Accuracy Improvement in Production',
        category: 'Tutorial',
        desc: 'End-to-end walkthrough of fine-tuning a transformer model using HuggingFace PEFT and QLoRA. Covers dataset preparation, training config, ONNX export, and SageMaker deployment.',
        readTime: '14 min read',
        status: 'coming-soon',
      },
      {
        title: 'YAML-Driven ML Pipelines with Pydantic Validation',
        category: 'Architecture',
        desc: 'How to build configurable, validated ML training pipelines that improve dataset integrity and make experiment reproduction reliable.',
        readTime: '9 min read',
        status: 'coming-soon',
      },
      {
        title: 'Model Drift Detection: Catching Degradation Before It Costs You',
        category: 'MLOps',
        desc: 'A practical guide to implementing drift detection and prediction logging for production ML models, with examples from real enterprise deployments.',
        readTime: '11 min read',
        status: 'coming-soon',
      },
    ],
  },
  {
    id: 'ai',
    label: 'AI Engineering',
    color: '#60a5fa',
    gradFrom: '#1e3a5f',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
        <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    tagline: 'RAG systems, LLM architecture, and production GenAI',
    posts: [
      {
        title: 'Building a Production RAG System: Hybrid Retrieval and Confidence Scoring',
        category: 'Architecture',
        desc: 'The complete architecture behind the Texas SNAP Policy RAG system. Covers hierarchical chunking, hybrid FAISS + BM25 retrieval, confidence-scoring refusal gates, and evaluation pipelines.',
        readTime: '16 min read',
        status: 'published',
      },
      {
        title: 'Prompt Engineering for Enterprise NLP: Beyond Naive Prompting',
        category: 'Tutorial',
        desc: 'Structured prompt engineering techniques that improve LLM task accuracy in production. Includes chain-of-thought, few-shot formatting, and output validation strategies.',
        readTime: '8 min read',
        status: 'coming-soon',
      },
      {
        title: 'ONNX Quantisation: 25% Latency Reduction with No Accuracy Loss',
        category: 'Optimisation',
        desc: 'A step-by-step guide to exporting transformer models to ONNX and applying INT8 quantisation for production inference. Benchmarks included.',
        readTime: '10 min read',
        status: 'coming-soon',
      },
    ],
  },
]

export default function Learn() {
  useReveal()
  const [activeCategory, setActiveCategory] = useState('ai')

  const cat = CATEGORIES.find(c => c.id === activeCategory)

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <div className="page-hero bg-circuit" style={{ background: 'var(--surface)', overflow: 'hidden', position: 'relative' }}>
        <div className="orb" style={{ width: 500, height: 500, background: 'var(--purple)', top: -150, right: -100 }} />
        <div className="page-hero-inner" style={{ position: 'relative' }}>
          <span className="sec-tag">Learning Hub</span>
          <h1 style={{ fontSize: 'clamp(2.4rem,6vw,4.2rem)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '1.25rem', lineHeight: 1.1, maxWidth: 700 }}>
            Learn{' '}
            <span className="gt">Data Science and Artificial Intelligence and Machine Learning Engineering</span>
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--muted2)', maxWidth: 580, lineHeight: 1.85 }}>
            Articles, tutorials, and deep dives on Data Analytics, Data Science, and Artificial Intelligence and Machine Learning Engineering, written by Abdul Rasheed from direct production experience. No theory without practice.
          </p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
            {CATEGORIES.map(c => (
              <button key={c.id}
                className={`tab-btn${activeCategory === c.id ? ' active' : ''}`}
                onClick={() => setActiveCategory(c.id)}
                style={activeCategory === c.id ? { borderColor: c.color + '66', color: c.color, background: c.color + '18' } : {}}>
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Category posts ───────────────────────────────── */}
      <section style={{ background: 'var(--bg)' }}>
        <div className="section-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }} className="reveal">
            <div style={{ color: cat.color }}>{cat.icon}</div>
            <span className="sec-tag" style={{ color: cat.color, marginBottom: 0 }}>{cat.label}</span>
          </div>
          <p className="sec-sub reveal reveal-delay-1" style={{ marginBottom: '2.5rem' }}>{cat.tagline}</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {cat.posts.map((post, i) => (
              <div key={post.title}
                className={`card reveal reveal-delay-${i + 1}`}
                style={{ padding: '2rem', position: 'relative', overflow: 'hidden', cursor: post.status === 'published' ? 'pointer' : 'default' }}
                onClick={post.status === 'published' ? () => {} : undefined}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: 4, height: '100%', background: post.status === 'published' ? cat.color : 'var(--border)' }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.65rem', fontWeight: 800, padding: '3px 10px', borderRadius: 999, background: `${cat.color}18`, color: cat.color, border: `1px solid ${cat.color}30`, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                      {post.category}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--muted)', fontWeight: 600 }}>
                      {post.readTime}
                    </span>
                  </div>
                  {post.status === 'coming-soon' ? (
                    <span style={{ fontSize: '0.68rem', fontWeight: 700, padding: '3px 10px', borderRadius: 999, background: 'rgba(90,90,144,0.2)', color: 'var(--muted2)', border: '1px solid var(--border)', textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>
                      Coming Soon
                    </span>
                  ) : (
                    <span style={{ fontSize: '0.68rem', fontWeight: 700, padding: '3px 10px', borderRadius: 999, background: 'rgba(16,185,129,0.15)', color: 'var(--green)', border: '1px solid rgba(16,185,129,0.3)', textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>
                      Published
                    </span>
                  )}
                </div>

                <h3 style={{ fontWeight: 900, fontSize: '1.05rem', lineHeight: 1.3, marginBottom: '0.6rem', opacity: post.status === 'coming-soon' ? 0.7 : 1 }}>
                  {post.title}
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--muted2)', lineHeight: 1.8, opacity: post.status === 'coming-soon' ? 0.7 : 1 }}>
                  {post.desc}
                </p>

                {post.status === 'published' && (
                  <div style={{ marginTop: '1.25rem', fontSize: '0.82rem', color: cat.color, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
                    Read article
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="13" height="13">
                      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── All categories overview ──────────────────────── */}
      <section className="bg-grid" style={{ background: 'var(--surface)', position: 'relative' }}>
        <div className="section-inner" style={{ position: 'relative' }}>
          <span className="sec-tag reveal">All Topics</span>
          <h2 className="sec-title reveal reveal-delay-1">Three areas. One engineering practice.</h2>
          <div className="grid-3 reveal reveal-delay-2">
            {CATEGORIES.map(c => (
              <button key={c.id}
                onClick={() => { setActiveCategory(c.id); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                style={{ textAlign: 'left', padding: '2rem', background: `linear-gradient(160deg, ${c.gradFrom}, var(--card))`, border: '1px solid var(--border)', borderRadius: 'var(--rl)', cursor: 'pointer', transition: 'border-color 0.2s, transform 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = c.color + '60'; e.currentTarget.style.transform = 'translateY(-3px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none' }}>
                <div style={{ color: c.color, marginBottom: '1rem' }}>{c.icon}</div>
                <div style={{ fontWeight: 900, fontSize: '1.1rem', marginBottom: '0.4rem' }}>{c.label}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--muted2)', lineHeight: 1.7 }}>{c.tagline}</div>
                <div style={{ marginTop: '1.25rem', fontSize: '0.8rem', color: c.color, fontWeight: 700 }}>
                  {c.posts.filter(p => p.status === 'published').length} published
                  <span style={{ color: 'var(--muted)', fontWeight: 500 }}> / {c.posts.length} planned</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Subscribe / YouTube ─────────────────────────── */}
      <section style={{ background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
        <div className="orb" style={{ width: 400, height: 400, background: 'var(--purple)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', opacity: 0.06 }} />
        <div className="section-inner" style={{ textAlign: 'center', position: 'relative' }}>
          <div style={{ maxWidth: 560, margin: '0 auto' }}>
            <span className="sec-tag reveal" style={{ display: 'block', textAlign: 'center' }}>More Content</span>
            <h2 className="sec-title reveal reveal-delay-1">Video tutorials on YouTube</h2>
            <p style={{ color: 'var(--muted2)', fontSize: '0.97rem', lineHeight: 1.8, marginBottom: '2rem' }} className="reveal reveal-delay-2">
              Abdul publishes video tutorials and engineering breakdowns on the YouTube channel, covering production AI systems, model fine-tuning, and real-world deployment decisions.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }} className="reveal reveal-delay-3">
              <a href="https://www.youtube.com/@AbdulRasheed-q8h" target="_blank" rel="noopener noreferrer"
                className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                Watch on YouTube
              </a>
              <Link to="/contact" className="btn btn-ghost">Get in Touch</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
