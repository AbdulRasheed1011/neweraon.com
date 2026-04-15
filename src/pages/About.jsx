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

// ── Social links (About page only) ────────────────────────────────
const SOCIALS = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/abdul-rasheed-12382b196/',
    color: '#0a66c2',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/channel/UCo7Zd7VwfvSWlISwa20zwQQ',
    color: '#ff0000',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/AbdulRasheed1011',
    color: '#6e40c9',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>,
  },
  {
    label: 'HuggingFace',
    href: 'https://huggingface.co/AbdulRasheed1011',
    color: '#FFD21E',
    icon: (
      <svg viewBox="0 0 95 88" fill="currentColor" width="22" height="22">
        <path d="M47.2 0C21.1 0 0 19.7 0 44c0 24.3 21.1 44 47.2 44 26.1 0 47.2-19.7 47.2-44C94.4 19.7 73.3 0 47.2 0zm-12 57.3c-2.9 0-5.2-2.3-5.2-5.2s2.3-5.2 5.2-5.2 5.2 2.3 5.2 5.2-2.3 5.2-5.2 5.2zm24 0c-2.9 0-5.2-2.3-5.2-5.2s2.3-5.2 5.2-5.2 5.2 2.3 5.2 5.2-2.3 5.2-5.2 5.2zm11-17.3H24.2c-.3-3.8 0-7.6 1-11.2 3.8-13.5 18.2-20 31.2-14.5 8.5 3.6 14 11.5 14.8 19.7.1 2 0 4 0 6z"/>
      </svg>
    ),
  },
]

// ── Skill icons with links ─────────────────────────────────────────
const CDN = 'https://cdn.simpleicons.org'
const SKILLS = [
  { name: 'Python',         slug: 'python',         color: '#3572a5', href: 'https://python.org' },
  { name: 'PyTorch',        slug: 'pytorch',         color: '#EE4C2C', href: 'https://pytorch.org' },
  { name: 'TensorFlow',     slug: 'tensorflow',      color: '#FF6F00', href: 'https://tensorflow.org' },
  { name: 'HuggingFace',    slug: 'huggingface',     color: '#FFD21E', href: 'https://huggingface.co/AbdulRasheed1011' },
  { name: 'Scikit-learn',   slug: 'scikitlearn',     color: '#F7931E', href: 'https://scikit-learn.org' },
  { name: 'LangChain',      slug: 'langchain',       color: '#1C7C54', href: 'https://langchain.com' },
  { name: 'FastAPI',        slug: 'fastapi',         color: '#009688', href: 'https://fastapi.tiangolo.com' },
  { name: 'Docker',         slug: 'docker',          color: '#2496ED', href: 'https://docker.com' },
  { name: 'Kubernetes',     slug: 'kubernetes',      color: '#326CE5', href: 'https://kubernetes.io' },
  { name: 'AWS',            slug: 'amazonaws',       color: '#FF9900', href: 'https://aws.amazon.com' },
  { name: 'MLflow',         slug: 'mlflow',          color: '#0194E2', href: 'https://mlflow.org' },
  { name: 'Apache Airflow', slug: 'apacheairflow',   color: '#017CEE', href: 'https://airflow.apache.org' },
  { name: 'GitHub',         slug: 'github',          color: '#6e40c9', href: 'https://github.com/AbdulRasheed1011' },
  { name: 'NumPy',          slug: 'numpy',           color: '#4DABCF', href: 'https://numpy.org' },
  { name: 'Pandas',         slug: 'pandas',          color: '#a78bfa', color: '#150458', href: 'https://pandas.pydata.org' },
]

