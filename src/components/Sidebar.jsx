import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { HiMenu, HiX } from "react-icons/hi";


export default function Sidebar() {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    localStorage.clear() // clear all auth data
    navigate("/", { replace: true })
  }

  return (
    <>
      {/* Mobile Hamburger */}
      <div className="md:hidden flex items-center bg-indigo-600 text-white p-4 justify-between">
        <h2 className="text-xl font-bold">KU Portal</h2>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-screen w-64 bg-gradient-to-b from-indigo-600 to-purple-700 text-white p-6 flex flex-col justify-between
          transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out
          md:translate-x-0 md:static md:flex
        `}
      >
        <div>
          <h2 className="text-2xl font-bold mb-10 hidden md:block">KU Portal</h2>

          <nav className="space-y-4">
            <Link
              to="/dashboard"
              className="block hover:bg-white/20 p-3 rounded"
              onClick={() => setIsOpen(false)}
            >
              📊 Dashboard
            </Link>
            <Link
              to="/courses"
              className="block hover:bg-white/20 p-3 rounded"
              onClick={() => setIsOpen(false)}
            >
              📚 Courses
            </Link>
            <Link
              to="/fees"
              className="block hover:bg-white/20 p-3 rounded"
              onClick={() => setIsOpen(false)}
            >
              💳 Fees
            </Link>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="hover:bg-white/20 p-3 rounded text-left mt-6"
        >
          🔓 Logout
        </button>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-10 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  )
}


