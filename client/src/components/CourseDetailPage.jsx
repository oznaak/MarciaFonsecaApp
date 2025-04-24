import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import doctorProfile from '../images/doctor-profile.jpg';
import LoadingSpinner from './LoadingSpinner';

const CourseDetailPage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('description');
  const [user, setUser] = useState(null);
  const [enrolled, setEnrolled] = useState(false);
  const [expandedLesson, setExpandedLesson] = useState(null);

  const toggleLesson = (idx) => {
    setExpandedLesson(expandedLesson === idx ? null : idx);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setUser(null);
      return;
    }
    fetch('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        if (!res.ok) throw new Error('Not authenticated');
        return res.json();
      })
      .then(data => {
        setUser(data);
        if (data.enrolledCourses?.includes(id)) setEnrolled(true);
      })
      .catch(() => {
        setUser(null);
      });
  }, [id]);

  useEffect(() => {
    fetch(`/api/courses/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        return res.json();
      })
      .then((data) => setCourse(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleCheckout = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return window.location.href = '/login';
    }
    try {
      const res = await fetch(`/api/courses/${id}/checkout-session`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create checkout session');
      window.location.href = data.url;
    } catch (err) {
      setError(err.message);
    }
  };

  // Always render container with spinner, error, or page content
  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      {loading ? (
        <div className="flex items-center justify-center h-[calc(100vh-5rem)]">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <div className="flex items-center justify-center h-[calc(100vh-5rem)]">
          <div className="text-center text-red-500">Error: {error}</div>
        </div>
      ) : (
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* Video Preview */}
            <div className="md:col-span-2 relative rounded-lg overflow-hidden h-full">
              <video
                controls
                poster={course.thumbnail || doctorProfile}
                className="w-full h-full object-cover"
              >
                <source src={course.lessons[0]?.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 flex items-center justify-center">
                {enrolled ? (
                  <div className="bg-black bg-opacity-50 p-4 rounded-full cursor-pointer">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 5V19L19 12L8 5Z" />
                    </svg>
                  </div>
                ) : (
                  <div className="bg-black bg-opacity-50 p-4 rounded-full cursor-default">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.657 0 3-1.343 3-3V6a3 3 0 10-6 0v2c0 1.657 1.343 3 3 3zm-4 0v2a4 4 0 108 0v-2" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
            {/* Sidebar */}
            <div className="bg-white p-6 rounded-lg shadow space-y-4">
              <div className="text-left space-y-2">
                  <div>
                      <span className="text-black-500 text-xl font-bold">
                          {course.title}
                      </span>
                  </div>
                {course.previousPrice > 0 && (
                  <div>
                    <span className="text-gray-500 line-through text-sm">
                      ${course.previousPrice.toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="text-2xl font-bold text-gray-900">
                  ${course.price.toFixed(2)}
                </div>
                {course.discount > 0 && (
                  <span className="bg-purple-600 text-white text-xs font-semibold px-2 py-1 rounded">
                    {course.discount}% OFF
                  </span>
                )}
              </div>
              <button
                onClick={handleCheckout}
                className="w-full py-3 bg-gradient-to-br from-[#DEA54B]/90 to-[#D27D2D]/80 text-white rounded-md font-semibold shadow hover:opacity-90 transition"
              >
                Buy Course
              </button>
              <button className="w-full py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="inline h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Wishlist
              </button>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 14l-4-4-4 4m0 6l4-4 4 4" />
                  </svg>
                  <span>{course.lessons.length} Aulas</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5L6 9H2v6h4l5 4V5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.54 8.46a5 5 0 010 7.07" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.07 4.93a9 9 0 010 14.14" />
                  </svg>
                  <span>Português</span>
                </li>
              </ul>
            </div>
          </div>
          {/* Title & Meta below header */}
          <div className="mt-8">
            <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
            <p className="text-sm text-gray-600 mb-4">by {course.instructor}</p>
            <div className="text-gray-700 leading-relaxed">{course.description}</div>
          </div>

          {/* Tabs */}
          <div className="mt-8">
            <div className="flex space-x-8 border-b">
              <button
                onClick={() => setActiveTab('description')}
                className={`pb-2 ${activeTab === 'description'
                  ? 'border-b-2 border-blue-600 font-semibold'
                  : 'text-gray-500'}`}
              >
                Descrição
              </button>
              <button
                onClick={() => setActiveTab('lessons')}
                className={`pb-2 ${activeTab === 'lessons'
                  ? 'border-b-2 border-blue-600 font-semibold'
                  : 'text-gray-500'}`}
              >
                Aulas
              </button>
            </div>
            <div className="mt-6">
              {activeTab === 'description' && (
                <div className="text-gray-700 leading-relaxed">
                  {course.description}
                </div>
              )}
              {activeTab === 'lessons' && (
                <div className="space-y-4">
                  {course.lessons.map((lesson, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-4 rounded-lg shadow"
                    >
                      <div className="flex justify-between items-center">
                        <h4
                          onClick={() => toggleLesson(idx)}
                          className="text-gray-900 cursor-pointer flex-1"
                        >
                          {lesson.title}
                        </h4>
                        {enrolled ? (
                          <button className="p-2 bg-gradient-to-br from-[#DEA54B]/90 to-[#D27D2D]/80 text-white rounded-full hover:opacity-90 transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-5.197-3.03A1 1 0 008 9.029v5.942a1 1 0 001.555.832l5.197-3.03a1 1 0 000-1.664z" />
                            </svg>
                          </button>
                        ) : (
                          <div className="p-2 text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.657 0 3-1.343 3-3V6a3 3 0 10-6 0v2c0 1.657 1.343 3 3 3zm-4 0v2a4 4 0 108 0v-2" />
                            </svg>
                          </div>
                        )}
                      </div>
                      {expandedLesson === idx && (
                        <p className="mt-2 text-gray-600">
                          {lesson.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetailPage; 