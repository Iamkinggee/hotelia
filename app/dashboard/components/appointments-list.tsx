"use client"

import { Trash2, Phone, Clock } from "lucide-react"
import { useState, useEffect } from "react"

interface Appointment {
  id: string
  title: string
  time: string
  guest: string
  phone: string
  notes: string
  date: string
}

interface AppointmentsListProps {
  appointments: Record<string, Appointment[]>
  onDelete: (dateKey: string, appointmentId: string) => void
}

export function AppointmentsList({ appointments, onDelete }: AppointmentsListProps) {
  const [allAppointments, setAllAppointments] = useState<Appointment[]>([])

  useEffect(() => {
    const combined: Appointment[] = []
    Object.entries(appointments).forEach(([date, apts]) => {
      apts.forEach((apt) => {
        combined.push({ ...apt, date })
      })
    })
    // Sort by date and time
    combined.sort((a, b) => {
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)
      if (dateA.getTime() !== dateB.getTime()) {
        return dateA.getTime() - dateB.getTime()
      }
      return a.time.localeCompare(b.time)
    })
    setAllAppointments(combined)
  }, [appointments])

  if (allAppointments.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
        <p className="text-gray-500 text-sm">No appointments scheduled yet</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {allAppointments.map((apt) => (
        <div key={apt.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{apt.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{apt.guest}</p>
            </div>
            <button
              onClick={() => onDelete(apt.date, apt.id)}
              className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-500 hover:text-red-700"
            >
              <Trash2 size={18} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs text-gray-600 mb-2">
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-blue-500" />
              <span>{apt.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={14} className="text-blue-500" />
              <span>{apt.phone || "N/A"}</span>
            </div>
          </div>

          {apt.notes && <p className="text-xs text-gray-600 bg-gray-50 p-2 rounded mt-2 italic">"{apt.notes}"</p>}

          <p className="text-xs text-gray-400 mt-2">
            {new Date(apt.date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
          </p>
        </div>
      ))}
    </div>
  )
}
