/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // ✅ ตรวจจับไฟล์ใน /src ทั้งหมด
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui"), // ✅ เพิ่ม DaisyUI เข้ามาใช้งาน
  ],
}
