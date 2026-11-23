import { useEffect, useState } from 'react'

// Персональний endpoint Formspree
export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mqppdznq'
const OPEN_DELAY_MS = 60000
const EMPTY = { name: '', email: '', phone: '', message: '' }
const INPUT_CLASS =
  'w-full rounded-md border border-slate-300 dark:border-slate-500 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 px-3 py-2'

function ContactForm() {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(EMPTY)
  const [status, setStatus] = useState({ type: '', text: '' })
  const [sending, setSending] = useState(false)

  useEffect(() => {
    const id = setTimeout(() => setOpen(true), OPEN_DELAY_MS)
    return () => clearTimeout(id)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  async function onSubmit(e) {
    e.preventDefault()
    if (!e.currentTarget.elements.email.checkValidity() && form.email.trim()) {
      setStatus({ type: 'error', text: 'Введіть коректну адресу email.' })
      return
    }
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({ type: 'error', text: "Заповніть ім'я, email і повідомлення." })
      return
    }
    setSending(true)
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setForm(EMPTY)
      setStatus({ type: 'ok', text: 'Повідомлення надіслано.' })
    } catch (err) {
      setStatus({ type: 'error', text: `Помилка відправлення: ${err.message}` })
    } finally {
      setSending(false)
    }
  }

  return (
    <section className="bg-white dark:bg-slate-800 border-l-4 border-rose-600 rounded-lg shadow-md p-6 mb-4">
      <h2 className="text-2xl font-semibold text-rose-900 dark:text-rose-200 mb-3">Контакти</h2>
      <button type="button" onClick={() => setOpen(true)} className="px-4 py-2 rounded-md bg-rose-600 text-white hover:bg-rose-700">
        Написати мені
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setOpen(false)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-title"
            className="w-full max-w-md bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-xl shadow-xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 id="contact-title" className="text-xl font-semibold">Зворотний зв'язок</h3>
              <button type="button" onClick={() => setOpen(false)} aria-label="Закрити" className="text-2xl leading-none px-2">×</button>
            </div>
            <form onSubmit={onSubmit} className="space-y-3" noValidate>
              <label className="block">
                <span className="block text-sm mb-1">Ім'я</span>
                <input className={INPUT_CLASS} name="name" value={form.name} onChange={onChange} autoComplete="name" />
              </label>
              <label className="block">
                <span className="block text-sm mb-1">Email</span>
                <input className={INPUT_CLASS} type="email" name="email" value={form.email} onChange={onChange} autoComplete="email" />
              </label>
              <label className="block">
                <span className="block text-sm mb-1">Телефон</span>
                <input className={INPUT_CLASS} type="tel" name="phone" value={form.phone} onChange={onChange} autoComplete="tel" />
              </label>
              <label className="block">
                <span className="block text-sm mb-1">Повідомлення</span>
                <textarea className={INPUT_CLASS} rows={4} name="message" value={form.message} onChange={onChange} />
              </label>
              {status.text && (
                <p role="status" className={status.type === 'ok' ? 'text-emerald-700 dark:text-emerald-300' : 'text-red-700 dark:text-red-300'}>
                  {status.text}
                </p>
              )}
              <button type="submit" disabled={sending} className="w-full px-4 py-2 rounded-md bg-rose-600 text-white hover:bg-rose-700 disabled:opacity-50">
                {sending ? 'Надсилання...' : 'Надіслати'}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}

export default ContactForm
