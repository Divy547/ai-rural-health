# AI Rural Health — Mobile Development Setup

This document is the setup guide for the **AI Rural Health mobile application**.

The mobile application is built using:

* Expo
* React Native
* TypeScript
* Expo Router
* pnpm
* Turborepo
* Node.js 22

The mobile application already exists inside the monorepo at:

```text
apps/mobile
```

**Do not create a new Expo project.**

The goal of this guide is to get a new developer from:

```text
Fresh machine
    ↓
Clone repository
    ↓
Node 22
    ↓
Install dependencies
    ↓
Run existing Expo app
    ↓
Verify Android/mobile development
    ↓
Create frontend branch
    ↓
Start feature development
```

---

# 1. Project Structure

The repository is already configured as a monorepo.

Current high-level structure:

```text
ai-rural-health/
│
├── apps/
│   ├── backend/
│   └── mobile/
│
├── packages/
│   ├── shared-types/
│   └── tsconfig/
│
├── docs/
├── docker/
├── scripts/
│
├── .nvmrc
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── turbo.json
└── README.md
```

The mobile application is:

```text
apps/mobile/
```

The backend is:

```text
apps/backend/
```

Shared packages are:

```text
packages/
```

The frontend developer should primarily work inside:

```text
apps/mobile/
```

Do not modify backend code unless explicitly coordinated with the backend developer.

---

# 2. Required Versions

This project uses:

```text
Node.js 22
pnpm
```

The repository contains:

```text
.nvmrc
```

The `.nvmrc` file is the source of truth for the Node.js version.

**Do not use Node 24 for this project.**

---

# 3. Install Git

Verify Git:

```bash
git --version
```

If Git is not installed, install it using your operating system's package manager.

---

# 4. Install NVM

This project uses NVM to manage Node.js versions.

Check whether NVM is already installed:

```bash
nvm --version
```

If this works, continue to the next section.

If it does not work, install NVM from the official NVM project documentation.

After installing NVM, restart your terminal.

Then verify:

```bash
nvm --version
```

---

# 5. Clone the Repository

Choose the directory where you keep your projects.

Clone the repository:

```bash
git clone https://github.com/Divy547/ai-rural-health.git
```

Example:

```bash
git clone https://github.com/<organization>/ai-rural-health.git
```

Enter the repository:

```bash
cd ai-rural-health
```

Verify:

```bash
git status
```

You should see something similar to:

```text
On branch main
nothing to commit, working tree clean
```

---

# 6. Switch to Node.js 22

This project contains a `.nvmrc` file.

From the repository root, run:

```bash
nvm use
```

NVM should automatically read:

```text
.nvmrc
```

and select the required Node.js version.

Verify:

```bash
node --version
```

It should report Node 22.x.x.

For example:

```text
v22.x.x
```

If Node 22 is not installed, install it:

```bash
nvm install 22
```

Then:

```bash
nvm use 22
```

Verify again:

```bash
node --version
```

---

# 7. Important Node Version Rule

Before running project commands, always make sure you are using the repository's Node version.

From the repository root:

```bash
nvm use
```

Then:

```bash
node --version
```

Do not switch to another Node version while working on this project unless the team explicitly changes `.nvmrc`.

---

# 8. Install pnpm

Check:

```bash
pnpm --version
```

If pnpm is already installed, continue.

If it is not installed:

```bash
npm install -g pnpm
```

Then verify:

```bash
pnpm --version
```

Use the project's existing `pnpm-lock.yaml`.

Do not use npm to install project dependencies.

Do not create a new `package-lock.json`.

---

# 9. Verify the Monorepo

From the repository root:

```bash
pwd
```

You should be inside:

```text
ai-rural-health
```

Check:

```bash
ls
```

You should see files/directories similar to:

```text
apps
packages
docs
docker
scripts
.nvmrc
package.json
pnpm-lock.yaml
pnpm-workspace.yaml
turbo.json
```

Verify the mobile application exists:

```bash
ls apps/mobile
```

You should see files such as:

