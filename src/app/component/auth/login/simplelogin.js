'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function SimpleLogin() {
  const [token, setToken] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // 🧹 ล้าง token ทุกครั้งที่เข้าหน้านี้
  useEffect(() => {
    localStorage.removeItem('api-token')
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const trimmedToken = token.trim()
    if (!trimmedToken || trimmedToken.length > 50) {
      toast.warn('กรุณากรอก Token ที่ถูกต้อง (ไม่เกิน 50 ตัวอักษร)')
      setIsLoading(false)
      return
    }

    try {
      const res = await fetch('https://ai.bmspcustomer.net/webhook/64aac637-3795-4932-b466-1cbc13a0ebd4', {
        method: 'GET',
        headers: {
          'api-key': trimmedToken
        }
      })

      if (!res.ok) {
        if (res.status === 403) {
          toast.error('รหัสผ่านไม่ถูกต้อง ❌')
        } else {
          toast.error('เกิดข้อผิดพลาดในการเชื่อมต่อกับระบบ 🔌')
        }
        setIsLoading(false)
        return
      }

      localStorage.setItem('api-token', trimmedToken)
      toast.success('เข้าสู่ระบบสำเร็จ 🎉')
      setTimeout(() => router.push('/mainmenu'), 1000)

    } catch (err) {
      console.error('Fetch error:', err)
      toast.error('เกิดข้อผิดพลาดในระบบ ❌')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-black via-gray-900 to-red-950 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-32 h-32 bg-red-600 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-red-800 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-red-500 rounded-full blur-2xl animate-bounce"></div>
      </div>

      {/* Geometric Patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-red-900 to-transparent transform rotate-45 scale-150"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-l from-transparent via-red-800 to-transparent transform -rotate-45 scale-150"></div>
      </div>

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

      <div className="relative z-10 w-full max-w-md px-6">
        {/* Login Card */}
        <div className="bg-gradient-to-br from-gray-900 to-black border border-red-600 shadow-2xl shadow-red-600/20 rounded-2xl overflow-hidden backdrop-blur-sm">
          
          {/* Header Section */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 text-center">
            <div className="flex justify-center mb-3">
              <div className="bg-black rounded-full p-3 shadow-lg">
                <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white mb-1">SECURE LOGIN</h1>
            <p className="text-red-100 text-sm opacity-90">เข้าสู่ระบบด้วย Token</p>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="p-8">
            <div className="mb-6">
              <label className="block text-red-400 text-sm font-medium mb-3">
                🔑 Authentication Token
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="กรอก Token ที่ได้รับ..."
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300"
                  disabled={isLoading}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 px-6 rounded-lg transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-red-600/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>กำลังเข้าสู่ระบบ...</span>
                </>
              ) : (
                <>
                  <span>🚀 LOGIN</span>
                </>
              )}
            </button>

            {/* Security Notice */}
            <div className="mt-6 p-4 bg-gray-800/50 border border-gray-700 rounded-lg">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <svg className="w-5 h-5 text-yellow-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-300">
                    <span className="text-yellow-500 font-medium">ข้อมูลความปลอดภัย:</span> Token ของคุณจะถูกเข้ารหัสและจัดเก็บอย่างปลอดภัย
                  </p>
                </div>
              </div>
            </div>
          </form>

          {/* Footer Decoration */}
          <div className="h-1 bg-gradient-to-r from-red-600 via-red-500 to-red-600"></div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-6 text-gray-400 text-sm">
          <p>🔒 ระบบรักษาความปลอดภัยขั้นสูง</p>
        </div>
      </div>
    </div>
  )
}