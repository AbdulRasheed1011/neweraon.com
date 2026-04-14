import { useState, useEffect } from 'react'

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

const SOCIAL_LINKS = [
  {
    name: 'LinkedIn', handle: 'abdul-rasheed-12382b196',
    desc: 'Professional network, experience, and updates',
    href: 'https://www.linkedin.com/in/abdul-rasheed-12382b196/',
    color: '#0a66c2',
    svg: <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  },
  {
    name: 'YouTube', handle: '@AbdulRasheed-q8h',
    desc: 'AI/ML engineering tutorials and content',
    href: 'https://www.youtube.com/@AbdulRasheed-q8h',
    color: '#ff0000',
    svg: <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
  },
  {
    name: 'GitHub', handle: 'AbdulRasheed1011',
    desc: 'Source code, projects, and open source contributions',
    href: 'https://github.com/AbdulRasheed1011',
    color: '#6e40c9',
    svg: <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>,
  },
]

const FAQS = [
  { q: 'Are you open to full-time roles or contract work?', a: 'Yes — I\'m open to AI/ML Engineer positions and select contract engagements. Reach out with project details and I\'ll respond within 24 hours.' },
  { q: 'What kinds of projects do you take on?', a: 'Production LLM systems, RAG pipeline architecture, ML model development, MLOps infrastructure, and AI strategy consulting for enterprise environments.' },
  { q: 'Are you open to speaking or content collaboration?', a: 'Absolutely. I create AI/ML content on YouTube and am open to podcast appearances, conference talks, and collaborations in the AI engineering space.' },
]

export default function Contact() {
  useReveal()
  const [form, setForm]     = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState(null)

  function handleChange(e) { setForm(f => ({ ...f, [e.target.name]: e.target.value })) }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    // ── Wire to Formspree, AWS SES, or any form backend ──
    // Replace the fetch URL with your endpoint
    try {
      await new Promise(r => setTimeout(r, 1200))
      setStatus('sent')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch { setStatus('error') }
  }

  return (
    <>
      <div className="page-hero" style={{ background: 'var(--surface)', overflow: 'hidden', position: 'relative' }}>
        <div className="orb" style={{ width: 500, height: 500, background: 'var(--purple)', top: -100, right: -100 }} />
        <div className="page-hero-inner">
          <span className="sec-tag">Contact</span>
          <h1 style={{ fontSize: 'clamp(2.5rem,6vw,4.5rem)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '1.25rem' }}>
            Let's <span className="gt">work together</span>
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--muted2)', maxWidth: 520, lineHeight: 1.8 }}>
            Have an AI/ML project, want to discuss a role, or just want to connect? I'd love to hear from you.
          </p>
        </div>
      </div>

      <section>
        <div className="section-inner">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '4rem', alignItems: 'start' }}>

            {/* Social + Info */}
            <div className="reveal">
              <span className="sec-tag">Find Me Online</span>
              <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.2rem)', fontWeight: 900, marginBottom: '1rem', letterSpacing: '-0.02em' }}>
                Connect on your platform
              </h2>
              <p style={{ color: 'var(--muted2)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '2rem' }}>
                Follow my AI/ML content on YouTube, check my code on GitHub, or connect professionally on LinkedIn.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
                {SOCIAL_LINKS.map(s => (
                  <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.25rem', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--rl)', transition: 'border-color 0.2s, transform 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = s.color; e.currentTarget.style.transform = 'translateY(-2px)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none' }}
                  >
                    <div style={{ width: 50, height: 50, borderRadius: 13, background: `${s.color}18`, border: `1px solid ${s.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color, flexShrink: 0 }}>
                      {s.svg}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 800, fontSize: '0.95rem', marginBottom: '0.2rem' }}>{s.name}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--muted2)' }}>{s.handle}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{s.desc}</div>
                    </div>
                    <div style={{ color: 'var(--muted2)', fontSize: '1rem' }}>→</div>
                  </a>
                ))}
              </div>

              <div style={{ padding: '1.25rem', background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 'var(--r)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.4rem' }}>
                  <span className="dot-green" /> Available for Opportunities
                </div>
                <div style={{ fontSize: '0.83rem', color: 'var(--muted2)', lineHeight: 1.6 }}>
                  Open to AI/ML Engineer roles, contract projects, and enterprise consulting. Based in Dallas, TX — remote-friendly.
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="reveal reveal-delay-2">
              <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--rl)', padding: '2.5rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.4rem' }}>Send a message</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--muted2)', marginBottom: '2rem' }}>
                  I respond within 24 hours.
                </p>

                {status === 'sent' ? (
                  <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                    <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontSize: '1.5rem' }}>✓</div>
                    <div style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.5rem' }}>Message sent!</div>
                    <div style={{ color: 'var(--muted2)', fontSize: '0.875rem' }}>Thanks for reaching out — I'll be in touch soon.</div>
                    <button className="btn btn-outline btn-sm" style={{ marginTop: '1.5rem' }} onClick={() => setStatus(null)}>Send another</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div className="form-field">
                        <label>Name</label>
                        <input name="name" className="form-input" placeholder="Your name" value={form.name} onChange={handleChange} required />
                      </div>
                      <div className="form-field">
                        <label>Email</label>
                        <input name="email" type="email" className="form-input" placeholder="you@email.com" value={form.email} onChange={handleChange} required />
                      </div>
                    </div>
                    <div className="form-field">
                      <label>Subject</label>
                      <input name="subject" className="form-input" placeholder="e.g. AI/ML role, RAG project, collaboration" value={form.subject} onChange={handleChange} required />
                    </div>
                    <div className="form-field">
                      <label>Message</label>
                      <textarea name="message" className="form-input" placeholder="Tell me about your project or opportunity..." value={form.message} onChange={handleChange} required />
                    </div>
                    {status === 'error' && (
                      <div style={{ fontSize: '0.82rem', color: 'var(--pink)', marginBottom: '1rem' }}>
                        Something went wrong — please try LinkedIn or email directly.
                      </div>
                    )}
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={status === 'sending'}>
                      {status === 'sending' ? <><span className="spinner" style={{ marginRight: 8 }} /> Sending…</> : 'Send Message'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--surface)' }}>
        <div className="section-inner" style={{ maxWidth: 720 }}>
          <span className="sec-tag reveal">FAQ</span>
          <h2 className="sec-title reveal reveal-delay-1">Common Questions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} className="reveal reveal-delay-2">
            {FAQS.map(f => (
              <div key={f.q} style={{ padding: '1.5rem', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--r)' }}>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.5rem' }}>{f.q}</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--muted2)', lineHeight: 1.75 }}>{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
