import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase } from 'lucide-react';
import Navbar from '../components/Navbar';
import { applicationsAPI } from '../services/api';

const CandidateDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await applicationsAPI.getMyApplications();
      setApplications(response.data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      reviewed: 'bg-blue-100 text-blue-800',
      shortlisted: 'bg-purple-100 text-purple-800',
      accepted: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">My Applications</h2>

        {loading ? (
          <div className="text-center py-12">
            <div className="text-xl text-gray-600">Loading applications...</div>
          </div>
        ) : applications.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Briefcase size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No applications yet</h3>
            <p className="text-gray-600 mb-6">Start exploring jobs and apply to positions that interest you</p>
            <button
              onClick={() => navigate('/')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Browse Jobs
            </button>
          </div>
        ) : (
          <div className="grid gap-6">
            {applications.map(app => (
              <div key={app._id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{app.job.title}</h3>
                    <p className="text-blue-600 font-semibold mb-2">{app.job.company}</p>
                    <div className="flex gap-4 text-gray-600 text-sm mb-3">
                      <span>Applied: {new Date(app.appliedAt).toLocaleDateString()}</span>
                    </div>
                    {app.coverLetter && (
                      <p className="text-gray-700 text-sm line-clamp-2">{app.coverLetter}</p>
                    )}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(app.status)}`}>
                    {app.status.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateDashboard;
