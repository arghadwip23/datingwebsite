import { User } from 'lucide-react'

export default function Navigation() {
  return (
    <nav className="border-b border-gray-200">
      <header className="px-6 py-4 flex justify-between items-center">
        {/* Logo/Title */}
        <div className="text-3xl font-normal text-white" style={{ fontFamily: 'var(--font-berkshire)' }}>
          VCDating
        </div>

        {/* Navigation Links and User Icon */}
        <div className="flex items-center space-x-6">
          <a href="/" className="text-white hover:text-gray-200 text-xl" style={{ fontFamily: 'var(--font-berkshire)' }}>
            Home
          </a>
          <a href="/matches" className="text-white hover:text-gray-200 text-xl" style={{ fontFamily: 'var(--font-berkshire)' }}>
            Matches
          </a>
          <a href="/messages" className="text-white hover:text-gray-200 text-xl" style={{ fontFamily: 'var(--font-berkshire)' }}>
            Notifications
          </a>
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-gray-600" />
          </div>
        </div>
      </header>
    </nav>
  )
}