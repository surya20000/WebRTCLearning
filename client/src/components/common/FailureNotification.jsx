import { useEffect, useState } from "react";

const FailureNotification = ({ message, onClose }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false); // Hide the notification after 3 seconds
      setTimeout(() => onClose(), 500); // Give time for exit animation before closing
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    show && (
      <div className="fixed inset-0 flex items-start justify-center">
        <div className="animate-slideInOut bg-white rounded-lg border-gray-300 border p-3 shadow-lg">
          <div className="flex flex-row">
            <div className="px-2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="red"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="red"
                  fill="transparent"
                />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </div>
            <div className="ml-2 mr-6">
              <span className="font-semibold">
                {message}
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default FailureNotification;
