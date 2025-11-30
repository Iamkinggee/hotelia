"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useState, useEffect } from "react"

const chartData = [
  { month: "May", occupancy: 65 },
  { month: "Jun", occupancy: 55 },
  { month: "Jul", occupancy: 75 },
  { month: "Aug", occupancy: 35 },
  { month: "Sep", occupancy: 70 },
  { month: "Oct", occupancy: 80 },
  { month: "Nov", occupancy: 75 },
  { month: "Dec", occupancy: 85 },
  { month: "Jan", occupancy: 90 },
  { month: "Feb", occupancy: 78 },
]

export function OccupancyChart() {
  const [selectedMonth, setSelectedMonth] = useState("Monthly")
  const [animatedData, setAnimatedData] = useState<typeof chartData>([])

  useEffect(() => {
    // Animate chart bars on mount
    const timer = setTimeout(() => {
      setAnimatedData(chartData)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  const handleMonthChange = (month: string) => {
    setSelectedMonth(month)
    setAnimatedData([])
    setTimeout(() => setAnimatedData(chartData), 100)
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-foreground">Occupancy Statistics</h2>
        <div className="relative group">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors">
            {selectedMonth}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg hidden group-hover:block z-10">
            {["Monthly", "Weekly", "Daily"].map((month) => (
              <button
                key={month}
                onClick={() => handleMonthChange(month)}
                className="block w-full text-left px-4 py-2 hover:bg-blue-50 text-sm transition-colors"
              >
                {month}
              </button>
            ))}
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={animatedData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
          <XAxis dataKey="month" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" domain={[0, 100]} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
            }}
          />
          <Bar
            dataKey="occupancy"
            fill="#3b82f6"
            radius={[8, 8, 0, 0]}
            isAnimationActive={true}
            animationDuration={1200}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
