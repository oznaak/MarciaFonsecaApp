import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import doctorProfile from '../images/doctor-profile.jpg';
import LoadingSpinner from './LoadingSpinner';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/courses')
      .then((res) => {
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        return res.json();
      })
      .then((data) => setCourses(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      {loading ? (
        <div className="flex items-center justify-center h-[calc(100vh-5rem)]">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <div className="flex items-center justify-center h-[calc(100vh-5rem)]">
          <div className="text-center text-red-500">Error fetching courses: {error}</div>
        </div>
      ) : (
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Formações</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {courses.map((course) => (
              <Link
                key={course.id}
                to={`/courses/${course.id}`}
                className="block bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                {/* Thumbnail with badges */}
                <div className="relative h-40 w-full">
                  <img src={course.thumbnail || doctorProfile} alt={course.title} className="w-full h-full object-cover" />
                  {course.discount > 0 && (
                    <div className="absolute top-2 left-2">
                      <span className="bg-white text-xs font-medium px-2 py-1 rounded-full">
                        {course.discount}% OFF
                      </span>
                    </div>
                  )}
                </div>
                {/* Course info */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">{course.description}</p>
                  <div className="flex items-center mb-4">
                    <span className="text-yellow-400 mr-2">{'★'.repeat(Math.floor(course.rating))}</span>
                    <span className="text-sm text-gray-500">{course.rating.toFixed(1)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-semibold text-gray-900">${course.price.toFixed(2)}</span>
                    {course.previousPrice > 0 && (
                      <span className="text-sm text-gray-500 line-through">
                        ${course.previousPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursesPage; 