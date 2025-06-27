'use client'

import React from 'react'
import Swal from 'sweetalert2'
import { FaCat, FaGamepad } from 'react-icons/fa'

function MainMenu() {
  const handleClick = (menuName) => {
    Swal.fire('เมี๊ยว~', `คุณกด ${menuName} แล้วนะจ๊ะ 😻`, 'info')
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-6"
      style={{ backgroundImage: `url('/images/gradient.png')` }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl">
        {/* เมนูที่ 1 */}
        <div className="card bg-base-200 shadow-xl p-6 border border-white">
          <div className="flex flex-col items-center text-center">
            <FaCat className="text-5xl text-pink-400 mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">เมนูแมวน่ารัก</h2>
            <p className="text-white mb-4">กำลังจะใส่โลโก้และข้อมูลแมว 🐾</p>
            <button
              className="px-6 py-2 text-white bg-transparent hover:shadow-[0_0_20px_rgba(255,100,100,0.7)] transition-all duration-300 rounded"
              onClick={() => handleClick('เมนูแมวน่ารัก')}
            >
              ส่งเมี๊ยว~
            </button>
          </div>
        </div>

        {/* เมนูที่ 2 */}
        <div className="card bg-base-200 shadow-xl p-6 border border-white">
          <div className="flex flex-col items-center text-center">
            <FaGamepad className="text-5xl text-purple-400 mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">เมนูเกมสนุก</h2>
            <p className="text-white mb-4">จะใส่ข้อมูลเกี่ยวกับเกม 🎮</p>
            <button
              className="px-6 py-2 text-white bg-transparent hover:shadow-[0_0_20px_rgba(255,100,100,0.7)] transition-all duration-300 rounded"
              onClick={() => handleClick('เมนูเกมสนุก')}
            >
              เริ่มเล่น!
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainMenu
