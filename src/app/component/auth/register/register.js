'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'

function Register() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!username || !password || !confirmPassword) {
      Swal.fire('ข้อมูลไม่ครบ', 'กรุณากรอกทุกช่อง', 'warning')
      return
    }

    if (password !== confirmPassword) {
      Swal.fire('รหัสผ่านไม่ตรงกัน', 'กรุณากรอกให้ตรงกันทั้ง 2 ช่อง', 'error')
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      const result = await res.json()

      if (res.ok && result.success) {
        Swal.fire('สมัครสมาชิกสำเร็จ', result.message || 'บัญชีถูกสร้างเรียบร้อย', 'success')
        router.push('/login')
      } else {
        Swal.fire('ไม่สำเร็จ', result.message || 'ไม่สามารถสมัครได้', 'error')
      }
    } catch (error) {
      Swal.fire('เกิดข้อผิดพลาด', 'ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้', 'error')
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
        <div className="mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2m16-10a4 4 0 100-8 4 4 0 000 8z"
            />
          </svg>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="USERNAME"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 bg-black bg-opacity-20 border border-white rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            type="password"
            placeholder="PASSWORD"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 bg-black bg-opacity-20 border border-white rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            type="password"
            placeholder="CONFIRM PASSWORD"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 bg-black bg-opacity-20 border border-white rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full font-semibold py-2 rounded transition ${
              loading
                ? 'bg-gray-400 text-white'
                : 'bg-white text-red-600 hover:bg-red-600 hover:text-white'
            }`}
          >
            {loading ? 'กำลังสมัคร...' : 'SIGN UP'}
          </button>
        </form>

        <div className="mt-4 text-sm text-white">
          <span
            onClick={() => router.push('/login')}
            className="cursor-pointer hover:text-red-500 transition-colors duration-200"
          >
            Already have an account? Login
          </span>
        </div>
      </div>
    </div>
  )
}

export default Register
