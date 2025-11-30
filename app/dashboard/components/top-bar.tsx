"use client"

import { Bell, Menu, Search, User, X } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface TopBarProps {
  onMenuClick: () => void
  appointments?: Record<string, any[]>
}

interface Notification {
  id: string
  title: string
  message: string
  timestamp: string
  type: "info" | "success" | "warning"
}

export function TopBar({ onMenuClick, appointments = {} }: TopBarProps) {
  const { toast } = useToast()
  const [showNotifications, setShowNotifications] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Room Cleaned",
      message: "Room 401 has been cleaned and is ready for check-in",
      timestamp: "5 minutes ago",
      type: "success",
    },
    {
      id: "2",
      title: "New Booking",
      message: "New booking received for November 20-23",
      timestamp: "2 hours ago",
      type: "info",
    },
    {
      id: "3",
      title: "Maintenance Alert",
      message: "Room 302 requires maintenance attention",
      timestamp: "1 day ago",
      type: "warning",
    },
  ])

  const appointmentCount = Object.values(appointments).reduce((total, apts) => total + apts.length, 0)
  const totalNotifications = notifications.length + appointmentCount

  const handleClearNotifications = () => {
    setNotifications([])
    toast({
      title: "Notifications Cleared",
      description: "All notifications have been cleared",
    })
  }

  const handleRemoveNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  return (
    <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between relative z-20">
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 active:scale-95"
          aria-label="Toggle sidebar"
        >
          <Menu size={24} className="text-gray-700" />
        </button>
        <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-4 py-2 flex-1 max-w-md">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search for rooms and offers"
            className="bg-transparent ml-2 outline-none w-full text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-sm text-gray-600">Friday, November 18, 2022</div>

        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            aria-label="Notifications"
          >
            <Bell size={20} className="text-gray-600" />
            {totalNotifications > 0 && (
              <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                {totalNotifications}
              </span>
            )}
          </button>

          {/* Notification Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 top-14 w-96 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-96 overflow-hidden flex flex-col animate-slideDown">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
                <h3 className="font-semibold text-gray-800">Notifications</h3>
                {notifications.length > 0 && (
                  <button
                    onClick={handleClearNotifications}
                    className="text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Notifications List */}
              <div className="overflow-y-auto flex-1">
                {notifications.length > 0 ? (
                  <div className="divide-y divide-gray-200">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="p-4 hover:bg-gray-50 transition-colors duration-150 group border-l-4 border-transparent hover:border-blue-500"
                      >
                        <div className="flex justify-between items-start gap-2">
                          <div className="flex-1">
                            <p className="font-medium text-gray-800 text-sm">{notification.title}</p>
                            <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                            <p className="text-xs text-gray-400 mt-2">{notification.timestamp}</p>
                          </div>
                          <button
                            onClick={() => handleRemoveNotification(notification.id)}
                            className="p-1 hover:bg-gray-200 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X size={14} className="text-gray-500" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-gray-400">
                    <p className="text-sm">No notifications</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              {notifications.length > 0 && (
                <div className="p-3 border-t border-gray-200 bg-gray-50">
                  <button className="w-full text-xs text-blue-600 hover:text-blue-700 font-medium py-2 transition-colors">
                    View All Notifications
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <button className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors duration-200 hover:scale-110">
          <User size={20} className="text-gray-600" />
        </button>
      </div>

      {showNotifications && <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />}
    </header>
  )
}
