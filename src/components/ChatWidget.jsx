import { useState, useRef, useEffect } from 'react'

const API_URL = import.meta.env.VITE_API_URL || ''

// ── System prompt — only answers about Abdul ──────────────────────
const SYSTEM_PROMPT = `You are the AI assistant on Abdul Rasheed's personal portfolio website. Your ONLY purpose is to answer questions about Abdul Rasheed's professional background, skills, projects, and work experience.

ABOUT ABDUL RASHEED:
- Artificial Intelligence and Machine Learning Engineer with 3+ years of full SDLC experience, based in Dallas, TX
- Currently: AI/ML Engineer at SF Global (Feb 2024 – Present)
- Previous: Data Analyst at Al-Hashmi Traders, Hyderabad, India (Jul 2021 – Dec 2022)
- Education: MS Information Technology & Management, Campbellsville University, GPA 3.916/4.0 (2023–2024)
- Background: BE Mechanical Engineering, Osmania University, GPA 3.3/4.0 (2017–2021)

PROFESSIONAL EXPERTISE:
- Expert in Generative AI (LLMs), Retrieval-Augmented Generation (RAG), and production ML systems
- Fine-tunes LLMs using HuggingFace, PEFT (QLoRA), PyTorch
- Builds RAG systems with FAISS, LangChain, hybrid retrieval
- Deploys on AWS (SageMaker, EC2, S3) with Docker, Kubernetes, GitHub Actions
- Implements responsible AI: model monitoring, drift detection, guardrails

KEY SKILLS:
- AI/ML: PyTorch, TensorFlow, Keras, Scikit-learn, HuggingFace, LangChain
- GenAI: LLMs (GPT, Llama, Gemini), Prompt Engineering, RAG, QLoRA/PEFT Fine-tuning
- Vector DBs: FAISS, Pinecone, Weaviate
- MLOps: MLflow, Kubeflow, Airflow, Docker, Kubernetes, GitHub Actions
- Cloud: AWS (SageMaker, EC2, S3), Azure, GCP
- Programming: Python, Java, JavaScript

FEATURED PROJECT:
Texas SNAP Policy RAG System (Llama 3.0, LangChain, Hybrid Retrieval)
- Production RAG pipeline over 500+ regulatory documents
- Hybrid retrieval (vector + keyword), 40% MRR improvement
- Confidence-scoring refusal gates to reduce hallucinations
- Deployed on AWS with Docker and structured logging

GUARDRAILS:
1. ONLY answer questions about Abdul Rasheed's professional work, skills, projects, experience, or education.
2. Refuse anything unrelated: general coding tutorials, current events, other people, creative writing, math.
3. Do NOT share personal contact details beyond LinkedIn and the Contact page.
4. Do NOT discuss salaries, compensation, or personal financial details.

REFUSAL RESPONSE: "I'm Abdul's portfolio assistant. I can only answer questions about his professional background, skills, and projects. Is there something specific about his work I can help you with?"

TONE: Professional, concise, confident. Keep responses to 2-4 sentences unless more detail is requested.`

const INITIAL_MSG = {
  role: 'assistant',
  content: "Hi! I'm Abdul's assistant. How can I help you?"
}

const OFF_TOPIC_PATTERNS = [
  /how (do|to|can) (i|you|we)/i,
  /what is (a |an )?(machine learning|deep learning|python|neural|gpt|bert)/i,
  /explain (me |to me )?(how|what|why)/i,
  /write (me |a |the )?(code|function|script|essay|poem|story)/i,
  /weather|news|stock|sports|politics|movie|song|recipe/i,
  /who (is|was) (.*) (president|ceo|founder)/i,
  /calculate|solve|math|equation/i,
]

function isOffTopic(msg) {
  return OFF_TOPIC_PATTERNS.some(p => p.test(msg))
}

const REFUSAL = "I'm Abdul's portfolio assistant. I can only answer questions about his professional background, skills, and projects. Is there something specific about his work I can help you with?"

