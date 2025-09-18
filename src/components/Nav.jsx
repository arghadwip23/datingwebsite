"use client"

import { User, Menu, X, Users, Bell, Compass } from 'lucide-react'
import { useState } from 'react'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="border-b border-gray-200">
      <header className="px-4 md:px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Clickable Logo/Title */}
          <a href="/" className="text-2xl md:text-3xl font-normal text-white hover:text-gray-200 transition-colors" style={{ fontFamily: 'var(--font-berkshire)' }}>
            VCDating
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="/explore" className="text-white hover:text-gray-200 flex items-center gap-2">
              <Compass size={20} />
              <span>Explore</span>
            </a>
            <a href="/matches" className="text-white hover:text-gray-200 flex items-center gap-2">
              <Users size={20} />
              <span>Matches</span>
            </a>
            <a href="/notifications" className="text-white hover:text-gray-200 flex items-center gap-2">
              <Bell size={20} />
              <span>Notifications</span>
            </a>
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 cursor-pointer transition-colors">
              <User className="w-5 h-5 text-gray-600" />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-white hover:text-gray-200"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-3 space-y-4">
            <a href="/explore" className="block text-white hover:text-gray-200 py-2 flex items-center gap-2">
              <Compass size={20} />
              <span>Explore</span>
            </a>
            <a href="/matches" className="block text-white hover:text-gray-200 py-2 flex items-center gap-2">
              <Users size={20} />
              <span>Matches</span>
            </a>
            <a href="/notifications" className="block text-white hover:text-gray-200 py-2 flex items-center gap-2">
              <Bell size={20} />
              <span>Notifications</span>
            </a>
            <div className="pt-2 border-t border-gray-700">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 cursor-pointer transition-colors">
                <User className="w-5 h-5 text-gray-600" />
              </div>
            </div>
          </div>
        )}
      </header>
    </nav>
  )
}