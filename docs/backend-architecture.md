# Backend Architecture

## AI Rural Health Assistant Backend

**Version:** MVP v1.0

**Framework:** NestJS

**Status:** Design Approved

---

# Purpose

This document defines the backend architecture for the AI Rural Health Assistant MVP.

The primary goals are:

* Keep the codebase modular
* Build only what is required for the MVP
* Allow future scalability without major refactoring
* Separate business logic from infrastructure
* Keep modules independent

This document is the implementation blueprint for the backend.

---

# High-Level Architecture

```text
                React Native App
                        │
                HTTPS / REST API
                        │
                NestJS Backend
      ┌─────────────────┼─────────────────┐
      │                 │                 │
 PostgreSQL         Redis Cache      FastAPI AI
      │                                   │
      └──────────── Gemini API ───────────┘
```

---

# Architecture Principles

The backend follows these principles:

* Feature-first architecture
* Modular design
* REST API
* Dependency Injection
* Stateless authentication
* Single Responsibility Principle
* Environment-driven configuration

---

# Folder Structure

```text
src/

├── common/
│
├── config/
│
├── database/
│
├── modules/
│   ├── auth/
│   ├── users/
│   ├── patients/
│   ├── consultations/
│   ├── medical-records/
│   ├── health-schemes/
│   ├── ai/
│   └── health/
│
├── app.module.ts
└── main.ts
```

---

# Folder Responsibilities

## common/

Shared utilities used across the application.

Examples

* Guards
* Decorators
* Filters
* Interceptors
* Pipes
* Constants
* DTO helpers

Rules

* Never place business logic here.
* Keep reusable only.

---

## config/

Responsible for application configuration.

Contains

* Environment loading
* Validation
* Configuration services

Example

```text
config/

database.config.ts

jwt.config.ts

redis.config.ts

app.config.ts
```

---

## database/

Responsible for database connectivity.

Contains

* Prisma
* Database providers
* Migrations
* Seed scripts

Rules

Business modules should never directly configure Prisma.

---

## modules/

Every business feature lives here.

Each module owns:

* Controller
* Service
* DTOs
* Entities
* Interfaces
* Tests

No module should directly access another module's database models.

Communication happens through services.

---

# Module Responsibilities

## Auth Module

Responsible for

* Login
* Registration
* JWT
* Refresh Tokens
* Session Validation

Owns

* Authentication
* Authorization

---

## Users Module

Responsible for

* User profile
* Profile updates
* Preferences

Owns

* User information

---

## Patients Module

Responsible for

* Patient profile
* Basic health information
* Emergency contacts

---

## Consultations Module

Responsible for

* AI consultation history
* Consultation metadata

---

## Medical Records Module

Responsible for

* Uploads
* Medical history
* Prescriptions
* Vaccinations

---

## Health Schemes Module

Responsible for

* Government schemes
* Eligibility
* Search

---

## AI Module

Responsible for communication with FastAPI.

Responsibilities

* Send prompts
* Receive responses
* Store conversations
* AI request validation

The AI module never communicates directly with Gemini.

Only FastAPI does.

---

## Health Module

Simple monitoring endpoints.

Example

```
GET /health
```

Returns

* Database status
* Redis status
* AI service status

---

# Request Lifecycle

```text
Client

↓

Controller

↓

Validation

↓

Guard

↓

Service

↓

Prisma

↓

Database

↓

Response
```

Controllers should never contain business logic.

Services should never know about HTTP.

---

# Configuration Flow

```text
.env

↓

ConfigModule

↓

Configuration Service

↓

Business Modules
```

No module should access process.env directly.

---

# Error Handling

Use global exception filters.

Common responses

```
400 Bad Request

401 Unauthorized

403 Forbidden

404 Not Found

409 Conflict

422 Validation Error

500 Internal Server Error
```

Every response follows the same structure.

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": []
}
```

---

# Validation

Use

* class-validator
* class-transformer

Validation happens before controllers execute.

Never validate inside services.

---

# Logging

Use NestJS Logger during MVP.

Log

* Startup
* Errors
* Authentication
* AI Requests
* Database failures

Avoid logging

* Passwords
* Tokens
* Medical records
* Personal identifiers

---

# AI Integration

The backend communicates only with FastAPI.

```text
Mobile

↓

NestJS

↓

FastAPI

↓

Gemini
```

Responsibilities

NestJS

* Authentication
* Rate limiting
* Conversation storage
* Request validation

FastAPI

* Prompt engineering
* AI orchestration
* Model communication
* Response formatting

---

# Offline Strategy

Backend remains stateless.

The mobile application stores

* Cached schemes
* Cached conversations
* Pending uploads

When internet returns

```
Mobile

↓

Sync Queue

↓

NestJS

↓

Database
```

---

# Security

Authentication

* JWT
* Refresh Token

Authorization

* Guards
* Roles

Validation

* DTO validation

Future

* OTP
* Device verification

---

# Performance

For MVP

* Pagination
* Database indexes
* Redis caching (selected endpoints)

Avoid premature optimization.

---

# Future Expansion

The architecture supports adding

* Doctor Portal
* Admin Dashboard
* Appointment Booking
* Notifications
* Payments
* Telemedicine
* Analytics

without changing the existing folder structure.

---

# Development Rules

1. Business logic belongs in services.

2. Controllers should remain thin.

3. DTOs validate every request.

4. One feature = one module.

5. Never access Prisma from controllers.

6. Never access environment variables directly.

7. Every module owns its own responsibilities.

8. AI communication always goes through FastAPI.

9. Shared utilities belong in `common/`.

10. Keep the architecture simple until the MVP is complete.

---

# MVP Module Dependency Diagram

```text
                  AppModule
                      │
      ┌───────────────┼───────────────┐
      │               │               │
   AuthModule     UsersModule    HealthModule
      │               │
      ├───────────────┼──────────────┐
      │               │              │
Patients      MedicalRecords    Consultations
                                      │
                                      │
                                 AIModule
                                      │
                                 FastAPI Service
```

---

# Architecture Decisions

| Decision              | Reason                      |
| --------------------- | --------------------------- |
| Feature-first modules | Easier to scale             |
| NestJS                | Strong modular architecture |
| Prisma                | Type-safe ORM               |
| PostgreSQL            | Relational healthcare data  |
| Redis                 | Caching and future sessions |
| FastAPI               | Dedicated AI orchestration  |
| JWT                   | Stateless authentication    |
| REST API              | Simpler MVP implementation  |
| Turborepo             | Shared development workflow |

---

# Conclusion

This architecture is intentionally optimized for the MVP. It provides a clean separation of concerns, supports future growth, and avoids unnecessary complexity while allowing the team to build features rapidly.
