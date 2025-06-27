'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!username || !password) {
      Swal.fire('กรอกข้อมูลไม่ครบ', 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน', 'warning')
      return
    }

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      const data = await res.json()

      if (res.ok) {
        Swal.fire('สำเร็จ', 'เข้าสู่ระบบสำเร็จ', 'success')
        router.push('/dashboard')
      } else {
        Swal.fire('ไม่สำเร็จ', data.message || 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง', 'error')
      }
    } catch (err) {
      Swal.fire('ผิดพลาด', 'ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้', 'error')
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
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007.5 17h9m-6-5V6m0 0l-2 2m2-2l2 2"
            />
          </svg>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="USERNAME"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 bg-black bg-opacity-20 border border-white rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            type="password"
            name="password"
            placeholder="PASSWORD"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 bg-black bg-opacity-20 border border-white rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button
            type="submit"
            className="w-full bg-white text-red-600 font-semibold py-2 rounded hover:bg-red-600 hover:text-white transition"
          >
            LOGIN
          </button>
        </form>

        <div className="mt-4 flex justify-between text-sm text-white">
          <span
            onClick={() => router.push('/forgot')}
            className="cursor-pointer hover:text-red-500 transition-colors duration-200"
          >
            Forgot password
          </span>
          <span
            onClick={() => router.push('/register')}
            className="cursor-pointer hover:text-red-500 transition-colors duration-200"
          >
            Sign up
          </span>
        </div>
      </div>
    </div>
  )
}
