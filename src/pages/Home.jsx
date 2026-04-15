import { useState, useRef, useEffect } from 'react'
import { HF_API_KEY, HF_ENDPOINT, HF_MODEL, QUERY_LIMIT, CHAT_SYSTEM_PROMPT } from '../config/llm'

// AWS API Gateway endpoint for SES email sending (set in .env)
const SES_API_URL = import.meta.env.VITE_SES_API_URL || ''

// ── Nav links ─────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: 'About',          href: '#/about' },
  { label: 'Data Analytics', href: '#/data-analytics' },
  { label: 'Data Science',   href: '#/data-science' },
  { label: 'AI Engineering', href: '#/ai-engineering' },
  { label: 'Learn',          href: '#/learn' },
  { label: 'Contact',        href: '#/contact' },
]

function HomeNav() {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: 'rgba(10,10,15,0.85)', backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 1.5rem', height: 56,
    }}>
      <a href="#/" style={{ fontWeight: 900, fontSize: '1rem', textDecoration: 'none', color: 'var(--text)', letterSpacing: '-0.02em' }}>
        Abdul<span style={{ color: 'var(--cyan)' }}>.</span>AI
      </a>
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }} className="home-nav-links">
        {NAV_LINKS.map(l => (
          <a key={l.label} href={l.href} style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--muted2)', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--muted2)'}>
            {l.label}
          </a>
        ))}
      </div>
      <button onClick={() => setMenuOpen(o => !o)}
        style={{ display: 'none', background: 'none', border: 'none', color: 'var(--text)', cursor: 'pointer', padding: 4 }}
        className="home-nav-hamburger">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
          {menuOpen
            ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
            : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}
        </svg>
      </button>
      {menuOpen && (
        <div style={{ position: 'absolute', top: 56, left: 0, right: 0, background: 'var(--surface)', borderBottom: '1px solid var(--border)', display: 'flex', flexDirection: 'column', padding: '0.75rem 1.5rem 1rem', gap: '0.75rem' }} className="home-nav-mobile">
          {NAV_LINKS.map(l => (
            <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)}
              style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--muted2)', textDecoration: 'none' }}>
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}

// ── Eye icon SVGs ─────────────────────────────────────────────────
const EyeOpen = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
)
const EyeOff = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
)

function PasswordInput({ value, onChange, placeholder = '', name = 'password', autoComplete }) {
  const [show, setShow] = useState(false)
  return (
    <div style={{ position: 'relative' }}>
      <input
        className="form-input"
        type={show ? 'text' : 'password'}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        required
        style={{ paddingRight: '2.75rem', width: '100%', boxSizing: 'border-box' }}
      />
      <button type="button" onClick={() => setShow(s => !s)}
        style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: show ? 'var(--purple-l)' : 'var(--muted2)', padding: 0, display: 'flex', transition: 'color 0.2s' }}
        tabIndex={-1} title={show ? 'Hide password' : 'Show password'}>
        {show ? <EyeOff /> : <EyeOpen />}
      </button>
    </div>
  )
}

// ── LocalStorage helpers ───────────────────────────────────────────
const LS = {
  getUsers:         ()           => JSON.parse(localStorage.getItem('ar_users')   || '[]'),
  saveUsers:        (u)          => localStorage.setItem('ar_users', JSON.stringify(u)),
  getSession:       ()           => JSON.parse(localStorage.getItem('ar_session') || 'null'),
  saveSession:      (s)          => localStorage.setItem('ar_session', JSON.stringify(s)),
  clearSession:     ()           => localStorage.removeItem('ar_session'),
  getHistory:       (uid)        => JSON.parse(localStorage.getItem(`ar_history_${uid}`) || '[]'),
  saveHistory:      (uid, h)     => localStorage.setItem(`ar_history_${uid}`, JSON.stringify(h)),
  getQueryCount:    (uid)        => parseInt(localStorage.getItem(`ar_queries_${uid}`) || '0'),
  incQueryCount:    (uid)        => {
    const n = LS.getQueryCount(uid) + 1
    localStorage.setItem(`ar_queries_${uid}`, String(n))
    return n
  },
  saveResetToken:   (token, email) => {
    const all = JSON.parse(localStorage.getItem('ar_reset_tokens') || '{}')
    all[token] = { email, expiry: Date.now() + 3600000 }
    localStorage.setItem('ar_reset_tokens', JSON.stringify(all))
  },
  getResetToken:    (token)      => (JSON.parse(localStorage.getItem('ar_reset_tokens') || '{}'))[token] || null,
  deleteResetToken: (token)      => {
    const all = JSON.parse(localStorage.getItem('ar_reset_tokens') || '{}')
    delete all[token]; localStorage.setItem('ar_reset_tokens', JSON.stringify(all))
  },
}

