import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  || ''
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || ''
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  || ''
const TO_EMAIL    = import.meta.env.VITE_EMAILJS_TO_EMAIL    || ''

export default function Contact() {
  const formRef = useRef(null)
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      alert('EmailJS is not configured yet. Add your credentials to the .env file.')
      return
    }
    setStatus('sending')
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, { publicKey: PUBLIC_KEY })
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus('error')
    }
  }

  return (
    <>
      <div className="page-hero bg-dots" style={{ background: 'var(--surface)', overflow: 'hidden', position: 'relative' }}>
        <div className="orb" style={{ width: 500, height: 500, background: 'var(--purple)', top: -150, right: -100 }} />
        <div className="page-hero-inner" style={{ position: 'relative' }}>
          <span className="sec-tag">Contact</span>
          <h1 style={{ fontSize: 'clamp(2.4rem,6vw,4rem)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '1.25rem', lineHeight: 1.1, maxWidth: 620 }}>
            Send Abdul a message
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--muted2)', maxWidth: 500, lineHeight: 1.85 }}>
            Reach out for collaboration, consulting, or general enquiries. Every message goes directly to Abdul's inbox.
          </p>
        </div>
      </div>

      <section style={{ background: 'var(--bg)' }}>
        <div className="section-inner">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '4rem', alignItems: 'start' }}>

            {/* Left info */}
            <div>
              <h2 style={{ fontWeight: 900, fontSize: '1.4rem', marginBottom: '1.25rem' }}>Get in touch</h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--muted2)', lineHeight: 1.85, marginBottom: '2rem' }}>
                Abdul is open to AI/ML engineering engagements, contract projects, and enterprise AI consulting. Based in Dallas, TX and fully remote-capable.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {[
                  {
                    icon: (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                      </svg>
                    ),
                    label: 'Email',
                    value: TO_EMAIL || 'Set VITE_EMAILJS_TO_EMAIL in .env',
                    href: TO_EMAIL ? `mailto:${TO_EMAIL}` : null,
                  },
                  {
                    icon: (
                      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    ),
                    label: 'LinkedIn',
                    value: 'Connect on LinkedIn',
                    href: 'https://www.linkedin.com/in/abdul-rasheed-12382b196/',
                  },
                  {
                    icon: (
                      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                      </svg>
                    ),
                    label: 'GitHub',
                    value: 'AbdulRasheed1011',
                    href: 'https://github.com/AbdulRasheed1011',
                  },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--card)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--purple-l)', flexShrink: 0 }}>
                      {item.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--muted2)', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '0.2rem' }}>{item.label}</div>
                      {item.href ? (
                        <a href={item.href} target="_blank" rel="noopener noreferrer"
                          style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text)', textDecoration: 'none' }}
                          onMouseEnter={e => e.currentTarget.style.color = 'var(--purple-l)'}
                          onMouseLeave={e => e.currentTarget.style.color = 'var(--text)'}>
                          {item.value}
                        </a>
                      ) : (
                        <div style={{ fontSize: '0.82rem', color: 'var(--muted2)' }}>{item.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact form */}
            <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--rl)', padding: '2.5rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, var(--purple), var(--cyan))' }} />

              {status === 'success' ? (
                <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                  <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'rgba(16,185,129,0.15)', border: '2px solid var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2.5" width="24" height="24">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <h3 style={{ fontWeight: 800, marginBottom: '0.5rem' }}>Message sent!</h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--muted2)', lineHeight: 1.7 }}>
                    Thanks for reaching out. Abdul will get back to you as soon as possible.
                  </p>
                  <button className="btn btn-outline" style={{ marginTop: '1.5rem' }} onClick={() => setStatus('idle')}>
                    Send another message
                  </button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-field">
                      <label>Your Name</label>
                      <input className="form-input" name="name" placeholder="Jane Smith" value={form.name} onChange={handleChange} required />
                    </div>
                    <div className="form-field">
                      <label>Your Email</label>
                      <input className="form-input" name="email" type="email" placeholder="jane@company.com" value={form.email} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="form-field">
                    <label>Subject</label>
                    <input className="form-input" name="subject" placeholder="AI engineering project, consulting, collaboration..." value={form.subject} onChange={handleChange} required />
                  </div>
                  <div className="form-field">
                    <label>Message</label>
                    <textarea className="form-input" name="message" placeholder="Tell Abdul about your project, timeline, and what you're looking to achieve..." rows={5} value={form.message} onChange={handleChange} required />
                  </div>
                  <input type="hidden" name="to_email" value={TO_EMAIL} />
                  {status === 'error' && (
                    <div style={{ fontSize: '0.8rem', color: '#f87171', marginBottom: '1rem', padding: '8px 12px', background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: 8 }}>
                      Failed to send. Check your EmailJS credentials in .env or try again.
                    </div>
                  )}
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={status === 'sending'}>
                    {status === 'sending' ? <><span className="spinner" style={{ marginRight: 8 }} />Sending...</> : 'Send Message'}
                  </button>
                  <p style={{ fontSize: '0.72rem', color: 'var(--muted)', textAlign: 'center', marginTop: '0.75rem', lineHeight: 1.6 }}>
                    This form sends directly to Abdul's email. No data is stored on the site.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
