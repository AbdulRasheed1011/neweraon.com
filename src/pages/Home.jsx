import { useState, useRef, useEffect } from 'react'
import { HF_API_KEY, HF_ENDPOINT, HF_MODEL, QUERY_LIMIT, CHAT_SYSTEM_PROMPT } from '../config/llm'

// ── LocalStorage helpers ───────────────────────────────────────────
const LS = {
  getUsers: () => JSON.parse(localStorage.getItem('ar_users') || '[]'),
  saveUsers: (u) => localStorage.setItem('ar_users', JSON.stringify(u)),
  getSession: () => JSON.parse(localStorage.getItem('ar_session') || 'null'),
  saveSession: (s) => localStorage.setItem('ar_session', JSON.stringify(s)),
  clearSession: () => localStorage.removeItem('ar_session'),
  getHistory: (uid) => JSON.parse(localStorage.getItem(`ar_history_${uid}`) || '[]'),
  saveHistory: (uid, h) => localStorage.setItem(`ar_history_${uid}`, JSON.stringify(h)),
  getQueryCount: (uid) => parseInt(localStorage.getItem(`ar_queries_${uid}`) || '0'),
  incQueryCount: (uid) => {
    const n = LS.getQueryCount(uid) + 1
    localStorage.setItem(`ar_queries_${uid}`, String(n))
    return n
  },
}

async function hashPassword(pw) {
  const data = new TextEncoder().encode(pw + '_ar_salt_2025')
  const buf = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
}

// ── HuggingFace chat call ──────────────────────────────────────────
async function callHF(messages) {
  if (!HF_API_KEY) {
    // Demo mode fallback
    await new Promise(r => setTimeout(r, 800))
    return `This is a demo response. To enable real AI responses, add your HuggingFace API key to the .env file (VITE_HF_API_KEY). Get a free key at huggingface.co/settings/tokens.`
  }
  const res = await fetch(HF_ENDPOINT, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${HF_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: HF_MODEL,
      messages: [{ role: 'system', content: CHAT_SYSTEM_PROMPT }, ...messages],
      max_tokens: 600,
      temperature: 0.7,
      stream: false,
    }),
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(err)
  }
  const data = await res.json()
  return data.choices?.[0]?.message?.content || 'No response received.'
}

// ── Auth form ─────────────────────────────────────────────────────
function AuthForm({ onAuth }) {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email.trim() || !password.trim()) { setError('Please fill in all fields.'); return }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return }
    setError(''); setLoading(true)
    const hash = await hashPassword(password)
    const users = LS.getUsers()
    if (mode === 'signup') {
      if (users.find(u => u.email === email.toLowerCase())) {
        setError('An account with this email already exists.'); setLoading(false); return
      }
      const uid = `u_${Date.now()}`
      const newUser = { email: email.toLowerCase(), hash, uid, createdAt: new Date().toISOString() }
      LS.saveUsers([...users, newUser])
      LS.saveSession({ uid, email: email.toLowerCase() })
      onAuth({ uid, email: email.toLowerCase() })
    } else {
      const user = users.find(u => u.email === email.toLowerCase() && u.hash === hash)
      if (!user) { setError('Incorrect email or password.'); setLoading(false); return }
      LS.saveSession({ uid: user.uid, email: user.email })
      onAuth({ uid: user.uid, email: user.email })
    }
    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg)', padding: '2rem',
    }} className="bg-dots">
      <div style={{
        width: '100%', maxWidth: 420,
        background: 'var(--card)', border: '1px solid var(--border)',
        borderRadius: 'var(--rl)', padding: '2.5rem', position: 'relative',
        boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, var(--purple), var(--cyan))', borderRadius: 'var(--rl) var(--rl) 0 0' }} />
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '0.3rem' }}>
            Abdul<span className="gt">.</span>AI
          </div>
          <div style={{ fontSize: '0.82rem', color: 'var(--muted2)' }}>
            {mode === 'login' ? 'Sign in to start chatting' : 'Create your account to get started'}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label>Email address</label>
            <input className="form-input" type="email" placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="form-field">
            <label>Password</label>
            <input className="form-input" type="password" placeholder="Min. 6 characters" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          {error && (
            <div style={{ fontSize: '0.8rem', color: '#f87171', marginBottom: '1rem', padding: '8px 12px', background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: 8 }}>
              {error}
            </div>
          )}
          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginBottom: '1rem' }} disabled={loading}>
            {loading ? <span className="spinner" /> : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--muted2)' }}>
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError('') }}
            style={{ background: 'none', border: 'none', color: 'var(--purple-l)', fontWeight: 700, cursor: 'pointer', fontSize: '0.8rem' }}>
            {mode === 'login' ? 'Sign Up' : 'Sign In'}
          </button>
        </div>

        <div style={{ marginTop: '1.5rem', padding: '0.75rem', background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: 8, fontSize: '0.73rem', color: 'var(--muted2)', textAlign: 'center', lineHeight: 1.6 }}>
          Free access: {QUERY_LIMIT} queries per account. Powered by HuggingFace AI.
        </div>
      </div>
    </div>
  )
}

