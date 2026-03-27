const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative w-16 h-16">
        {/* Outer spinner */}
        <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>

        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
        </div>
      </div>
      <p className="ml-4 text-gray-600 font-medium">Loading...</p>
    </div>
  );
};

export default Loader;