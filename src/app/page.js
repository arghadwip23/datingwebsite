'use client'
import { Heart } from 'lucide-react'
import { macondoSwashCaps, inter } from "./fonts"

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="px-6 py-16">
        {/* Hero Section */}
        <div className="text-center max-w-5xl mx-auto mb-20">
          <h1 className={`text-5xl md:text-6xl font-extrabold text-black mb-6 leading-tight ${inter.variable} font-inter`}>
            Safe Dating for Verified College Students
          </h1>
          <p className="text-lg text-gray-600 mb-12 leading-relaxed">
            Join our exclusive community of verified college students. Every member is authenticated through their university email, ensuring you&apos;re connecting with real peers from your campus. Your privacy and security are our top priorities - with end-to-end encryption and strict verification protocols, you can focus on finding meaningful connections while we handle the safety.
          </p>
          <button className="bg-black text-white px-12 py-4 rounded-full text-lg font-medium hover:bg-gray-800 transition-colors">
            <span className={`${macondoSwashCaps.variable} font-macondo-swash-caps`}>
              Find Your Match
            </span>
          </button>
        </div>

        {/* Features Section */}
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Image */}
            <div className="flex-1 flex justify-center">
              <div className="w-80 h-80 bg-gray-200 rounded-3xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Students studying together"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Features List */}
            <div className="flex-1 space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 flex items-center justify-center mt-1">
                  <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-black mb-2">
                    AI-Powered Matching
                  </h3>
                  <p className="text-gray-600">
                    Advanced algorithms analyze compatibility based on academic interests, personality, and campus activities
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-6 h-6 flex items-center justify-center mt-1">
                  <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-black mb-2">
                    Only students from your college
                  </h3>
                  <p className="text-gray-600">
                    Exclusive community verified through your university email - connect with peers who share your campus experience
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-6 h-6 flex items-center justify-center mt-1">
                  <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-black mb-2">
                    100% secure, no tension about privacy
                  </h3>
                  <p className="text-gray-600">
                    Your data is encrypted and protected. We prioritize your privacy above everything else
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}