async function hashPassword(pw) {
  const data = new TextEncoder().encode(pw + '_ar_salt_2025')
  const buf  = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
}
function generateToken() {
  return Array.from(crypto.getRandomValues(new Uint8Array(24))).map(b => b.toString(16).padStart(2, '0')).join('')
}
function getURLParam(key) {
  const hash = window.location.hash
  const q = hash.split('?')[1]
  if (!q) return null
  return new URLSearchParams(q).get(key)
}
function clearURLParams() {
  window.history.replaceState(null, '', `${window.location.pathname}#/`)
}

// ── AWS SES email via Lambda/API Gateway ──────────────────────────
async function sendEmail({ type, toEmail, toName, link }) {
  if (!SES_API_URL) {
    // Dev mode: log the link so you can test without AWS
    console.info(`[Dev] SES not configured. Email type: ${type}`)
    console.info(`[Dev] ${type === 'verify' ? 'Verify' : 'Reset'} link:`, link)
    return
  }
  const res = await fetch(SES_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, toEmail, toName, link }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || 'Failed to send email')
  }
}

// ── HuggingFace chat call ──────────────────────────────────────────
async function callHF(messages) {
  if (!HF_API_KEY) {
    await new Promise(r => setTimeout(r, 800))
    return 'Demo mode: add VITE_HF_API_KEY to your .env file to enable real AI responses.'
  }
  const res = await fetch(HF_ENDPOINT, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${HF_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: HF_MODEL, messages: [{ role: 'system', content: CHAT_SYSTEM_PROMPT }, ...messages], max_tokens: 600, temperature: 0.7, stream: false }),
  })
  if (!res.ok) throw new Error(await res.text())
  const data = await res.json()
  return data.choices?.[0]?.message?.content || 'No response received.'
}

// ── Shared card wrapper ───────────────────────────────────────────
function AuthCard({ children, subtitle }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', padding: '2rem', paddingTop: '5rem' }} className="bg-dots">
      <div style={{ width: '100%', maxWidth: 440, background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--rl)', padding: '2.5rem', position: 'relative', boxShadow: '0 24px 80px rgba(0,0,0,0.5)' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, var(--purple), var(--cyan))', borderRadius: 'var(--rl) var(--rl) 0 0' }} />
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '0.3rem', letterSpacing: '-0.03em' }}>
            Abdul<span style={{ color: 'var(--cyan)' }}>.</span>AI
          </div>
          <div style={{ fontSize: '0.82rem', color: 'var(--muted2)' }}>{subtitle}</div>
        </div>
        {children}
      </div>
    </div>
  )
}

// ── Inline error/info banner ──────────────────────────────────────
function Banner({ type = 'error', children }) {
  const styles = {
    error:   { color: '#f87171', bg: 'rgba(248,113,113,0.08)',   border: 'rgba(248,113,113,0.2)' },
    warning: { color: 'var(--orange)', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)' },
    info:    { color: 'var(--cyan)',   bg: 'rgba(6,182,212,0.08)',  border: 'rgba(6,182,212,0.2)' },
  }
  const s = styles[type]
  return (
    <div style={{ fontSize: '0.8rem', color: s.color, marginBottom: '1rem', padding: '10px 14px', background: s.bg, border: `1px solid ${s.border}`, borderRadius: 8, lineHeight: 1.6 }}>
      {children}
    </div>
  )
}

