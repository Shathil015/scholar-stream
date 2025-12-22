Scholar Stream

Live Site: https://scholar-stream-54f8e.web.app
Server: Node.js + Express + MongoDB
Auth & Payments: Firebase Auth, Stripe

Scholar Stream is a full‑stack scholarship management and application platform where students can explore scholarships, apply securely, and track payments, while admins and moderators manage scholarships and users.

_User (Student)_

-> User authentication with Firebase (Email/Password)

-> Browse all available scholarships

-> View detailed scholarship information

-> Apply for scholarships

-> Secure payment using Stripe

-> View payment history & application status

-> Add reviews and ratings for scholarships

_Moderator_

Review and manage scholarship applications

Approve or reject applications

Moderate scholarship reviews

_Admin_

Full user management (make admin / moderator)

Add, update, and delete scholarships

Monitor payments and transactions

Control platform access & roles

Tech Stack
Frontend

React

React Router DOM

Tailwind CSS + DaisyUI

TanStack React Query

Axios

Firebase Authentication

Backend

Node.js

Express.js

MongoDB (Atlas)

Firebase Admin SDK (JWT verification)

Stripe Payment Gateway

Crypto (Transaction & Tracking IDs)

_Authentication & Security_

Firebase Authentication for client‑side login

Firebase Admin SDK for backend token verification

Role‑based protected routes (User / Moderator / Admin)

Secure Axios interceptor with JWT

_Payment Flow_

User selects a scholarship

Stripe Checkout session is created

Payment is completed securely

Transaction ID & Tracking ID generated

Payment data stored in MongoDB

User redirected to success page

_Deployment_

Frontend deployed on Firebase Hosting

Backend deployed on Vercel

MongoDB Atlas for database

_Future Improvements_

Scholarship bookmarking

Email notifications

Advanced search & filtering

Admin analytics dashboard

_Acknowledgements_

Firebase

Stripe

MongoDB

React Community
