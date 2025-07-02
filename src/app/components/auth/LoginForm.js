'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast, ToastContainer } from 'react-toastify'


export default function LoginForm() {
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
      toast.warn('กรุณากรอก Token Login ')
      setIsLoading(false)
      return
    }

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_LOGIN_URL, {
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
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 relative overflow-hidden">
      {/* Soft Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-rose-500 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-red-500 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-rose-400 rounded-full animate-float"></div>
        <div className="absolute top-3/4 left-1/3 w-3 h-3 bg-red-400 rounded-full animate-float-delayed"></div>
        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-rose-300 rounded-full animate-float"></div>
        <div className="absolute bottom-1/4 right-1/3 w-4 h-4 bg-red-300 rounded-full animate-float-delayed"></div>
        <div className="absolute top-1/3 left-1/2 w-2 h-2 bg-rose-500 rounded-full animate-float-slow"></div>
      </div>

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-10px); }
          75% { transform: translateY(-30px) translateX(5px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-30px) translateX(-10px); }
          50% { transform: translateY(-20px) translateX(10px); }
          75% { transform: translateY(-10px) translateX(-5px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-40px) translateX(20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
        }
      `}</style>

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

      <div className="relative z-10 w-full max-w-md px-6">
        {/* Login Card */}
        <div className="bg-neutral-800/50 backdrop-blur-xl border border-neutral-700 shadow-2xl rounded-3xl overflow-hidden transform transition-all duration-500 hover:scale-[1.02]">
          
          {/* Header Section */}
          <div className="bg-gradient-to-r from-neutral-800 to-neutral-700 p-8 text-center border-b border-neutral-600">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-br from-rose-500 to-red-600 rounded-2xl p-4 shadow-xl transform transition-all duration-300 hover:rotate-12 hover:scale-110">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <h1 className="text-2xl font-light text-white mb-2 animate-fade-in">เข้าสู่ระบบ</h1>
            <p className="text-neutral-400 text-sm animate-fade-in-delayed">กรุณาใส่ Token เพื่อเข้าใช้งาน</p>
          </div>

          <style>{`
            @keyframes fade-in {
              from { opacity: 0; transform: translateY(10px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes fade-in-delayed {
              from { opacity: 0; transform: translateY(10px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in {
              animation: fade-in 0.8s ease-out;
            }
            .animate-fade-in-delayed {
              animation: fade-in 0.8s ease-out 0.2s both;
            }
          `}</style>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="p-8">
            <div className="mb-6">
              <label className="block text-neutral-300 text-sm font-light mb-3">
                Token Login
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="กรอก Token Login"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  className="w-full px-4 py-3 bg-neutral-700/50 border border-neutral-600 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500/50 focus:ring-2 focus:ring-rose-500/20 transition-all duration-300"
                  disabled={isLoading}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                  <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></div>
                </div>
              </div>
              <p className="text-xs text-neutral-500 mt-2 animate-fade-in">💡 กรอก Token Login เพื่อความสมบรูณ์ของระบบ</p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white font-medium py-3 px-6 rounded-xl transform transition-all duration-300 hover:shadow-lg hover:shadow-rose-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>กำลังเข้าสู่ระบบ</span>
                </>
              ) : (
                <span>เข้าสู่ระบบ</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}