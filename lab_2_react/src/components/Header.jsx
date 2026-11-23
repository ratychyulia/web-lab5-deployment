function Header() {
  return (
    <header className="bg-white dark:bg-slate-800 border-b-4 border-indigo-600 rounded-lg shadow-md p-6 mb-4">
      <h1 className="text-4xl font-bold text-indigo-900 dark:text-indigo-200">Ratych Yulia</h1>
      <p className="mt-2 text-slate-700 dark:text-slate-300">Студентка НУ «Львівська політехніка», група КБ-201</p>
      <p className="text-slate-700 dark:text-slate-300">
        Email: <a className="text-indigo-700 dark:text-indigo-300 underline" href="mailto:ratychyulia@gmail.com">ratychyulia@gmail.com</a>
      </p>
      <p className="text-slate-700 dark:text-slate-300">
        GitHub: <a className="text-indigo-700 dark:text-indigo-300 underline" href="https://github.com/ratychyulia" target="_blank" rel="noreferrer">github.com/ratychyulia</a>
      </p>
    </header>
  )
}

export default Header
