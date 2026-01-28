import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, DollarSign, Clock, Briefcase } from 'lucide-react';

const JobCard = ({ job }) => {
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

    for (const [name, seconds_in_interval] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / seconds_in_interval);
      if (interval >= 1) {
        return `${interval} ${name}${interval !== 1 ? 's' : ''} ago`;
      }
    }
    return 'Just now';
  };

  return (
    <Link to={`/jobs/${job._id}`}>
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition cursor-pointer">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h4 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h4>
            <p className="text-lg text-blue-600 font-semibold">{job.company}</p>
          </div>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
            {job.type}
          </span>
        </div>
        
        <div className="flex flex-wrap gap-4 text-gray-600">
          <span className="flex items-center gap-1">
            <MapPin size={16} /> {job.location}
          </span>
          <span className="flex items-center gap-1">
            <DollarSign size={16} /> {job.salary}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={16} /> {timeAgo(job.createdAt)}
          </span>
          {job.applicants > 0 && (
            <span className="flex items-center gap-1">
              <Briefcase size={16} /> {job.applicants} applicants
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default JobCard;