// ── Verify email screen (shown after signup) ──────────────────────
function VerifyEmailScreen({ email, firstName, onResend, onBack }) {
  const [resent, setResent] = useState(false)
  async function handleResend() {
    await onResend()
    setResent(true)
    setTimeout(() => setResent(false), 4000)
  }
  return (
    <AuthCard subtitle="Verify your email address">
      <div style={{ textAlign: 'center', padding: '0.5rem 0' }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(6,182,212,0.1)', border: '2px solid var(--cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="1.8" width="28" height="28">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
        </div>
        <h3 style={{ fontWeight: 800, fontSize: '1rem', marginBottom: '0.5rem' }}>
          Check your inbox{firstName ? `, ${firstName}` : ''}
        </h3>
        <p style={{ fontSize: '0.83rem', color: 'var(--muted2)', lineHeight: 1.75, marginBottom: '1.5rem' }}>
          A verification link has been sent to <strong style={{ color: 'var(--text)' }}>{email}</strong>. Click the link in the email to activate your account.
        </p>
        <p style={{ fontSize: '0.75rem', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '1.75rem' }}>
          Can't find it? Check your spam folder.
        </p>
        <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', marginBottom: '0.75rem' }} onClick={handleResend} disabled={resent}>
          {resent ? '✓ Verification email resent' : 'Resend verification email'}
        </button>
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: 'var(--muted2)', fontSize: '0.8rem', cursor: 'pointer' }}>
          Back to Sign In
        </button>
      </div>
    </AuthCard>
  )
}

// ── Email verified success screen ─────────────────────────────────
function VerifiedScreen({ onContinue }) {
  return (
    <AuthCard subtitle="Email verified">
      <div style={{ textAlign: 'center', padding: '0.5rem 0' }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(16,185,129,0.12)', border: '2px solid var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2.5" width="26" height="26">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <h3 style={{ fontWeight: 800, fontSize: '1rem', marginBottom: '0.5rem' }}>Email verified!</h3>
        <p style={{ fontSize: '0.83rem', color: 'var(--muted2)', lineHeight: 1.75, marginBottom: '1.75rem' }}>
          Your account has been verified. You can now sign in.
        </p>
        <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={onContinue}>
          Sign In
        </button>
      </div>
    </AuthCard>
  )
}

// ── Forgot password form ──────────────────────────────────────────
function ForgotPasswordForm({ onBack }) {
  const [email, setEmail]   = useState('')
  const [status, setStatus] = useState('idle')

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    const user = LS.getUsers().find(u => u.email === email.toLowerCase())
    if (user) {
      const token = generateToken()
      LS.saveResetToken(token, user.email)
      const resetLink = `${window.location.origin}${window.location.pathname}#/?reset=${token}`
      await sendEmail({
        type: 'reset',
        toEmail: user.email,
        toName: user.firstName ? `${user.firstName} ${user.lastName}` : user.email,
        link: resetLink,
      }).catch(console.error)
    }
    await new Promise(r => setTimeout(r, 900))
    setStatus('sent')
  }

  if (status === 'sent') return (
    <AuthCard subtitle="Check your inbox">
      <div style={{ textAlign: 'center', padding: '0.5rem 0' }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(16,185,129,0.12)', border: '2px solid var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2.5" width="26" height="26">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <p style={{ fontSize: '0.83rem', color: 'var(--muted2)', lineHeight: 1.75, marginBottom: '0.5rem' }}>
          If an account exists for <strong style={{ color: 'var(--text)' }}>{email}</strong>, a password reset link has been sent.
        </p>
        <p style={{ fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '1.75rem' }}>Link expires in 1 hour.</p>
        <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }} onClick={onBack}>Back to Sign In</button>
      </div>
    </AuthCard>
  )

  return (
    <AuthCard subtitle="Reset your password">
      <form onSubmit={handleSubmit}>
        <p style={{ fontSize: '0.83rem', color: 'var(--muted2)', marginBottom: '1.25rem', lineHeight: 1.7 }}>
          Enter your account email and we'll send you a link to reset your password.
        </p>
        <div className="form-field">
          <label>Email Address</label>
          <input className="form-input" type="email" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" />
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginBottom: '1rem' }} disabled={status === 'sending'}>
          {status === 'sending' ? <><span className="spinner" style={{ marginRight: 8 }} />Sending...</> : 'Send Reset Link'}
        </button>
      </form>
      <div style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--muted2)' }}>
        Remembered it?{' '}
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: 'var(--purple-l)', fontWeight: 700, cursor: 'pointer', fontSize: '0.8rem' }}>
          Back to Sign In
        </button>
      </div>
    </AuthCard>
  )
}

