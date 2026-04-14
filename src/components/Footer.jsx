import { Link } from 'react-router-dom'

const NAV_LINKS = [
  { to: '/',               label: 'Home' },
  { to: '/about',          label: 'About' },
  { to: '/data-analytics', label: 'Data Analytics' },
  { to: '/data-science',   label: 'Data Science' },
  { to: '/ai-engineering', label: 'AI Engineering' },
  { to: '/contact',        label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="footer-logo">Abdul Rasheed<span className="gt">.</span></div>
          <p className="footer-tagline">
            Artificial Intelligence and Machine Learning Engineer building enterprise-grade intelligent systems, from production RAG pipelines to fine-tuned LLMs deployed at scale.
          </p>
        </div>

        <div>
          <div className="footer-col-title">Pages</div>
          <div className="footer-links">
            {NAV_LINKS.slice(0, 3).map(l => (
              <Link key={l.to} to={l.to}>{l.label}</Link>
            ))}
          </div>
        </div>
        <div>
          <div className="footer-col-title">&nbsp;</div>
          <div className="footer-links">
            {NAV_LINKS.slice(3).map(l => (
              <Link key={l.to} to={l.to}>{l.label}</Link>
            ))}
          </div>
        </div>

        <div>
          <div className="footer-col-title">Connect</div>
          <div className="footer-links">
            <a href="mailto:abdulrasheed101198@gmail.com">Email</a>
            <Link to="/contact">Contact Form</Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Abdul Rasheed — Dallas, TX</span>
        <span style={{ color: 'var(--muted)' }}>AI/ML Engineer · SF Global</span>
      </div>
    </footer>
  )
}
