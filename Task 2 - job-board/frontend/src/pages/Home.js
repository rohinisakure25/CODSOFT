import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Briefcase, Users, TrendingUp, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import JobCard from '../components/JobCard';
import { jobsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});
  const [showAllJobs, setShowAllJobs] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await jobsAPI.getAllJobs(filters);
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchFilters) => {
    setFilters(searchFilters);
    setShowAllJobs(true);
  };

  const featuredJobs = jobs.slice(0, 6);
  const displayJobs = showAllJobs ? jobs : featuredJobs;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Find Your Dream Job Today
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Connect with top employers and discover thousands of opportunities
            </p>
            
            <div className="max-w-3xl mx-auto mb-12">
              <SearchBar onSearch={handleSearch} />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="text-center">
                <div className="flex items-center justify-center mb-3">
                  <Briefcase className="text-blue-300" size={40} />
                </div>
                <div className="text-4xl font-bold mb-2">{jobs.length}+</div>
                <div className="text-blue-200">Active Jobs</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-3">
                  <Users className="text-blue-300" size={40} />
                </div>
                <div className="text-4xl font-bold mb-2">500+</div>
                <div className="text-blue-200">Companies Hiring</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-3">
                  <TrendingUp className="text-blue-300" size={40} />
                </div>
                <div className="text-4xl font-bold mb-2">10k+</div>
                <div className="text-blue-200">Jobs Filled</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action for Non-logged Users */}
      {!user && (
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between bg-white rounded-2xl shadow-lg p-8">
              <div className="mb-6 md:mb-0">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Ready to Get Started?
                </h3>
                <p className="text-gray-600">
                  Join thousands of job seekers and employers on our platform
                </p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => navigate('/register')}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold flex items-center gap-2"
                >
                  Register Now <ArrowRight size={20} />
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition font-semibold"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Featured Jobs Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">
              {filters.search ? 'Search Results' : 'Featured Jobs'}
            </h3>
            <p className="text-gray-600">
              {filters.search ? `Found ${jobs.length} jobs` : 'Browse top opportunities from leading companies'}
            </p>
          </div>
          {!showAllJobs && jobs.length > 6 && (
            <button
              onClick={() => setShowAllJobs(true)}
              className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2"
            >
              View All Jobs <ArrowRight size={20} />
            </button>
          )}
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <div className="text-xl text-gray-600 mt-4">Loading amazing opportunities...</div>
          </div>
        ) : displayJobs.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-lg">
            <Search className="mx-auto text-gray-400 mb-4" size={64} />
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search criteria</p>
            <button
              onClick={() => {
                setFilters({});
                setShowAllJobs(false);
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              View All Jobs
            </button>
          </div>
        ) : (
          <>
            <div className="grid gap-6">
              {displayJobs.map(job => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
            
            {showAllJobs && jobs.length > displayJobs.length && (
              <div className="text-center mt-8">
                <button
                  onClick={() => fetchJobs()}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  Load More Jobs
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* How It Works Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h3>
            <p className="text-xl text-gray-600">Get hired in 3 simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Create Profile</h4>
              <p className="text-gray-600">
                Sign up and build your professional profile with your skills and experience
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Search & Apply</h4>
              <p className="text-gray-600">
                Browse thousands of jobs and apply to positions that match your goals
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Get Hired</h4>
              <p className="text-gray-600">
                Connect with employers and land your dream job at top companies
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Briefcase size={24} />
                JobBoard
              </h4>
              <p className="text-gray-400">
                Connecting talent with opportunity. Find your next career move today.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">For Job Seekers</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Browse Jobs</a></li>
                <li><a href="#" className="hover:text-white">Career Advice</a></li>
                <li><a href="#" className="hover:text-white">Resume Tips</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">For Employers</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Post a Job</a></li>
                <li><a href="#" className="hover:text-white">Browse Candidates</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Company</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 JobBoard. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
