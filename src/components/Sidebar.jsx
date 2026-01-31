import { Link, useNavigate } from "react-router-dom"

export default function Sidebar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.clear() // sab auth data hata do
    navigate("/", { replace: true })
  }

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-indigo-600 to-purple-700 text-white p-6 flex flex-col justify-between">

      <div>
        <h2 className="text-2xl font-bold mb-10">KU Portal</h2>

        <nav className="space-y-4">
          <Link to="/dashboard" className="block hover:bg-white/20 p-3 rounded">
            📊 Dashboard
          </Link>
          <Link to="/courses" className="block hover:bg-white/20 p-3 rounded">
            📚 Courses
          </Link>
          <Link to="/fees" className="block hover:bg-white/20 p-3 rounded">
            💳 Fees
          </Link>
        </nav>
      </div>

      <button
        onClick={handleLogout}
        className="hover:bg-white/20 p-3 rounded text-left"
      >
        🔓 Logout
      </button>
    </div>
  )
}


