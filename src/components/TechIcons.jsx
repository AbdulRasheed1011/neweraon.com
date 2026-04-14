// ── Technology Icon Components ─────────────────────────────────────
// Uses Simple Icons CDN for brand-accurate SVG icons

const CDN = 'https://cdn.simpleicons.org'

export const TECH_STACK = [
  // AI / ML
  { name: 'Python',        slug: 'python',         color: '#3572a5', cat: 'language' },
  { name: 'PyTorch',       slug: 'pytorch',         color: '#EE4C2C', cat: 'ml' },
  { name: 'TensorFlow',    slug: 'tensorflow',      color: '#FF6F00', cat: 'ml' },
  { name: 'Keras',         slug: 'keras',           color: '#D00000', cat: 'ml' },
  { name: 'Scikit-learn',  slug: 'scikitlearn',     color: '#F7931E', cat: 'ml' },
  { name: 'HuggingFace',   slug: 'huggingface',     color: '#FFD21E', cat: 'ai' },
  { name: 'LangChain',     slug: 'langchain',       color: '#1C7C54', cat: 'ai' },
  // Infra
  { name: 'Docker',        slug: 'docker',          color: '#2496ED', cat: 'infra' },
  { name: 'Kubernetes',    slug: 'kubernetes',      color: '#326CE5', cat: 'infra' },
  { name: 'AWS',           slug: 'amazonaws',       color: '#FF9900', cat: 'cloud' },
  { name: 'FastAPI',       slug: 'fastapi',         color: '#009688', cat: 'api' },
  { name: 'MLflow',        slug: 'mlflow',          color: '#0194E2', cat: 'mlops' },
  { name: 'Apache Airflow',slug: 'apacheairflow',   color: '#017CEE', cat: 'mlops' },
  { name: 'NumPy',         slug: 'numpy',           color: '#013243', cat: 'data' },
  { name: 'Pandas',        slug: 'pandas',          color: '#150458', cat: 'data' },
  { name: 'Spring Boot',   slug: 'springboot',      color: '#6DB33F', cat: 'backend' },
  { name: 'GitHub Actions',slug: 'githubactions',   color: '#2088FF', cat: 'devops' },
  { name: 'React',         slug: 'react',           color: '#61DAFB', cat: 'frontend' },
]

export function TechIcon({ slug, color, name, size = 24 }) {
  return (
    <img
      src={`${CDN}/${slug}/${color.replace('#', '')}`}
      alt={name}
      width={size}
      height={size}
      title={name}
      style={{ display: 'block', filter: color === '#FFD21E' || color === '#F7931E' || color === '#61DAFB' ? 'none' : 'brightness(1.15)' }}
      onError={e => { e.target.style.display = 'none' }}
    />
  )
}

export function TechPill({ slug, color, name }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      padding: '8px 14px', borderRadius: 10,
      background: 'var(--card)', border: '1px solid var(--border)',
      transition: 'border-color 0.2s, transform 0.2s',
      cursor: 'default',
    }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = color + '80'; e.currentTarget.style.transform = 'translateY(-2px)' }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none' }}>
      <TechIcon slug={slug} color={color} name={name} size={20} />
      <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--muted2)' }}>{name}</span>
    </div>
  )
}
