# API Specification

## AI Rural Health Assistant

**Version:** MVP v1.0

**Architecture:** REST API

**Framework:** NestJS

**Base URL:** `/api/v1`

---

# Overview

This document defines the REST API for the AI Rural Health Assistant MVP.

## API Principles

* RESTful
* Versioned
* Stateless
* JWT Authentication
* OTP-first Authentication
* Google OAuth Support
* Standard Response Format
* Feature-based modules

---

# Authentication Strategy

The application supports two authentication methods:

### Primary

* Phone Number + OTP

### Secondary

* Google OAuth

Both methods issue:

* JWT Access Token
* Refresh Token

No passwords are stored in the system.

---

# Standard Response Format

## Success

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

## Error

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": []
}
```

---

# Authentication Header

```http
Authorization: Bearer <access_token>
```

---

# Module Summary

| Module             | Endpoints |
| ------------------ | --------: |
| Authentication     |         7 |
| Users              |         2 |
| Patient Profile    |         2 |
| Medical Records    |         5 |
| AI Chat            |         5 |
| Government Schemes |         2 |
| Health Centers     |         2 |
| Health             |         1 |

**Total MVP Endpoints: 26**

---

# Authentication Module

---

## Send OTP

```http
POST /auth/phone/send-otp
```

### Purpose

Send a one-time password to a mobile number.

Authentication

* Not Required

Request

```json
{
  "phone": "+919876543210"
}
```

Response

```json
{
  "success": true,
  "message": "OTP sent successfully"
}
```

Database

* OtpVerification

Possible Errors

* 400 Invalid Phone
* 429 Too Many Requests

---

## Verify OTP

```http
POST /auth/phone/verify-otp
```

### Purpose

Verify the OTP and authenticate the user.

If the phone number is new:

* Create User
* Create Patient Profile
* Create Refresh Token
* Return JWT

If the phone number already exists:

* Create Refresh Token
* Return JWT

Authentication

* Not Required

Request

```json
{
  "phone": "+919876543210",
  "otp": "123456"
}
```

Response

```json
{
  "accessToken": "",
  "refreshToken": "",
  "user": {}
}
```

Database

* OtpVerification
* User
* PatientProfile
* RefreshToken

Errors

* 400 Invalid OTP
* 401 OTP Expired
* 429 Too Many Attempts

---

## Google Login

```http
POST /auth/oauth/google
```

### Purpose

Authenticate using Google Sign-In.

The mobile app sends the Google ID Token to the backend.

Request

```json
{
  "idToken": ""
}
```

Response

```json
{
  "accessToken": "",
  "refreshToken": "",
  "user": {}
}
```

Database

* User
* PatientProfile
* RefreshToken

---

## Refresh Token

```http
POST /auth/refresh
```

Authentication

* Refresh Token

Response

```json
{
  "accessToken": "",
  "refreshToken": ""
}
```

Database

* RefreshToken

---

## Logout

```http
POST /auth/logout
```

Authentication

* Required

Purpose

Invalidate the current refresh token.

Database

* RefreshToken

---

## Current User

```http
GET /auth/me
```

Authentication

* Required

Returns

Current authenticated user.

---

## Check Authentication

```http
GET /auth/status
```

Authentication

* Required

Returns

```json
{
  "authenticated": true
}
```

---

# User Module

---

## Update User

```http
PATCH /users/profile
```

Authentication

* Required

Request

```json
{
  "fullName": "",
  "preferredLanguage": ""
}
```

Database

* User

---

## Delete User

```http
DELETE /users/profile
```

Authentication

* Required

---

# Patient Profile

---

## Get Profile

```http
GET /patient/profile
```

Authentication

* Required

Database

* PatientProfile

---

## Update Profile

```http
PATCH /patient/profile
```

Request

```json
{
  "dob": "",
  "gender": "",
  "bloodGroup": "",
  "allergies": "",
  "emergencyContact": "",
  "address": ""
}
```

Database

* PatientProfile

---

# Medical Records

---

## Upload Record

```http
POST /medical-records
```

Authentication

* Required

Content Type

```
multipart/form-data
```

Database

* MedicalRecord

---

## List Records

```http
GET /medical-records
```

Authentication

* Required

Returns

Patient medical history.

---

## Get Record

```http
GET /medical-records/:id
```

Authentication

* Required

---

## Update Record

```http
PATCH /medical-records/:id
```

Authentication

* Required

---

## Delete Record

```http
DELETE /medical-records/:id
```

Authentication

* Required

---

# AI Chat

---

## Create Session

```http
POST /ai/chat/sessions
```

Authentication

* Required

Creates a new AI conversation.

Database

* ChatSession

---

## List Sessions

```http
GET /ai/chat/sessions
```

Returns

Conversation history.

---

## Get Session

```http
GET /ai/chat/sessions/:id
```

Returns

Complete conversation.

Database

* ChatSession
* ChatMessage

---

## Send Message

```http
POST /ai/chat/messages
```

Authentication

* Required

Request

```json
{
  "sessionId": "",
  "message": ""
}
```

Backend Flow

```text
Mobile
    ↓
