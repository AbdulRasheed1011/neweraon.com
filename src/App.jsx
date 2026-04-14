import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ChatWidget from './components/ChatWidget'
import Home from './pages/Home'
import About from './pages/About'
import DataAnalytics from './pages/DataAnalytics'
import DataScience from './pages/DataScience'
import AIEngineering from './pages/AIEngineering'
import Contact from './pages/Contact'
import Learn from './pages/Learn'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/data-analytics" element={<DataAnalytics />} />
          <Route path="/data-science" element={<DataScience />} />
          <Route path="/ai-engineering" element={<AIEngineering />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
      <ChatWidget />
    </>
  )
}
