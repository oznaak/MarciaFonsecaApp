import React from 'react';

// A generic loading spinner
const LoadingSpinner = () => (
  <div className="flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-gray-300 border-t-[#DEA54B] rounded-full animate-spin" />
  </div>
);

export default LoadingSpinner; 