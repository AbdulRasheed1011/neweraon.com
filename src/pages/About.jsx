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

const TIMELINE = [
  {
    period: 'Feb 2024 - Present',
    role: 'Artificial Intelligence and Machine Learning Engineer',
    company: 'SF Global, Dallas, Texas',
    points: [
      'Designed enterprise AI services with Python and FastAPI, integrating transformer-based LLMs into production systems following Agile/SCRUM practices.',
      'Fine-tuned LLMs using HuggingFace PEFT (QLoRA) and PyTorch, improving task accuracy by 18% in production workflows.',
      'Built RAG systems with FAISS and hybrid retrieval, improving grounded response precision by 40% MRR.',
      'Containerised AI services with Docker, deployed on AWS (EC2, S3, SageMaker) with CI/CD via GitHub Actions, reducing inference latency by 25% via ONNX and INT8 quantization.',
      'Implemented model observability, drift detection, and monitoring pipelines enabling post-deployment governance.',
    ],
  },
  {
    period: 'Jul 2021 - Dec 2022',
    role: 'Data Analyst',
    company: 'Al-Hashmi Traders, Hyderabad, Telangana',
    points: [
      'Increased sales by 44% and revenue by 37% through ML-driven promotion and pricing optimisation models using Scikit-learn.',
      'Optimised SQL query performance for large transactional datasets, reducing reporting turnaround by 30%.',
      'Developed executive dashboards in Tableau and automated reporting workflows to accelerate decision-making.',
    ],
  },
]

const EDUCATION = [
  {
    degree: 'M.S. Information Technology and Management',
    school: 'Campbellsville University',
    location: 'Campbellsville, KY, USA',
    period: 'Jan 2023 - Dec 2024',
    gpa: 'GPA: 3.916 / 4.0',
    color: 'var(--purple-l)',
  },
  {
    degree: 'B.E. Mechanical Engineering',
    school: 'Osmania University',
    location: 'Hyderabad, India',
    period: 'Aug 2017 - Jul 2021',
    gpa: 'GPA: 3.3 / 4.0',
    color: 'var(--cyan)',
  },
]

const CERTS = [
  {
    name: 'Deep Learning Specialization',
    issuer: 'DeepLearning.ai',
    period: 'Sept - Dec 2025',
    color: 'var(--blue-l)',
    href: 'https://www.coursera.org/account/accomplishments/specialization/certificate/',
    linkLabel: 'View on Coursera',
  },
  {
    name: 'Complete Machine Learning and Data Science',
    issuer: 'Geeks For Geeks',
    period: 'Aug 2023 - Jul 2024',
    color: 'var(--green)',
    href: 'https://www.geeksforgeeks.org/certificate/validation/',
    linkLabel: 'View on GFG',
  },
  {
    name: 'Python for Everybody',
    issuer: 'Coursera',
    period: 'Jan - Apr 2023',
    color: 'var(--orange)',
    href: 'https://www.coursera.org/account/accomplishments/certificate/',
    linkLabel: 'View on Coursera',
  },
]

const PRINCIPLES = [
  { title: 'Production First', desc: 'A model that lives in a notebook is not a model. Every system Abdul builds is designed to be deployed, monitored, and maintained.' },
  { title: 'Responsible AI', desc: 'Guardrails, drift detection, and governance frameworks are not optional. They are part of the architecture from day one.' },
  { title: 'Measurable Impact', desc: 'Every project is tied to a metric. 40% MRR gain. 18% accuracy improvement. 25% latency reduction. Results, not activity.' },
  { title: 'Domain-Driven Design', desc: 'AI systems are aligned to the business domain, not the other way around. Enterprise context shapes every architecture decision.' },
]

// Photo — uses real photo.jpg, falls back to initials card
function Photo() {
  const [loaded, setLoaded] = useState(true)
  if (loaded) {
    return (
      <div className="photo-frame" style={{ width: 320, height: 380, flexShrink: 0 }}>
        <img src="photo.jpg" alt="Abdul Rasheed" onError={() => setLoaded(false)} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 60%, rgba(6,6,14,0.4) 100%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '1.25rem', left: '1.25rem', right: '1.25rem' }}>
          <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>Abdul Rasheed</div>
          <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.7)' }}>AI/ML Engineer · Dallas, TX</div>
        </div>
      </div>
    )
  }
  return (
    <div style={{
      width: 320, height: 380, borderRadius: 20,
      background: 'linear-gradient(160deg, #1a1a2e, #0d0d1f)',
      border: '1px solid var(--border-h)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: '0.75rem', flexShrink: 0,
      boxShadow: '0 20px 60px rgba(124,58,237,0.12)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, var(--purple), var(--cyan))' }} />
      <div style={{ fontSize: '4.5rem', fontWeight: 900, letterSpacing: -3 }} className="gt">AR</div>
      <div style={{ textAlign: 'center', padding: '0 1.5rem' }}>
        <div style={{ fontWeight: 800, fontSize: '1rem', marginBottom: 4 }}>Abdul Rasheed</div>
        <div style={{ fontSize: '0.8rem', color: 'var(--muted2)' }}>AI/ML Engineer · Dallas, TX</div>
      </div>
    </div>
  )
}

