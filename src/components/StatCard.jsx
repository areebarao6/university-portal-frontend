export default function StatCard({ title, value }) {
    return (
      <div className="bg-white p-6 rounded-xl shadow hover:scale-105 transition">
        <p className="text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
      </div>
    )
  }