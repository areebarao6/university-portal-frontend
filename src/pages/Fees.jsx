import Sidebar from "../components/Sidebar"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import api from "../services/api" // axios instance with auth token

export default function Fees() {
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)

  // Fetch user data from backend
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get("/dashboard") // get logged-in user's dashboard
        setDashboardData(res.data)
      } catch (err) {
        console.log("Failed to fetch dashboard data", err)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboard()
  }, [])

  // Show loader while fetching
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        Loading Fees...
      </div>
    )
  }

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8">
        {/* Page Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-extrabold mb-8 text-gray-800"
        >
          Fee Details
        </motion.h1>

        {/* Fee Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.03, boxShadow: "0 15px 25px rgba(0,0,0,0.2)" }}
          className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white p-8 rounded-2xl shadow-lg max-w-md"
        >
          <p className="text-lg md:text-xl">
            Pending Fee:{" "}
            <span className="font-bold text-red-300">
              Rs. {dashboardData.stats?.pendingFee ?? 0}
            </span>
          </p>

          <button className="mt-6 w-full bg-white text-indigo-700 font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition">
            Download Voucher
          </button>
        </motion.div>
      </div>
    </div>
  )
}


