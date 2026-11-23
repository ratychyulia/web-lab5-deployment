import { useEffect, useState } from 'react'

const COMMENTS_URL = 'https://jsonplaceholder.typicode.com/posts/20/comments'

function Reviews() {
  const [comments, setComments] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    async function load() {
      try {
        const res = await fetch(COMMENTS_URL, { signal: controller.signal })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        if (!Array.isArray(data)) throw new Error('Неочікуваний формат відповіді')
        setComments(data)
        setStatus('ok')
      } catch (err) {
        if (err.name === 'AbortError') return
        setError(err.message)
        setStatus('error')
      }
    }
    load()
    return () => controller.abort()
  }, [])

  return (
    <section className="bg-white dark:bg-slate-800 border-l-4 border-emerald-600 rounded-lg shadow-md p-6 mb-4 hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-2xl font-semibold text-emerald-900 dark:text-emerald-200 mb-3">Відгуки</h2>
      {status === 'loading' && <p className="text-slate-700 dark:text-slate-200">Завантаження...</p>}
      {status === 'error' && (
        <p role="alert" className="text-red-700 dark:text-red-300">Помилка завантаження відгуків: {error}</p>
      )}
      {status === 'ok' && (
        <ul className="space-y-4">
          {comments.map((c) => (
            <li key={c.id} className="border-b border-slate-200 dark:border-slate-600 pb-3">
              <p className="font-semibold text-slate-900 dark:text-slate-100">{c.name}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">{c.email}</p>
              <p className="mt-1 text-slate-700 dark:text-slate-200">{c.body}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default Reviews
