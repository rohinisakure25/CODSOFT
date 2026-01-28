import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Users, Eye } from 'lucide-react';
import Navbar from '../components/Navbar';
import { jobsAPI, applicationsAPI } from '../services/api';

const EmployerDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const [showApplications, setShowApplications] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const fetchMyJobs = async () => {
    try {
      const response = await jobsAPI.getMyJobs();
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job posting?')) {
      try {
        await jobsAPI.deleteJob(jobId);
        setJobs(jobs.filter(j => j._id !== jobId));
        alert('Job deleted successfully!');
      } catch (error) {
        alert('Failed to delete job');
      }
    }
  };

  const handleViewApplications = async (job) => {
    setSelectedJob(job);
    setShowApplications(true);
    try {
      const response = await applicationsAPI.getJobApplications(job._id);
      setApplications(response.data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const handleUpdateStatus = async (applicationId, newStatus) => {
    try {
      await applicationsAPI.updateApplicationStatus(applicationId, newStatus);
      const response = await applicationsAPI.getJobApplications(selectedJob._id);
      setApplications(response.data);
      alert('Application status updated!');
    } catch (error) {
      alert('Failed to update status');
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
        {!showApplications ? (
          <>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">My Job Postings</h2>
              <button
                onClick={() => navigate('/employer/post-job')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold flex items-center gap-2"
              >
                <Plus size={20} /> Post New Job
              </button>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="text-xl text-gray-600">Loading jobs...</div>
              </div>
            ) : jobs.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No job postings yet</h3>
                <p className="text-gray-600 mb-6">Start by posting your first job opening</p>
                <button
                  onClick={() => navigate('/employer/post-job')}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  Post a Job
                </button>
              </div>
            ) : (
              <div className="grid gap-6">
                {jobs.map(job => (
                  <div key={job._id} className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
                        <p className="text-blue-600 font-semibold mb-2">{job.company}</p>
                        <div className="flex flex-wrap gap-4 text-gray-600 mb-4">
                          <span>{job.location}</span>
                          <span>{job.salary}</span>
                          <span className="flex items-center gap-1">
                            <Users size={16} /> {job.applicants} applicants
                          </span>
                        </div>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          job.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {job.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewApplications(job)}
                          className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition"
                          title="View Applications"
                        >
                          <Eye size={20} />
                        </button>
                        <button
                          onClick={() => navigate(`/employer/edit-job/${job._id}`)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="Edit Job"
                        >
                          <Edit size={20} />
                        </button>
                        <button
                          onClick={() => handleDeleteJob(job._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Delete Job"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            <div className="mb-8">
              <button
                onClick={() => setShowApplications(false)}
                className="text-blue-600 hover:underline mb-4"
              >
                ← Back to Jobs
              </button>
              <h2 className="text-3xl font-bold text-gray-900">
                Applications for {selectedJob.title}
              </h2>
            </div>

            {applications.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No applications yet</h3>
                <p className="text-gray-600">Applications will appear here once candidates apply</p>
              </div>
            ) : (
              <div className="grid gap-6">
                {applications.map(app => (
                  <div key={app._id} className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{app.fullName}</h3>
                        <p className="text-gray-600">{app.email}</p>
                        <p className="text-gray-600">{app.phone}</p>
                        <p className="text-sm text-gray-500 mt-2">
                          Applied: {new Date(app.appliedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(app.status)}`}>
                        {app.status.toUpperCase()}
                      </span>
                    </div>

                    {app.coverLetter && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Cover Letter:</h4>
                        <p className="text-gray-700 whitespace-pre-line">{app.coverLetter}</p>
                      </div>
                    )}

                    <div className="flex gap-2 mb-4">
                      <a
                        href={`http://localhost:5000/${app.resume}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View Resume →
                      </a>
                    </div>

                    <div className="flex gap-2">
                      <select
                        value={app.status}
                        onChange={(e) => handleUpdateStatus(app._id, e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="pending">Pending</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="shortlisted">Shortlisted</option>
                        <option value="accepted">Accepted</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EmployerDashboard;