function getLocalReply(msg) {
  const m = msg.toLowerCase()
  if (isOffTopic(msg)) return REFUSAL

  if (m.includes('experience') || m.includes('year'))
    return "Abdul has 3+ years of full SDLC experience as an Artificial Intelligence and Machine Learning Engineer. He is currently at SF Global in Dallas, building enterprise LLM systems, RAG pipelines, and production ML services."

  if (m.includes('skill') || m.includes('tech') || m.includes('stack') || m.includes('know'))
    return "Abdul specialises in PyTorch, HuggingFace, LangChain, FastAPI, Docker, and AWS. His core expertise is in Generative AI, fine-tuning LLMs with QLoRA/PEFT, building RAG pipelines with FAISS, and deploying on SageMaker."

  if (m.includes('project') || m.includes('work') || m.includes('built'))
    return "His flagship project is the Texas SNAP Policy RAG System, a production pipeline over 500+ regulatory documents using Llama 3.0, LangChain, and hybrid retrieval, achieving a 40% MRR improvement. He also built fine-tuned LLM services and AI inference APIs at SF Global."

  if (m.includes('rag') || m.includes('retrieval'))
    return "Abdul designed the Texas SNAP Policy RAG System with hierarchical chunking, metadata-aware embeddings, and hybrid vector + keyword retrieval. It uses confidence-scoring refusal gates to prevent hallucinations, deployed on AWS with Docker."

  if (m.includes('education') || m.includes('degree') || m.includes('university'))
    return "Abdul holds an MS in Information Technology and Management from Campbellsville University (GPA: 3.916/4.0, 2023-2024) and a BE in Mechanical Engineering from Osmania University. He also completed the Deep Learning Specialization from DeepLearning.ai."

  if (m.includes('certif'))
    return "Abdul holds three certifications: Deep Learning Specialization (DeepLearning.ai), Complete Machine Learning and Data Science (Geeks For Geeks), and Python for Everybody (Coursera)."

  if (m.includes('hire') || m.includes('available') || m.includes('contact') || m.includes('work with'))
    return "Abdul is open to new opportunities. Connect on LinkedIn at linkedin.com/in/abdul-rasheed-12382b196 or visit the Contact page to send a message directly."

  if (m.includes('github') || m.includes('code') || m.includes('repo'))
    return "Abdul's code is on GitHub at github.com/AbdulRasheed1011. He works primarily in Python, building AI/ML systems, RAG pipelines, and enterprise services."

  if (m.includes('youtube') || m.includes('video') || m.includes('content') || m.includes('blog') || m.includes('learn'))
    return "Abdul creates content about AI and data science on YouTube at youtube.com/@AbdulRasheed-q8h, and publishes learning resources on the Learn page covering Data Analytics, Data Science, and AI Engineering."

  if (m.includes('hello') || m.includes('hi') || m.includes('hey'))
    return "Hi! Feel free to ask about Abdul's AI/ML engineering work, projects, skills, or background."

  if (m.includes('sf global') || m.includes('current') || m.includes('company'))
    return "Abdul currently works as an AI/ML Engineer at SF Global in Dallas (Feb 2024 to present), building enterprise LLM services, RAG systems, and deploying ML models on AWS with Docker and Kubernetes."

  if (m.includes('llm') || m.includes('language model') || m.includes('fine-tun') || m.includes('gpt') || m.includes('llama'))
    return "Abdul fine-tunes LLMs using HuggingFace, PEFT (QLoRA), and PyTorch, achieving an 18% accuracy improvement in production workflows at SF Global. He works with Llama, GPT-style, and Gemini architectures."

  if (m.includes('analytics') || m.includes('tableau') || m.includes('dashboard'))
    return "At Al-Hashmi Traders, Abdul built Tableau dashboards and ML-driven pricing models that increased sales by 44% and revenue by 37%. He optimised SQL queries reducing reporting turnaround by 30%."

  return "Great question! Ask about Abdul's AI/ML engineering experience, his RAG and LLM projects, his tech stack, or his background. What would you like to know?"
}

