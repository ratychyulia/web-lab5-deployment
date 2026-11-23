import { useEffect, useState } from 'react'
import Header from './components/Header'
import Education from './components/Education'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Reviews from './components/Reviews'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'
import { autoTheme } from './theme'

function App() {
  // manual: null = автоматична тема, 'light' | 'dark' = ручний вибір
  const [manual, setManual] = useState(null)
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60000)
    return () => clearInterval(id)
  }, [])

  const theme = manual ?? autoTheme(now)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 py-8 px-4 transition-colors">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-wrap items-center justify-end gap-2 mb-4 text-sm">
          <span className="text-slate-600 dark:text-slate-300">
            Тема: {theme === 'dark' ? 'темна' : 'світла'} ({manual ? 'вручну' : 'авто'})
          </span>
          <button
            type="button"
            onClick={() => setManual(theme === 'dark' ? 'light' : 'dark')}
            className="px-3 py-1 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
          >
            Перемкнути тему
          </button>
          <button
            type="button"
            onClick={() => setManual(null)}
            disabled={manual === null}
            className="px-3 py-1 rounded-md border border-indigo-600 text-indigo-700 dark:text-indigo-300 disabled:opacity-40 hover:bg-indigo-50 dark:hover:bg-slate-800"
          >
            Авто
          </button>
        </div>
        <Header />
        <Skills />
        <Experience />
        <Education />
        <Reviews />
        <ContactForm />
        <Footer />
      </div>
    </div>
  )
}

export default App
