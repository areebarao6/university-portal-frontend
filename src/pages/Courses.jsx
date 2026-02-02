import Sidebar from "../components/Sidebar"
import { dashboardData } from "../data/dashboardData"
import { motion } from "framer-motion"

export default function Courses() {
  return (
    <div className="flex bg-gray-100 min-h-screen overflow-x-hidden">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto no-scrollbar">

        {/* Page Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6 sm:mb-8 text-gray-800"
        >
          My Courses
        </motion.h1>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {dashboardData.courses.map((course, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, boxShadow: "0 15px 25px rgba(0,0,0,0.2)" }}
              className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white p-4 sm:p-5 md:p-6 rounded-2xl shadow-lg cursor-pointer transform transition-all"
            >
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2">{course.name}</h3>
              <p className="text-white/80 text-xs sm:text-sm md:text-base">
                Credits: {course.credits}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

