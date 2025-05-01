import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import doctorProfile from '../images/doctor-profile.jpg';
import LoadingSpinner from './LoadingSpinner';
import ReactPlayer from 'react-player';

const CourseDetailPage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('description');
  const [user, setUser] = useState(null);
  const [enrolled, setEnrolled] = useState(false);
  const [expandedLesson, setExpandedLesson] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState([]);

  const toggleLesson = (idx) => {
    setExpandedLesson(expandedLesson === idx ? null : idx);
  };

  const markLessonComplete = async (lessonId) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await fetch('/api/auth/mark-complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ lessonId }),
      });

      if (!res.ok) throw new Error('Failed to mark lesson as complete');

      const data = await res.json();
      setCompletedLessons(data.completedLessons);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleLessonCompletion = async (lessonId) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const isCompleted = completedLessons.includes(lessonId);
      const endpoint = isCompleted ? '/api/auth/mark-not-complete' : '/api/auth/mark-complete';

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ lessonId }),
      });

      if (!res.ok) throw new Error('Failed to toggle lesson completion');

      const data = await res.json();
      setCompletedLessons(data.completedLessons);
    } catch (err) {
      console.error(err);
    }
  };

  const calculateProgress = () => {
    if (!course || !course.lessons || course.lessons.length === 0) return 0;
    const completedCount = course.lessons.filter(lesson => completedLessons.includes(lesson._id)).length;
    return Math.round((completedCount / course.lessons.length) * 100);
  };

  const calculatePreviousPrice = () => {
    if (!course || !course.price || !course.discount) return null;
    return (course.price / (1 - course.discount / 100)).toFixed(2);
  };

  const progress = calculateProgress();
  const previousPrice = calculatePreviousPrice();

  const moveToNextLesson = () => {
    if (selectedLesson < course.lessons.length - 1) {
      setSelectedLesson(selectedLesson + 1);
    }
  };

  useEffect(() => {
    if (user) {
      setCompletedLessons(user.completedLessons || []);
    }
  }, [user]);

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

  useEffect(() => {
    if (enrolled) {
      setActiveTab('lessons');
    } else {
      setActiveTab('description');
    }
  }, [enrolled]);


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
          <div className="text-center text-red-500">Erro: {error}</div>
        </div>
      ) : (
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* Video Preview */}
            <div className="md:col-span-2 relative rounded-lg overflow-hidden">
              {/* 16:9 aspect-ratio box */}
              <div className="relative w-full pb-[56.25%]">
                {enrolled ? (
                  <ReactPlayer
                    url={course.lessons[selectedLesson]?.videoUrl}
                    controls
                    width="100%"
                    height="100%"
                    light={course.thumbnail || doctorProfile}
                    playing={false}
                    className="absolute top-0 left-0"
                  />
                ) : (
                  <img
                    src={course.thumbnail || doctorProfile}
                    alt="Course thumbnail"
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {!enrolled && (
                  <div className="bg-black bg-opacity-50 p-4 rounded-full">
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
                <div className="flex justify-between items-center">
                  <span className="text-black-500 text-xl font-bold">
                    {course.title}
                  </span>
                  {!enrolled && course.discount > 0 && (
                    <span className="bg-gradient-to-br from-[#DEA54B]/90 to-[#D27D2D]/80 text-white text-xs font-semibold px-2 py-1 rounded">
                      {course.discount}% DESCONTO
                    </span>
                  )}
                </div>
                { !enrolled && (
                  <>
                    {previousPrice > 0 && (
                      <div>
                        <span className="text-gray-500 line-through text-lg">
                          €{previousPrice}
                        </span>
                      </div>
                    )}
                    <div className="text-2xl font-bold text-gray-900">
                      €{course.price.toFixed(2)}
                    </div>
                  </>
                )}
              </div>
              { !enrolled && (
                <button
                  onClick={handleCheckout}
                  className="w-full py-3 bg-gradient-to-br from-[#DEA54B]/90 to-[#D27D2D]/80 text-white rounded-md font-semibold shadow hover:opacity-90 transition"
                >
                  Comprar Formação
                </button>
              )}
              {!enrolled && (
                <><button className="w-full py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition">
                      <svg xmlns="http://www.w3.org/2000/svg" className="inline h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      Adicionar À Lista De Desejos
                    </button>
                    <div className="flex flex-col items-center justify-end"> 
                    <img
                          src={course.instructorImage || doctorProfile}
                          alt={course.instructor}
                          className="w-16 h-16 rounded-full object-cover mt-10 border-1 border-transparent bg-gradient-to-br from-[#DEA54B]/90 to-[#D27D2D]/80 p-1" />
                        <div className="text-center">
                          <h3 className="text-lg font-bold text-gray-900">{course.instructor}</h3>
                          <p className="text-sm text-gray-600">{course.instructorBio || 'Especialista em Osteopatia Pediátrica'}</p>
                        </div>
                      </div>
                      </>
              )}
              {enrolled && (
                <div className="mt-4">
                  <ul className="space-y-1 text-sm text-gray-800">
                    {course.lessons.map((lesson, idx) => (
                      <li
                        key={idx}
                        className={`relative flex justify-between items-center cursor-pointer p-2 rounded hover:bg-gray-100 ${selectedLesson === idx ? 'bg-gray-100 font-medium' : ''}`}
                        onClick={() => setSelectedLesson(idx)}
                      >
                        {completedLessons.includes(course.lessons[idx]?._id) && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-2 h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                        <div className="flex items-center pl-6">
                          <span>{idx + 1}. {lesson.title}</span>
                        </div>
                        <button
                          onClick={() => setSelectedLesson(idx)}
                          className="ml-2 text-gray-500 hover:text-gray-700"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-5.197-3.03A1 1 0 008 9.029v5.942a1 1 0 001.555.832l5.197-3.03a1 1 0 000-1.664z" />
                          </svg>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {/* Progress Bar */}
              {enrolled && (
                <>
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div
                        className="bg-green-500 h-4 rounded-full"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{progress}% completado</p>
                  </div>
                  <div className="text-right">
                    <button
                      onClick={() => {
                        toggleLessonCompletion(course.lessons[selectedLesson]?._id);
                        if (!completedLessons.includes(course.lessons[selectedLesson]?._id)) {
                          moveToNextLesson();
                        }
                      }}
                      className={`mt-4 py-2 px-4 rounded-md text-right ${completedLessons.includes(course.lessons[selectedLesson]?._id) ? 'bg-gray-500 text-white' : 'bg-green-500 text-white'}`}
                    >
                      {completedLessons.includes(course.lessons[selectedLesson]?._id) ? 'Anular' : 'Completar aula'}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
          {/* Title & Meta below header */}
          <div className="mt-8">
            <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
            <p className="text-sm text-gray-600 mb-4">Formador: <span className="text-sm font-bold text-gray-600 mb-4">{course.instructor}</span></p>
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
                {enrolled ? 'Aula' : 'Aulas'}
              </button>
            </div>
            <div className="mt-6">
              {activeTab === 'description' && (
                <div className="text-gray-700 leading-relaxed">
                  {enrolled ? course.studentDescription : course.description}
                </div>
              )}
              {activeTab === 'lessons' && (
                <div className="space-y-4">
                  {enrolled ? (
                    // Show selected lesson content
                    <div className="bg-white p-4 rounded-lg shadow">
                      <h4 className="text-gray-900 font-semibold">
                        {course.lessons[selectedLesson]?.title}
                      </h4>
                      <p className="mt-2 text-gray-600">
                        {course.lessons[selectedLesson]?.studentDescription}
                      </p>
                    </div>
                  ) : (
                    // Non-enrolled: show list with locks/play buttons
                    course.lessons.map((lesson, idx) => (
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
                          <div className="p-2 text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.657 0 3-1.343 3-3V6a3 3 0 10-6 0v2c0 1.657 1.343 3 3 3zm-4 0v2a4 4 4 0 108 0v-2" />
                            </svg>
                          </div>
                        </div>
                        {expandedLesson === idx && (
                          <p className="mt-2 text-gray-600">
                            {lesson.description}
                          </p>
                        )}
                      </div>
                    ))
                  )}
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