export default function ChatWidget() {
  const [open, setOpen]       = useState(false)
  const [msgs, setMsgs]       = useState([INITIAL_MSG])
  const [input, setInput]     = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef             = useRef(null)
  const inputRef              = useRef(null)

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open, msgs])

  async function sendMessage() {
    const text = input.trim()
    if (!text || loading) return
    setInput('')

    const userMsg = { role: 'user', content: text }
    setMsgs(prev => [...prev, userMsg])
    setLoading(true)

    try {
      if (!API_URL) {
        await new Promise(r => setTimeout(r, 700))
        setMsgs(prev => [...prev, { role: 'assistant', content: getLocalReply(text) }])
        setLoading(false)
        return
      }

      if (isOffTopic(text)) {
        await new Promise(r => setTimeout(r, 400))
        setMsgs(prev => [...prev, { role: 'assistant', content: REFUSAL }])
        setLoading(false)
        return
      }

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system: SYSTEM_PROMPT,
          messages: [...msgs, userMsg].map(m => ({ role: m.role, content: m.content })),
          max_tokens: 300,
        })
      })

      if (!response.ok) throw new Error(`API error ${response.status}`)
      const data = await response.json()
      const reply = data.content?.[0]?.text || data.message || data.reply || REFUSAL
      setMsgs(prev => [...prev, { role: 'assistant', content: reply }])
    } catch {
      setMsgs(prev => [...prev, {
        role: 'assistant',
        content: "Connection issue right now. Visit the Contact page or reach Abdul directly on LinkedIn."
      }])
    } finally {
      setLoading(false)
    }
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }
  }

  const SUGGESTIONS = ["What is Abdul's tech stack?", 'Tell me about the RAG project', 'Is he available for hire?']

  return (
    <>
      {open && (
        <div className="chat-panel">
          <div className="chat-header">
            <div className="chat-header-left">
              <div className="chat-avatar">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" width="16" height="16">
                  <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2zM7 14a1 1 0 1 0 2 0 1 1 0 0 0-2 0zm8 0a1 1 0 1 0 2 0 1 1 0 0 0-2 0z"/>
                </svg>
              </div>
              <div>
                <div className="chat-name">Abdul's Assistant</div>
                <div className="chat-status">Powered by Claude AI</div>
              </div>
            </div>
            <button className="chat-close" onClick={() => setOpen(false)}>✕</button>
          </div>

          <div className="chat-messages">
            {msgs.map((m, i) => (
              <div key={i} className={`msg ${m.role === 'user' ? 'msg-user' : 'msg-bot'}`}>
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="msg msg-bot msg-typing"><span /><span /><span /></div>
            )}

            {msgs.length === 1 && !loading && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.25rem' }}>
                {SUGGESTIONS.map(s => (
                  <button
                    key={s}
                    onClick={() => { setInput(s); inputRef.current?.focus() }}
                    style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '7px 12px', color: 'var(--muted2)', fontSize: '0.75rem', cursor: 'pointer', textAlign: 'left', transition: 'border-color 0.2s' }}
                    onMouseEnter={e => e.target.style.borderColor = 'var(--purple)'}
                    onMouseLeave={e => e.target.style.borderColor = 'var(--border)'}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="chat-input-row">
            <input
              ref={inputRef}
              className="chat-input"
              placeholder="Ask about Abdul's work..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              disabled={loading}
            />
            <button className="chat-send" onClick={sendMessage} disabled={loading || !input.trim()}>
              {loading ? <span className="spinner" /> : '↑'}
            </button>
          </div>
        </div>
      )}

      <button className="chat-fab" onClick={() => setOpen(o => !o)} title="Ask about Abdul">
        {open ? '✕' : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        )}
      </button>
    </>
  )
}
