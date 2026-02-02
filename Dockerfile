FROM node:20-slim
WORKDIR /app

# backend deps
COPY backend/package*.json ./backend/
RUN cd backend && npm ci

# backend source
COPY backend ./backend

# prisma (backend içindeyse bu satır yeter; değilse ayrıca kopyala)
RUN cd backend && npm run build

CMD ["sh","-c","cd backend && npm run start"]
