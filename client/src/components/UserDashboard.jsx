import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      return setError('Not authenticated');
    }
    // Get current user and their enrolled courses
    fetch('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch user');
        return res.json();
      })
      .then(async (userData) => {
        setUser(userData);
        // Fetch enrolled course details
        const coursePromises = userData.enrolledCourses.map(id =>
          fetch(`/api/courses/${id}`).then(r => r.json())
        );
        const courseList = await Promise.all(coursePromises);
        setCourses(courseList);
      })
      .catch(err => setError(err.message))
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
          <div className="text-center text-red-500">{error}</div>
        </div>
      ) : (
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Welcome, {user.name}</h1>
          {courses.length === 0 ? (
            <p className="text-gray-700">You have not enrolled in any courses yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map(course => (
                <Link
                  key={course.id}
                  to={`/courses/${course.id}`}
                  className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition"
                >
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h2>
                  <p className="text-sm text-gray-600 mb-4">by {course.instructor}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900">${course.price.toFixed(2)}</span>
                    {course.discount > 0 && (
                      <span className="bg-purple-600 text-white text-xs font-semibold px-2 py-1 rounded">
                        {course.discount}% OFF
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserDashboard; 