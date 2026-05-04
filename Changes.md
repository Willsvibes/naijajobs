# Project Refactor & Architecture Summary 🚀

This document summarizes the major architectural improvements made to the **NaijaJobs** project. These changes were designed to make the codebase more scalable, secure, and easier for developers to maintain.

---

## 1. Centralized State Management (Zustand)
**Old Way:** Authentication was handled using a basic `AuthContext`, and tokens were manually saved/loaded from `localStorage` in every component.
**New Way:** We now use **Zustand** with the **Persist middleware**.
- **Location:** `src/store/useAuthStore.ts`
- **Benefit:** You no longer need to worry about `localStorage`. When a user logs in, the state is saved. When the page refreshes, Zustand automatically hydrates (loads) the user state back into the app.
- **Usage:**
  ```javascript
  const { user, logout } = useAuthStore();
  ```

## 2. Professional API Layer (Axios)
**Old Way:** Every component used the `fetch()` API with hardcoded URLs like `http://localhost:5000`.
**New Way:** A centralized **Axios Instance** manages all network requests.
- **Location:** `src/api/axiosInstance.ts`
- **Key Features:**
    - **Base URL:** Defined once in a `.env` file. Change it in one place, and it updates everywhere.
    - **Interceptors (The "Postman"):** 
        - **Request Interceptor:** Automatically looks for your login token and adds it to the `Authorization` header of every request. You don't have to write headers manually anymore!
        - **Response Interceptor:** If the backend says your token is expired (401 error), the app automatically logs you out and sends you to the login page.

## 3. Industry-Standard Routing
**Old Way:** Every single route was manually wrapped in a `<PrivateRoute>` tag, leading to messy and repetitive code in `routes.tsx`.
**New Way:** **Layout-Based Routing Groups**.
- **Location:** `src/routes/routes.tsx`
- **How it works:** We grouped all "Protected" pages under one parent route. If the parent detects you aren't logged in, it blocks access to all children at once.
- **Standardized Paths:** 
    - `/auth/login` and `/auth/signup` for authentication.
    - `/dashboard` for the main application home.
    - `/job/:id` for specific job details.

## 4. Environment Variables (`.env`)
**Old Way:** Backend URLs were hardcoded inside component logic.
**New Way:** Added a `.env` file in the frontend root.
- **Variables:** `VITE_API_BASE_URL`
- **Benefit:** When we deploy this project to the internet, we only need to change the URL in the `.env` file instead of searching through 20 different code files.

## 5. Component Cleanup & Best Practices
- **Post Job Page:** Refactored to match the backend database schema (e.g., using `salary` instead of `pay`). Added a list for skills instead of a single string.
- **File Structure:**
    - Renamed types from `.tsx` to `.ts` (e.g., `src/types/job.ts`).
    - Removed unused hooks like `authContext.tsx`.
- **Loading States:** Added visual loading spinners to the Dashboard and Job Details pages to improve User Experience (UX).

## 6. Apple-Style Landing Page
**Old Way:** A barebones `LandingPage` component that imported a missing `Hero` component, causing the app to crash.
**New Way:** A complete, production-quality landing page built with **Framer Motion** animations and modern design.
- **Location:** `src/LandingPage component/`
- **Sections:** PublicNavbar → HeroSection → StatsBar → FeaturesSection → HowItWorks → TestimonialsSection → CTASection → Footer
- **Key Features:**
    - Frosted glass sticky navbar that changes on scroll
    - Animated stat counters that trigger on viewport entry
    - Staggered card entrance animations
    - Full mobile responsive design
    - Google Fonts (Inter) for Apple-style typography

## 7. Backend Error Handling & Security
**Old Way:** Controllers returned raw error objects to the client: `res.status(500).json({ message: error })`. This leaked internal stack traces.
**New Way:** All errors are now sanitized.
- **Pattern:** Log the real error on the server with `console.error()`, but only send a human-friendly message to the frontend.
- **Before:** `{ message: [object Object] }` or a stack trace
- **After:** `{ message: "Failed to create job listing" }`

### Specific fixes:
- **authController.ts:** Removed a stray `debugger` statement. Added input validation for email/password/name. Added a guard for missing `JWT_SECRET`.
- **profileController.ts:** Removed `@ts-ignore` hacks. Added **field whitelisting** so users can't change their own `role` through the profile update endpoint (prevents **privilege escalation** attacks).
- **jobControllers.ts:** Added input validation on `postJob`. Added `description` field support. Added `.sort({ createdAt: -1 })` so newest jobs appear first.

## 8. Backend Server Hardening
**Old Way:** `server.ts` had several issues: hardcoded CORS origin, a debug `User.find()` that dumped all users to console on startup, and the jobs route was restricted to employers only (employees couldn't see jobs!).
**New Way:**
- **CORS:** Now reads from `process.env.CORS_ORIGINS` (comma-separated), with a dev fallback.
- **Debug dump:** Removed the `User.find()` console dump from the MongoDB connection callback.
- **Jobs route:** Changed from `allowRoles("employer")` to just `authMiddleware` — all authenticated users can now browse jobs. The controller already handles role-based filtering internally.
- **Startup safety:** The server now calls `process.exit(1)` if `MONGO_URI` is missing or if the database connection fails.

## 9. Profile Page Refactor
**Old Way:** `profile.tsx` used `fetch()` with hardcoded `http://localhost:5000` URLs and `localStorage.getItem("token")` for manual auth.
**New Way:** Uses the centralized `api` Axios instance (tokens are injected automatically by the interceptor). Syncs profile name changes back to the Zustand store. Added a professional UI with loading/saving states, role-specific fields, and an avatar.

## 10. Job Model Update
- Added a `description` field to the Mongoose Job schema so job descriptions can be stored and retrieved from the database (it was displayed on the frontend but never actually saved).

---

### Getting Started for Developers
1. **Install dependencies:** Run `npm install` in both `Naija-job-frontend` and `Naija-job-backend`.
2. **Frontend Env:** Create a `.env` file in the frontend root:
   ```
   VITE_API_BASE_URL=http://localhost:5000/api
   ```
3. **Backend Env:** Ensure your `.env` in the backend root has:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   CORS_ORIGINS=http://localhost:5173,http://localhost:5174
   ```
4. **Run Backend:** `cd Naija-job-backend && npm run dev`
5. **Run Frontend:** `cd Naija-job-frontend && npm run dev`