export default function About() {
  useReveal()
  return (
    <>
      {/* ── Page Hero ──────────────────────────────────── */}
      <div className="page-hero" style={{ background: 'var(--surface)', overflow: 'hidden', position: 'relative' }}>
        <div className="orb" style={{ width: 600, height: 600, background: 'var(--purple)', top: -200, right: -100 }} />
        <div className="page-hero-inner">
          <span className="sec-tag">About Me</span>
          <h1 style={{ fontSize: 'clamp(2.2rem,5.5vw,4rem)', fontWeight: 900, letterSpacing: '-0.03em', maxWidth: 720, marginBottom: '1.25rem', lineHeight: 1.1 }}>
            Engineering Intelligence.<br />
            <span className="gt">Shipping Impact.</span>
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--muted2)', maxWidth: 580, lineHeight: 1.8 }}>
            AI/ML Engineer with 3+ years delivering enterprise-grade LLM systems, RAG pipelines, and production ML at scale — with a track record of measurable outcomes on every engagement.
          </p>
        </div>
      </div>

      {/* ── Bio + Photo ─────────────────────────────────── */}
      <section>
        <div className="section-inner">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '4rem', alignItems: 'start' }}>
            <div className="reveal">
              <span className="sec-tag">Background</span>
              <h2 style={{ fontSize: 'clamp(1.8rem,3vw,2.4rem)', fontWeight: 900, marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>
                From data pipelines to deployed AI systems
              </h2>
              <p style={{ color: 'var(--muted2)', lineHeight: 1.9, marginBottom: '1.1rem', fontSize: '0.97rem' }}>
                Abdul Rasheed is an Artificial Intelligence and Machine Learning Engineer currently at SF Global in Dallas, TX, where he architects and ships enterprise AI services: fine-tuning LLMs, building production RAG pipelines, and deploying scalable ML infrastructure on AWS.
              </p>
              <p style={{ color: 'var(--muted2)', lineHeight: 1.9, marginBottom: '1.1rem', fontSize: '0.97rem' }}>
                His work spans the full AI engineering lifecycle, from data pipeline design and model fine-tuning, to RAG architecture with vector databases, to containerised deployment with observability, drift detection, and governance frameworks that keep models trustworthy in production.
              </p>
              <p style={{ color: 'var(--muted2)', lineHeight: 1.9, fontSize: '0.97rem', marginBottom: '2rem' }}>
                Abdul holds an MS in Information Technology and Management from Campbellsville University (GPA: 3.916/4.0) and creates AI engineering content on YouTube, sharing the decisions behind real production systems.
              </p>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link to="/contact" className="btn btn-primary">Work With Me</Link>
                <a href="https://www.linkedin.com/in/abdul-rasheed-12382b196/" target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  LinkedIn
                </a>
                <a href="https://www.youtube.com/@AbdulRasheed-q8h" target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  YouTube
                </a>
              </div>
            </div>

            <div className="reveal reveal-delay-2" style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Photo />
            </div>
          </div>
        </div>
      </section>

      {/* ── Engineering Principles ───────────────────────── */}
      <section style={{ background: 'var(--surface)' }}>
        <div className="section-inner">
          <span className="sec-tag reveal">How I Work</span>
          <h2 className="sec-title reveal reveal-delay-1">Engineering Principles</h2>
          <p className="sec-sub reveal reveal-delay-2">The values that shape every system I build.</p>
          <div className="grid-4 reveal reveal-delay-3">
            {PRINCIPLES.map(p => (
              <div key={p.title} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--r)', padding: '1.5rem' }}>
                <div style={{ width: 40, height: 3, background: 'linear-gradient(90deg, var(--purple), var(--cyan))', borderRadius: 2, marginBottom: '1rem' }} />
                <div style={{ fontWeight: 800, fontSize: '0.95rem', marginBottom: '0.5rem' }}>{p.title}</div>
                <div style={{ fontSize: '0.83rem', color: 'var(--muted2)', lineHeight: 1.7 }}>{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Experience Timeline ──────────────────────────── */}
      <section>
        <div className="section-inner">
          <span className="sec-tag reveal">Career</span>
          <h2 className="sec-title reveal reveal-delay-1">Work Experience</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }} className="reveal reveal-delay-2">
            {TIMELINE.map(t => (
              <div key={t.role} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--rl)', padding: '2rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: 4, height: '100%', background: 'linear-gradient(180deg, var(--purple), var(--cyan))' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <div>
                    <div style={{ fontWeight: 900, fontSize: '1.05rem' }}>{t.role}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--muted2)', marginTop: 2 }}>{t.company}</div>
                  </div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '4px 12px', borderRadius: 999, background: 'rgba(124,58,237,0.12)', color: 'var(--purple-l)', border: '1px solid rgba(124,58,237,0.2)', whiteSpace: 'nowrap' }}>
                    {t.period}
                  </span>
                </div>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {t.points.map((p, i) => (
                    <li key={i} style={{ fontSize: '0.875rem', color: 'var(--muted2)', lineHeight: 1.75 }}>{p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Education ───────────────────────────────────── */}
      <section className="bg-grid" style={{ background: 'var(--surface)', position: 'relative' }}>
        <div className="section-inner" style={{ position: 'relative' }}>
          <span className="sec-tag reveal">Education</span>
          <h2 className="sec-title reveal reveal-delay-1">Academic Foundation</h2>
          <p className="sec-sub reveal reveal-delay-2">Graduate-level education in technology and management, applied directly to building enterprise AI systems.</p>

          {/* Degree cards — large and prominent */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }} className="reveal reveal-delay-3">
            {EDUCATION.map(e => (
              <div key={e.degree} className="edu-card">
                {/* Color accent bar */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${e.color}, transparent)` }} />

                {/* Degree badge */}
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px', borderRadius: 999, background: `${e.color}18`, border: `1px solid ${e.color}35`, fontSize: '0.68rem', fontWeight: 800, color: e.color, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                  {e.degree.split(' ')[0] === 'M.S.' ? 'Graduate · Masters' : 'Undergraduate · Bachelors'}
                </div>

                <div style={{ fontWeight: 900, fontSize: '1.25rem', lineHeight: 1.2, marginBottom: '0.5rem' }}>{e.degree}</div>
                <div style={{ fontWeight: 800, fontSize: '1rem', color: e.color, marginBottom: '0.3rem' }}>{e.school}</div>
                <div style={{ fontSize: '0.83rem', color: 'var(--muted2)', marginBottom: '1.75rem' }}>{e.location}</div>

                {/* GPA highlight */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.25rem', background: 'var(--card2)', borderRadius: 'var(--r)', border: `1px solid ${e.color}20`, marginBottom: '1rem' }}>
                  <div>
                    <div style={{ fontSize: '2.2rem', fontWeight: 900, color: e.color, lineHeight: 1 }}>
                      {e.gpa.split(':')[1].trim().split(' ')[0]}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--muted2)', marginTop: 2, fontWeight: 700, letterSpacing: '0.5px' }}>
                      GPA / 4.0
                    </div>
                  </div>
                  <div style={{ width: 1, height: 40, background: 'var(--border)' }} />
                  <div>
                    <div style={{ fontSize: '0.83rem', fontWeight: 700 }}>{e.period.split('–')[0].trim()}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--muted2)' }}>to {e.period.split('–')[1].trim()}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '2.5rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1.25rem' }} className="reveal">Professional Certifications</h3>
            <div className="grid-3 reveal reveal-delay-1">
              {CERTS.map(c => (
                <div key={c.name} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--r)', padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'flex-start', transition: 'border-color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-h)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: c.color, flexShrink: 0, marginTop: 5, boxShadow: `0 0 10px ${c.color}` }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.25rem' }}>{c.name}</div>
                    <div style={{ fontSize: '0.78rem', color: c.color, fontWeight: 600, marginBottom: '0.15rem' }}>{c.issuer}</div>
                    <div style={{ fontSize: '0.73rem', color: 'var(--muted2)', marginBottom: '0.5rem' }}>{c.period}</div>
                    <a href={c.href} target="_blank" rel="noopener noreferrer"
                      style={{ fontSize: '0.72rem', color: c.color, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 4, opacity: 0.85, transition: 'opacity 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                      onMouseLeave={e => e.currentTarget.style.opacity = '0.85'}>
                      {c.linkLabel}
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="10" height="10">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                        <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Nav to specialties ───────────────────────────── */}
      <section style={{ padding: '4rem 0' }}>
        <div className="section-inner" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/ai-engineering"  className="btn btn-primary">AI Engineering</Link>
          <Link to="/data-science"    className="btn btn-ghost">Data Science</Link>
          <Link to="/data-analytics"  className="btn btn-ghost">Data Analytics</Link>
        </div>
      </section>
    </>
  )
}
