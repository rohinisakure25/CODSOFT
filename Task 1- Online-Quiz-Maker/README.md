# Online Quiz Maker - MERN Stack

A full-featured quiz platform with user authentication, quiz creation, and interactive quiz-taking experience.

## 📁 Project Structure

```
online-quiz-maker/
├── client/                          # React Frontend
│   ├── public/
│   │   └── vite.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── Signup.jsx
│   │   │   │   └── ProtectedRoute.jsx
│   │   │   ├── quiz/
│   │   │   │   ├── QuizCard.jsx
│   │   │   │   ├── QuizList.jsx
│   │   │   │   ├── CreateQuiz.jsx
│   │   │   │   ├── TakeQuiz.jsx
│   │   │   │   ├── QuizResults.jsx
│   │   │   │   └── QuestionForm.jsx
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   └── Footer.jsx
│   │   │   └── common/
│   │   │       ├── Button.jsx
│   │   │       ├── Input.jsx
│   │   │       └── ProgressBar.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── QuizPage.jsx
│   │   │   └── ResultsPage.jsx
│   │   ├── utils/
│   │   │   ├── api.js
│   │   │   └── constants.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env.example
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── server/                          # Node.js Backend
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── quizController.js
│   │   └── attemptController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Quiz.js
│   │   └── Attempt.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── quizRoutes.js
│   │   └── attemptRoutes.js
│   ├── validators/
│   │   ├── authValidator.js
│   │   └── quizValidator.js
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js v16+ and npm
- MongoDB Atlas account or local MongoDB
- Git

### Backend Setup

1. Navigate to server directory:
```bash
cd server
npm install
```

2. Create `.env` file:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key_min_32_characters
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

3. Start the server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to client directory:
```bash
cd client
npm install
```

2. Create `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

3. Start the development server:
```bash
npm run dev
```

## 🌐 Deployment

### Backend Deployment (Render)

1. Create a new Web Service on [Render](https://render.com)
2. Connect your GitHub repository
3. Configure:
   - **Build Command:** `cd server && npm install`
   - **Start Command:** `cd server && npm start`
4. Add environment variables in Render dashboard:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NODE_ENV=production`
   - `CLIENT_URL=your_frontend_url`

### Frontend Deployment (Vercel)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy from client directory:
```bash
cd client
vercel
```

3. Add environment variable in Vercel dashboard:
   - `VITE_API_URL=your_backend_url/api`

## 📦 Environment Variables



### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

## 🛠️ Tech Stack

**Frontend:**
- React 18 with Vite
- React Router v6
- Axios
- Tailwind CSS
- Context API for state management

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- JWT Authentication
- bcryptjs for password hashing
- Express Validator

## 📋 Features

✅ User authentication (JWT-based)
✅ Create quizzes with multiple-choice questions
✅ Public quiz discovery homepage
✅ Interactive quiz-taking experience
✅ Real-time progress tracking
✅ Instant results with answer review
✅ Mobile-responsive design
✅ Protected routes
✅ Input validation
✅ Error handling

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- HTTP-only cookies (optional)
- CORS configuration
- Input validation and sanitization
- Protected API routes
- XSS protection

## 📱 API Endpoints

### Auth Routes
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Quiz Routes
- `GET /api/quizzes` - Get all quizzes
- `GET /api/quizzes/:id` - Get quiz by ID
- `POST /api/quizzes` - Create quiz (protected)
- `PUT /api/quizzes/:id` - Update quiz (protected)
- `DELETE /api/quizzes/:id` - Delete quiz (protected)

### Attempt Routes
- `POST /api/attempts` - Submit quiz attempt (protected)
- `GET /api/attempts/:id` - Get attempt results (protected)
- `GET /api/attempts/quiz/:quizId` - Get all attempts for a quiz

## 🎨 UI/UX Features

- Clean, modern interface
- Smooth transitions and hover effects
- Progress indicators
- Loading states
- Error notifications
- Mobile-first responsive design
- Accessible components

## 📝 License

MIT License - feel free to use this project for learning or production.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues or questions, please open an issue on GitHub.