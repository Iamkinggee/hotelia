"use client"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

interface SidebarNavProps {
  isOpen: boolean
  onToggle: () => void
}

const menuItems = [
  { icon: "📊", label: "Dashboard", href: "#", active: true },
  { icon: "🏨", label: "Front desk", href: "#" },
  { icon: "👤", label: "Guest", href: "#" },
  { icon: "🛏️", label: "Rooms", href: "#" },
  { icon: "🤝", label: "Deal", href: "#" },
  { icon: "⭐", label: "Rate", href: "#" },
]

export function SidebarNav({ isOpen, onToggle }: SidebarNavProps) {
  return (
    <>
      <aside
        className={cn(
          "h-screen bg-white border-r border-gray-200 transition-all duration-300 ease-in-out overflow-hidden",
          isOpen ? "w-56" : "w-20",
          "fixed md:relative top-0 left-0 z-40 md:z-0",
        )}
      >
        {/* Header with Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          {isOpen && <h1 className="text-xl font-bold text-blue-600 whitespace-nowrap">Novotel</h1>}
          {isOpen && (
            <button
              onClick={onToggle}
              className="md:hidden p-1 hover:bg-gray-100 rounded transition-colors duration-200"
              aria-label="Close sidebar"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:scale-105 cursor-pointer whitespace-nowrap",
                item.active ? "bg-blue-100 text-blue-600 font-medium" : "text-gray-600 hover:bg-gray-100",
              )}
              title={!isOpen ? item.label : undefined}
            >
              <span className="text-xl flex-shrink-0">{item.icon}</span>
              {isOpen && <span className="font-medium">{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        {isOpen && (
          <div className="absolute bottom-4 left-4 right-4 p-4 bg-red-50 rounded-lg border border-red-200 hover:bg-red-100 transition-colors cursor-pointer">
            <p className="text-sm font-medium text-red-600">Logout</p>
          </div>
        )}
      </aside>

      {/* Mobile Overlay - Click to close */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden animate-fadeIn"
          onClick={onToggle}
          aria-label="Close sidebar overlay"
        />
      )}
    </>
  )
}
