# 🎸 Band Data Generator

Band Data Generator is a web application that **fetches historical band information** and generates **AI-powered descriptions and analytics**. It utilizes **Together AI** for band history generation and **Hugging Face** for image generation.

---

## 📌 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Main Components](#main-components)
- [Application Flow](#application-flow)
- [Setup and Configuration](#setup-and-configuration)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [Docker Setup](#docker-setup)
- [API Endpoints](#api-endpoints)
- [Authentication & API Key Management](#authentication--api-key-management)

---

## 📝 Overview

This project provides **historical data and AI-generated insights about music bands**. Users can:

- **Retrieve historical information** about a band in a specific year.
- **Analyze generated text** (capital word count, words with numbers, etc.).
- **Generate AI-powered images** of bands in different time periods.

If API keys are missing, the system operates in a **limited mode**, fetching only available band data without AI enhancements.

---

## 🛠 Tech Stack

### **Backend**

- **Node.js (TypeScript)** – Express-based REST API
- **Redis** – Caching system
- **ioredis** – Redis client for Node.js
- **LangChain.js** – AI model integration
- **Together AI** – AI-powered band history generation
- **Hugging Face API** – AI-generated images
- **Docker & Docker Compose** – Containerization

### **Frontend**

- **React.js (TypeScript)** – Modern UI framework
- **MUI (Material UI)** – UI Components
- **Styled Components** – Custom styles
- **React Query** – Data fetching and caching

---

## 🔥 Main Components

- Text generation - genrate text based on the band name, the year, and user reason for loving them.
- Image generation - generate an image that show the decription of the band in that year.
- Saving history to see the old result (in memoty that flush every 10 minutes).
- Result anyltics - calculate small anlytics on the generated result.

## 🔄 Application Flow

1. **User Inputs:**

   - The user submits a **band name**, **description of why choose this band in that year** and **year**.
   - The system checks for API keys.

2. **AI Processing:**

   - If API keys are set, **Together AI** generates band history insights.
   - If enabled, **Hugging Face** generates band images.

3. **Data Analysis:**

   - The system analyzes the generated text for:
     - **Capital word count**
     - **Words with numbers**
     - **Total word count**
     - **Even/Odd year classification**

4. **Caching & Storage:**

   - The response is stored in **Redis** for quick retrieval.

5. **History & Retrieval:**
   - Users can view previously generated band history records.

---

## 🔥 Setup and Configuration

### **1. Clone the Repository**

```sh
git clone https://github.com/your-repo/band-data-generator.git
cd band-data-generator

```

### **2. Install Dependencies**

```sh
cd server && npm install
cd ../client && npm install
```

### **3. Set Up Environment Variables**

TOGETHER_AI_API_KEY=your-api-key
HUGGINGFACE_API_KEY=your-api-key
REDIS_HOST=redis // if run localhost change to localhost
REDIS_PORT=6379

## 🚀 Running the Project

### Using Docker

```sh
docker-compose up --build
```

### Without Docker

Run Backend

```sh
cd server
npm run start
```

Run Frontend

```sh
cd client
npm start
```

## 🔌 API Endpoints

- POST /api/submit - Generates band history and analytics based on the user’s input.
- GET /api/entries - Fetches all previously generated band history records.
- POST /api/auth - Stores API keys temporarily in Redis.

## 🔑 Authentication & API Key Management

Users must enter valid Together AI and Hugging Face API keys.
API keys are stored in Redis (not persistent, auto-cleaned every 10 minutes).
If no API key is provided, the system will:
Skip AI-based band history and image generation.
Show a message: "AI features disabled. Please provide an API key."
