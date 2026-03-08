export default function Loader({ message = "Loading..." }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700">
      
      {/* Logo / Portal Name */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-white tracking-wide drop-shadow-lg">
          KU Portal
        </h1>
        <p className="text-indigo-200 text-sm mt-2 tracking-widest uppercase">
          Karachi University
        </p>
      </div>

      {/* Spinning Ring */}
      <div className="relative w-16 h-16 mb-8">
        <div className="absolute inset-0 rounded-full border-4 border-white/20" />
        <div className="absolute inset-0 rounded-full border-4 border-t-white border-r-transparent border-b-transparent border-l-transparent animate-spin" />
      </div>

      {/* Progress Bar */}
      <div className="w-56 sm:w-72 bg-white/20 rounded-full h-2 overflow-hidden">
        <div className="h-full bg-white rounded-full animate-progress" />
      </div>

      {/* Message */}
      <p className="mt-4 text-indigo-100 text-sm font-medium tracking-wide">
        {message}
      </p>

      {/* Inline keyframe for progress bar */}
      <style>{`
        @keyframes progress {
          0%   { width: 0%; }
          40%  { width: 60%; }
          70%  { width: 80%; }
          90%  { width: 92%; }
          100% { width: 100%; }
        }
        .animate-progress {
          animation: progress 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}