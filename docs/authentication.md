# Authentication Architecture

## AI Rural Health Assistant

**Version:** MVP v1.0

**Framework:** NestJS

**Authentication:** Phone OTP + Google OAuth

**Authorization:** JWT

---

# Purpose

This document defines the authentication and authorization architecture for the AI Rural Health Assistant MVP.

The goals are:

* Passwordless authentication
* Secure JWT-based authorization
* Simple onboarding
* Support multiple devices
* Future-ready for OTP providers and ABHA integration

---

# Authentication Overview

The application supports two authentication methods.

## Primary

* Phone Number + OTP

## Secondary

* Google OAuth

Both authentication methods ultimately issue the same JWT access token and refresh token.

---

# Authentication Flow

```text
                 User

        ┌────────┴─────────┐
        │                  │
        ▼                  ▼

   Phone OTP         Google OAuth

        │                  │
        └──────────┬───────┘
                   ▼

          User Verification

                   ▼

          JWT + Refresh Token

                   ▼

          Protected Endpoints
```

---

# Authentication Providers

| Provider     | MVP | Future |
| ------------ | --- | ------ |
| Phone OTP    | Yes | Yes    |
| Google OAuth | Yes | Yes    |
| ABHA Login   | No  | Yes    |
| DigiLocker   | No  | Yes    |

---

# Login Flow

## Phone Authentication

```text
User

↓

Enter Phone Number

↓

Request OTP

↓

SMS Provider

↓

User enters OTP

↓

Backend verifies OTP

↓

Find existing user

↓

If not found

Create User

Create Patient Profile

↓

Generate JWT

↓

Generate Refresh Token

↓

Return Tokens
```

---

## Google Authentication

```text
User

↓

Google Sign In

↓

Google returns ID Token

↓

Mobile sends ID Token

↓

NestJS verifies token

↓

Find existing user

↓

If not found

Create User

Create Patient Profile

↓

Generate JWT

↓

Generate Refresh Token

↓

Return Tokens
```

---

# JWT Strategy

## Access Token

Purpose

* Authenticate API requests

Lifetime

```text
15 Minutes
```

Contains

* User ID
* Role
* Token Version

Used for

```http
Authorization: Bearer <token>
```

---

## Refresh Token

Purpose

Generate a new access token without requiring the user to log in again.

Lifetime

```text
30 Days
```

Stored

* Database (hashed)
* Secure device storage on the mobile application

Refresh tokens are rotated after every successful refresh request.

---

# Token Lifecycle

```text
Login

↓

Access Token (15 min)

↓

Expired

↓

Refresh Token

↓

New Access Token

↓

Continue Session
```

If the refresh token is invalid or revoked:

```text
Logout

↓

Login Required
```

---

# Authorization

Authentication verifies **who** the user is.

Authorization determines **what** the user is allowed to access.

The MVP uses Role-Based Access Control (RBAC).

---

# Roles

## PATIENT

Permissions

* View own profile
* Update own profile
* Upload medical records
* View medical records
* Use AI assistant
* Browse government schemes
* View nearby health centers

---

## ADMIN

Permissions

Everything available to a patient, plus:

* Manage government schemes
* Manage health centers
* View system health
* Manage users (future)

---

# JWT Payload

Example payload:

```json
{
  "sub": "user_uuid",
  "role": "PATIENT",
  "tokenVersion": 1
}
```

Claims:

| Claim        | Description                 |
| ------------ | --------------------------- |
| sub          | User ID                     |
| role         | User Role                   |
| tokenVersion | Used for token invalidation |

Sensitive user data should **never** be stored in the JWT.

---

# Protected Routes

Require JWT Authentication:

* User Profile
* Patient Profile
* Medical Records
* AI Chat
* Logout

Public Routes:

* Send OTP
* Verify OTP
* Google OAuth
* Government Schemes
* Health Centers
* Health Check

---

# Guards

The backend will use NestJS Guards.

## JwtAuthGuard

Responsibilities

