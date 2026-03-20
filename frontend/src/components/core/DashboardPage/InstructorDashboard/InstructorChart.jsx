import { useState } from "react"
import { Chart, registerables } from "chart.js"
import { Pie } from "react-chartjs-2"

Chart.register(...registerables)

export default function InstructorChart({ courses }) {
  // State to keep track of the currently selected chart
  const [currChart, setCurrChart] = useState("students")

  // Curated premium color palette
  const premiumPalette = [
    "rgb(79, 70, 229)", // Indigo 600
    "rgb(139, 92, 246)", // Violet 500
    "rgb(20, 184, 166)", // Teal 500
    "rgb(244, 63, 94)",  // Rose 500
    "rgb(245, 158, 11)", // Amber 500
    "rgb(59, 130, 246)", // Blue 500
    "rgb(16, 185, 129)", // Emerald 500
    "rgb(236, 72, 153)", // Pink 500
  ]

  // Data for the chart displaying student information
  const chartDataStudents = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalStudentsEnrolled),
        backgroundColor: premiumPalette.slice(0, courses.length),
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 2,
        hoverOffset: 20,
      },
    ],
  }

  // Data for the chart displaying income information
  const chartIncomeData = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalAmountGenerated),
        backgroundColor: premiumPalette.slice(0, courses.length),
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 2,
        hoverOffset: 20,
      },
    ],
  }

  // Options for the chart
  const options = {
    maintainAspectRatio: false,
  }

  return (
    <div className="flex flex-1 flex-col gap-y-10">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em]">VISUALIZATION TOGGLE</p>
        <div className="flex p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 shadow-inner">
          {/* Button to switch to the "students" chart */}
          <button
            onClick={() => setCurrChart("students")}
            className={`rounded-xl py-2.5 px-6 text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${
              currChart === "students"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 scale-105"
                : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            }`}
          >
            Students
          </button>
          {/* Button to switch to the "income" chart */}
          <button
            onClick={() => setCurrChart("income")}
            className={`rounded-xl py-2.5 px-6 text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${
              currChart === "income"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 scale-105"
                : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            }`}
          >
            Revenue
          </button>
        </div>
      </div>
      
      <div className="relative mx-auto aspect-square h-full w-full max-h-[350px] animate-in zoom-in-95 duration-1000">
        <div className="absolute inset-0 bg-indigo-600/5 rounded-full blur-[100px] -z-10 animate-pulse"></div>
        {/* Render the Pie chart based on the selected chart */}
        <Pie
          data={currChart === "students" ? chartDataStudents : chartIncomeData}
          options={options}
        />
      </div>
    </div>
  )
}
