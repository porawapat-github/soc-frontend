'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function SimpleLogin() {
  const router = useRouter()
  const [userInput, setUserInput] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const trimmedInput = userInput.trim()

    if (!trimmedInput || trimmedInput.length > 50) {
      toast.warn('กรุณากรอก USER ที่ถูกต้อง (ไม่เกิน 50 ตัวอักษร)')
      return
    }

    try {
      const res = await fetch(`https://ai.bmspcustomer.net/webhook/64aac637-3795-4932-b466-1cbc13a0ebd4`, {
        method: 'GET',
        headers: { 'api-key': trimmedInput }
      })

      if(res.status !== 200){
         toast.error('เกิดข้อผิดพลาดในการเชื่อมต่อ หรือ api token ไม่ถูกต้อง ❌')
         return
      }

      localStorage.setItem('api-token', trimmedInput)

      window.location.href = '/mainmenu'

   
    } catch (error) {
      console.error('❌ Fetch Error:', error)
      toast.error('เกิดข้อผิดพลาดในการเชื่อมต่อ ❌')
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/gradient.png')" }}
    >
      <ToastContainer position="top-center" />
      <form
        onSubmit={handleSubmit}
        className="bg-black bg-opacity-60 p-10 rounded-xl shadow-lg w-full max-w-sm"
      >
        <div className="text-center mb-6">
          <h1 className="text-white text-2xl font-bold">Check Login</h1>
        </div>
        <input
          type="text"
          placeholder="USER"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="w-full px-4 py-3 mb-4 text-black rounded outline-none"
        />
        <button
          type="submit"
          className="w-full py-3 bg-white text-black font-semibold rounded hover:bg-gray-200"
        >
          LOGIN
        </button>
      </form>
    </div>
  )
}