* Validate JWT
* Extract user
* Reject invalid tokens

Applied to all protected routes.

---

## RolesGuard

Responsibilities

* Check required role
* Prevent unauthorized access

Initially used only for Admin endpoints.

---

# OTP Verification

OTP codes are **never** stored in plain text.

Workflow:

```text
Generate OTP

↓

Hash OTP

↓

Store Hash

↓

Send SMS

↓

Verify User Input

↓

Compare Hash

↓

Delete or Expire OTP
```

---

# OTP Rules

Length

```text
6 Digits
```

Expiration

```text
5 Minutes
```

Maximum Attempts

```text
5 Attempts
```

Maximum Resend Requests

```text
3 Requests per 15 Minutes
```

Rate limiting should be applied to prevent abuse.

---

# Refresh Token Storage

Refresh tokens are stored as **hashed values** in the database.

Fields:

* User ID
* Token Hash
* Expiration Time
* Revoked At
* Created At

Raw refresh tokens should never be persisted.

---

# Logout Flow

```text
User

↓

Logout Request

↓

Delete / Revoke Refresh Token

↓

Client Deletes Access Token

↓

Session Ends
```

---

# Session Management

One user can have multiple active sessions.

Example:

```text
User

├── Android Phone

├── iPhone

└── Tablet
```

Each session has its own refresh token.

Logging out from one device does not affect the others.

---

# Google Account Linking

Future enhancement:

If a user registers with a phone number and later signs in with Google using the same verified email, the accounts can be linked after explicit user confirmation.

This feature is **not included in the MVP**.

---

# Security Measures

## Passwordless Authentication

No passwords are stored.

This removes:

* Password reset flows
* Password reuse risks
* Password storage concerns

---

## Rate Limiting

Apply limits to:

* OTP generation
* OTP verification
* Login attempts
* Refresh endpoint

---

## HTTPS

All authentication traffic must use HTTPS.

No tokens should ever be transmitted over unsecured connections.

---

## Secure Token Storage

On the mobile application:

* Access Token
* Refresh Token

should be stored using secure platform storage (e.g. Expo SecureStore or the platform's secure keychain/keystore), not AsyncStorage.

---

## Input Validation

Validate:

* Phone number format
* Google ID Token
* JWT structure
* Refresh Token
* OTP format

All validation should occur before business logic executes.

---

# Error Responses

Examples:

```http
400 Bad Request
```

```json
{
  "success": false,
  "message": "Invalid phone number"
}
```

---

```http
401 Unauthorized
```

```json
{
  "success": false,
  "message": "Invalid or expired token"
}
```

---

```http
429 Too Many Requests
```

```json
{
  "success": false,
  "message": "Too many OTP requests. Please try again later."
}
```

---

# Future Enhancements

The authentication architecture is designed to support:

* ABHA Login
* DigiLocker Login
* Device Registration
* Push Notification Tokens
* Biometric Authentication
* Trusted Devices
* Session History
* Account Recovery
* MFA (Multi-Factor Authentication)

These are intentionally excluded from the MVP.

---

# Design Decisions

| Decision               | Reason                                |
| ---------------------- | ------------------------------------- |
| Phone OTP              | Simpler onboarding for rural users    |
| Google OAuth           | Convenient alternative sign-in        |
| Passwordless           | Reduced security burden and better UX |
| JWT Access Token       | Stateless authentication              |
| Refresh Token Rotation | Improved session security             |
| RBAC                   | Simple authorization model            |
| Hashed OTP Storage     | Prevent OTP leakage                   |
| Hashed Refresh Tokens  | Protect active sessions               |
| Multiple Sessions      | Better user experience across devices |

---

# Conclusion

The authentication architecture prioritizes ease of use, security, and scalability. Phone number OTP serves as the primary authentication method for accessibility, while Google OAuth provides an alternative sign-in option. JWT access tokens and rotating refresh tokens secure API access, and the overall design remains simple enough for an MVP while supporting future expansion into more advanced healthcare identity systems such as ABHA.
