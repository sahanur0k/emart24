import React from 'react';

const LoadingSpinner = ({ 
  size = 'medium', 
  color = 'primary', 
  text = '', 
  fullScreen = false,
  className = '' 
}) => {
  // Size configurations
  const sizeClasses = {
    small: 'h-6 w-6',
    medium: 'h-12 w-12',
    large: 'h-16 w-16',
    xlarge: 'h-20 w-20'
  };

  // Color configurations
  const colorClasses = {
    primary: 'text-yellow-500',
    secondary: 'text-gray-600',
    blue: 'text-blue-500',
    red: 'text-red-500',
    green: 'text-green-500'
  };

  // Modern pulse animation loader
  const PulseLoader = () => (
    <div className="flex space-x-2">
      <div className={`${sizeClasses[size]} ${colorClasses[color]} animate-pulse`}>
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );

  // Modern spinning loader with gradient
  const SpinLoader = () => (
    <div className={`${sizeClasses[size]} relative`}>
      <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
      <div className={`absolute inset-0 rounded-full border-4 border-transparent border-t-yellow-500 border-r-yellow-400 animate-spin`}></div>
      <div className="absolute inset-2 rounded-full bg-gradient-to-br from-yellow-100 to-yellow-50 animate-pulse"></div>
    </div>
  );

  // Modern wave loader
  const WaveLoader = () => (
    <div className="flex items-end space-x-1">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className={`w-2 bg-gradient-to-t from-yellow-500 to-yellow-300 rounded-full animate-pulse`}
          style={{
            height: `${12 + (i % 3) * 8}px`,
            animationDelay: `${i * 100}ms`,
            animationDuration: '1s'
          }}
        ></div>
      ))}
    </div>
  );

  // EMART24 branded loader
  const BrandedLoader = () => (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <div className={`${sizeClasses[size]} rounded-full border-4 border-yellow-200 animate-spin`}>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-yellow-500 border-r-yellow-400"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 bg-yellow-500 rounded-full animate-ping opacity-75"></div>
        </div>
      </div>
      {text && (
        <div className="text-center">
          <p className="text-gray-600 font-medium">{text}</p>
          <div className="flex justify-center mt-2">
            <div className="flex space-x-1">
              <div className="w-1 h-1 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-1 h-1 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-1 h-1 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const LoaderComponent = () => (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <BrandedLoader />
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 backdrop-blur-sm z-50 flex items-center justify-center">
        <LoaderComponent />
      </div>
    );
  }

  return <LoaderComponent />;
};

// Export different loader variants
export const SimpleSpinner = ({ size = 'medium', className = '' }) => (
  <div className={`animate-spin rounded-full border-4 border-gray-200 border-t-yellow-500 ${
    size === 'small' ? 'h-6 w-6' : 
    size === 'large' ? 'h-16 w-16' : 'h-12 w-12'
  } ${className}`}></div>
);

export const PulseLoader = ({ className = '' }) => (
  <div className={`flex space-x-2 ${className}`}>
    <div className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
    <div className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
    <div className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
  </div>
);

export const PageLoader = ({ text = 'Loading...' }) => (
  <div className="flex justify-center items-center py-20">
    <LoadingSpinner size="large" text={text} />
  </div>
);

export default LoadingSpinner;
