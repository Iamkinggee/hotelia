"use client"

interface WelcomeModalProps {
  onClose: () => void
}

export function WelcomeModal({ onClose }: WelcomeModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white rounded-lg p-8 w-96 shadow-2xl animate-slideUp text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h2>
        <p className="text-gray-600 mb-2">You have successfully logged in to your dashboard</p>
        <p className="text-sm text-gray-400 mb-6">
          Manage your hotel operations efficiently with our modern management system
        </p>

        <div className="mb-6 text-4xl animate-bounce">👋</div>

        <button
          onClick={onClose}
          className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all duration-200 hover:scale-105"
        >
          Get Started
        </button>
      </div>
    </div>
  )
}
