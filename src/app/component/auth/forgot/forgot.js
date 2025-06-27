'use client'

import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/
    return re.test(email)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email) {
      Swal.fire('กรอกอีเมลก่อน', 'กรุณากรอกอีเมลเพื่อรีเซ็ตรหัสผ่าน', 'warning')
      return
    }

    if (!validateEmail(email)) {
      Swal.fire('อีเมลไม่ถูกต้อง', 'กรุณากรอกอีเมลให้ถูกต้องตามรูปแบบ', 'error')
      return
    }

    setLoading(true)

    try {
      // mock API (รอใส่จริง)
      await new Promise((res) => setTimeout(res, 1500))

      Swal.fire('ส่งสำเร็จ', 'ระบบได้ส่งลิงก์รีเซ็ตรหัสผ่านไปยังอีเมลของคุณแล้ว', 'success')
      router.push('/login')
    } catch (err) {
      Swal.fire('เกิดข้อผิดพลาด', 'ไม่สามารถส่งคำขอได้ในขณะนี้', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url('/images/Login&Register.jpg')` }}
    >
      <div className="bg-black bg-opacity-60 p-10 rounded-xl shadow-lg w-full max-w-sm text-white text-center">
        <h1 className="text-2xl font-bold mb-4">ลืมรหัสผ่าน</h1>
        <p className="mb-6 text-sm opacity-80">
          ป้อนอีเมลของคุณเพื่อรับลิงก์รีเซ็ตรหัสผ่าน
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 bg-black bg-opacity-20 border border-white rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full font-semibold py-2 rounded transition 
              ${loading
                ? 'bg-gray-400 text-white'
                : 'bg-white text-red-600 hover:bg-red-600 hover:text-white'}`}
          >
            {loading ? 'กำลังส่ง...' : 'ขอรีเซ็ตรหัสผ่าน'}
          </button>
        </form>

        <div className="mt-4 text-sm text-white">
          <span
            onClick={() => router.push('/login')}
            className="cursor-pointer hover:text-red-500 transition-colors duration-200"
          >
            ย้อนกลับไปหน้า Login
          </span>
        </div>
      </div>
    </div>
  )
}
