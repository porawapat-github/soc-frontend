'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast, ToastContainer } from 'react-toastify'
import Image from 'next/image'

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

  const handleLogout = () => {
    localStorage.removeItem('api-token')
    toast.success('ออกจากระบบเรียบร้อย 👋')
    setTimeout(() => router.push('/login'), 1000)
  }

  if (isVerified === null) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-3 border-rose-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-300 text-lg">กำลังตรวจสอบสิทธิ์...</p>
        </div>
      </div>
    )
  }

  if (isVerified === false) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 bg-black/20">
        <div className="h-full w-full bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-gray-800/50 backdrop-blur-xl border-b border-gray-700">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-rose-500 to-red-600 p-2.5 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-light text-white">Dashboard Menu</h1>
                <p className="text-gray-200 text-sm">ระบบจัดการข้อมูล</p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="text-right">
                <p className="text-gray-200 text-sm">{currentTime.toLocaleDateString('th-TH', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p className="text-rose-500 text-xs">{currentTime.toLocaleTimeString('th-TH')}</p>
              </div>

              <button
                onClick={handleLogout}
                className="bg-gray-700/50 hover:bg-rose-500 text-gray-300 hover:text-white px-4 py-2 rounded-xl transition-all duration-300 flex items-center space-x-2 border border-gray-600 hover:border-gray-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="text-sm">ออกจากระบบ</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-light text-white mb-2">
            ยินดีต้อนรับ
          </h2>
          <p className="text-gray-200">เลือกเครื่องมือที่ต้องการใช้งาน</p>
        </div>

        <div className="max-w-10xl">
          {/* Single Row Layout for Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Excel Card 1 */}
            <div className="group">
              <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-2xl p-4 shadow-xl transform transition-all duration-300 hover:shadow-2xl hover:border-rose-500 hover:-translate-y-1">
                <div className="flex flex-col h-full">
                  {/* Icon Section */}
                  <div className="mb-4">
                    <div className="relative inline-block">
                      <div className="bg-gradient-to-br from-rose-500 to-red-600 p-3 rounded-xl shadow-lg">
                        <Image
                          src="/images/logo/icons8-excel.svg"
                          alt="Excel Icon"
                          width={32}
                          height={32}
                          className="w-8 h-8"
                        />
                      </div>
                      <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs px-2 py-0.5 rounded-full">
                        New
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-grow">
                    <h3 className="text-lg font-light text-white mb-2">Excel Filter</h3>
                    <p className="text-gray-300 text-sm mb-4">
                      ระบบกรองและจัดการข้อมูล Excel อัตโนมัติ
                    </p>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => {
                      const token = localStorage.getItem('api-token')
                      if (token) {
                        window.open(`http://localhost:3001/?token=${token}`, '_blank')
                      }
                    }}
                    className="w-full bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white font-medium py-2.5 px-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-rose-500/25"
                  >
                    เปิดใช้งาน
                  </button>
                </div>
              </div>
            </div>

            {/* Excel Card 2 (Device) */}
            <div className="group">
              <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-2xl p-4 shadow-xl transform transition-all duration-300 hover:shadow-2xl hover:border-rose-500 hover:-translate-y-1">
                <div className="flex flex-col h-full">
                  {/* Icon Section */}
                  <div className="mb-4">
                    <div className="relative inline-block">
                      <div className="bg-gradient-to-br from-rose-500 to-red-600 p-3 rounded-xl shadow-lg">
                        <Image
                          src="/images/logo/icons8-excel.svg"
                          alt="Excel Icon"
                          width={32}
                          height={32}
                          className="w-8 h-8"
                        />
                      </div>
                      <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs px-2 py-0.5 rounded-full">
                        New
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-grow">
                    <h3 className="text-lg font-light text-white mb-2">Excel Filter & Replace Report</h3>
                    <p className="text-gray-300 text-sm mb-4">
                      ระบบกรองข้อมูล Excel Mazda
                    </p>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => {
                      const token = localStorage.getItem('api-token')
                      if (token) {
                        window.open(`http://localhost:8501/?token=${token}`, '_blank')
                      }
                    }}
                    className="w-full bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white font-medium py-2.5 px-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-rose-500/25"
                  >
                    เปิดใช้งาน
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <ToastContainer
        position="top-center"
        autoClose={2500}
        theme="dark"
        toastStyle={{
          backgroundColor: '#262626',
          color: '#fff',
          border: '1px solid #404040'
        }}
      />
    </div>
  )
}

export default MainMenu