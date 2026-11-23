import { useEffect, useState } from 'react'

function Footer() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    try {
      localStorage.setItem('userAgent', navigator.userAgent)
      localStorage.setItem('platform', navigator.platform)
      const all = Object.keys(localStorage).sort().map((k) => [k, localStorage.getItem(k)])
      setEntries(all)
    } catch (err) {
      setError(`localStorage недоступний: ${err.message}`)
    }
  }, [])

  return (
    <footer className="text-white bg-blue-900 dark:bg-slate-950 dark:border dark:border-slate-700 rounded-xl p-4 mt-6 shadow-md">
      <p className="text-center font-semibold tracking-wider">@Ratych Yulia</p>
      <h3 className="mt-3 font-semibold">Дані localStorage</h3>
      {error && <p className="text-red-200">{error}</p>}
      {!error && entries.length === 0 && <p className="opacity-80">Сховище порожнє</p>}
      {entries.length > 0 && (
        <dl className="mt-2 text-sm space-y-2 break-all">
          {entries.map(([key, value]) => (
            <div key={key}>
              <dt className="font-semibold text-blue-200 dark:text-sky-300">{key}</dt>
              <dd className="opacity-90">{value}</dd>
            </div>
          ))}
        </dl>
      )}
    </footer>
  )
}

export default Footer
