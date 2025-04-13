# Digital Gate Pass System - RGIPT (Microservices Architecture)

A scalable, modular gate pass automation system for RGIPT that transitions from manual, paper-based leave approval to a fully digital workflow using microservices. Students apply for leave digitally, with approvals from various authorities and gate pass issuance via QR codes.

---

## 🚀 Architecture Overview

This system follows a **Microservices Architecture** for scalability, fault isolation, and easier deployment.

### Microservices:

- **Auth Service**

  - Handles user registration, login, and role-based authentication (student, department, academic, hostel, security).

- **Leave Service**

  - Students apply for leave, view status. Departments/authorities can approve/reject.

- **GatePass Service**

  - Generates QR code-based gate passes, logs entry/exit.

- **Notification Service**

  - Sends emails/SMS updates at each stage of the process.

- **Admin/Analytics Service**

  - Manages dashboards, reports, and system health logs.

- **API Gateway**
  - Unified entry point for all client requests with route handling and auth middleware.

### Communication:

- **REST/gRPC** between services
- **Kafka/NATS** for async events (notifications, logs)
- **Redis** (optional): Caching or rate-limiting

---

## 🧱 Folder Structure

```sh
gate-pass-system/
├── docker-compose.yml
├── .env
├── README.md
├── gateway/                         # API Gateway (Express/NGINX)
│   └── index.ts
├── shared/                          # Shared types/interfaces between services
│   └── types/
│       └── user.ts
├── client/                          # React frontend (Vite)
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── features/
│   │   ├── pages/
│   │   ├── services/               # API hooks (axios/fetch)
│   │   ├── store/                  # Redux store
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── tailwind.config.js
│   └── package.json
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
│   └── ...
└── scripts/
    └── init.sh                      # For DB setup, Prisma migration, etc.

```

---

## 🧩 Tech Stack

### Backend

- Node.js + Express (per service)
- PostgreSQL (per service DB)
- Prisma ORM
- Redis (for caching and queues)
- Kafka (event-driven architecture)

### Frontend

- React.js (client folder)
- Tailwind CSS + DaisyUI
- Redux Toolkit

### DevOps

- Docker + Docker Compose
- NGINX (or Express Gateway)
- PM2 / Systemd for process management

---

## 🔐 Auth Service

### Endpoints

- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/profile`

### DB Tables

- Users (id, name, email, hashedPassword, role, departmentId, hostelId)
- Roles enum (STUDENT, DEPARTMENT, ACADEMIC, HOSTEL, SECURITY, ADMIN)

---

## 📄 Leave Service

### Endpoints

- `POST /leave/apply`
- `GET /leave/status/:id`
- `PUT /leave/:id/approve`
- `PUT /leave/:id/reject`

### DB Tables

- LeaveApplications (id, studentId, reason, fromDate, toDate, status, currentStage, approvalLog)

---

## 🪪 GatePass Service

### Endpoints

- `GET /gatepass/:leaveId`
- `POST /gatepass/scan`

### DB Tables

- GatePass (id, leaveId, qrCodeUrl, status, issuedById, entryTime, exitTime)

---

## 📢 Notification Service

### Channels

- Email (Nodemailer)
- SMS (Optional: Twilio)

### Events Listened

- leave.approved
- leave.rejected
- gatepass.issued

---

## 🧠 Admin Service

### Endpoints

- `GET /admin/users`
- `GET /admin/analytics`

### Features

- Filter leave trends
- Approval rates
- QR usage logs

---

## 🛠️ Setup Instructions

1. Clone Repo
2. Install Docker & Docker Compose
3. Run `docker-compose up --build`
4. Access services at their respective ports or via gateway

---

## 🧩 RGIPT Digital Gate Pass System – Microservices Architecture Diagram

                        +----------------+
                        |   Frontend UI  |
                        |  (React.js)    |
                        +-------+--------+
                                |
                                ▼
                      +---------+---------+
                      |  API Gateway /    |
                      |  Nginx (optional) |
                      +---------+---------+
                                |
        ┌──────────────────────┼──────────────────────┐
        ▼                      ▼                      ▼

+---------------+ +----------------+ +------------------+
| Auth Service | | User Service | | Admin Service |
| (Login/JWT) | | (Users/Roles) | | (Dashboard, |
| | | | | Stats, Roles) |
+-------+-------+ +-------+--------+ +--------+---------+
| | |
▼ ▼ ▼
+-------+--------+ +-------+--------+ +--------+--------+
| Leave Service | | Gatepass Svc |◄────►| Notification Svc |
| (Form, Flow) | | (After Approval)| | (Email/SMS logs)|
+-------+--------+ +--------+------+ +------------------+
|
▼
+----------------+
| Department / |
| Academic Flow |
| (Internal DB) |
+----------------+

                          ▼
                +------------------+
                | Security Service |
                |  (Gate Pass Scan)|
                +------------------+

---

## 🔁 Inter-Service REST Communication Examples

1. Admin Service:

Calls:

leave-service/api/leaves/stats

gatepass-service/api/gatepasses/stats

notification-service/api/notifications/stats

2. Leave Service:

Can notify:

notification-service on approval/rejection

3. Gatepass Service:

Can notify:

notification-service when gatepass is issued

Frontend:

Auth API → auth-service

Leave Form API → leave-service

## Dashboard → admin-service (which in turn calls others)

## ✅ Project Roadmap

### Week 1:

- Setup GitHub repo, Docker config
- Build Auth Service + DB schema

### Week 2:

- Build Leave Service + Approval Flow

### Week 3:

- Build GatePass Service + QR scan logic
- Notification Service with Kafka

### Week 4:

- Deploy on VPS / Railway
- Testing + CI/CD (GitHub Actions)

---

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