```text
app.json
package.json
tsconfig.json
src
assets
eas.json
```

---

# 10. DO NOT Create a New Expo Project

The repository already contains:

```text
apps/mobile
```

Therefore, **DO NOT run**:

```bash
pnpm create expo-app mobile
```

Do not run:

```bash
npx create-expo-app
```

Do not delete the existing:

```text
apps/mobile
```

The existing Expo project is the project we are developing.

---

# 11. Install Monorepo Dependencies

From the repository root:

```bash
pnpm install
```

This should use:

```text
pnpm-lock.yaml
```

and install dependencies for the workspace.

Do not run:

```bash
npm install
```

at the repository root.

Do not delete:

```text
pnpm-lock.yaml
```

---

# 12. Verify the Mobile Package

Move into the mobile application:

```bash
cd apps/mobile
```

Check the package:

```bash
cat package.json
```

You should see the existing Expo/React Native dependencies.

Do not modify dependencies yet.

First verify that the existing application runs.

---

# 13. Start the Existing Expo Application

From:

```text
apps/mobile
```

run the existing Expo development command defined by the mobile package.

First inspect the available scripts:

```bash
pnpm run
```

Look for the Expo/start script.

If the project uses the standard Expo command, run:

```bash
pnpm expo start
```

If the project's `package.json` defines a `start` script, use:

```bash
pnpm start
```

Use the script already configured by the repository rather than inventing a new one.

---

# 14. Expected Expo Output

A successful Expo start should display something similar to:

```text
Metro waiting on ...
```

and provide options such as:

```text
› Press a │ open Android
› Press w │ open web
```

A QR code should also be displayed.

At this point, the Expo development server is running.

---

# 15. Test Using Expo Go

For physical Android development, install:

```text
Expo Go
```

on the Android device.

Make sure:

* The computer and phone are on the same network.
* The Expo development server is running.
* The QR code is visible in the terminal.

Scan the QR code using Expo Go.

The existing application should open.

---

# 16. Android Emulator

If Android Studio and an Android emulator are already configured:

Start the emulator.

Then from:

```text
apps/mobile
```

run:

```bash
pnpm expo start
```

Press:

```text
a
```

in the Expo terminal.

Expo should open the application in the Android emulator.

---

# 17. Web Verification

For a quick development sanity check:

```bash
pnpm expo start --web
```

The application should open in a browser.

The primary target is still:

```text
Android / React Native
```

Do not optimize the application around web behavior unless explicitly required.

---

# 18. Verify the Existing Project Before Making Changes

Before changing any code, verify all of the following.

## Node

```bash
node --version
```

Must be:

```text
22.x.x
```

## pnpm

```bash
pnpm --version
```

Must work.

## Repository

```bash
git status
```

Must work.

## Mobile project

```bash
ls apps/mobile
```

Must show the existing Expo project.

## Expo

From `apps/mobile`:

```bash
pnpm expo start
```

Must successfully start Metro/Expo.

## Device

The application must successfully open on either:

```text
Physical Android device
```

or:

```text
Android emulator
```

Do not start major feature development until the existing application successfully runs.

---

# 19. Create Your Frontend Branch

After verifying the existing application, return to the repository root:

```bash
cd ../..
```

Verify:

```bash
pwd
```

You should be at:

```text
ai-rural-health
```

Make sure the working tree is clean:

```bash
git status
```

Update your local main branch:

```bash
git pull origin main
```

If the team is using `develop` as the integration branch, use:

```bash
git pull origin develop
```

Then create your frontend branch.

Example:

```bash
git checkout -b feature/mobile-foundation
```

Verify:

```bash
git branch
```

You should see:

```text
* feature/mobile-foundation
```

---

# 20. Frontend Ownership

Your primary working directory is:

```text
apps/mobile/
```

The backend developer's primary working directory is:

```text
apps/backend/
```

Shared packages are:

```text
packages/
```

Do not modify shared packages without coordinating with the backend developer if the change affects API contracts.

---

# 21. Current Mobile Structure

The existing application currently contains:

```text
apps/mobile/
│
├── assets/
│
├── scripts/
│
├── src/
│   ├── app/
│   │   ├── _layout.tsx
│   │   ├── explore.tsx
│   │   └── index.tsx
│   │
│   ├── components/
│   │   ├── ui/
│   │   ├── animated-icon.tsx
│   │   ├── app-tabs.tsx
│   │   ├── external-link.tsx
│   │   ├── hint-row.tsx
│   │   ├── themed-text.tsx
│   │   ├── themed-view.tsx
│   │   └── ...
│   │
│   ├── config/
│   │   ├── api.ts
│   │   └── google.ts
│   │
│   ├── constants/
│   │   └── theme.ts
│   │
│   ├── hooks/
│   │   ├── use-color-scheme.ts
│   │   ├── use-color-scheme.web.ts
│   │   └── use-theme.ts
│   │
│   └── global.css
│
├── app.json
├── eas.json
├── package.json
├── tsconfig.json
└── ...
```

This is currently the Expo starter foundation.

It will be gradually refactored into the application's production structure.

---

# 22. Do Not Delete the Existing Project Immediately

The existing Expo starter contains configuration that may already be useful.

Do not immediately delete:

```text
assets/
app.json
eas.json
tsconfig.json
```

Do not run the Expo starter's reset script blindly.

Before removing starter files, understand what they are used for.

---

# 23. Planned Mobile Architecture

The mobile application will gradually move toward a structure similar to:

```text
apps/mobile/
│
├── src/
│   ├── app/
│   │
│   ├── components/
│   │   ├── ui/
│   │   └── common/
│   │
│   ├── features/
│   │   ├── auth/
│   │   ├── profile/
│   │   ├── patient/
│   │   ├── schemes/
│   │   └── assistant/
│   │
│   ├── api/
│   │   ├── client.ts
│   │   ├── auth.ts
│   │   ├── users.ts
│   │   ├── patients.ts
│   │   └── schemes.ts
│   │
│   ├── hooks/
│   ├── stores/
│   ├── config/
│   ├── constants/
│   ├── i18n/
│   ├── types/
│   └── lib/
│
├── assets/
├── app.json
├── eas.json
├── package.json
└── tsconfig.json
```

This is a target architecture.

Do not create every directory immediately.

Create structures when the corresponding feature is implemented.

---

# 24. Frontend Development Stack

The planned frontend stack is:

```text
Expo
React Native
TypeScript
Expo Router
TanStack Query
Zustand
React Hook Form
Zod
NativeWind/Tailwind
Expo SecureStore
i18n
```

Do not install all of these at once.

Add dependencies as the corresponding architecture is implemented.

---

# 25. Multilingual Support

Multilingual support is a core requirement.

The application should eventually support:

```text
English
Hindi
Other Indian regional languages
```

Do not hardcode user-facing strings throughout components.

Avoid:

```tsx
<Text>Login</Text>
```

Prefer an internationalization system such as:

```tsx
<Text>{t("auth.login")}</Text>
```

Planned structure:

```text
src/i18n/
├── locales/
│   ├── en.json
│   ├── hi.json
│   └── ...
└── index.ts
```

The exact library will be decided during frontend foundation work.

---

# 26. API Integration

The backend is being developed separately using:

```text
NestJS
Prisma
PostgreSQL
```

The mobile application communicates with the backend through HTTP APIs.

The intended architecture is:

```text
React Native Screen
        ↓
Feature Hook
        ↓
API Service
        ↓
API Client
        ↓
NestJS Backend
        ↓
PostgreSQL
```

Do not put raw HTTP requests into every screen.

---

# 27. Backend API Is the Source of Truth

Do not invent API endpoints.

If you need an API endpoint that is not documented, coordinate with the backend developer.

The repository already contains API documentation:

```text
docs/api-spec.md
```

Read the relevant API specification before implementing API integration.

Authentication documentation is also available at:

```text
docs/authentication.md
```

Backend architecture documentation:

```text
docs/backend-architecture.md
```

Database documentation:

```text
docs/database-design.md
```

