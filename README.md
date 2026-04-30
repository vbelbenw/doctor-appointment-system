# Doctor Appointment System

A comprehensive full-stack application designed to streamline the process of booking and managing medical appointments. This system provides a seamless interface for patients to find doctors and book slots, while offering doctors and administrators robust tools to manage schedules and system data.

## 🚀 Key Features

- **Authentication & Security**: Secure user registration and login using **JWT (JSON Web Tokens)** and **bcryptjs** for password hashing.
- **Role-Based Access Control (RBAC)**: Distinct interfaces and permissions for **Patients**, **Doctors**, and **Admins**.
- **Doctor Availability Management**: Doctors can define their weekly availability (days and time ranges) and slot durations.
- **Automated Slot Generation**: A sophisticated system that generates bookable time slots based on doctor availability rules, preventing overlaps and duplicates.
- **Appointment Lifecycle**: Complete flow for booking, confirming, and cancelling appointments with real-time status updates.
- **In-App Notification System**: Real-time notifications for appointment confirmations, cancellations, and status changes.
- **Role-Based Dashboards**:
  - **Patient Dashboard**: View upcoming/past appointments and browse available doctors.
  - **Doctor Dashboard**: Manage schedules, view upcoming consultations, and update availability.
  - **Admin Panel**: High-level overview, user management, and system configuration.
- **Responsive Design**: Fully responsive UI built with **Tailwind CSS**, optimized for desktop and mobile devices.

## 🛠️ Tech Stack

### Frontend
- **React (Vite)**: Modern UI library for a fast and reactive user experience.
- **Tailwind CSS**: Utility-first CSS framework for premium, responsive styling.
- **React Router**: For seamless client-side navigation.
- **Axios**: For making secure API requests to the backend.
- **Context API**: For global state management (Authentication, Notifications).

### Backend
- **Node.js & Express.js**: Robust and scalable server-side environment.
- **MySQL**: Relational database for structured data storage (Users, Appointments, Slots).
- **JWT**: Secure industry-standard authentication.
- **Nodemon**: Development tool for automatic server restarts.

## 📂 Project Structure

```text
doctor-appointment-system/
├── backend/
│   ├── config/         # Database connection and configuration
│   ├── controllers/    # Request handlers and business logic
│   ├── middleware/     # Auth and validation middlewares
│   ├── models/         # Database schema definitions/queries
│   ├── routes/         # API endpoint definitions
│   ├── services/       # Reusable logic (e.g., Notification service)
│   └── server.js       # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── context/    # Global state (Auth, Notifications)
│   │   ├── pages/      # View components (Patient, Doctor, Admin)
│   │   ├── services/   # API communication logic
│   │   └── App.jsx     # Main routing and layout
└── README.md
```

## ⚙️ Installation Guide

### Prerequisites
- Node.js (v16+)
- MySQL Server

### 1. Backend Setup
```bash
cd backend
npm install
```
Configure your environment variables in a `.env` file (see [Environment Variables](#environment-variables)).
```bash
npm run dev
```

### 2. Frontend Setup
```bash
cd frontend
npm install
```
Configure your environment variables in a `.env` file.
```bash
npm run dev
```

## 🔐 Environment Variables

### Backend (`backend/.env`)
- `PORT`: Server port (default: 5000)
- `DB_HOST`: MySQL database host
- `DB_USER`: MySQL database user
- `DB_PASSWORD`: MySQL database password
- `DB_NAME`: MySQL database name
- `JWT_SECRET`: Secret key for token signing

### Frontend (`frontend/.env`)
- `VITE_API_URL`: Backend API URL (e.g., `http://localhost:5000/api`)

## 📡 API Overview

| Group | Description |
|--- |--- |
| **Auth** | User registration, login, and password management. |
| **Doctors** | Retrieve doctor profiles and specialized information. |
| **Availability** | Manage weekly schedules and time ranges for doctors. |
| **Slots** | Generate and fetch available appointment time slots. |
| **Appointments**| Booking, cancellation, and status management. |
| **Notifications**| Retrieve and manage in-app notifications. |
| **Admin** | Administrative controls for users and system data. |

## 👥 User Roles

- **Patient**: Can browse doctors, view available slots, book appointments, and receive notifications.
- **Doctor**: Can set availability, generate slots, manage their schedule, and view patient details.
- **Admin**: Can manage all users (Doctors/Patients), monitor system-wide appointments, and handle configurations.

## 🎨 UI/UX Highlights

- **Dynamic Dashboards**: Layouts adapt based on the logged-in user's role.
- **Premium Aesthetics**: Clean, modern interface with smooth transitions and subtle micro-interactions.
- **Real-time Feedback**: Interactive notifications and status badges for clear user communication.
- **Mobile First**: Fully responsive layout ensures a great experience on any device.

## 🔮 Future Improvements

- **Email/SMS Notifications**: Integration with SendGrid or Twilio for external alerts.
- **Telemedicine Integration**: Video calling capabilities for remote consultations.
- **Payment Gateway**: Secure online payments via Stripe or PayPal.
- **Mobile App**: Native mobile application using React Native.

## ✍️ Author
- Dagim Ashenafi

---
*Built with ❤️ for better healthcare accessibility.*
