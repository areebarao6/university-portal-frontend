import Sidebar from "../components/Sidebar"
import { dashboardData } from "../data/dashboardData"
import { motion } from "framer-motion"

export default function Courses() {
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
          My Courses
        </motion.h1>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dashboardData.courses.map((course, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, boxShadow: "0 15px 25px rgba(0,0,0,0.2)" }}
              className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white p-6 rounded-2xl shadow-lg cursor-pointer transform transition-all"
            >
              <h3 className="text-xl md:text-2xl font-bold mb-2">{course.name}</h3>
              <p className="text-white/80 text-sm md:text-base">Credits: {course.credits}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

