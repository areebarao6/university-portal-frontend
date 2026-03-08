import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import api from "../services/api"
import { useAuth } from "../context/AuthContext"
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid"
import Loader from "../components/Loader"

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [formData, setFormData] = useState({
    enrollmentId: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [navigating, setNavigating] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await api.post("/auth/login", formData)
      login(res.data.token)
      // Show full screen loader before navigating
      setNavigating(true)
      setTimeout(() => navigate("/dashboard"), 1500)
    } catch (err) {
      setError(err.response?.data?.message || "Login failed")
      setLoading(false)
    }
  }

  // Full screen loader after successful login
  if (navigating) return <Loader message="Welcome back! Loading your dashboard..." />

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg">

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">KU Portal</h2>
          <p className="text-gray-500 mt-1">Welcome Back!</p>
          <p className="text-sm text-gray-400">
            Sign in to access your student dashboard
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* Enrollment ID */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Enrollment ID</label>
            <input
              type="text"
              name="enrollmentId"
              placeholder="KU-2022-CS-001"
              value={formData.enrollmentId}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Password */}
          <div className="relative mb-4">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-2 pr-10 focus:ring-2 focus:ring-indigo-500 outline-none h-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[50px] -translate-y-1/2 text-gray-500"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeSlashIcon className="h-6 w-6" />
              ) : (
                <EyeIcon className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Forgot Password */}
          <div className="text-right mb-6">
            <Link
              to="/forgot-password"
              className="text-blue-800 text-sm font-semibold hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-70 flex items-center justify-center gap-2 h-11"
          >
            {loading ? (
              <>
                {/* Spinning mini loader inside button */}
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12" cy="12" r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                <span>Signing in...</span>
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-indigo-600 font-semibold">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}



  
  