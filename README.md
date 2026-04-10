# Global_Trend

# Task Manager — Full Stack Application

A full-stack Task Manager application built with React, Node.js + Express, Prisma ORM, and MySQL hosted on Hostinger.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Database Setup (Hostinger MySQL)](#database-setup-hostinger-mysql)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [API Documentation](#api-documentation)
- [Assumptions & Trade-offs](#assumptions--trade-offs)
- [Bonus Features](#bonus-features)

---

## Project Overview

A simple but complete Task Manager app that allows users to:

- View all tasks
- Create a new task (with title and optional description)
- Mark a task as completed or incomplete
- Edit an existing task title inline
- Delete a task
- Filter tasks by All / Active / Completed status

---

## Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | React + Vite + TypeScript           |
| Backend   | Node.js + Express + TypeScript      |
| Database  | MySQL (hosted on Hostinger)         |
| ORM       | Prisma                              |
| Styling   | CSS (plain, no framework)           |

---

## Project Structure

```
task-manager/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskList.tsx
│   │   │   ├── TaskItem.tsx
│   │   │   ├── TaskForm.tsx
│   │   │   └── FilterBar.tsx
│   │   ├── hooks/
│   │   │   └── useTasks.ts
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── types/
│   │   │   └── task.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── .env
│   ├── index.html
│   ├── vite.config.ts
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   └── tasks.ts
│   │   ├── controllers/
│   │   │   └── taskController.ts
│   │   ├── middleware/
│   │   │   ├── errorHandler.ts
│   │   │   └── validate.ts
│   │   ├── types/
│   │   │   └── task.ts
│   │   └── app.ts
│   ├── prisma/
│   │   └── schema.prisma
│   ├── .env
│   └── package.json
│
├── .env.example
└── README.md
```

---

## Prerequisites

Make sure the following are installed on your machine before running the project:

- **Node.js** v18 or higher → [https://nodejs.org](https://nodejs.org)
- **npm** v9 or higher (comes with Node.js)
- A **Hostinger account** with a MySQL database created

To verify your Node version:

```bash
node -v
npm -v
```

---

## Database Setup (Hostinger MySQL)

### Step 1 — Create a MySQL Database on Hostinger

1. Log in to your **Hostinger hPanel**
2. Go to **Hosting → Manage → Databases → MySQL Databases**
3. Create a new database and note down:
   - `DB_HOST` (e.g., `srv1234.hstgr.io`)
   - `DB_NAME` (e.g., `u123456789_taskdb`)
   - `DB_USER` (e.g., `u123456789_admin`)
   - `DB_PASSWORD` (your chosen password)

> **Note:** Hostinger MySQL default port is `3306`.

---

### Step 2 — Prisma Schema

The database schema is defined using Prisma. Located at `backend/prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model Task {
  id          Int       @id @default(autoincrement())
  title       String    @db.VarChar(255)
  description String?   @db.Text
  completed   Boolean   @default(false)
  createdAt   DateTime  @default(now()) @map("created_at")
  updatedAt   DateTime  @updatedAt @map("updated_at")

  @@map("tasks")
}
```

**Schema field breakdown:**

| Field         | Type           | Notes                              |
|---------------|----------------|------------------------------------|
| `id`          | Int (PK)       | Auto-incremented primary key       |
| `title`       | VarChar(255)   | Required, max 255 characters       |
| `description` | Text           | Optional                           |
| `completed`   | Boolean        | Defaults to `false`                |
| `createdAt`   | DateTime       | Auto-set on creation               |
| `updatedAt`   | DateTime       | Auto-updated on every change       |

---

### Step 3 — Configure DATABASE_URL

Inside `backend/.env`, set your connection string:

```env
DATABASE_URL="mysql://DB_USER:DB_PASSWORD@DB_HOST:3306/DB_NAME"
```

**Example:**

```env
DATABASE_URL="mysql://u123456789_admin:MyPassword123@srv1234.hstgr.io:3306/u123456789_taskdb"
```

---

### Step 4 — Run Prisma Migrations

Navigate to the backend folder and run:

```bash
cd backend
npx prisma migrate dev --name init
npx prisma generate
```

This will:
- Create the `tasks` table on your Hostinger MySQL database
- Generate the Prisma client used by the backend

To visually inspect your database, you can optionally open Prisma Studio:

```bash
npx prisma studio
```

---

## Backend Setup

### Step 1 — Install Dependencies

```bash
cd backend
npm install
```

### Step 2 — Configure Environment Variables

Create a `.env` file inside the `backend/` folder:

```env
DATABASE_URL="mysql://DB_USER:DB_PASSWORD@DB_HOST:3306/DB_NAME"
PORT=5000
FRONTEND_URL=http://localhost:5173
```

### Step 3 — Run the Backend

**Development mode (with auto-reload):**

```bash
npm run dev
```

**Production build:**

```bash
npm run build
npm start
```

The backend API will be running at:

```
http://localhost:5000
```

---

## Frontend Setup

### Step 1 — Install Dependencies

```bash
cd frontend
npm install
```

### Step 2 — Configure Environment Variables

Create a `.env` file inside the `frontend/` folder:

```env
VITE_API_URL=http://localhost:5000/api
```

### Step 3 — Run the Frontend

```bash
npm run dev
```

The frontend will be running at:

```
http://localhost:5173
```

Open this URL in your browser to use the app.

---

## API Documentation

**Base URL:** `http://localhost:5000/api`

All responses are in JSON format.

---

### GET `/tasks`

Returns all tasks ordered by creation date (newest first).

**Request:**

```
GET /api/tasks
```

**Response `200 OK`:**

```json
{
  "data": [
    {
      "id": 1,
      "title": "Buy groceries",
      "description": "Milk, eggs, bread",
      "completed": false,
      "createdAt": "2026-04-10T10:00:00.000Z",
      "updatedAt": "2026-04-10T10:00:00.000Z"
    }
  ],
  "message": "Tasks fetched successfully"
}
```

---

### POST `/tasks`

Creates a new task.

**Request:**

```
POST /api/tasks
Content-Type: application/json
```

```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread"
}
```

| Field         | Required | Type   | Rules                        |
|---------------|----------|--------|------------------------------|
| `title`       | Yes      | string | Non-empty, max 255 chars     |
| `description` | No       | string | Optional free text           |

**Response `201 Created`:**

```json
{
  "data": {
    "id": 1,
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "completed": false,
    "createdAt": "2026-04-10T10:00:00.000Z",
    "updatedAt": "2026-04-10T10:00:00.000Z"
  },
  "message": "Task created successfully"
}
```

**Response `400 Bad Request` (validation error):**

```json
{
  "error": "Validation failed",
  "details": "Title is required and must not be empty"
}
```

---

### PATCH `/tasks/:id`

Updates a task's `title` and/or `completed` status. At least one field must be provided.

**Request:**

```
PATCH /api/tasks/1
Content-Type: application/json
```

```json
{
  "completed": true
}
```

or

```json
{
  "title": "Updated task title",
  "completed": false
}
```

| Field       | Required | Type    | Rules                               |
|-------------|----------|---------|-------------------------------------|
| `title`     | No       | string  | Non-empty, max 255 chars if provided|
| `completed` | No       | boolean | Must be `true` or `false`           |

**Response `200 OK`:**

```json
{
  "data": {
    "id": 1,
    "title": "Updated task title",
    "description": "Milk, eggs, bread",
    "completed": true,
    "createdAt": "2026-04-10T10:00:00.000Z",
    "updatedAt": "2026-04-10T11:00:00.000Z"
  },
  "message": "Task updated successfully"
}
```

**Response `404 Not Found`:**

```json
{
  "error": "Task not found"
}
```

---

### DELETE `/tasks/:id`

Deletes a task by ID.

**Request:**

```
DELETE /api/tasks/1
```

**Response `200 OK`:**

```json
{
  "message": "Task deleted successfully"
}
```

**Response `404 Not Found`:**

```json
{
  "error": "Task not found"
}
```

---

## Assumptions & Trade-offs

| Decision | Reason |
|----------|--------|
| In-memory state on frontend (no Redux/Zustand) | Scope appropriate for this exercise; useState + custom hook is sufficient |
| Prisma over raw SQL | Cleaner schema management and type-safety; migration history is easier to track |
| MySQL on Hostinger over SQLite | Matches a real production-like setup; SQLite would be simpler locally but less realistic |
| No authentication | Out of scope per the assignment brief |
| No pagination | Task list is assumed to be small for this exercise |
| Vite over Create React App | Faster dev server and build times; CRA is deprecated |
| TypeScript strict mode | Enforces proper types throughout; reduces runtime bugs |
| Plain CSS over Tailwind | Keeps dependencies minimal; Tailwind would require extra build config |

---

## Bonus Features

The following optional features have been implemented:

- [x] Filter tasks by All / Active / Completed
- [x] Edit existing task title inline
- [x] Persist tasks after refresh (MySQL database)
- [ ] Basic tests *(not included to respect the 1–2 hour scope)*
- [ ] Docker setup *(not included to keep setup simple)*

---

## Running Both Together

Open two terminal windows:

**Terminal 1 — Backend:**

```bash
cd backend
npm run dev
```

**Terminal 2 — Frontend:**

```bash
cd frontend
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.
