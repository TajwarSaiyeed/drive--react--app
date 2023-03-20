function Loading() {
  return (
    <div className="flex items-center min-h-screen justify-center">
      <svg
        className="animate-spin h-5 w-5 text-gray-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-3.647zm10-5.291a7.962 7.962 0 01-2 5.291l3 3.647A7.963 7.963 0 0120 12h-4z"
        ></path>
      </svg>
    </div>
  );
}

export default Loading;
