import { useNavigate, useLocation } from "react-router-dom"
import { useState } from "react"
import { HiMenu, HiX } from "react-icons/hi"
import Loader from "./Loader"

export default function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const [navigating, setNavigating] = useState(false)
  const [loaderMessage, setLoaderMessage] = useState("")

  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: "📊" },
    { to: "/courses",   label: "Courses",   icon: "📚" },
    { to: "/fees",      label: "Fees",      icon: "💳" },
  ]

  const handleNavigate = (to, label) => {
    if (location.pathname === to) {
      setIsOpen(false)
      return
    }
    setIsOpen(false)
    setLoaderMessage(`Loading ${label}...`)
    setNavigating(true)
    setTimeout(() => {
      navigate(to)
      setNavigating(false)
    }, 1000)
  }

  const handleLogout = () => {
    setLoaderMessage("Logging out...")
    setNavigating(true)
    setTimeout(() => {
      localStorage.clear()
      navigate("/", { replace: true })
    }, 1000)
  }

  if (navigating) return <Loader message={loaderMessage} />

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 flex items-center justify-between bg-indigo-600 text-white px-4 py-3 shadow-md">
        <h2 className="text-xl font-bold">KU Portal</h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          className="p-1 rounded hover:bg-white/20 transition"
        >
          {isOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Panel */}
      <div
        className={`
          fixed top-0 left-0 h-screen w-64 z-40
          bg-gradient-to-b from-indigo-600 to-purple-700 text-white p-6
          flex flex-col justify-between
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:z-auto md:flex
        `}
      >
        <div>
          <h2 className="text-2xl font-bold mb-10">KU Portal</h2>

          <nav className="space-y-2">
            {navItems.map(({ to, label, icon }) => (
              <button
                key={to}
                onClick={() => handleNavigate(to, label)}
                className={`
                  w-full flex items-center gap-2 p-3 rounded transition text-left
                  ${location.pathname === to ? "bg-white/30 font-semibold" : "hover:bg-white/20"}
                `}
              >
                {icon} {label}
              </button>
            ))}
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="hover:bg-white/20 p-3 rounded text-left transition"
        >
          🔓 Logout
        </button>
      </div>

      {/* Dark overlay when sidebar is open on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}