# Database Design

## AI Rural Health Assistant

**Version:** MVP v1.0

**Database:** PostgreSQL

**ORM:** Prisma

---

# Purpose

This document defines the database architecture for the MVP.

Goals:

* Keep the schema normalized
* Support future expansion
* Avoid unnecessary tables
* Keep queries simple
* Maintain data integrity

---

# Database Overview

The backend stores:

* User accounts
* Patient profiles
* Medical records
* AI consultations
* Government health schemes
* Uploaded documents

Redis is used only for caching and temporary data.

---

# Database Technology

| Component   | Choice         |
| ----------- | -------------- |
| Database    | PostgreSQL     |
| ORM         | Prisma         |
| ID Strategy | UUID           |
| Migrations  | Prisma Migrate |
| Seeding     | Prisma Seed    |

---

# Entity Relationship Diagram

```text
User
 │
 ├───────────┐
 │           │
 │           │
 ▼           ▼
Patient   RefreshToken
 │
 ├───────────────┐
 │               │
 ▼               ▼
MedicalRecord  Consultation
                   │
                   ▼
               ChatMessage

GovernmentScheme
```

---

# Core Entities

## User

Represents an authenticated application user.

### Fields

| Field        | Type      |
| ------------ | --------- |
| id           | UUID      |
| fullName     | String    |
| email        | String    |
| phone        | String    |
| passwordHash | String    |
| role         | Enum      |
| isVerified   | Boolean   |
| createdAt    | Timestamp |
| updatedAt    | Timestamp |

### Relationships

* One User → One Patient
* One User → Many Refresh Tokens

---

## Patient

Stores healthcare-related profile information.

### Fields

| Field            | Type      |
| ---------------- | --------- |
| id               | UUID      |
| userId           | UUID      |
| age              | Integer   |
| gender           | Enum      |
| bloodGroup       | String    |
| height           | Float     |
| weight           | Float     |
| allergies        | Text      |
| emergencyContact | String    |
| createdAt        | Timestamp |

### Relationships

* Belongs to User
* Has Many Medical Records
* Has Many Consultations

---

## RefreshToken

Stores active login sessions.

### Fields

| Field     | Type      |
| --------- | --------- |
| id        | UUID      |
| userId    | UUID      |
| token     | String    |
| expiresAt | Timestamp |
| createdAt | Timestamp |

Purpose

* Refresh JWTs
* Logout support
* Multiple device sessions

---

## MedicalRecord

Stores uploaded medical history.

### Fields

| Field       | Type      |
| ----------- | --------- |
| id          | UUID      |
| patientId   | UUID      |
| title       | String    |
| description | Text      |
| documentUrl | String    |
| recordType  | Enum      |
| uploadedAt  | Timestamp |

Examples

* Prescription
* Blood Test
* X-Ray
* Vaccination
* Medical Report

---

## Consultation

Stores AI consultation sessions.

### Fields

| Field     | Type      |
| --------- | --------- |
| id        | UUID      |
| patientId | UUID      |
| summary   | Text      |
| createdAt | Timestamp |
| updatedAt | Timestamp |

Each consultation contains multiple chat messages.

---

## ChatMessage

Stores conversation history.

### Fields

| Field          | Type      |
| -------------- | --------- |
| id             | UUID      |
| consultationId | UUID      |
| sender         | Enum      |
| message        | Text      |
| timestamp      | Timestamp |

Sender values

* USER
* AI

---

## GovernmentScheme

Stores healthcare scheme information.

### Fields

| Field        | Type      |
| ------------ | --------- |
| id           | UUID      |
| title        | String    |
| description  | Text      |
| eligibility  | Text      |
| benefits     | Text      |
| officialLink | String    |
| lastUpdated  | Timestamp |

Initially populated through seed scripts.

---

# Enums

## UserRole

```text
PATIENT

ADMIN
```

Future

```text
DOCTOR

ASHA_WORKER
```

---

## Gender

```text
MALE

FEMALE

OTHER
```

---

## RecordType

```text
PRESCRIPTION

LAB_REPORT

VACCINATION

XRAY

OTHER
```

---

## MessageSender

```text
USER

AI
```

---

# Relationships

## One-to-One

```text
User

↓

Patient
```

---

## One-to-Many

```text
User

↓

Refresh Tokens
```

---

```text
Patient

↓

Medical Records
```

---

```text
Patient

↓

Consultations
```

---

```text
Consultation

↓

Chat Messages
```

---

# Indexes

## User

* email (Unique)
* phone (Unique)

---

## Patient

* userId

---

## MedicalRecord

* patientId

---

## Consultation

* patientId

---

## ChatMessage

* consultationId

---

## GovernmentScheme

* title

---

# Naming Conventions

Tables

```text
PascalCase Model

snake_case Database
```

Example

```text
MedicalRecord

↓

medical_records
```

Columns

```text
camelCase
```

Primary Keys

```text
id
```

Foreign Keys

```text
userId

patientId

consultationId
```

---

# Soft Delete Strategy

MVP

No soft deletes.

Hard deletes only where appropriate.

Future

Add

```text
deletedAt
```

to entities requiring audit history.

---

# Audit Fields

Most entities include

```text
createdAt

updatedAt
```

Future

```text
deletedAt

createdBy

updatedBy
```

---

# File Storage

Database stores

```text
documentUrl
```

Actual files are stored separately.

MVP

* Local storage or cloud object storage

Future

* MinIO
* S3

---

# Seed Data

Initial seed

* Government Health Schemes

Future

* States
* Districts
* Hospitals
* Languages

---

# Data Validation Rules

Email

* Unique

Phone

* Unique

Password

* Never stored in plain text

Medical documents

* URL only
* File validation handled by backend

---

# Future Database Expansion

Additional entities planned after MVP

```text
Doctor

Appointment

Hospital

Notification

Medication

Reminder

EmergencyContact

Feedback

AuditLog

Device

OfflineSyncQueue
```

These are intentionally excluded from the MVP to keep the schema focused and implementation manageable.

---

# MVP Database Summary

| Entity           | Purpose              |
| ---------------- | -------------------- |
| User             | Authentication       |
| Patient          | Health profile       |
| RefreshToken     | Session management   |
| MedicalRecord    | Health documents     |
| Consultation     | AI conversations     |
| ChatMessage      | Conversation history |
| GovernmentScheme | Scheme information   |

---

# Design Decisions

| Decision                   | Reason                                |
| -------------------------- | ------------------------------------- |
| PostgreSQL                 | Strong relational support             |
| Prisma                     | Type-safe ORM                         |
| UUID IDs                   | Secure and scalable                   |
| Separate Patient table     | Keeps auth separate from health data  |
| Separate ChatMessage table | Supports long conversations           |
| GovernmentScheme table     | Enables offline caching and searching |
| RefreshToken table         | Secure multi-device authentication    |

---

# Conclusion

The MVP database focuses only on the data required to deliver core functionality. The schema is intentionally minimal while providing a clear path for future features without requiring major structural changes.
