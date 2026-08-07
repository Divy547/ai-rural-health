# AI Rural Health Assistant

> An AI-powered, multilingual, offline-first healthcare platform designed to improve healthcare accessibility for rural communities.

---

## Overview

AI Rural Health Assistant is a mobile-first healthcare platform that combines Artificial Intelligence, government healthcare information, and digital health records into a single application.

The primary objective is to provide rural citizens with reliable healthcare guidance, simplify access to government health schemes, and maintain a secure digital health profile while remaining usable in low-connectivity environments.

This project is being developed as a hackathon MVP with a production-oriented architecture to ensure future scalability.

---

# Problem Statement

Millions of people living in rural areas face challenges such as:

* Limited access to healthcare professionals
* Lack of awareness of government healthcare schemes
* Poor internet connectivity
* Difficulty maintaining medical records
* Language barriers
* Long travel distances to healthcare facilities

AI Rural Health Assistant aims to bridge these gaps using Artificial Intelligence and modern cloud technologies.

---

# Objectives

* Provide AI-powered healthcare assistance
* Support multiple Indian languages
* Enable low-bandwidth and offline usage
* Digitize personal medical records
* Recommend relevant government healthcare schemes
* Assist users in locating nearby healthcare centers
* Maintain a secure and scalable backend architecture

---

# MVP Features

## Authentication

* JWT Authentication
* Refresh Tokens
* Secure Session Management

---

## AI Health Assistant

* Symptom guidance
* Health-related Q&A
* General healthcare education
* Government scheme recommendations
* Medical information retrieval

> The AI assistant is informational only and does not replace professional medical advice.

---

## Medical Records

* Personal profile
* Health history
* Uploaded documents
* Vaccination information
* Prescriptions

---

## Government Health Schemes

* Browse schemes
* Eligibility information
* Required documents
* Benefits
* Search functionality

---

## Nearby Healthcare Centers

* Hospitals
* PHCs
* Clinics
* Emergency contacts

---

## Offline Support

* Cached health schemes
* Cached conversations
* Local medical profile
* Offline-first architecture

---

# Tech Stack

## Monorepo

* Turborepo
* pnpm Workspaces

---

## Mobile

* React Native
* Expo
* TypeScript

---

## Backend

* NestJS
* Prisma ORM
* PostgreSQL
* Redis

---

## AI Service

* FastAPI
* Python
* Gemini API
* Future support for local models

---

## Shared

* TypeScript
* Shared Types

---

## Infrastructure

* Docker
* Docker Compose

---

# Repository Structure

```text
ai-rural-health/

├── apps/
│   ├── backend/
│   ├── mobile/
│   ├── ai-service/
│   └── web/
│
├── packages/
│   ├── shared-types/
│   ├── shared-schemas/
│   ├── tsconfig/
│   └── eslint-config/
│
├── docker/
├── docs/
├── scripts/
│
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
└── README.md
```

---

# Architecture

```text
                Mobile App
                     │
                     │
             REST API (HTTPS)
                     │
              NestJS Backend
        ┌────────────┴────────────┐
        │                         │
 PostgreSQL                  FastAPI AI
        │                         │
        │                     Gemini API
        │
      Redis
```

---

# Development Workflow

## Install

```bash
pnpm install
```

---

## Run Development

```bash
pnpm dev
```

Starts:

* Backend
* Mobile

---

## Build

```bash
pnpm build
```

---

## Lint

```bash
pnpm lint
```

---

## Test

```bash
pnpm test
```

---

# Environment Variables

Create a `.env` file using the following template.

```env
DATABASE_URL=

REDIS_URL=

JWT_SECRET=

AI_SERVICE_URL=

GEMINI_API_KEY=
```

---

# Team Structure

## Backend & Full Stack

Responsibilities

* Backend Architecture
* API Development
* Database Design
* Authentication
* Integration
* DevOps
* Infrastructure

---

## AI Engineer

Responsibilities

* FastAPI
* AI Pipelines
* Prompt Engineering
* Model Integration
* Medical Knowledge Processing

---

# Project Documentation

Project documentation is located inside the `docs/` directory.

* Backend Architecture
* Database Design
* API Specification
* Authentication
* Workflows
* Deployment
* Architecture Decisions

---

# Design Principles

* Mobile First
* Offline First
* API First
* Security by Default
* Modular Architecture
* Clean Code
* Scalable Design

---

# Non-Goals (MVP)

The following are intentionally excluded from the MVP:

* Video Consultation
* Appointment Booking
* Real-time Notifications
* Payment Gateway
* Admin Dashboard
* Analytics Dashboard
* Machine Learning Training Pipeline

These features may be introduced in future versions.

---

# Roadmap

## Phase 1

* Monorepo
* Backend Foundation
* Authentication
* Database
* Mobile Setup

---

## Phase 2

* AI Chat
* Medical Records
* Government Schemes
* Health Center Discovery

---

## Phase 3

* Offline Synchronization
* AI Improvements
* Security Hardening
* Performance Optimization

---

# Security

* JWT Authentication
* Password Hashing
* Role-Based Access Control
* Input Validation
* Rate Limiting
* Secure Environment Variables

---

# License

This project is currently intended for educational, research, and hackathon purposes.

---

# Disclaimer

AI Rural Health Assistant is designed to provide educational health information and assistance. It is **not** a replacement for qualified medical professionals, diagnosis, or emergency medical services. Users should always consult licensed healthcare providers for medical decisions.

---

# Contributors

Backend & Full Stack Engineering

* Project Architecture
* Backend Development
* Database Design
* DevOps
* Integration

AI Engineering

* AI Services
* FastAPI
* Prompt Engineering
* AI Integration

---

Built with the goal of making quality healthcare information more accessible to underserved communities through responsible use of AI.
