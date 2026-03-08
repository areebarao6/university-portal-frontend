import Sidebar from "../components/Sidebar"
import StatCard from "../components/StatCard"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import api from "../services/api"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get("/dashboard")
        setDashboardData(res.data)
      } catch (err) {
        console.log("Dashboard fetch failed", err)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboard()
  }, [])

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100 text-gray-700">
        Loading Dashboard...
      </div>
    )
  }

  const gpaData = dashboardData.gpaHistory || [
    { month: "Jan-June", gpa: 3.0 },
    { month: "Aug-Dec", gpa: 3.2 },
    { month: "3rd Sem", gpa: 3.5 },
    { month: "4th Sem", gpa: 3.4 },
    { month: "5th Sem", gpa: 3.1 },
  ]

  const feeData = [
    { name: "Paid", value: dashboardData.stats?.paidFee ?? 0 },
    { name: "Pending", value: dashboardData.stats?.pendingFee ?? 0 },
  ]

  const COLORS = ["#4F46E5", "#A78BFA"]

  return (
    // On mobile: flex-col (sidebar on top, content below)
    // On md+: flex-row (sidebar on left, content on right)
    <div className="flex flex-col md:flex-row h-screen w-screen overflow-hidden bg-gray-100">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content — add top padding on mobile to clear the fixed top bar */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 no-scrollbar pt-16 md:pt-8">

        {/* Welcome */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-4xl font-extrabold text-gray-800 mb-6"
        >
          Welcome, {dashboardData.user?.name || "Student"} 👋
        </motion.h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
          <StatCard title="GPA" value={dashboardData.stats?.gpa ?? 0} />
          <StatCard
            title="Pending Fee"
            value={`Rs. ${dashboardData.stats?.pendingFee ?? 0}`}
          />
          <StatCard
            title="Deadlines"
            value={dashboardData.stats?.deadlines ?? "-"}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-8">

          {/* GPA Chart */}
          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-md">
            <h2 className="text-lg md:text-xl font-bold mb-4 text-gray-800">
              GPA Trend 📈
            </h2>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={gpaData}>
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis domain={[0, 4]} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="gpa"
                  stroke="#4F46E5"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Fee Chart */}
          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-md flex flex-col items-center">
            <h2 className="text-lg md:text-xl font-bold mb-4 text-gray-800">
              Fee Status 💰
            </h2>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={feeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {feeData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Announcements */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 p-4 md:p-6 rounded-2xl shadow-md mb-6">
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-blue-800">
            📢 Announcements
          </h2>

          {dashboardData.announcements?.length > 0 ? (
            <ul className="list-disc ml-5 space-y-2 text-blue-700">
              {dashboardData.announcements.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          ) : (
            <p className="text-blue-600">No announcements right now.</p>
          )}
        </div>

      </div>
    </div>
  )
}





