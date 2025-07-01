'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast, ToastContainer } from 'react-toastify'

import { FaCat, FaGamepad, FaSignOutAlt, FaUser, FaCog } from 'react-icons/fa'

function MainMenu() {
  const router = useRouter()
  const [isVerified, setIsVerified] = useState(null) // null = loading
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    const token = localStorage.getItem('api-token')

    if (!token) {
      toast.warning('กรุณาเข้าสู่ระบบก่อนเข้าใช้งาน')
      setTimeout(() => router.push('/login'), 2000)
      return () => clearInterval(timer)
    }

    // 🔐 ตรวจสอบ token กับ n8n webhook
    const verifyToken = async () => {
      try {
        const res = await fetch('https://ai.bmspcustomer.net/webhook/64aac637-3795-4932-b466-1cbc13a0ebd4', {
          method: 'GET',
          headers: {
            'api-key': token
          }
        })

        if (res.ok) {
          setIsVerified(true)
          toast.success('ยินดีต้อนรับเข้าสู่ระบบ! 🎉')
        } else {
          toast.error('Token ไม่ถูกต้อง หรือหมดอายุ')
          setTimeout(() => router.push('/login'), 2000)
          setIsVerified(false)
        }
      } catch (err) {
        console.error('Token verify failed:', err)
        toast.error('เชื่อมต่อ API ไม่ได้')
        setTimeout(() => router.push('/login'), 2000)
        setIsVerified(false)
      }
    }

    verifyToken()
    return () => clearInterval(timer)
  }, [router])

  const handleClick = (menuName) => {
    toast.info(`คุณเลือก "${menuName}" 🚀`)
  }

  const handleLogout = () => {
    localStorage.removeItem('api-token')
    toast.success('ออกจากระบบเรียบร้อย 👋')
    setTimeout(() => router.push('/login'), 1000)
  }

  if (isVerified === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-white text-xl">🔒 กำลังตรวจสอบสิทธิ์...</p>
        </div>
      </div>
    )
  }

  if (isVerified === false) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-950 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-40 h-40 bg-red-600 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-red-800 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-red-500 rounded-full blur-2xl animate-bounce"></div>
        <div className="absolute bottom-1/3 left-1/4 w-28 h-28 bg-red-700 rounded-full blur-2xl animate-bounce delay-500"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-gradient-to-r from-gray-900/80 to-red-900/80 backdrop-blur-sm border-b border-red-600/30">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-red-600 to-red-700 p-3 rounded-full">
                <FaUser className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Main Dashboard</h1>
                <p className="text-red-400 text-sm">ยินดีต้อนรับเข้าสู่ระบบ</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-white text-sm">{currentTime.toLocaleDateString('th-TH')}</p>
                <p className="text-red-400 text-xs">{currentTime.toLocaleTimeString('th-TH')}</p>
              </div>
              
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 hover:scale-105"
              >
                <FaSignOutAlt />
                <span>ออกจากระบบ</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            🚀 <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">Dashboard Center</span>
          </h2>
          <p className="text-gray-300 text-lg">เลือกเมนูที่ต้องการใช้งาน</p>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* เมนู 1 - แมวน่ารัก */}
          <div className="group">
            <div className="bg-gradient-to-br from-gray-900 to-black border border-red-600/50 rounded-2xl p-8 shadow-2xl shadow-red-600/20 transform transition-all duration-500 hover:scale-105 hover:shadow-red-600/40 hover:border-red-500">
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="relative">
                  <div className="bg-gradient-to-r from-pink-500 to-red-500 p-6 rounded-full shadow-lg group-hover:shadow-pink-500/50 transition-all duration-300">
                    <FaCat className="text-4xl text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                    NEW
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">เมนูแมวน่ารัก</h3>
                  <p className="text-gray-400 mb-6">ข้อมูลแมวจะมาเร็ว ๆ นี้ 🐾</p>
                </div>

                <button
                  onClick={() => handleClick('เมนูแมวน่ารัก')}
                  className="w-full bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700 text-white font-bold py-3 px-6 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  🐱 ส่งเมี๊ยว~
                </button>
              </div>
            </div>
          </div>

          {/* เมนู 2 - เกมสนุก */}
          <div className="group">
            <div className="bg-gradient-to-br from-gray-900 to-black border border-red-600/50 rounded-2xl p-8 shadow-2xl shadow-red-600/20 transform transition-all duration-500 hover:scale-105 hover:shadow-red-600/40 hover:border-red-500">
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="relative">
                  <div className="bg-gradient-to-r from-purple-500 to-red-500 p-6 rounded-full shadow-lg group-hover:shadow-purple-500/50 transition-all duration-300">
                    <FaGamepad className="text-4xl text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                    SOON
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">เมนูเกมสนุก</h3>
                  <p className="text-gray-400 mb-6">เกมสนุกกำลังจะมา 🎮</p>
                </div>

                <button
                  onClick={() => handleClick('เมนูเกมสนุก')}
                  className="w-full bg-gradient-to-r from-purple-600 to-red-600 hover:from-purple-700 hover:to-red-700 text-white font-bold py-3 px-6 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  🎮 เริ่มเล่น!
                </button>
              </div>
            </div>
          </div>

          {/* เมนู 3 - การตั้งค่า */}
          <div className="group md:col-span-2 lg:col-span-1">
            <div className="bg-gradient-to-br from-gray-900 to-black border border-red-600/50 rounded-2xl p-8 shadow-2xl shadow-red-600/20 transform transition-all duration-500 hover:scale-105 hover:shadow-red-600/40 hover:border-red-500">
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="relative">
                  <div className="bg-gradient-to-r from-gray-600 to-red-600 p-6 rounded-full shadow-lg group-hover:shadow-gray-500/50 transition-all duration-300">
                    <FaCog className="text-4xl text-white animate-spin-slow" />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">การตั้งค่า</h3>
                  <p className="text-gray-400 mb-6">จัดการระบบและการตั้งค่า ⚙️</p>
                </div>

                <button
                  onClick={() => handleClick('การตั้งค่า')}
                  className="w-full bg-gradient-to-r from-gray-600 to-red-600 hover:from-gray-700 hover:to-red-700 text-white font-bold py-3 px-6 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  ⚙️ ตั้งค่า
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-gray-900/50 to-red-900/50 backdrop-blur-sm border border-red-600/30 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-red-400">24/7</div>
            <div className="text-gray-300">ระบบพร้อมใช้งาน</div>
          </div>
          
          <div className="bg-gradient-to-r from-gray-900/50 to-red-900/50 backdrop-blur-sm border border-red-600/30 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-red-400">🔒</div>
            <div className="text-gray-300">ความปลอดภัยสูง</div>
          </div>
          
          <div className="bg-gradient-to-r from-gray-900/50 to-red-900/50 backdrop-blur-sm border border-red-600/30 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-red-400">⚡</div>
            <div className="text-gray-300">ประสิทธิภาพสูง</div>
          </div>
        </div>
      </main>

      <ToastContainer 
        position="top-center" 
        autoClose={2500}
        theme="dark"
        toastStyle={{
          backgroundColor: '#1a1a1a',
          color: '#fff',
          border: '1px solid #dc2626'
        }}
      />

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  )
}

export default MainMenu