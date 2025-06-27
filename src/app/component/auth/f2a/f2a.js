// ไฟล์ src/app/component/auth/f2a/f2a.js

'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'

export default function F2A() {
  const router = useRouter()
  const [code, setCode] = useState('')  
  const [loading, setLoading] = useState(false)

  const handleVerify = async (e) => {
    e.preventDefault()

    if (!code || code.length !== 6) {
      Swal.fire('รหัสไม่ถูกต้อง', 'กรุณากรอกรหัส 6 หลักให้ถูกต้อง', 'warning')
      return
    }

    setLoading(true)

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/verify-2fa`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      })

      const result = await res.json()

      if (res.ok && result.success) {
        Swal.fire('สำเร็จ', result.message || 'ยืนยันตัวตนสำเร็จ', 'success')
        router.push('/mainmenu')
      } else {
        Swal.fire('ไม่สำเร็จ', result.message || 'รหัสไม่ถูกต้อง', 'error')
      }
    } catch (error) {
      Swal.fire('ข้อผิดพลาด', 'ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้', 'error')
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
        <h1 className="text-2xl font-bold mb-4">ยืนยันรหัส 2FA</h1>
        <form onSubmit={handleVerify} className="space-y-4">
          <input
            type="text"
            placeholder="กรอกรหัส 6 หลัก"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            maxLength={6}
            className="w-full px-4 py-2 bg-black bg-opacity-20 border border-white rounded focus:outline-none focus:ring-2 focus:ring-red-500 text-center"
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full font-semibold py-2 rounded transition 
                        ${loading ? 'bg-gray-400 text-white' : 'bg-white text-red-600 hover:bg-red-600 hover:text-white'}`}
          >
            {loading ? 'กำลังตรวจสอบ...' : 'VERIFY'}
          </button>
        </form>
      </div>
    </div>
  )
}