NestJS
    ↓
FastAPI
    ↓
Gemini
    ↓
FastAPI
    ↓
NestJS
    ↓
Database
    ↓
Response
```

Database

* ChatMessage

---

## Delete Session

```http
DELETE /ai/chat/sessions/:id
```

Authentication

* Required

Database

* ChatSession
* ChatMessage

---

# Government Schemes

---

## List Schemes

```http
GET /government-schemes
```

Authentication

* Optional

Query Parameters

```
?page=
&limit=
&search=
```

Database

* GovernmentScheme

---

## Scheme Details

```http
GET /government-schemes/:id
```

Authentication

* Optional

---

# Health Centers

---

## Nearby Centers

```http
GET /health-centers/nearby
```

Authentication

* Optional

Query Parameters

```
latitude
longitude
radius
```

Returns

* PHCs
* Hospitals
* Clinics

---

## Center Details

```http
GET /health-centers/:id
```

Authentication

* Optional

---

# Health Module

---

## Health Check

```http
GET /health
```

Authentication

* Not Required

Response

```json
{
  "database": "healthy",
  "redis": "healthy",
  "aiService": "healthy"
}
```

---

# HTTP Status Codes

| Code | Meaning               |
| ---- | --------------------- |
| 200  | Success               |
| 201  | Created               |
| 204  | Deleted               |
| 400  | Bad Request           |
| 401  | Unauthorized          |
| 403  | Forbidden             |
| 404  | Not Found             |
| 409  | Conflict              |
| 422  | Validation Failed     |
| 429  | Too Many Requests     |
| 500  | Internal Server Error |

---

# Authentication Matrix

| Endpoint            | Authentication |
| ------------------- | -------------- |
| Send OTP            | None           |
| Verify OTP          | None           |
| Google Login        | None           |
| Refresh Token       | Refresh Token  |
| Logout              | JWT            |
| Current User        | JWT            |
| User APIs           | JWT            |
| Patient APIs        | JWT            |
| Medical Record APIs | JWT            |
| AI APIs             | JWT            |
| Government Schemes  | Optional       |
| Health Centers      | Optional       |
| Health Check        | None           |

---

# Future Endpoints (Post-MVP)

These are intentionally excluded from the MVP:

* Appointment Booking
* Doctor Portal
* Admin Dashboard
* Push Notifications
* Emergency SOS
* ABHA Integration
* DigiLocker Integration
* Telemedicine
* Analytics
* Feedback System

---

# API Design Decisions

* OTP-first authentication
* Google OAuth support
* JWT Access Tokens
* Refresh Token rotation
* Thin controllers
* DTO validation
* Feature-based modules
* FastAPI isolated behind NestJS
* REST architecture
* Versioned API (`/api/v1`)
* Pagination on list endpoints
* Consistent response format

---

# Conclusion

The MVP exposes **26 REST endpoints** covering authentication, patient management, medical records, AI-assisted consultations, government health schemes, nearby health centers, and system health. The API is intentionally compact, making it realistic to implement within the hackathon timeline while leaving a clean path for future expansion.
