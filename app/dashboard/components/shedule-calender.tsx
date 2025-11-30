"use client"

import { ChevronLeft, ChevronRight, Plus, X, Clock } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { DeleteConfirmModal } from "./dalete-conform-modal"

interface Appointment {
  id: string
  title: string
  time: string
  guest: string
  phone: string
  notes: string
}

interface ScheduleCalendarProps {
  selectedDate: Date
  setSelectedDate: (date: Date) => void
  onAppointmentAdded?: (title: string) => void
}

export function ScheduleCalendar({ selectedDate, setSelectedDate, onAppointmentAdded }: ScheduleCalendarProps) {
  const { toast } = useToast()
  const [appointments, setAppointments] = useState<Record<string, Appointment[]>>({})
  const [currentMonth, setCurrentMonth] = useState(new Date(2023, 0))
  const [showDialog, setShowDialog] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean; dateKey: string; appointmentId: string }>({
    show: false,
    dateKey: "",
    appointmentId: "",
  })
  const [formData, setFormData] = useState({
    title: "",
    time: "10:00",
    guest: "",
    phone: "",
    notes: "",
  })

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const handleDateClick = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    setSelectedDate(date)
  }

  const handleAddAppointment = () => {
    if (!formData.title || !formData.time || !formData.guest) {
      toast({
        title: "Missing information",
        description: "Please fill in title, time, and guest name",
        variant: "destructive",
      })
      return
    }

    const dateKey = selectedDate.toDateString()
    const newAppointment: Appointment = {
      id: `${dateKey}-${new Date().getTime()}`,
      title: formData.title,
      time: formData.time,
      guest: formData.guest,
      phone: formData.phone,
      notes: formData.notes,
    }

    setAppointments((prev) => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), newAppointment],
    }))

    if (onAppointmentAdded) {
      onAppointmentAdded(formData.title)
    }

    setFormData({
      title: "",
      time: "10:00",
      guest: "",
      phone: "",
      notes: "",
    })
    setShowDialog(false)
  }

  const handleDeleteClick = (dateKey: string, appointmentId: string) => {
    setDeleteConfirm({ show: true, dateKey, appointmentId })
  }

  const handleConfirmDelete = (dateKey: string, appointmentId: string) => {
    setAppointments((prev) => ({
      ...prev,
      [dateKey]: prev[dateKey].filter((apt) => apt.id !== appointmentId),
    }))
    setDeleteConfirm({ show: false, dateKey: "", appointmentId: "" })
    toast({
      title: "Appointment deleted",
      description: "The appointment has been removed",
    })
  }

  const daysInMonth = getDaysInMonth(currentMonth)
  const firstDay = getFirstDayOfMonth(currentMonth)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i)

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const monthYear = currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })

  const getAppointmentCount = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    return appointments[date.toDateString()]?.length || 0
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-foreground">Schedules</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevMonth}
            className="p-1 hover:bg-gray-100 rounded transition-colors duration-200 hover:scale-110"
          >
            <ChevronLeft size={18} className="text-gray-600" />
          </button>
          <span className="text-sm font-medium w-24 text-center text-gray-600">{monthYear}</span>
          <button
            onClick={handleNextMonth}
            className="p-1 hover:bg-gray-100 rounded transition-colors duration-200 hover:scale-110"
          >
            <ChevronRight size={18} className="text-gray-600" />
          </button>
        </div>
      </div>

      <div className="mb-4">
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map((day) => (
            <div key={day} className="text-center text-xs font-semibold text-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {emptyDays.map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}
          {days.map((day) => {
            const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
            const isSelected = selectedDate.toDateString() === date.toDateString()
            const isToday = new Date().toDateString() === date.toDateString()
            const appointmentCount = getAppointmentCount(day)

            return (
              <button
                key={day}
                onClick={() => handleDateClick(day)}
                className={`aspect-square flex flex-col items-center justify-center rounded text-sm font-medium transition-all duration-200 relative hover:scale-110 ${
                  isSelected
                    ? "bg-green-500 text-white shadow-lg"
                    : isToday
                      ? "bg-blue-500 text-white shadow-lg"
                      : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                {day}
                {appointmentCount > 0 && (
                  <span
                    className={`absolute bottom-1 text-xs font-bold ${isSelected || isToday ? "text-white" : "text-blue-500"}`}
                  >
                    •
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {selectedDate && (
        <div className="border-t pt-4 animate-slideDown">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-semibold text-gray-600">{selectedDate.toDateString()}</span>
            <button
              onClick={() => setShowDialog(true)}
              className="flex items-center gap-1 text-xs bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded transition-all duration-200 hover:scale-105"
            >
              <Plus size={14} />
              Add Appointment
            </button>
          </div>

          {appointments[selectedDate.toDateString()]?.length > 0 ? (
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {appointments[selectedDate.toDateString()].map((apt) => (
                <div
                  key={apt.id}
                  className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs flex justify-between items-start group hover:bg-blue-100 transition-all duration-200 hover:shadow-md animate-slideUp"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-blue-900 truncate">{apt.title}</p>
                    <p className="text-blue-700 text-xs mt-1">Guest: {apt.guest}</p>
                    <div className="flex items-center gap-1 text-blue-700 mt-1">
                      <Clock size={12} />
                      <span>{apt.time}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteClick(selectedDate.toDateString(), apt.id)}
                    className="ml-2 p-1 hover:bg-blue-300 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <X size={14} className="text-blue-700" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-400 italic">No appointments scheduled</p>
          )}
        </div>
      )}

      {showDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 rounded-lg animate-fadeIn">
          <div className="bg-white rounded-lg p-6 w-96 shadow-xl animate-slideUp">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-foreground">Schedule Appointment</h3>
              <button
                onClick={() => setShowDialog(false)}
                className="p-1 hover:bg-gray-100 rounded transition-colors duration-200"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Appointment Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Room Inspection"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Guest Name</label>
                <input
                  type="text"
                  value={formData.guest}
                  onChange={(e) => setFormData({ ...formData, guest: e.target.value })}
                  placeholder="Enter guest name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Enter phone number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Add any additional notes"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-all duration-200"
                  rows={3}
                />
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <button
                  onClick={() => setShowDialog(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-all duration-200 hover:scale-105"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddAppointment}
                  className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all duration-200 hover:scale-105"
                >
                  Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <DeleteConfirmModal
        isOpen={deleteConfirm.show}
        title="Delete Appointment"
        message="Are you sure you want to delete this appointment? This action cannot be undone."
        onConfirm={() => handleConfirmDelete(deleteConfirm.dateKey, deleteConfirm.appointmentId)}
        onCancel={() => setDeleteConfirm({ show: false, dateKey: "", appointmentId: "" })}
      />
    </div>
  )
}
