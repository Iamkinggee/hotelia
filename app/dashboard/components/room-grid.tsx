"use client"

import { MoreVertical } from "lucide-react"
import { useState } from "react"

interface Room {
  id: number
  type: string
  deals: number
  available: number
  total: number
  price: number
  currency: string
  unit: string
}

const rooms: Room[] = [
  { id: 1, type: "Single sharing", deals: 2, available: 2, total: 30, price: 568, currency: "$", unit: "/day" },
  { id: 2, type: "Double sharing", deals: 2, available: 2, total: 35, price: 1068, currency: "$", unit: "/day" },
  { id: 3, type: "Triple sharing", deals: 0, available: 2, total: 25, price: 1568, currency: "$", unit: "/day" },
  { id: 4, type: "VIP Suit", deals: 0, available: 4, total: 10, price: 2568, currency: "$", unit: "/day" },
]

export function RoomGrid() {
  const [hoveredRoom, setHoveredRoom] = useState<number | null>(null)

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-foreground">Rooms</h2>
      <div className="grid grid-cols-1 gap-4">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-lg transition-all duration-200"
            onMouseEnter={() => setHoveredRoom(room.id)}
            onMouseLeave={() => setHoveredRoom(null)}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                {room.deals > 0 && (
                  <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded mb-2">
                    {room.deals} Deals
                  </span>
                )}
                <h3 className="font-semibold text-gray-800 mb-2">{room.type}</h3>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {room.available}/{room.total}
                  </span>
                  <span className="font-bold text-lg">
                    {room.currency} {room.price}
                    <span className="text-xs text-gray-500 font-normal">{room.unit}</span>
                  </span>
                </div>
              </div>
              <button className={`p-2 rounded transition-colors ${hoveredRoom === room.id ? "bg-gray-100" : ""}`}>
                <MoreVertical size={18} className="text-gray-400" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
