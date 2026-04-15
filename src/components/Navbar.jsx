import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'

const LINKS = [
  { to: '/',               label: 'Home' },
  { to: '/about',          label: 'About' },
  { to: '/data-analytics', label: 'Data Analytics' },
  { to: '/data-science',   label: 'Data Science' },
  { to: '/ai-engineering', label: 'AI Engineering' },
  { to: '/learn',          label: 'Learn' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <Link to="/" className="nav-logo">
          Abdul<span className="gt">.</span>AI
        </Link>

        <div className="nav-links">
          {LINKS.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <Link to="/contact" className="btn btn-primary nav-cta">Let's Talk</Link>

        <button className="nav-hamburger" onClick={() => setOpen(o => !o)} aria-label="Toggle menu">
          <span style={{ transform: open ? 'rotate(45deg) translateY(7px)' : 'none' }} />
          <span style={{ opacity: open ? 0 : 1 }} />
          <span style={{ transform: open ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
        </button>
      </nav>

      <div className={`nav-mobile ${open ? 'open' : ''}`}>
        {LINKS.map(l => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.to === '/'}
            className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            onClick={() => setOpen(false)}
          >
            {l.label}
          </NavLink>
        ))}
        <Link to="/contact" className="btn btn-primary btn-sm mt-1" onClick={() => setOpen(false)}>
          Let's Talk
        </Link>
      </div>
    </>
  )
}
