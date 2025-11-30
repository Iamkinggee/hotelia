"use client"

import { useEffect, useState } from "react"

interface StatCard {
  label: string
  value: number
  subLabel: string
  color: string
  delay: number
}

const stats: StatCard[] = [
  { label: "Today's", subLabel: "Check-in", value: 23, color: "text-blue-500", delay: 0 },
  { label: "Today's", subLabel: "Check-out", value: 13, color: "text-green-500", delay: 100 },
  { label: "Total", subLabel: "In hotel", value: 60, color: "text-purple-500", delay: 200 },
  { label: "Total", subLabel: "Available room", value: 10, color: "text-orange-500", delay: 300 },
  { label: "Total", subLabel: "Occupied room", value: 90, color: "text-red-500", delay: 400 },
]

export function Overview() {
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    setAnimated(true)
  }, [])

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <h2 className="text-xl font-semibold mb-6 text-foreground">Overview</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={`text-center transition-all duration-500 ${
              animated ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
            style={{ transitionDelay: `${stat.delay}ms` }}
          >
            <p className="text-sm text-gray-500 mb-2">{stat.label}</p>
            <p className={`text-3xl font-bold ${stat.color} mb-1`}>{animated ? stat.value : 0}</p>
            <p className="text-sm text-gray-600">{stat.subLabel}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
