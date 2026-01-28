import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, DollarSign, Clock, Briefcase } from 'lucide-react';
import Navbar from '../components/Navbar';
import { jobsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Memoized function (fixes ESLint error)
  const fetchJob = useCallback(async () => {
    try {
      const response = await jobsAPI.getJob(id);
      setJob(response.data);
    } catch (error) {
      console.error('Error fetching job:', error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchJob();
  }, [fetchJob]);

  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60
    };

    for (const [name, secondsInInterval] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / secondsInInterval);
      if (interval >= 1) {
        return `${interval} ${name}${interval !== 1 ? 's' : ''} ago`;
      }
    }
    return 'Just now';
  };

  const handleApply = () => {
    if (!user) {
      navigate('/login');
    } else if (user.role === 'candidate') {
      navigate(`/apply/${id}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <div className="text-xl">Loading...</div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <div className="text-xl">Job not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h2>
            <p className="text-xl text-blue-600 font-semibold mb-4">{job.company}</p>

            <div className="flex flex-wrap gap-4 text-gray-600">
              <span className="flex items-center gap-1">
                <MapPin size={18} /> {job.location}
              </span>
              <span className="flex items-center gap-1">
                <Briefcase size={18} /> {job.type}
              </span>
              <span className="flex items-center gap-1">
                <DollarSign size={18} /> {job.salary}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={18} /> {timeAgo(job.createdAt)}
              </span>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Job Description</h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {job.description}
            </p>
          </div>

          {job.requirements?.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Requirements</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {job.requirements.map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </div>
          )}

          {user?.role === 'candidate' && (
            <button
              onClick={handleApply}
              className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition font-semibold text-lg"
            >
              Apply Now
            </button>
          )}

          {!user && (
            <button
              onClick={() => navigate('/login')}
              className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition font-semibold text-lg"
            >
              Login to Apply
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
