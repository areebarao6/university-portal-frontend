import Sidebar from "../components/Sidebar";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import api from "../services/api";
import jsPDF from "jspdf";

export default function Fees() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get("/dashboard");
        setDashboardData(res.data);
      } catch (err) {
        console.log("Failed to fetch dashboard data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const handleDownloadVoucher = () => {
    const doc = new jsPDF();

    const userName = dashboardData?.user?.name || "Student";
    const pendingFee = dashboardData?.stats?.pendingFee ?? 0;
    const paidFee = dashboardData?.stats?.paidFee ?? 0;
    const totalFee = pendingFee + paidFee;
    const today = new Date().toLocaleDateString("en-PK", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const voucherNo = `KU-${Date.now().toString().slice(-6)}`;

    const pageWidth = doc.internal.pageSize.getWidth();

    // ── Header Background ──
    doc.setFillColor(79, 70, 229); // indigo-600
    doc.rect(0, 0, pageWidth, 45, "F");

    // ── University Name ──
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("Karachi University Portal", pageWidth / 2, 18, { align: "center" });

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text("Fee Payment Voucher", pageWidth / 2, 30, { align: "center" });

    doc.setFontSize(9);
    doc.text(`Generated: ${today}`, pageWidth / 2, 39, { align: "center" });

    // ── Voucher Box ──
    doc.setDrawColor(200, 200, 200);
    doc.setFillColor(249, 250, 251);
    doc.roundedRect(14, 52, pageWidth - 28, 110, 4, 4, "FD");

    // ── Student Info ──
    doc.setTextColor(55, 65, 81); // gray-700
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text("Student Information", 22, 65);

    doc.setDrawColor(79, 70, 229);
    doc.setLineWidth(0.5);
    doc.line(22, 68, pageWidth - 22, 68);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(75, 85, 99);

    const infoRows = [
      ["Student Name", userName],
      ["Voucher No.", voucherNo],
      ["Issue Date", today],
      ["Due Date", "Within 15 days of issue"],
    ];

    infoRows.forEach(([label, value], i) => {
      const y = 78 + i * 10;
      doc.setFont("helvetica", "bold");
      doc.text(`${label}:`, 22, y);
      doc.setFont("helvetica", "normal");
      doc.text(value, 80, y);
    });

    // ── Fee Breakdown ──
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(55, 65, 81);
    doc.text("Fee Breakdown", 22, 130);

    doc.setDrawColor(79, 70, 229);
    doc.line(22, 133, pageWidth - 22, 133);

    // Table header
    doc.setFillColor(238, 242, 255); // indigo-50
    doc.rect(14, 136, pageWidth - 28, 10, "F");

    doc.setFontSize(10);
    doc.setTextColor(79, 70, 229);
    doc.setFont("helvetica", "bold");
    doc.text("Description", 22, 143);
    doc.text("Amount (Rs.)", pageWidth - 22, 143, { align: "right" });

    // Table rows
    const feeRows = [
      ["Total Fee", totalFee],
      ["Amount Paid", paidFee],
      ["Pending Amount", pendingFee],
    ];

    feeRows.forEach(([label, amount], i) => {
      const y = 155 + i * 11;
      // Alternate row bg
      if (i % 2 === 0) {
        doc.setFillColor(248, 250, 252);
        doc.rect(14, y - 7, pageWidth - 28, 11, "F");
      }
      doc.setTextColor(75, 85, 99);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text(label, 22, y);
      doc.text(`Rs. ${amount.toLocaleString()}`, pageWidth - 22, y, { align: "right" });
    });

    // ── Total Due Highlight ──
    doc.setFillColor(79, 70, 229);
    doc.roundedRect(14, 192, pageWidth - 28, 14, 3, 3, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Total Pending:", 22, 202);
    doc.text(`Rs. ${pendingFee.toLocaleString()}`, pageWidth - 22, 202, { align: "right" });

    // ── Instructions ──
    doc.setFillColor(255, 255, 255);
    doc.setTextColor(107, 114, 128);
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.text("Please deposit the above amount at any HBL branch or via online banking.", pageWidth / 2, 215, { align: "center" });
    doc.text("Quote your voucher number during payment.", pageWidth / 2, 221, { align: "center" });

    // ── Footer ──
    doc.setFillColor(79, 70, 229);
    doc.rect(0, 278, pageWidth, 20, "F");
    doc.setTextColor(199, 210, 254);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text("KU Student Portal  |  This is a system-generated voucher and does not require a signature.", pageWidth / 2, 290, { align: "center" });

    doc.save(`KU_Fee_Voucher_${userName.replace(/\s+/g, "_")}.pdf`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        Loading Fees...
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen overflow-x-hidden">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto no-scrollbar flex flex-col items-center pt-16 md:pt-8">

        {/* Page Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6 sm:mb-8 text-gray-800 text-center md:text-left w-full"
        >
          Fee Details
        </motion.h1>

        {/* Fee Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.03, boxShadow: "0 15px 25px rgba(0,0,0,0.2)" }}
          className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white p-6 sm:p-8 rounded-2xl shadow-lg w-full max-w-md sm:max-w-lg lg:max-w-xl"
        >
          {/* Student name on card */}
          <p className="text-sm sm:text-base font-semibold text-indigo-100 mb-1">
            {dashboardData?.user?.name || "Student"}
          </p>

          <p className="text-sm sm:text-lg md:text-2xl text-center md:text-left">
            Pending Fee:{" "}
            <span className="font-bold text-red-300">
              Rs. {dashboardData.stats?.pendingFee ?? 0}
            </span>
          </p>

          <button
            onClick={handleDownloadVoucher}
            className="mt-6 w-full bg-white text-indigo-700 font-semibold px-2 sm:px-4 py-2 sm:py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition text-xs sm:text-sm md:text-lg flex items-center justify-center gap-2"
          >
            <span>⬇️</span> Download Voucher
          </button>
        </motion.div>

      </div>
    </div>
  );
}