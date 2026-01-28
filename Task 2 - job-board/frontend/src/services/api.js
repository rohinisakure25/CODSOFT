import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

// Jobs APIs
export const jobsAPI = {
  getAllJobs: (params) => api.get('/jobs', { params }),
  getJob: (id) => api.get(`/jobs/${id}`),
  createJob: (data) => api.post('/jobs', data),
  updateJob: (id, data) => api.put(`/jobs/${id}`, data),
  deleteJob: (id) => api.delete(`/jobs/${id}`),
  getMyJobs: () => api.get('/jobs/employer/my-jobs'),
};

// Applications APIs
export const applicationsAPI = {
  submitApplication: (formData) => api.post('/applications', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getMyApplications: () => api.get('/applications/my-applications'),
  getJobApplications: (jobId) => api.get(`/applications/job/${jobId}`),
  updateApplicationStatus: (id, status) => api.put(`/applications/${id}/status`, { status }),
};

export default api;