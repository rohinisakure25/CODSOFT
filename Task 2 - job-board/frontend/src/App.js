import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import JobDetail from './pages/JobDetail';
import JobApplication from './pages/JobApplication';
import EmployerDashboard from './pages/EmployerDashboard';
import CandidateDashboard from './pages/CandidateDashboard';
import PostJob from './pages/PostJob';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          
          <Route path="/apply/:id" element={
            <ProtectedRoute role="candidate">
              <JobApplication />
            </ProtectedRoute>
          } />
          
          <Route path="/candidate/dashboard" element={
            <ProtectedRoute role="candidate">
              <CandidateDashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/employer/dashboard" element={
            <ProtectedRoute role="employer">
              <EmployerDashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/employer/post-job" element={
            <ProtectedRoute role="employer">
              <PostJob />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