// ── Reset password form (from email link) ─────────────────────────
function ResetPasswordForm({ token, onDone }) {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm]   = useState('')
  const [status, setStatus]     = useState('idle')
  const [error, setError]       = useState('')

  const tokenData = LS.getResetToken(token)
  const isExpired = !tokenData || Date.now() > tokenData.expiry

  if (isExpired) return (
    <AuthCard subtitle="Link expired">
      <div style={{ textAlign: 'center', padding: '0.5rem 0' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>⏱</div>
        <p style={{ fontSize: '0.85rem', color: 'var(--muted2)', lineHeight: 1.75, marginBottom: '1.5rem' }}>
          This password reset link has expired or already been used. Links are valid for 1 hour.
        </p>
        <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={onDone}>Request New Link</button>
      </div>
    </AuthCard>
  )

  if (status === 'done') return (
    <AuthCard subtitle="Password updated">
      <div style={{ textAlign: 'center', padding: '0.5rem 0' }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(16,185,129,0.12)', border: '2px solid var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2.5" width="26" height="26">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <p style={{ fontSize: '0.83rem', color: 'var(--muted2)', lineHeight: 1.75, marginBottom: '1.75rem' }}>
          Your password has been changed. Sign in with your new password.
        </p>
        <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={onDone}>Sign In</button>
      </div>
    </AuthCard>
  )

  async function handleSubmit(e) {
    e.preventDefault()
    if (password !== confirm) { setError('Passwords do not match.'); return }
    if (password.length < 6)  { setError('Password must be at least 6 characters.'); return }
    setError(''); setStatus('saving')
    const hash  = await hashPassword(password)
    const users = LS.getUsers()
    const idx   = users.findIndex(u => u.email === tokenData.email)
    if (idx === -1) { setError('Account not found.'); setStatus('idle'); return }
    users[idx].hash = hash
    LS.saveUsers(users)
    LS.deleteResetToken(token)
    clearURLParams()
    setStatus('done')
  }

  return (
    <AuthCard subtitle="Set a new password">
      <form onSubmit={handleSubmit}>
        <p style={{ fontSize: '0.83rem', color: 'var(--muted2)', marginBottom: '1.25rem', lineHeight: 1.7 }}>
          Resetting password for <strong style={{ color: 'var(--text)' }}>{tokenData.email}</strong>
        </p>
        <div className="form-field">
          <label>New Password</label>
          <PasswordInput value={password} onChange={e => setPassword(e.target.value)} name="new_password" autoComplete="new-password" />
        </div>
        <div className="form-field">
          <label>Confirm New Password</label>
          <PasswordInput value={confirm} onChange={e => setConfirm(e.target.value)} name="confirm_password" autoComplete="new-password" />
        </div>
        {error && <Banner type="error">{error}</Banner>}
        <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={status === 'saving'}>
          {status === 'saving' ? <><span className="spinner" style={{ marginRight: 8 }} />Saving...</> : 'Set New Password'}
        </button>
      </form>
    </AuthCard>
  )
}

// ── Main Auth form (login / signup) ───────────────────────────────
function AuthForm({ onAuth, onForgot, onSignupPending }) {
  const [mode, setMode]           = useState('login')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName]   = useState('')
  const [email, setEmail]         = useState('')
  const [password, setPassword]   = useState('')
  const [error, setError]         = useState('')
  const [loading, setLoading]     = useState(false)

  function switchMode(m) {
    setMode(m); setError('')
    setFirstName(''); setLastName(''); setEmail(''); setPassword('')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (mode === 'signup' && (!firstName.trim() || !lastName.trim())) {
      setError('Please enter your first and last name.'); return
    }
    if (!email.trim() || !password.trim()) { setError('Please fill in all fields.'); return }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return }
    setError(''); setLoading(true)

    const hash  = await hashPassword(password)
    const users = LS.getUsers()

    if (mode === 'signup') {
      if (users.find(u => u.email === email.toLowerCase())) {
        setError('An account with this email already exists.'); setLoading(false); return
      }
      const uid         = `u_${Date.now()}`
      const verifyToken = generateToken()
      const newUser = {
        uid, firstName: firstName.trim(), lastName: lastName.trim(),
        email: email.toLowerCase(), hash,
        verified: false, verifyToken,
        createdAt: new Date().toISOString(),
      }
      LS.saveUsers([...users, newUser])

      // Send verification email
      const verifyLink = `${window.location.origin}${window.location.pathname}#/?verify=${verifyToken}`
      await sendEmail({
        type:    'verify',
        toEmail: newUser.email,
        toName:  `${newUser.firstName} ${newUser.lastName}`,
        link:    verifyLink,
      }).catch(console.error)

      setLoading(false)
      onSignupPending({ email: newUser.email, firstName: newUser.firstName })
      return
    }

    // Login
    const user = users.find(u => u.email === email.toLowerCase() && u.hash === hash)
    if (!user) { setError('Incorrect email or password.'); setLoading(false); return }
    if (!user.verified) {
      setError(''); setLoading(false)
      onSignupPending({ email: user.email, firstName: user.firstName || '', resend: true, verifyToken: user.verifyToken })
      return
    }
    LS.saveSession({ uid: user.uid, email: user.email, firstName: user.firstName || '', lastName: user.lastName || '' })
    onAuth({ uid: user.uid, email: user.email, firstName: user.firstName || '', lastName: user.lastName || '' })
    setLoading(false)
  }

  return (
    <AuthCard subtitle={mode === 'login' ? 'Sign in to start chatting' : 'Create your account to get started'}>
      <form onSubmit={handleSubmit}>
        {mode === 'signup' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div className="form-field">
              <label>First Name</label>
              <input className="form-input" type="text" value={firstName} onChange={e => setFirstName(e.target.value)} required autoComplete="given-name" />
            </div>
            <div className="form-field">
              <label>Last Name</label>
              <input className="form-input" type="text" value={lastName} onChange={e => setLastName(e.target.value)} required autoComplete="family-name" />
            </div>
          </div>
        )}
        <div className="form-field">
          <label>Email Address</label>
          <input className="form-input" type="email" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" />
        </div>
        <div className="form-field">
          <label>Password</label>
          <PasswordInput value={password} onChange={e => setPassword(e.target.value)} autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} />
        </div>

        {mode === 'login' && (
          <div style={{ textAlign: 'right', marginTop: '-0.5rem', marginBottom: '1rem' }}>
            <button type="button" onClick={onForgot}
              style={{ background: 'none', border: 'none', color: 'var(--purple-l)', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }}>
              Forgot password?
            </button>
          </div>
        )}

        {error && <Banner type="error">{error}</Banner>}

        <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginBottom: '1rem' }} disabled={loading}>
          {loading ? <span className="spinner" /> : mode === 'login' ? 'Sign In' : 'Create Account'}
        </button>
      </form>

      <div style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--muted2)' }}>
        {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
        <button onClick={() => switchMode(mode === 'login' ? 'signup' : 'login')}
          style={{ background: 'none', border: 'none', color: 'var(--purple-l)', fontWeight: 700, cursor: 'pointer', fontSize: '0.8rem' }}>
          {mode === 'login' ? 'Sign Up' : 'Sign In'}
        </button>
      </div>
    </AuthCard>
  )
}

