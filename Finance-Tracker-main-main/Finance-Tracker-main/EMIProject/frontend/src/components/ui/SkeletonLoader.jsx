import React from 'react';

export const SkeletonLoader = ({ type = 'card' }) => {
  if (type === 'table') {
    return (
      <div className="animate-pulse space-y-3">
        <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded-xl w-full"></div>
        <div className="h-12 bg-gray-100 dark:bg-gray-800/60 rounded-xl w-full"></div>
        <div className="h-12 bg-gray-100 dark:bg-gray-800/60 rounded-xl w-full"></div>
        <div className="h-12 bg-gray-100 dark:bg-gray-800/60 rounded-xl w-full"></div>
      </div>
    );
  }

  return (
    <div className="animate-pulse bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 shadow-sm space-y-3">
      <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-md w-1/3"></div>
      <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded-lg w-2/3"></div>
      <div className="h-3 bg-gray-100 dark:bg-gray-800/60 rounded-md w-1/2"></div>
    </div>
  );
};