const JOURNEY = [
  { year: '2017', title: 'Mechanical Engineering Degree', body: 'Began a B.E. in Mechanical Engineering at Osmania University, Hyderabad. Built a strong foundation in mathematics, systems thinking, and analytical problem-solving that would later transfer directly to machine learning.', color: 'var(--cyan)' },
  { year: '2021', title: 'First Step into Data', body: 'Joined Al-Hashmi Traders as a Data Analyst after graduating. Built the first data infrastructure the company had ever used: SQL pipelines, Tableau dashboards, and the ML pricing model that grew revenue by 37%. This was where data became more than analysis — it became business transformation.', color: 'var(--green)' },
  { year: '2023', title: 'Graduate Studies in the US', body: 'Moved to the United States to pursue an MS in Information Technology and Management at Campbellsville University (GPA 3.916/4.0). Focused on AI, cloud architecture, and enterprise systems. The academic rigour deepened the theoretical foundation behind the engineering work.', color: 'var(--orange)' },
  { year: '2024', title: 'AI/ML Engineer at SF Global', body: 'Joined SF Global in Dallas as an Artificial Intelligence and Machine Learning Engineer. Building production LLM systems, RAG pipelines, and fine-tuned models at enterprise scale. Achieved 40% MRR improvement on a regulatory RAG system, 18% accuracy gain through LLM fine-tuning, and 25% latency reduction via ONNX quantization.', color: 'var(--purple-l)' },
]

const TIMELINE = [
  {
    period: 'Feb 2024 - Present',
    role: 'Artificial Intelligence and Machine Learning Engineer',
    company: 'SF Global, Dallas, Texas',
    points: [
      'Designed enterprise AI services with Python and FastAPI, integrating transformer-based LLMs into production systems.',
      'Fine-tuned LLMs using HuggingFace PEFT (QLoRA) and PyTorch, improving task accuracy by 18% in production.',
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
  { name: 'Deep Learning Specialization', issuer: 'DeepLearning.ai', period: 'Sept - Dec 2025', color: 'var(--blue-l)', href: 'https://www.coursera.org/account/accomplishments/specialization/certificate/', linkLabel: 'View Certificate' },
  { name: 'Complete Machine Learning and Data Science', issuer: 'Geeks For Geeks', period: 'Aug 2023 - Jul 2024', color: 'var(--green)', href: 'https://www.geeksforgeeks.org/certificate/validation/', linkLabel: 'View Certificate' },
  { name: 'Python for Everybody', issuer: 'Coursera', period: 'Jan - Apr 2023', color: 'var(--orange)', href: 'https://www.coursera.org/account/accomplishments/certificate/', linkLabel: 'View Certificate' },
]

const PRINCIPLES = [
  { title: 'Production First', desc: 'A model that lives in a notebook is not a model. Every system Abdul builds is designed to be deployed, monitored, and maintained.' },
  { title: 'Responsible AI', desc: 'Guardrails, drift detection, and governance frameworks are not optional. They are part of the architecture from day one.' },
  { title: 'Measurable Impact', desc: 'Every project is tied to a metric. 40% MRR gain. 18% accuracy improvement. 25% latency reduction. Results, not activity.' },
  { title: 'Domain-Driven Design', desc: 'AI systems are aligned to the business domain, not the other way around. Enterprise context shapes every architecture decision.' },
]

// Photo component
function Photo() {
  const [loaded, setLoaded] = useState(true)
  if (loaded) {
    return (
      <div className="photo-frame" style={{ width: 320, height: 400, flexShrink: 0 }}>
        <img src="IMG_2323.jpg" alt="Abdul Rasheed" onError={() => setLoaded(false)}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 55%, rgba(6,6,14,0.5) 100%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '1.25rem', left: '1.25rem', right: '1.25rem' }}>
          <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>Abdul Rasheed</div>
          <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.75)' }}>AI/ML Engineer, Dallas TX</div>
        </div>
      </div>
    )
  }
  return (
    <div style={{ width: 320, height: 400, borderRadius: 20, background: 'linear-gradient(160deg,#1a1a2e,#0d0d1f)', border: '1px solid var(--border-h)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,var(--purple),var(--cyan))' }} />
      <div style={{ fontSize: '4rem', fontWeight: 900, letterSpacing: -3 }} className="gt">AR</div>
      <div style={{ fontWeight: 800, fontSize: '1rem' }}>Abdul Rasheed</div>
      <div style={{ fontSize: '0.8rem', color: 'var(--muted2)' }}>AI/ML Engineer, Dallas TX</div>
    </div>
  )
}

