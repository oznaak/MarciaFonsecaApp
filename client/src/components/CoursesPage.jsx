import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import doctorProfile from '../images/doctor-profile.jpg';
import LoadingSpinner from './LoadingSpinner';

const calculateAverageRating = (ratings) => {
  if (!ratings || ratings.length === 0) return 0;
  const total = ratings.reduce((sum, rating) => sum + (rating.value || 0), 0);
  return total / ratings.length;
};

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/courses`)
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
                  <img
                    src={course.thumbnail || doctorProfile}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  {course.category && (
                    <div className="absolute top-2 left-2">
                      <span className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded">
                        {course.category}
                      </span>
                    </div>
                  )}
                  {course.discount > 0 && (
                    <div className="absolute top-2 right-2">
                      <span className="bg-gradient-to-br from-[#DEA54B]/90 to-[#D27D2D]/80 text-white text-xs font-semibold px-2 py-1 rounded">
                        {course.discount}% DESCONTO
                      </span>
                    </div>
                  )}
                </div>
                {/* Course info */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{course.title}</h3>
                  <div className="flex items-center text-sm text-gray-600 mb-4">
                    <span className="mr-4">📚 {course.lessonsCount || 0} Aulas</span>
                    <span>⏰ {Math.floor(course.duration / 60)}h {course.duration % 60}m</span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl font-semibold text-gray-900">€{course.price.toFixed(2)}</span>
                    {course.discount > 0 && (
                      <span className="text-sm text-gray-500 line-through">
                        €{(course.price / (1 - course.discount / 100)).toFixed(2)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center">
                    <img
                      src={course.instructorImage || doctorProfile}
                      alt={course.instructor}
                      className="w-8 h-8 rounded-full object-cover mr-2"
                    />
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">{course.instructor}</p>
                      <div className="ml-9 flex items-center">
                        {[...Array(5)].map((_, index) => (
                          <svg
                            key={index}
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-4 w-4 ${index < Math.floor(calculateAverageRating(course.ratings)) ? 'text-yellow-400' : 'text-gray-400'}`}
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.869 1.4-8.168L.132 9.21l8.2-1.192z" />
                          </svg>
                        ))}
                        <span className="text-sm text-gray-500 ml-1">({calculateAverageRating(course.ratings).toFixed(1)})</span>
                      </div>
                    </div>
                  </div>
                  {console.log('Course Ratings:', course.ratings)}
                  {console.log('Calculated Average Rating:', calculateAverageRating(course.ratings))}
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