---

# 28. Shared Types

The repository already contains:

```text
packages/shared-types
```

This package is intended for types that genuinely need to be shared between applications.

Do not automatically copy Prisma types into the frontend.

Frontend types should represent API contracts rather than database implementation details.

Before adding or changing shared API types, coordinate with the backend developer.

---

# 29. API Base URL

The mobile application already contains:

```text
src/config/api.ts
```

Review this file before creating another API configuration system.

Do not hardcode URLs inside screens.

Development URLs may differ depending on whether you are using:

```text
Android emulator
Physical Android device
Web
```

For example, `localhost` behaves differently on a physical phone because it refers to the phone itself.

Coordinate the correct development API URL with the backend developer.

---

# 30. Authentication Storage

Authentication will use secure device storage.

The planned approach is:

```text
Login
   ↓
NestJS API
   ↓
Access/Refresh Token
   ↓
Expo SecureStore
   ↓
Authenticated API Requests
```

Do not store authentication tokens in plain AsyncStorage.

Do not implement token behavior based on assumptions.

Follow the backend authentication contract.

---

# 31. Server State

Use TanStack Query for server state.

Examples:

```text
useUser()
usePatient()
useSchemes()
useScheme(id)
```

Mutations:

```text
useLogin()
useRegister()
useUpdateProfile()
useUpdatePatient()
```

Do not duplicate backend server state unnecessarily in Zustand.

Zustand should primarily be used for client-side state where needed.

---

# 32. Development Workflow

The recommended workflow is:

```text
Feature requirement
        ↓
API contract confirmed
        ↓
Backend implementation
        ↓
Shared API types if necessary
        ↓
Frontend API service
        ↓
Frontend hook
        ↓
UI implementation
        ↓
Loading/error/empty states
        ↓
Integration testing
        ↓
Pull Request
```

The frontend does not need to wait for the entire backend.

If the API contract is known but the backend endpoint is not yet implemented, temporary mock data can be used.

---

# 33. Git Workflow

Always work on your own branch.

Example:

```bash
git checkout -b feature/mobile-auth
```

or:

```bash
git checkout -b feature/mobile-schemes
```

or:

```bash
git checkout -b feature/mobile-assistant
```

Do not work directly on `main`.

---

# 34. Commit Convention

Use clear commits.

Examples:

```text
feat(mobile): initialize mobile foundation
feat(mobile): add authentication screens
feat(mobile): add protected navigation
feat(mobile): add user profile
feat(mobile): add patient profile
feat(mobile): add government schemes
feat(mobile): add multilingual support
feat(mobile): add assistant chat
fix(mobile): handle expired session
```

Avoid commits such as:

```text
update
changes
stuff
final
final2
working
```

---

# 35. First Mobile Commit

After verifying the existing application:

```bash
git status
```

Make sure you only have the changes you intentionally made.

Then:

```bash
git add apps/mobile
```

Commit:

```bash
git commit -m "feat(mobile): initialize mobile foundation"
```

Push:

```bash
git push -u origin feature/mobile-foundation
```

Create a Pull Request.

---

# 36. First PR

The first PR should be small.

The purpose is to confirm:

* The existing Expo project works.
* The developer can run the application.
* The mobile app remains inside the monorepo.
* The frontend branch works correctly.
* No unnecessary monorepo changes were introduced.

Do not combine the initial setup PR with authentication, schemes, AI chat, or major UI work.

---

# 37. Feature Development Order

After the foundation is confirmed, develop features in this order.

## Phase 1 — Frontend Foundation

```text
1. Expo Router cleanup
2. Application theme
3. Reusable UI components
4. API client
5. TanStack Query
6. i18n
7. Secure authentication storage
8. Application navigation
```

## Phase 2 — Authentication

```text
1. Login
2. Registration
3. Authentication state
4. Protected routes
5. Logout
6. Session handling
```

## Phase 3 — Core Data

```text
1. User profile
2. Patient profile
3. Government schemes
4. Scheme details
```

## Phase 4 — AI Assistant

