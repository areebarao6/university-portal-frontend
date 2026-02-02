import { Link } from "react-router-dom"
import { motion } from "framer-motion"

export default function Landing() {
  return (
    <div className="relative h-screen overflow-x-hidden bg-gradient-to-br from-indigo-700 via-purple-700 to-blue-800 text-white no-scrollbar overflow-y-auto">

      {/* Background Blobs */}
      <div className="absolute -top-40 -left-40 w-80 sm:w-96 h-80 sm:h-96 bg-indigo-500/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/2 -right-40 w-80 sm:w-96 h-80 sm:h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />

      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/10 ">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-10 py-4 sm:py-5">
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-wide">
            KU <span className="text-indigo-300">Portal</span>
          </h2>

          <div className="flex gap-4 sm:gap-6 ">
            <Link
              to="/login"
              className="text-indigo-100 hover:text-white transition text-sm sm:text-base mt-2 "
            >
              Sign In
            </Link>

            <Link
              to="/signup"
              className="bg-white text-indigo-700 px-4 sm:px-6 py-2 rounded-xl font-semibold shadow-md hover:shadow-xl hover:scale-105 transition text-sm sm:text-base"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-20 sm:pt-28 ">

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6"
        >
          Karachi University <br />
          <span className="text-indigo-200">Student Portal</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="max-w-xl sm:max-w-2xl text-base sm:text-lg md:text-xl text-indigo-100 mb-10"
        >
          Your digital gateway to academics — manage courses, track results,
          handle fees, and receive AI-powered study guidance.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center"
        >
          <Link
            to="/signup"
            className="bg-white text-indigo-700 px-8 sm:px-10 py-3 rounded-2xl font-semibold shadow-lg hover:scale-105 transition"
          >
            Get Started →
          </Link>

          <Link
            to="/login"
            className="border border-indigo-200 px-8 sm:px-10 py-3 rounded-2xl text-indigo-100 hover:bg-white hover:text-indigo-700 transition"
          >
            Sign In
          </Link>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="relative z-10 mt-24 sm:mt-32 px-4 sm:px-10 pb-20 sm:pb-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          <StatCard value="25,000+" label="Students" />
          <StatCard value="150+" label="Programs" />
          <StatCard value="100,000+" label="Graduates" />
          <StatCard value="70+" label="Years of Excellence" />
        </motion.div>
      </section>
    </div>
  )
}

function StatCard({ value, label }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      }}
      className="bg-white/15 backdrop-blur-lg p-6 sm:p-8 rounded-2xl text-center shadow-lg hover:scale-105 hover:bg-white/20 transition"
    >
      <h3 className="text-2xl sm:text-3xl font-extrabold mb-2">{value}</h3>
      <p className="text-indigo-200 text-xs sm:text-sm tracking-wide uppercase">
        {label}
      </p>
    </motion.div>
  )
}