export default function About() {
  useReveal()

  return (
    <>
      {/* ── Hero with photo ───────────────────────────────── */}
      <div className="page-hero bg-dots" style={{ background: 'var(--surface)', overflow: 'hidden', position: 'relative' }}>
        <div className="orb" style={{ width: 600, height: 600, background: 'var(--purple)', top: -200, right: -100 }} />
        <div className="page-hero-inner">
          <div style={{ display: 'flex', gap: '4rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 280, position: 'relative' }}>
              <span className="sec-tag">About</span>
              <h1 style={{ fontSize: 'clamp(2.8rem,6vw,4.5rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.0, marginBottom: '0.5rem' }}>
                Abdul Rasheed
              </h1>
              <div className="gt" style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.2rem' }}>
                Artificial Intelligence and Machine Learning Engineer
              </div>
              <div style={{ fontSize: '0.88rem', color: 'var(--muted2)', fontWeight: 600, marginBottom: '1.5rem' }}>
                Data Scientist · Dallas, TX
              </div>
              <p style={{ fontSize: '0.97rem', color: 'var(--muted2)', maxWidth: 520, lineHeight: 1.85, marginBottom: '2rem' }}>
                3+ years building enterprise-grade LLM systems, RAG pipelines, and production ML at scale. Measured outcomes on every engagement.
              </p>

              {/* Social icons row */}
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
                {SOCIALS.map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label}
                    style={{
                      width: 44, height: 44, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'var(--card)', border: '1px solid var(--border)', color: s.color,
                      transition: 'border-color 0.2s, transform 0.2s, background 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = s.color + '80'; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.background = s.color + '18' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.background = 'var(--card)' }}>
                    {s.icon}
                  </a>
                ))}
              </div>

              {/* Resume download */}
              <a href="/Abdul_Rasheed_Resume.pdf" download
                className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download Resume
              </a>
            </div>

            <div className="reveal reveal-delay-2">
              <Photo />
            </div>
          </div>
        </div>
      </div>

      {/* ── How I Became What I Am ────────────────────────── */}
      <section style={{ background: 'var(--bg)' }}>
        <div className="section-inner">
          <span className="sec-tag reveal">The Journey</span>
          <h2 className="sec-title reveal reveal-delay-1">How Abdul Rasheed became an AI engineer</h2>
          <p className="sec-sub reveal reveal-delay-2">From mechanical engineering in Hyderabad to production AI systems in Dallas. The path was unconventional. The outcomes were measurable.</p>

          <div style={{ position: 'relative', paddingLeft: '2.5rem' }}>
            <div style={{ position: 'absolute', left: 10, top: 0, bottom: 0, width: 2, background: 'linear-gradient(180deg, var(--purple), var(--cyan))', borderRadius: 2 }} />
            {JOURNEY.map((j, i) => (
              <div key={j.year} className={`reveal reveal-delay-${i + 1}`} style={{ position: 'relative', paddingBottom: '2.5rem' }}>
                <div style={{ position: 'absolute', left: -2.5 * 16 - 5, top: 6, width: 14, height: 14, borderRadius: '50%', background: j.color, boxShadow: `0 0 16px ${j.color}80`, border: '2px solid var(--bg)' }} />
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'baseline', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: j.color, letterSpacing: '1px' }}>{j.year}</span>
                  <span style={{ fontWeight: 900, fontSize: '1rem' }}>{j.title}</span>
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--muted2)', lineHeight: 1.85, maxWidth: 660 }}>{j.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Skills with icons and links ───────────────────── */}
      <section className="bg-grid" style={{ background: 'var(--surface)', position: 'relative' }}>
        <div className="section-inner" style={{ position: 'relative' }}>
          <span className="sec-tag reveal">Tools and Technologies</span>
          <h2 className="sec-title reveal reveal-delay-1">Skills and Stack</h2>
          <p className="sec-sub reveal reveal-delay-2">Click any icon to visit the official documentation or Abdul's profile.</p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }} className="reveal reveal-delay-3">
            {SKILLS.map(s => (
              <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" title={s.name}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8, padding: '9px 16px',
                  borderRadius: 10, background: 'var(--card)', border: '1px solid var(--border)',
                  textDecoration: 'none', transition: 'border-color 0.2s, transform 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = s.color + '80'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none' }}>
                <img src={`${CDN}/${s.slug}/${s.color.replace('#', '')}`} alt={s.name} width={20} height={20}
                  onError={e => { e.target.style.display = 'none' }} />
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--muted2)' }}>{s.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Explore My Work ───────────────────────────────── */}
      <section style={{ background: 'var(--bg)' }}>
        <div className="section-inner">
          <span className="sec-tag reveal">My Work</span>
          <h2 className="sec-title reveal reveal-delay-1">Explore by discipline</h2>
          <p className="sec-sub reveal reveal-delay-2">Each section shows end results, interactive demos, and real production metrics.</p>
          <div className="grid-3 reveal reveal-delay-3">
            {[
              { to: '/data-analytics', label: 'Data Analytics', color: '#06b6d4', gradFrom: '#0c3340', desc: 'Charts, findings, and business intelligence from real engagements. SQL, BI tools, pricing models.', badge: 'Charts and Findings' },
              { to: '/data-science', label: 'Data Science', color: '#a78bfa', gradFrom: '#2d1b69', desc: 'Traditional ML models: pricing optimisation, churn prediction, demand forecasting. Try the live demos.', badge: 'Live ML Demos' },
              { to: '/ai-engineering', label: 'AI Engineering', color: '#60a5fa', gradFrom: '#1e3a5f', desc: 'Generative AI systems: RAG pipelines, LLM fine-tuning, production inference. Query the demo.', badge: 'Interactive GenAI' },
            ].map(p => (
              <Link key={p.to} to={p.to} style={{ textDecoration: 'none' }}>
                <div style={{ background: `linear-gradient(160deg, ${p.gradFrom}, var(--card))`, border: '1px solid var(--border)', borderRadius: 'var(--rl)', padding: '2rem', height: '100%', transition: 'border-color 0.2s, transform 0.2s', cursor: 'pointer' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = p.color + '60'; e.currentTarget.style.transform = 'translateY(-4px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none' }}>
                  <span style={{ display: 'inline-block', fontSize: '0.65rem', fontWeight: 800, padding: '3px 10px', borderRadius: 999, background: `${p.color}18`, color: p.color, border: `1px solid ${p.color}30`, letterSpacing: '0.5px', marginBottom: '1rem' }}>{p.badge}</span>
                  <div style={{ fontWeight: 900, fontSize: '1.1rem', marginBottom: '0.5rem' }}>{p.label}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--muted2)', lineHeight: 1.75, marginBottom: '1.25rem' }}>{p.desc}</div>
                  <div style={{ fontSize: '0.82rem', color: p.color, fontWeight: 700 }}>Explore {p.label} →</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── HuggingFace Models ────────────────────────────── */}
      <section className="bg-circuit" style={{ background: 'var(--surface)', position: 'relative' }}>
        <div className="section-inner" style={{ position: 'relative' }}>
          <span className="sec-tag reveal" style={{ color: '#FFD21E' }}>HuggingFace</span>
          <h2 className="sec-title reveal reveal-delay-1">Models and research on HuggingFace</h2>
          <p className="sec-sub reveal reveal-delay-2">Browse Abdul's models, datasets, and Spaces. Try them directly from the HuggingFace platform.</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="reveal reveal-delay-3">
            {/* Profile card */}
            <a href="https://huggingface.co/AbdulRasheed1011" target="_blank" rel="noopener noreferrer"
              style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--rl)', padding: '2rem', textDecoration: 'none', display: 'block', transition: 'border-color 0.2s, transform 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#FFD21E60'; e.currentTarget.style.transform = 'translateY(-3px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: '#FFD21E22', border: '1px solid #FFD21E40', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg viewBox="0 0 95 88" fill="#FFD21E" width="28" height="28">
                    <path d="M47.2 0C21.1 0 0 19.7 0 44c0 24.3 21.1 44 47.2 44 26.1 0 47.2-19.7 47.2-44C94.4 19.7 73.3 0 47.2 0zm-12 57.3c-2.9 0-5.2-2.3-5.2-5.2s2.3-5.2 5.2-5.2 5.2 2.3 5.2 5.2-2.3 5.2-5.2 5.2zm24 0c-2.9 0-5.2-2.3-5.2-5.2s2.3-5.2 5.2-5.2 5.2 2.3 5.2 5.2-2.3 5.2-5.2 5.2zm11-17.3H24.2c-.3-3.8 0-7.6 1-11.2 3.8-13.5 18.2-20 31.2-14.5 8.5 3.6 14 11.5 14.8 19.7.1 2 0 4 0 6z"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontWeight: 900, fontSize: '1rem' }}>AbdulRasheed1011</div>
                  <div style={{ fontSize: '0.78rem', color: '#FFD21E', fontWeight: 600 }}>HuggingFace Profile</div>
                </div>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted2)', lineHeight: 1.75 }}>
                Browse all models, datasets, and Spaces published by Abdul Rasheed on HuggingFace. Fine-tuned transformers, RAG-ready embeddings, and more.
              </p>
              <div style={{ marginTop: '1rem', fontSize: '0.82rem', color: '#FFD21E', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
                View profile
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="12" height="12">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </div>
            </a>

            {/* Model widget embed */}
            <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--rl)', overflow: 'hidden' }}>
              <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border)', background: 'var(--card2)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#FFD21E' }} />
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--muted2)' }}>Featured Model Widget</span>
              </div>
              <div style={{ padding: '1rem 0' }}>
                <iframe
                  src="https://huggingface.co/AbdulRasheed1011"
                  title="HuggingFace Model"
                  width="100%"
                  height="280"
                  style={{ border: 'none', display: 'block', background: 'transparent' }}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Engineering Principles ────────────────────────── */}
      <section style={{ background: 'var(--bg)' }}>
        <div className="section-inner">
          <span className="sec-tag reveal">Engineering Philosophy</span>
          <h2 className="sec-title reveal reveal-delay-1">How Abdul works</h2>
          <div className="grid-4 reveal reveal-delay-2">
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

      {/* ── Experience ────────────────────────────────────── */}
      <section className="bg-grid" style={{ background: 'var(--surface)', position: 'relative' }}>
        <div className="section-inner" style={{ position: 'relative' }}>
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
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '4px 12px', borderRadius: 999, background: 'rgba(124,58,237,0.12)', color: 'var(--purple-l)', border: '1px solid rgba(124,58,237,0.2)' }}>
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

      {/* ── Education ─────────────────────────────────────── */}
      <section style={{ background: 'var(--bg)' }}>
        <div className="section-inner">
          <span className="sec-tag reveal">Education</span>
          <h2 className="sec-title reveal reveal-delay-1">Academic Foundation</h2>
          <p className="sec-sub reveal reveal-delay-2">Graduate-level education in technology and management, applied directly to building enterprise AI systems.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }} className="reveal reveal-delay-3">
            {EDUCATION.map(e => (
              <div key={e.degree} className="edu-card">
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${e.color}, transparent)` }} />
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px', borderRadius: 999, background: `${e.color}18`, border: `1px solid ${e.color}35`, fontSize: '0.68rem', fontWeight: 800, color: e.color, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                  {e.degree.startsWith('M.S.') ? 'Graduate' : 'Undergraduate'}
                </div>
                <div style={{ fontWeight: 900, fontSize: '1.2rem', lineHeight: 1.2, marginBottom: '0.5rem' }}>{e.degree}</div>
                <div style={{ fontWeight: 800, fontSize: '1rem', color: e.color, marginBottom: '0.3rem' }}>{e.school}</div>
                <div style={{ fontSize: '0.83rem', color: 'var(--muted2)', marginBottom: '1.75rem' }}>{e.location}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.25rem', background: 'var(--card2)', borderRadius: 'var(--r)', border: `1px solid ${e.color}20` }}>
                  <div>
                    <div style={{ fontSize: '2.2rem', fontWeight: 900, color: e.color, lineHeight: 1 }}>{e.gpa.split(':')[1].trim().split(' ')[0]}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--muted2)', marginTop: 2, fontWeight: 700 }}>GPA / 4.0</div>
                  </div>
                  <div style={{ width: 1, height: 40, background: 'var(--border)' }} />
                  <div>
                    <div style={{ fontSize: '0.83rem', fontWeight: 700 }}>{e.period.split('-')[0].trim()}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--muted2)' }}>to {e.period.split('-')[1].trim()}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

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
                      style={{ fontSize: '0.72rem', color: c.color, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 4, opacity: 0.85 }}
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
    </>
  )
}