// ── Chat interface ─────────────────────────────────────────────────
function ChatInterface({ user, onLogout }) {
  const [msgs, setMsgs]       = useState(() => LS.getHistory(user.uid))
  const [input, setInput]     = useState('')
  const [loading, setLoading] = useState(false)
  const [count, setCount]     = useState(() => LS.getQueryCount(user.uid))
  const bottomRef             = useRef(null)
  const inputRef              = useRef(null)
  const remaining             = QUERY_LIMIT - count
  const displayName           = user.firstName ? `${user.firstName} ${user.lastName}`.trim() : user.email

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [msgs, loading])

  async function sendMessage() {
    const text = input.trim()
    if (!text || loading || remaining <= 0) return
    setInput('')
    const userMsg = { role: 'user', content: text, ts: Date.now() }
    const newMsgs = [...msgs, userMsg]
    setMsgs(newMsgs); LS.saveHistory(user.uid, newMsgs); setLoading(true)
    try {
      const reply  = await callHF(newMsgs.map(m => ({ role: m.role, content: m.content })))
      const botMsg = { role: 'assistant', content: reply, ts: Date.now() }
      const final  = [...newMsgs, botMsg]
      setMsgs(final); LS.saveHistory(user.uid, final)
      setCount(LS.incQueryCount(user.uid))
    } catch (err) {
      const errMsg = { role: 'assistant', content: `Error: ${err.message || 'Something went wrong.'}`, ts: Date.now(), error: true }
      const final  = [...newMsgs, errMsg]
      setMsgs(final); LS.saveHistory(user.uid, final)
    } finally { setLoading(false) }
  }

  function handleKey(e) { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() } }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: 'var(--bg)', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1.5rem', borderBottom: '1px solid var(--border)', background: 'var(--surface)', flexShrink: 0, height: 56 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a href="#/" style={{ fontWeight: 900, fontSize: '1rem', textDecoration: 'none', color: 'var(--text)', letterSpacing: '-0.02em' }}>
            Abdul<span style={{ color: 'var(--cyan)' }}>.</span>AI
          </a>
          <div style={{ display: 'flex', gap: '1.25rem' }} className="home-nav-links">
            {NAV_LINKS.map(l => (
              <a key={l.label} href={l.href} style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--muted2)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--muted2)'}>
                {l.label}
              </a>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            fontSize: '0.72rem', fontWeight: 700, padding: '3px 10px', borderRadius: 999,
            background: remaining === 0 ? 'rgba(248,113,113,0.12)' : remaining === 1 ? 'rgba(245,158,11,0.12)' : 'rgba(16,185,129,0.12)',
            color: remaining === 0 ? '#f87171' : remaining === 1 ? 'var(--orange)' : 'var(--green)',
            border: `1px solid ${remaining === 0 ? 'rgba(248,113,113,0.25)' : remaining === 1 ? 'rgba(245,158,11,0.25)' : 'rgba(16,185,129,0.25)'}`,
          }}>
            {remaining === 0 ? 'Limit reached' : `${remaining} left`}
          </div>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--muted2)', maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {displayName}
          </div>
          <button onClick={() => { setMsgs([]); LS.saveHistory(user.uid, []) }}
            style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 8, padding: '3px 10px', color: 'var(--muted2)', fontSize: '0.72rem', cursor: 'pointer' }}>
            Clear
          </button>
          <button onClick={onLogout}
            style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 8, padding: '3px 10px', color: 'var(--muted2)', fontSize: '0.72rem', cursor: 'pointer' }}>
            Sign out
          </button>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {msgs.length === 0 && !loading && (
          <div style={{ textAlign: 'center', marginTop: '4rem', color: 'var(--muted2)' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="48" height="48" style={{ margin: '0 auto 1rem', display: 'block', color: 'var(--purple-l)' }}>
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            <div style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.4rem' }}>
              Welcome{user.firstName ? `, ${user.firstName}` : ''}!
            </div>
            <div style={{ fontSize: '0.85rem', maxWidth: 340, margin: '0 auto', lineHeight: 1.7 }}>
              Ask me anything about Abdul's work. You have {remaining} {remaining === 1 ? 'query' : 'queries'} available.
            </div>
          </div>
        )}
        {msgs.map((m, i) => (
          <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', flexDirection: m.role === 'user' ? 'row-reverse' : 'row' }}>
            {m.role === 'assistant' && (
              <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, var(--purple), var(--blue))', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" width="14" height="14">
                  <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
                </svg>
              </div>
            )}
            <div style={{
              maxWidth: '70%', padding: '0.875rem 1.1rem',
              borderRadius: m.role === 'user' ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
              background: m.role === 'user' ? 'linear-gradient(135deg, var(--purple), var(--blue))' : 'var(--card)',
              border: m.role === 'user' ? 'none' : '1px solid var(--border)',
              fontSize: '0.88rem', lineHeight: 1.75,
              color: m.error ? '#f87171' : 'inherit',
              whiteSpace: 'pre-wrap', wordBreak: 'break-word',
            }}>
              {m.content}
              <div style={{ fontSize: '0.65rem', color: m.role === 'user' ? 'rgba(255,255,255,0.5)' : 'var(--muted)', marginTop: 6 }}>
                {new Date(m.ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, var(--purple), var(--blue))', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" width="14" height="14">
                <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
              </svg>
            </div>
            <div style={{ padding: '0.875rem 1.1rem', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '14px 14px 14px 2px', display: 'flex', gap: 5, alignItems: 'center' }}>
              {[0,1,2].map(d => <span key={d} style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--muted2)', animation: `blink 1.2s infinite ${d*0.2}s`, display: 'block' }} />)}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border)', background: 'var(--surface)', flexShrink: 0 }}>
        {remaining === 0 ? (
          <div style={{ textAlign: 'center', padding: '0.875rem', borderRadius: 12, background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)', fontSize: '0.85rem', color: '#f87171' }}>
            You have used all {QUERY_LIMIT} queries. Thank you for trying Abdul's AI!
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-end' }}>
            <textarea ref={inputRef} className="form-input" placeholder="Ask anything…"
              value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKey}
              disabled={loading || remaining === 0} rows={1}
              style={{ flex: 1, minHeight: 44, maxHeight: 120, resize: 'none', lineHeight: 1.5, paddingTop: 10 }}
            />
            <button className="btn btn-primary" onClick={sendMessage}
              disabled={loading || !input.trim() || remaining === 0}
              style={{ height: 44, width: 44, padding: 0, flexShrink: 0, borderRadius: 10 }}>
              {loading ? <span className="spinner" /> : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                  <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Main Home component ────────────────────────────────────────────
export default function Home() {
  const [user, setUser]             = useState(() => LS.getSession())
  const [view, setView]             = useState(() => {
    if (getURLParam('verify')) return 'verifying'
    if (getURLParam('reset'))  return 'reset'
    return 'auth'
  })
  const [resetToken]                = useState(() => getURLParam('reset'))
  const [pendingVerify, setPending] = useState(null) // { email, firstName, resend?, verifyToken? }

  // Handle email verification link
  useEffect(() => {
    if (view !== 'verifying') return
    const token = getURLParam('verify')
    if (!token) { setView('auth'); return }
    const users = LS.getUsers()
    const idx   = users.findIndex(u => u.verifyToken === token)
    if (idx !== -1) {
      users[idx].verified    = true
      users[idx].verifyToken = null
      LS.saveUsers(users)
    }
    clearURLParams()
    setView('verified')
  }, [])

  async function handleResendVerify() {
    if (!pendingVerify) return
    const users = LS.getUsers()
    const user  = users.find(u => u.email === pendingVerify.email)
    if (!user) return
    // Regenerate token
    const newToken   = generateToken()
    const idx        = users.findIndex(u => u.email === user.email)
    users[idx].verifyToken = newToken
    LS.saveUsers(users)
    const verifyLink = `${window.location.origin}${window.location.pathname}#/?verify=${newToken}`
    await sendEmail({
      type:    'verify',
      toEmail: user.email,
      toName:  user.firstName ? `${user.firstName} ${user.lastName}` : user.email,
      link:    verifyLink,
    }).catch(console.error)
  }

  if (user) return <ChatInterface user={user} onLogout={() => { LS.clearSession(); setUser(null); setView('auth') }} />

  if (view === 'verifying') return <><HomeNav /><div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', paddingTop: '4rem' }}><div className="spinner" style={{ width: 32, height: 32 }} /></div></>

  if (view === 'verified')  return <><HomeNav /><VerifiedScreen onContinue={() => setView('auth')} /></>

  if (view === 'reset' && resetToken) return <><HomeNav /><ResetPasswordForm token={resetToken} onDone={() => { clearURLParams(); setView('auth') }} /></>

  if (view === 'forgot')    return <><HomeNav /><ForgotPasswordForm onBack={() => setView('auth')} /></>

  if (view === 'pending' && pendingVerify) return (
    <>
      <HomeNav />
      <VerifyEmailScreen
        email={pendingVerify.email}
        firstName={pendingVerify.firstName}
        onResend={handleResendVerify}
        onBack={() => { setPending(null); setView('auth') }}
      />
    </>
  )

  return (
    <>
      <HomeNav />
      <AuthForm
        onAuth={setUser}
        onForgot={() => setView('forgot')}
        onSignupPending={(data) => { setPending(data); setView('pending') }}
      />
    </>
  )
}
