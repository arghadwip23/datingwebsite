import { User } from 'lucide-react' // Make sure to install lucide-react for icons

export default function Navigation() {
  return (
    <nav className="border-b border-gray-200">
      {/* Header */}
      <header className="px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-black">
          VitDating
        </div>
        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
          <User className="w-5 h-5 text-gray-600" />
        </div>
      </header>

      {/* Navigation Links */}
      <div className="px-6 py-2 flex space-x-6">
        <a href="/" className="text-gray-700 hover:text-black">
          Home
        </a>
        <a href="/matches" className="text-gray-700 hover:text-black">
          Matches
        </a>
        <a href="/messages" className="text-gray-700 hover:text-black">
          Messages
        </a>
        <a href="/profile" className="text-gray-700 hover:text-black">
          Profile
        </a>
      </div>
    </nav>
  )
}