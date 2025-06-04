<div align="center">

# 🏋️ BP Gym Tracking App

**A full-stack gym progress tracking platform with AI-powered personalization and Apple Watch integration.**

[![Next.js](https://img.shields.io/badge/Next.js-15.0.3-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=flat-square&logo=openai&logoColor=white)](https://openai.com/)
[![Apollo GraphQL](https://img.shields.io/badge/Apollo-GraphQL-311C87?style=flat-square&logo=apollo-graphql)](https://www.apollographql.com/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma)](https://prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=flat-square&logo=postgresql&logoColor=white)](https://postgresql.org/)
[![Swift](https://img.shields.io/badge/Swift-FA7343?style=flat-square&logo=swift&logoColor=white)](https://developer.apple.com/swift/)

</div>

---

## 📋 Overview

A modern full-stack application designed for tracking gym progress, analyzing training data, and generating personalized workout plans. Created as part of a bachelor’s thesis with a strong focus on usability, intelligent assistance, and real-time integration with wearables.

---

## 🧠 AI Integration

The system integrates OpenAI’s GPT-o4-mini model for two core use cases:

- **Workout Generation** – Custom weekly plans based on user profile, fitness level, and preferences.
- **Set Recommendation** – Smart weight and rep suggestions based on progressive overload, previous performance, and training goals.

Prompts are engineered to produce structured JSON responses matching frontend schemas. The system supports both prompt tuning and progress-based adaptation.

---

## 📱 Apple Watch Companion App

The application includes a **watchOS companion app** for real-time tracking of pulse and workout data. It supports:

- **Device pairing** via secure 6-character code (no login on the watch)
- **Pulse streaming** and integration with GraphQL backend
- **Workout syncing** – pulls daily workouts directly to the watch

> Note: The Apple Watch app must be built and deployed manually via Xcode (see below).

---

## 🏗️ Architecture

- **Frontend**: Next.js 15 (TypeScript, Tailwind CSS, Apollo Client)
- **Backend**: Node.js GraphQL API (Apollo Server)
- **Database**: PostgreSQL + Prisma ORM
- **Authentication**: NextAuth.js (JWT-based)
- **Wearable**: Apple Watch app (Swift/SwiftUI)
- **AI**: GPT-o4-mini via OpenAI API

---

## ✨ Features

- 📈 AI-generated, personalized training plans
- 📊 Progress analytics with charts and volume graphs
- 🔐 Secure authentication and profile management
- 🧠 Smart recommendations based on previous sets
- 💪 Full exercise database with images
- 🕹️ Real-time Apple Watch data streaming
- 📱 Responsive mobile-first design
- 💬 Community features with posts and comments

---

## 🚀 Quick Start

### Prerequisites

- Node.js 22.11.0+ and npm 10.9.0+
- PostgreSQL
- Git
- Xcode (for watchOS app)

---

### 🛠️ Setup

#### 1. Clone and install dependencies

```bash
git clone <repository-url>
cd bp-gym-tracking-app
```

#### 2. Backend (Node.js GraphQL)

```bash
cd web_app/node-server
npm install

# Setup env
cp .env.example .env
# ➤ Fill in DB credentials and OpenAI API key

# Initialize DB
npx prisma migrate dev
npm run seed  # optional

npm run dev
# ➤ Runs at http://localhost:4000
```

#### 3. Frontend (Next.js client)

```bash
cd ../client-next
npm install

# Setup env
cp .env.example .env
# ➤ Fill in credentials

npm run dev
# ➤ Runs at http://localhost:3000
```

#### 4. Apple Watch App (Manual steps)

- Open `watch_app` project in Xcode.
- Connect a physical Apple Watch or use simulator.
- Build & run.
- On first launch, the app generates a 6-character code.
- Enter this code on the web client to pair the device.

---

## 🔍 GraphQL Playground

Once the backend is running, explore queries at:

```
http://localhost:4000/graphql
```

Sample query:

```graphql
query GetUserWorkouts {
  me {
    name
    workouts {
      name
      date
    }
  }
}
```

---

## 🗄️ Database & Prisma

### Common Commands

```bash
# Navigate to backend
cd web_app/node-server

npx prisma generate            # Sync types
npx prisma migrate dev         # Create new migration
npx prisma studio              # Browse data
npx prisma migrate reset       # (Destructive reset)
```

---

## 📦 Project Structure

```
bp-gym-tracking-app/
├── web_app/
│   ├── client-next/        # Next.js frontend
│   └── node-server/        # GraphQL backend
├── watch_app/              # Apple Watch app (Swift)
└── README.md
```

---

## 📜 License

This project is a part of a bachelor’s thesis.

---
