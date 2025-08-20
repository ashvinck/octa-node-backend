# 📊 Octa Byte Backend

A secure and scalable **Express.js + TypeScript** backend for managing a **dynamic portfolio dashboard**.  
This service powers real-time portfolio insights (CMP, P/E ratio, earnings, gain/loss calculations, etc.) by integrating with financial APIs and serving them to the frontend (Next.js).

---

## 🚀 Features

- **TypeScript-first** development
- **Express.js v5** application setup
- **Security**: Helmet, CORS, Rate Limiting
- **Logging**: Winston + Morgan integrated
- **Error Handling**: Centralized error middleware
- **Modular Architecture** with route separation
- **Data Persistence**: MongoDB (via Mongoose)

---

## ⚙️ Tech Stack

- **Backend Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB (Mongoose ODM)
- **Security**: Helmet, Rate limiting, CORS
- **Logging**: Winston + Morgan

---

## 🔧 Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/ashvinck/octa-node-backend.git
cd octa-node-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create an `.env.development` and `.env.production` file in the project root.

Example:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/octa
NODE_ENV=development
```

### 4. Run in Development

```bash
npm run dev
```

### 5. Build for Production

```bash
npm run build
npm run dev:prod
```

---

````

---

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |

---

## 📌 Routes

### Health Check
```http
GET /
````

**Response:**

```
🙋‍♂️ Hello! Welcome to My Fort Backend!
```

### Portfolio API

```http
GET /portfolio
```

Fetch user portfolio and stock data (CMP, P/E, Earnings, Gain/Loss).

---

## 🔒 Security Features

- **Helmet** for securing HTTP headers
- **CORS** with dynamic options via `getCorsOptions()`
- **Rate Limiting** (max 500 requests / 15 mins per IP)
- **Error Handling**: Centralized with proper HTTP codes

---

## 📜 License

MIT © 2025
