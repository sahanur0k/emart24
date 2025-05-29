import React, { Fragment } from "react";

const AboutContent = () => {
  return (
    <Fragment>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 text-white overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-black bg-opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
          </div>

          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white bg-opacity-20 rounded-full mb-6 backdrop-blur-sm">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
                About <span className="text-yellow-200">EMART24</span>
              </h1>
              <p className="text-xl sm:text-2xl lg:text-3xl max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Your Digital Gateway to Universal Cyber Cafe Services
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => window.location.href = '/'}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Explore Our Platform
                </button>
                <button
                  onClick={() => window.location.href = '/contact-us'}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Get in Touch
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          {/* Main Story Section */}
          <div className="max-w-6xl mx-auto mb-20">
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-yellow-200 rounded-full opacity-20"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-orange-200 rounded-full opacity-20"></div>

              <div className="relative bg-white rounded-2xl shadow-xl p-8 sm:p-12 lg:p-16 border border-gray-100">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-6">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
                    Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500">Story</span>
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border-l-4 border-yellow-400">
                      <h3 className="text-xl font-semibold text-gray-800 mb-3">Digital Transformation</h3>
                      <p className="text-gray-700 leading-relaxed">
                        EMART24 is the digital transformation of Universal Cyber Cafe, bringing decades of
                        technology service excellence into the modern online era. What started as a local
                        cyber cafe has evolved into a comprehensive digital platform.
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-l-4 border-blue-400">
                      <h3 className="text-xl font-semibold text-gray-800 mb-3">Trusted Heritage</h3>
                      <p className="text-gray-700 leading-relaxed">
                        Universal Cyber Cafe has been a trusted name in providing technology solutions,
                        internet services, and digital assistance to our community for years.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-l-4 border-green-400">
                      <h3 className="text-xl font-semibold text-gray-800 mb-3">Expanded Reach</h3>
                      <p className="text-gray-700 leading-relaxed">
                        With EMART24, we've expanded our reach to offer an integrated online shopping
                        experience, digital services, and innovative reward systems.
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border-l-4 border-purple-400">
                      <h3 className="text-xl font-semibold text-gray-800 mb-3">Our Mission</h3>
                      <p className="text-gray-700 leading-relaxed">
                        To bridge the gap between traditional service excellence and modern digital
                        convenience, making technology accessible and rewarding for everyone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Services Grid */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500">Services</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Bridging physical and digital worlds with comprehensive technology solutions
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-green-500 mx-auto rounded-full mt-6"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Physical Cyber Cafe */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300"></div>
                <div className="relative bg-white rounded-2xl shadow-xl p-8 sm:p-10 transform group-hover:-translate-y-2 transition-all duration-300">
                  <div className="flex items-center mb-8">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-2xl mr-6 shadow-lg">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">Universal</h3>
                      <h3 className="text-2xl sm:text-3xl font-bold text-blue-600">Cyber Cafe</h3>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {[
                      "High-speed internet access and computer rentals",
                      "Printing, scanning, and photocopying services",
                      "Document typing and formatting assistance",
                      "Gaming stations and entertainment",
                      "Technical support and computer troubleshooting",
                      "Educational software and learning resources"
                    ].map((service, index) => (
                      <div key={index} className="flex items-start group/item">
                        <div className="bg-blue-100 p-2 rounded-full mr-4 mt-1 group-hover/item:bg-blue-200 transition-colors">
                          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="text-gray-700 leading-relaxed group-hover/item:text-gray-900 transition-colors">{service}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Online Platform */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-600 rounded-2xl transform -rotate-1 group-hover:-rotate-2 transition-transform duration-300"></div>
                <div className="relative bg-white rounded-2xl shadow-xl p-8 sm:p-10 transform group-hover:-translate-y-2 transition-all duration-300">
                  <div className="flex items-center mb-8">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 rounded-2xl mr-6 shadow-lg">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">EMART24</h3>
                      <h3 className="text-2xl sm:text-3xl font-bold text-green-600">Online Platform</h3>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {[
                      "E-commerce marketplace with diverse products",
                      "Digital services booking and management",
                      "Insurance plans and coverage options",
                      "Super Coins reward system",
                      "24/7 online customer support",
                      "Secure payment processing and delivery"
                    ].map((service, index) => (
                      <div key={index} className="flex items-start group/item">
                        <div className="bg-green-100 p-2 rounded-full mr-4 mt-1 group-hover/item:bg-green-200 transition-colors">
                          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="text-gray-700 leading-relaxed group-hover/item:text-gray-900 transition-colors">{service}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Super Coins System */}
          <div className="relative bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-100 rounded-3xl p-8 sm:p-12 lg:p-16 mb-20 overflow-hidden">
            {/* Decorative coins */}
            <div className="absolute top-10 left-10 w-16 h-16 bg-yellow-300 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-20 h-20 bg-orange-300 rounded-full opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-yellow-400 rounded-full opacity-30 animate-pulse" style={{animationDelay: '2s'}}></div>

            <div className="relative text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-6 shadow-2xl animate-bounce">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600">Super Coins</span> Reward System
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Earn rewards with every purchase and redeem them for amazing benefits
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto rounded-full mt-6"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🛒</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Earn on Every Purchase</h3>
                  <p className="text-gray-600 text-sm">
                    Get Super Coins automatically added to your account when your orders are delivered
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-center">
                  <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">💰</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Redeem Rewards</h3>
                  <p className="text-gray-600 text-sm">
                    Use your Super Coins for discounts, special offers, and exclusive products
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-center">
                  <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎁</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Special Codes</h3>
                  <p className="text-gray-600 text-sm">
                    Enter reward codes to get bonus Super Coins and unlock special promotions
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-white rounded-lg p-6">
              <h4 className="text-xl font-semibold text-gray-800 mb-4">How Super Coins Work:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="bg-yellow-500 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2 text-sm font-bold">1</div>
                  <p className="text-sm text-gray-700">Shop products on EMART24</p>
                </div>
                <div className="text-center">
                  <div className="bg-yellow-500 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2 text-sm font-bold">2</div>
                  <p className="text-sm text-gray-700">Order gets delivered</p>
                </div>
                <div className="text-center">
                  <div className="bg-yellow-500 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2 text-sm font-bold">3</div>
                  <p className="text-sm text-gray-700">Super Coins added automatically</p>
                </div>
                <div className="text-center">
                  <div className="bg-yellow-500 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2 text-sm font-bold">4</div>
                  <p className="text-sm text-gray-700">Redeem for rewards</p>
                </div>
              </div>
            </div>
          </div>

          {/* Why Choose EMART24 */}
          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-10 mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 text-center">
              Why Choose EMART24?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-4 flex-shrink-0">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Trusted Experience</h3>
                    <p className="text-gray-600">Years of experience in technology services and customer satisfaction</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-4 flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Fast & Reliable</h3>
                    <p className="text-gray-600">Quick delivery, reliable services, and 24/7 customer support</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-purple-100 p-2 rounded-full mr-4 flex-shrink-0">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Secure Platform</h3>
                    <p className="text-gray-600">Advanced security measures to protect your data and transactions</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-yellow-100 p-2 rounded-full mr-4 flex-shrink-0">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Rewarding Experience</h3>
                    <p className="text-gray-600">Earn Super Coins with every purchase and enjoy exclusive benefits</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-red-100 p-2 rounded-full mr-4 flex-shrink-0">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Community Focused</h3>
                    <p className="text-gray-600">Supporting local community with technology access and digital literacy</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-indigo-100 p-2 rounded-full mr-4 flex-shrink-0">
                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Comprehensive Solutions</h3>
                    <p className="text-gray-600">From products to services to insurance - everything you need in one place</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="relative bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='m0 40l40-40h-40v40zm40 0v-40h-40l40 40z'/%3E%3C/g%3E%3C/svg%3E")`,
              }}></div>
            </div>

            <div className="relative text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-8 shadow-2xl">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                Ready to Get <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Started?</span>
              </h2>

              <p className="text-xl sm:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed text-gray-300">
                Experience the EMART24 difference today! Visit our Universal Cyber Cafe or explore our online platform.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-lg mx-auto">
                <button
                  onClick={() => window.location.href = '/contact-us'}
                  className="w-full sm:w-auto bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
                >
                  Contact Us
                </button>
                <button
                  onClick={() => window.location.href = '/'}
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 border-2 border-blue-600 hover:border-blue-700 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
                >
                  Start Shopping
                </button>
              </div>

              <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">24/7</div>
                  <div className="text-gray-300">Support</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">100+</div>
                  <div className="text-gray-300">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">∞</div>
                  <div className="text-gray-300">Super Coins</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AboutContent;