```text
1. Assistant screen
2. Message UI
3. User messages
4. AI responses
5. Loading state
6. Error state
7. Conversation history
8. Multilingual interaction
```

## Phase 5 — Integration

```text
1. Authentication integration
2. Profile integration
3. Patient integration
4. Scheme integration
5. AI integration
6. End-to-end testing
```

## Phase 6 — Polish

```text
1. Accessibility
2. Empty states
3. Error states
4. Loading states
5. Poor-network handling
6. Performance
7. UI polish
```

---

# 38. Rules for AI-Assisted Development

When using an AI coding assistant on this project:

1. Give the AI this README as context.
2. Tell it that the repository is a pnpm/Turborepo monorepo.
3. Tell it that Node.js 22 is mandatory.
4. Tell it that `.nvmrc` is the Node.js source of truth.
5. Tell it that `apps/mobile` already exists.
6. Tell it never to create another Expo project.
7. Tell it not to modify backend code unnecessarily.
8. Tell it to inspect existing files before creating replacements.
9. Tell it not to invent API endpoints.
10. Tell it to use the existing API configuration.
11. Tell it to respect the existing shared packages.
12. Tell it to keep API logic separate from UI.
13. Tell it to use TypeScript.
14. Tell it to implement loading, error, and empty states.
15. Tell it to preserve multilingual architecture.
16. Tell it not to add unnecessary dependencies.
17. Tell it to make complete file rewrites when modifying existing files rather than scattered snippets.

---

# 39. Troubleshooting

## Node version is wrong

Run:

```bash
nvm use
```

Then:

```bash
node --version
```

It must be Node 22.

If Node 22 is missing:

```bash
nvm install 22
nvm use 22
```

---

## pnpm is not found

Check:

```bash
pnpm --version
```

If missing:

```bash
npm install -g pnpm
```

Then restart the terminal if necessary.

---

## Expo command is not found

Do not immediately install a global Expo CLI.

Use the project's local Expo dependency:

```bash
pnpm expo start
```

from:

```text
apps/mobile
```

---

## Dependencies are broken

From the repository root:

```bash
pnpm install
```

Do not immediately delete:

```text
pnpm-lock.yaml
```

If the problem persists, coordinate with the team before changing dependency versions.

---

## Android device cannot connect

Check:

1. Phone and computer are on the same network.
2. Expo is running.
3. The correct Expo connection mode is being used.
4. The backend API is reachable from the phone if API integration is being tested.

Remember:

```text
localhost
```

on a physical phone refers to the phone itself, not your development computer.

---

# 40. Final Verification

Before starting actual feature development, all of these must work:

```bash
nvm use
```

```bash
node --version
```

Expected:

```text
22.x.x
```

Then:

```bash
pnpm install
```

Then:

```bash
cd apps/mobile
```

Then:

```bash
pnpm expo start
```

Finally, the application must successfully open on:

```text
Physical Android device
```

or:

```text
Android emulator
```

---

# 41. Golden Rules

```text
1. Use Node 22.
2. Respect .nvmrc.
3. Use pnpm.
4. Use the existing monorepo.
5. apps/mobile already exists.
6. NEVER create another Expo project.
7. Work on a feature branch.
8. Keep frontend work primarily inside apps/mobile.
9. Do not modify backend code unnecessarily.
10. Do not invent API contracts.
11. Use docs/api-spec.md for API information.
12. Coordinate shared types with the backend developer.
13. Keep API logic separate from UI.
14. Build multilingual support from the beginning.
15. Test on a real Android device or emulator.
16. Keep commits small and meaningful.
17. Create small PRs.
```

---

# Quick Start

For an experienced developer, the complete setup is:

```bash
git clone <REPOSITORY_URL>
cd ai-rural-health

nvm use
node --version

pnpm --version
pnpm install

git checkout -b feature/mobile-foundation

cd apps/mobile
pnpm expo start
```

Verify the existing Expo application runs successfully.

Then begin frontend development.

**Do not run `create-expo-app`. The Expo application already exists at `apps/mobile`.**
