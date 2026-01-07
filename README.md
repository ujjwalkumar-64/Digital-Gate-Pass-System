# Digital Gate Pass System - RGIPT (Microservices-Based Campus Automation Platform)

   A digital gate pass and leave management system for RGIPT that replaces the traditional paper-based approval process with a secure, scalable, and fully automated workflow.
   The system enables students to apply for leave online, routes requests through the appropriate authorities, and issues QR code–based gate passes that are validated in real time at campus entry and exit points.

    
---

## ✨ Key Features

- Digital leave application & approval workflow

- Role-based access control (RBAC) using JWT

- QR code–based gate pass generation

- Entry/exit tracking using QR scan lifecycle

- Real-time notifications using Redis + WebSockets

- Persistent notification logs

- Microservices architecture with Dockerized setup

## 🚀 Architecture Overview

This system follows a **Microservices Architecture** to ensure scalability, fault isolation, and independent deployment.

 ### High-Level Components

- Frontend: React (Vite) + Tailwind CSS

- API Gateway: Centralized routing and authentication middleware

- Backend Services: Node.js + Express microservices

- Database: PostgreSQL (separate database per service)

- Realtime Layer: Redis + WebSockets

- Deployment: Docker & Docker Compose

### Microservices:

- **🔐 Auth Service**

  - Handles authentication and authorization.

    *Responsibilities*
      
      - User registration & login
      
      - JWT-based authentication
      
      - Role-based access control
 
    *Endpoints*
  
     - `POST /auth/register`
     - `POST /auth/login`
     - `GET  /auth/profile`
   
    *DB Table*
    - Users (id, name, email, hashedPassword, role, departmentId, hostelId)
    - Roles enum (STUDENT, DEPARTMENT, ACADEMIC, HOSTEL, SECURITY, ADMIN)


- **📄 Leave Service**

  - Manages leave requests and approval flows.
 
    *Responsibilities*

      - Leave application submission
      
      - Multi-stage approval workflow
      
      - Tracks approval status and current stage

    *Endpoints*
  
      - `POST /leave/apply`
      - `GET  /leave/status/:id`
      - `PUT  /leave/:id/approve`
      - `PUT  /leave/:id/reject`

    *Core Tables*
  
      - LeaveApplications (id, studentId, reason, fromDate, toDate, status, currentStage, approvalLog)
      
      - ApprovalLogs

- **🪪 GatePass Service**

  - Handles gate pass generation and validation.

    *Responsibilities*

      - Generate QR code after final approval
      
      - Validate QR scans at gate
      
      - Prevent reuse of expired gate passes
      
      - Gate Pass Lifecycle
      
      - First scan → exit time recorded
      
      - Second scan → entry time recorded and pass expired

    *Endpoints*

      - `GET  /gatepass/:leaveId`
      - `POST /gatepass/scan`
   
      *DB Table*
      - GatePass (id, leaveId, qrCodeUrl, status, issuedById, entryTime, exitTime)

- **📢 Notification Service**

  - Provides real-time and persistent notifications.

    *Responsibilities*

      - Push real-time notifications via WebSockets
      
      - Persist notifications in database
      
      - Use Redis for socket event handling

    *Events*

      - Leave submitted
      
      - Leave approved / rejected
      
      - Gate pass issued

      - Admin approval requests
        
- **🧠 Admin Service**

  - Handles administrative operations and analytics.

    *Responsibilities*

      - Admin approval handling
      
      - System dashboards & analytics
      
      - User and notification logs

    *Endpoints*

     - `GET /admin/users`
     - `GET /admin/analytics`

 

### 🔄 Inter-Service Communication:

- **REST APIs** for synchronous service-to-service communication

- **Redis + WebSockets** for real-time notifications

- **No message broker (Kafka/RabbitMQ)** in current implementation

---
## 🔁 Inter-Service REST Communication Examples

1. Admin Service:

    Calls:
  
      - leave-service/api/leaves/stats
      
      - gatepass-service/api/gatepasses/stats
      
      - notification-service/api/notifications/stats

2. Leave Service:

    Can notify:
  
      - notification-service on approval/rejection

3. Gatepass Service:

    Can notify:
  
      - notification-service when gatepass is issued

Frontend:

  - Auth API → auth-service
  
  - Leave Form API → leave-service


---

## 🧱 Folder Structure

```sh
gate-pass-system/
├── docker-compose.yml
├── .env
├── README.md
├── client/                          # React frontend (Vite)
├── services/
│   ├── auth-service/
│   │   ├── prisma/
│   │   │   └── schema.prisma
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   ├── middleware/
│   │   │   ├── routes/
│   │   │   ├── utils/
│   │   │   └── index.ts
│   │   ├── Dockerfile
│   │   └── package.json
│   ├── leave-service/
│   │   ├── prisma/
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   ├── middleware/
│   │   │   ├── routes/
│   │   │   └── index.ts
│   │   ├── Dockerfile
│   │   └── package.json
│   ├── gatepass-service/
│   ├── notification-service/
│   ├── admin-service/


```

---

## 🧩 Tech Stack

### Backend

- Node.js + Express (per service)
- PostgreSQL (per service DB)
- Prisma ORM
- Redis (for caching and queues)
- JWT Authentication

### Frontend

- React.js (client folder)
- Tailwind CSS + DaisyUI
- Redux Toolkit

### DevOps

- Docker + Docker Compose

---


## 🛠️ Setup Instructions

  1. Clone Repo
  2. Install Docker & Docker Compose
  3. Run `docker-compose up --build`
  4. Access services at their respective ports

---

## 🧠 Design Decisions ##

  - Microservices → independent scaling and clean separation of concerns
  
  - JWT + RBAC → secure and controlled access
  
   - Redis + WebSockets → real-time UX without heavy infrastructure
  
  - QR-based validation → prevents gate pass misuse and duplication
    

## 📌 What This Project Demonstrates ##

  - End-to-end system design & implementation
  
  - Strong backend engineering fundamentals
  
  - Practical microservices architecture
  
  - Real-time system handling using Redis & sockets
  
  - Production-style Dockerized deployment

## 🔮 Future Scope

- Mobile App
- Biometric/FaceID Integration
- Parental Notification
- Real-time Analytics Dashboard
- Integration with campus RFID/Access control

---

## 👨‍💻 Contributors

- Ujjwal Kumar (Backend, Architecture)

---

## 📄 License

MIT License
