# React + TypeScript + Vite

# 🍽️ Restaurant Chain Management System - Admin Dashboard

This is the **Admin Dashboard** of the **Restaurant Chain Management System (RCMS)** — a web application that allows **UTOPIA staff**, **Brand Managers**, and **Branch Managers** to manage brands, branches, staff, customers, orders, and more.

🚀 **Built with**: React, TypeScript, Vite, TailwindCSS, Shadcn/ui

---

## 📁 Project Structure

public/ # Static assets

  src/ # Main source code

     components/ # Shared reusable components

     pages/ # Page views (AddOrder, EditOrder, Dashboard, etc.)

     services/ # API services (GraphQL queries/mutations)

     slices/ # Redux slices (orders, customers, etc.)

     layouts/ # Layout wrappers

     utils/ # Utility functions & constants
   .env # Environment variables (e.g., VITE_API_URL)

  vite.config.ts # Vite configuration

  tailwind.config.js # Tailwind configuration

  tsconfig.*.json # TypeScript configurations


---

## ⚙️ Setup & Installation

### 1. Clone the project

```bash
git clone https://github.com/your-username/coffee-shop-admin-dashboard.git
cd coffee-shop-admin-dashboard
```
### 2. Install dependencies

```bash
npm install
# or
yarn
```
### 3. Set environment variables
Create a .env file in the root directory

###4. Run the project
```bash
npm run dev
# or
yarn dev
```
# ✅ Features
### 🔐 Role-based login for UTOPIA Manager, Brand Manager, Branch Manager

### 🏪 Brand & Branch management

### 👥 Employee & Customer management

### 🛒 Order & Reservation system

### 📊 Sales reporting and dashboard analytics

### 🌐 Responsive UI with TailwindCSS & Shadcn/ui

### ⚡ Optimized for Vite + React + TypeScript

