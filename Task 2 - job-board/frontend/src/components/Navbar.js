import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User, Briefcase } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600 flex items-center gap-2">
          <Briefcase size={28} />
          JobBoard
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link 
                to={user.role === 'employer' ? '/employer/dashboard' : '/candidate/dashboard'}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
              >
                <User size={20} />
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
              >
                <LogOut size={20} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-blue-600">
                Login
              </Link>
              <Link to="/register" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
