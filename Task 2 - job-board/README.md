# Job Board Application

A full-stack job board application built with React, Node.js, Express, and MongoDB.

## Features

- ✅ User Authentication (Job Seekers & Employers)
- ✅ Job Posting & Management
- ✅ Job Search & Filtering
- ✅ Application System with Resume Upload
- ✅ Employer Dashboard
- ✅ Candidate Dashboard
- ✅ Email Notifications
- ✅ Mobile Responsive Design
- ✅ Secure API with JWT Authentication

## Tech Stack

**Frontend:**
- React.js
- React Router
- Tailwind CSS
- Axios
- Lucide React Icons

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Multer (File Upload)
- Nodemailer (Email)
- bcryptjs (Password Hashing)

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Git

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd job-board
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file with your configuration
cp .env.example .env
# Edit .env with your MongoDB URI and other settings

# Create uploads directory
mkdir uploads

# Start the backend server
npm run dev
```

Backend will run on http://localhost:5000