// ── Chat interface ─────────────────────────────────────────────────
function ChatInterface({ user, onLogout }) {
  const [msgs, setMsgs] = useState(() => LS.getHistory(user.uid))
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [queryCount, setQueryCount] = useState(() => LS.getQueryCount(user.uid))
  const bottomRef = useRef(null)
  const inputRef = useRef(null)
  const remaining = QUERY_LIMIT - queryCount

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msgs, loading])

  async function sendMessage() {
    const text = input.trim()
    if (!text || loading || remaining <= 0) return
    setInput('')
    const userMsg = { role: 'user', content: text, ts: Date.now() }
    const newMsgs = [...msgs, userMsg]
    setMsgs(newMsgs)
    LS.saveHistory(user.uid, newMsgs)
    setLoading(true)

    try {
      const apiMsgs = newMsgs.map(m => ({ role: m.role, content: m.content }))
      const reply = await callHF(apiMsgs)
      const botMsg = { role: 'assistant', content: reply, ts: Date.now() }
      const final = [...newMsgs, botMsg]
      setMsgs(final)
      LS.saveHistory(user.uid, final)
      const newCount = LS.incQueryCount(user.uid)
      setQueryCount(newCount)
    } catch (err) {
      const errMsg = { role: 'assistant', content: `Error: ${err.message || 'Something went wrong. Please try again.'}`, ts: Date.now(), error: true }
      const final = [...newMsgs, errMsg]
      setMsgs(final)
      LS.saveHistory(user.uid, final)
    } finally {
      setLoading(false)
    }
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }
  }

  function clearHistory() {
    setMsgs([])
    LS.saveHistory(user.uid, [])
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: 'var(--bg)', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0.875rem 1.5rem', borderBottom: '1px solid var(--border)',
        background: 'var(--surface)', flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ fontSize: '1rem', fontWeight: 900 }}>Abdul<span className="gt">.</span>AI</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--muted2)', padding: '2px 10px', borderRadius: 999, border: '1px solid var(--border)', background: 'var(--card)' }}>
            HuggingFace Inference
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            fontSize: '0.75rem', fontWeight: 700, padding: '4px 12px', borderRadius: 999,
            background: remaining === 0 ? 'rgba(248,113,113,0.12)' : remaining === 1 ? 'rgba(245,158,11,0.12)' : 'rgba(16,185,129,0.12)',
            color: remaining === 0 ? '#f87171' : remaining === 1 ? 'var(--orange)' : 'var(--green)',
            border: `1px solid ${remaining === 0 ? 'rgba(248,113,113,0.25)' : remaining === 1 ? 'rgba(245,158,11,0.25)' : 'rgba(16,185,129,0.25)'}`,
          }}>
            {remaining === 0 ? 'Query limit reached' : `${remaining} ${remaining === 1 ? 'query' : 'queries'} remaining`}
          </div>
          <button onClick={clearHistory}
            style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 8, padding: '4px 10px', color: 'var(--muted2)', fontSize: '0.72rem', cursor: 'pointer' }}
            title="Clear chat history">
            Clear
          </button>
          <button onClick={onLogout}
            style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 8, padding: '4px 10px', color: 'var(--muted2)', fontSize: '0.72rem', cursor: 'pointer' }}>
            Sign out
          </button>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {msgs.length === 0 && !loading && (
          <div style={{ textAlign: 'center', marginTop: '4rem', color: 'var(--muted2)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="48" height="48" style={{ margin: '0 auto', display: 'block', color: 'var(--purple-l)' }}>
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
            <div style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.4rem' }}>Start a conversation</div>
            <div style={{ fontSize: '0.85rem', maxWidth: 340, margin: '0 auto', lineHeight: 1.7 }}>
              Ask me anything. You have {remaining} {remaining === 1 ? 'query' : 'queries'} available.
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
              maxWidth: '70%', padding: '0.875rem 1.1rem', borderRadius: m.role === 'user' ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
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
              {[0, 1, 2].map(d => <span key={d} style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--muted2)', animation: `blink 1.2s infinite ${d * 0.2}s`, display: 'block' }} />)}
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
            <textarea
              ref={inputRef}
              className="form-input"
              placeholder="Ask anything..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              disabled={loading || remaining === 0}
              rows={1}
              style={{ flex: 1, minHeight: 44, maxHeight: 120, resize: 'none', lineHeight: 1.5, paddingTop: 10 }}
            />
            <button className="btn btn-primary" onClick={sendMessage} disabled={loading || !input.trim() || remaining === 0}
              style={{ height: 44, width: 44, padding: 0, flexShrink: 0, borderRadius: 10 }}>
              {loading ? <span className="spinner" /> : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                  <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              )}
            </button>
          </div>
        )}
        <div style={{ fontSize: '0.68rem', color: 'var(--muted)', marginTop: '0.5rem', textAlign: 'center' }}>
          Signed in as <strong style={{ color: 'var(--muted2)' }}>{user.email}</strong>
        </div>
      </div>
    </div>
  )
}

// ── Main Home component ────────────────────────────────────────────
export default function Home() {
  const [user, setUser] = useState(() => LS.getSession())

  function handleAuth(userData) { setUser(userData) }
  function handleLogout() { LS.clearSession(); setUser(null) }

  if (!user) return <AuthForm onAuth={handleAuth} />
  return <ChatInterface user={user} onLogout={handleLogout} />
}
