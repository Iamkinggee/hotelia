"use client"

import { useState, useEffect } from "react"
import { SidebarNav } from "./components/sidebar-nav"
import { TopBar } from "./components/top-bar"
import { Overview } from "./components/overview"
import { RoomGrid } from "./components/room-grid"
import { RoomStatus } from "./components/room-status"
import { OccupancyChart } from "./components/occupancy-chart"
import { FloorStatus } from "./components/floor-status"
import { ScheduleCalendar } from "./components/shedule-calender"
// import { Toaster } from "../components/ui/toaster"
import { Toaster } from "@/components/ui/toast"
import { AppointmentsList } from "./components/appointments-list"
import { WelcomeModal } from "./components/welocme-modal"
import { useToast } from "../../hooks/use-toast"

export default function Dashboard() {
  const { toast } = useToast()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(2023, 0, 11))
  const [appointments, setAppointments] = useState<Record<string, any[]>>({})
  const [showWelcome, setShowWelcome] = useState(true)

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited")
    if (!hasVisited) {
      setShowWelcome(true)
      localStorage.setItem("hasVisited", "true")
    } else {
      setShowWelcome(false)
    }

    const handleResize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (mobile) {
        setSidebarOpen(false)
      } else {
        setSidebarOpen(true)
      }
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleDeleteAppointment = (dateKey: string, appointmentId: string) => {
    setAppointments((prev) => ({
      ...prev,
      [dateKey]: prev[dateKey].filter((apt: any) => apt.id !== appointmentId),
    }))
  }

  const handleAppointmentAdded = (title: string) => {
    toast({
      title: "Appointment Scheduled",
      description: `${title} has been successfully added to your calendar`,
    })
  }

  return (
    <div className="flex h-screen bg-background animate-fadeIn">
      {/* Welcome Modal */}
      {showWelcome && <WelcomeModal onClose={() => setShowWelcome(false)} />}

      <SidebarNav isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <TopBar onMenuClick={() => setSidebarOpen(!sidebarOpen)} appointments={appointments} />

        {/* Content Area */}
        <main className="flex-1 overflow-auto">
          <div className="p-4 sm:p-6 lg:p-8 space-y-6 animate-slideUp">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Overview</h1>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-lg font-medium transition-colors duration-200 hover:scale-105 w-full sm:w-auto">
                Create booking
              </button>
            </div>

            {/* Overview Cards */}
            <Overview />

            {/* Rooms Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RoomGrid />
              <div className="space-y-6">
                <FloorStatus />
                <ScheduleCalendar
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  onAppointmentAdded={handleAppointmentAdded}
                />
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <OccupancyChart />
              </div>
              <RoomStatus />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Scheduled Appointments</h2>
              <AppointmentsList appointments={appointments} onDelete={handleDeleteAppointment} />
            </div>
          </div>
        </main>
      </div>

      <Toaster />
    </div>
  )
}
