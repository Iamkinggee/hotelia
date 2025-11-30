"use client"
import { useEffect, useState } from "react"

const data = [
  { category: "Occupied rooms", value: 104 },
  { category: "Clean", value: 90 },
  { category: "Dirty", value: 4 },
  { category: "Inspected", value: 60 },
  { category: "Available", value: 20 },
  { category: "Clean Avail", value: 30 },
  { category: "Dirty Avail", value: 19 },
  { category: "Insp Avail", value: 30 },
]

export function RoomStatus() {
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    setAnimated(true)
  }, [])

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-xl font-semibold mb-6 text-foreground">Room Status</h2>
      <div className="space-y-4">
        {data.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center">
            <span className="text-sm text-gray-600">{item.category}</span>
            <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full bg-blue-500 rounded-full transition-all duration-1000 ${
                  animated ? "w-full" : "w-0"
                }`}
                style={{
                  width: animated ? `${(item.value / 104) * 100}%` : "0%",
                  transitionDelay: `${idx * 50}ms`,
                }}
              />
            </div>
            <span className="text-sm font-semibold text-gray-800 min-w-[40px] text-right">
              {animated ? item.value : 0}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
