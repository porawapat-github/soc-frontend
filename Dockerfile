# สเตจการสร้างโปรดักชัน
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# รับ build arguments
ARG NEXT_PUBLIC_APP_ZONE
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_LOGIN_URL

# ตั้งค่า environment variables
ENV NEXT_PUBLIC_APP_ZONE=$NEXT_PUBLIC_APP_ZONE
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_LOGIN_URL=$NEXT_PUBLIC_LOGIN_URL

# สร้างแอป
COPY . .
RUN npm run build

# สเตจโปรดักชัน
FROM node:18-alpine AS production
WORKDIR /app

# ติดตั้ง Chromium และ dependencies ที่จำเป็นสำหรับ Puppeteer
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ttf-freefont \
    && rm -rf /var/cache/apk/*

# คัดลอกจาก build stage
COPY --from=build /app ./

# ตั้งค่า port ที่จะเปิด
EXPOSE 3000

# รันแอป
CMD ["npm", "start"]