<!-- 🏥 Doctor Appointment Booking System (MERN) -->
A comprehensive, full-stack healthcare management platform designed to streamline doctor-patient interactions. This project features a dual-interface system (User & Admin) with real-time appointment scheduling and secure authentication.

📁 Project Structure
This repository is organized into two main modules:

doctor_appoint/: Contains the Node.js/Express Backend and the User-side React Client.

Admin-Panel/: A dedicated React Dashboard for hospital administrators to manage doctors, users, and appointments.

✨ Key Features
👤 User Module
Dynamic Booking: Select 30-minute time slots using an interactive react-datepicker.

Global State: Powered by Redux Toolkit for seamless data flow between the profile and booking lifecycle.

Appointment Tracking: View detailed summaries and real-time status updates (Pending/Completed/Cancelled).

Secure Auth: JWT-based login with persistent sessions via LocalStorage.

🛡️ Admin Module
Doctor Management: Add, update, or remove medical professionals.

Data Oversight: Monitor all system-wide appointments and user registrations.

Analytics: View consultation fees and doctor availability metrics.

🛠️ Technical Stack
Frontend: React.js, Redux Toolkit, React-Router-DOM, Bootstrap 5, React-Hot-Toast.

Backend: Node.js, Express.js.

Database: MongoDB with Mongoose (ODM).

Security: JWT (JSON Web Tokens) and Bcrypt for password hashing.

File Handling: Multer for dynamic profile image uploads.

🚀 Getting Started
1. Clone the Repository
git clone https://github.com/shivam0642/Doctor-appointment-system-mern-.git
cd Doctor-appointment-system-mern-

2. Set Up Environment Variables
Create a .env file inside the doctor_appoint/ folder:

PORT = 8080
MONGO_URI = your_mongodb_connection_string
JWT_SECRET = your_secret_key


3. Install Dependencies & Run
Backend & User Client
Bash

# In the doctor_appoint folder
npm install          # Install Backend dependencies
npm run server       # Start Backend (on port 8080)

# Open a new terminal
cd client
npm install          # Install User Client dependencies
npm run dev          # Start User Client
Admin Panel
Bash

# In the Admin-Panel folder
npm install
npm run dev
💡 Engineering Highlights
Data Isolation: Implemented backend middleware to ensure users can only access their own sensitive appointment data.

API Efficiency: Optimized MongoDB queries using .populate() to handle relational data between User, Doctor, and Appointment models.

Asynchronous UX: Managed complex loading/error states using Redux extraReducers to provide a smooth, flicker-free experience.

📜 License
This project is developed as part of a final-year B.Tech academic requirement.