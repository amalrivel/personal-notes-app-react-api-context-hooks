import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FiCheckCircle, FiXCircle, FiAlertCircle, FiInfo, FiX } from 'react-icons/fi';

function AlertMessage({
  message,
  type = 'success',
  onClose,
  autoClose = false,
  autoCloseTime = 5000,
}) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (autoClose && isVisible) {
      const timer = setTimeout(() => {
        handleClose();
      }, autoCloseTime);

      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseTime, isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      setTimeout(() => {
        onClose();
      }, 300);
    }
  };

  if (!message || !isVisible) return null;

  let bgColor, textColor, borderColor, Icon, accentColor;

  switch (type) {
    case 'success':
      bgColor = 'bg-green-50 dark:bg-green-900/20';
      textColor = 'text-green-800 dark:text-green-200';
      borderColor = 'border-l-4 border-green-500';
      accentColor = 'bg-green-500';
      Icon = FiCheckCircle;
      break;
    case 'error':
      bgColor = 'bg-red-50 dark:bg-red-900/20';
      textColor = 'text-red-800 dark:text-red-200';
      borderColor = 'border-l-4 border-red-500';
      accentColor = 'bg-red-500';
      Icon = FiXCircle;
      break;
    case 'warning':
      bgColor = 'bg-amber-50 dark:bg-amber-900/20';
      textColor = 'text-amber-800 dark:text-amber-200';
      borderColor = 'border-l-4 border-amber-500';
      accentColor = 'bg-amber-500';
      Icon = FiAlertCircle;
      break;
    case 'info':
    default:
      bgColor = 'bg-blue-50 dark:bg-blue-900/20';
      textColor = 'text-blue-800 dark:text-blue-200';
      borderColor = 'border-l-4 border-blue-500';
      accentColor = 'bg-blue-500';
      Icon = FiInfo;
  }

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={` ${bgColor} ${borderColor} ${textColor} animate-in slide-in-from-top-5 fade-in relative mb-6 flex items-center rounded-md px-4 py-3 shadow-sm duration-300`}
    >
      <div className={`${accentColor} absolute top-0 left-0 h-full w-1 rounded-l-md`}></div>
      <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
      <div className="flex-1 text-sm">
        {message}
        {autoClose && (
          <div className="mt-1 w-full">
            <div
              className={`h-1 ${accentColor} animate-progress rounded-full`}
              style={{ animationDuration: `${autoCloseTime}ms` }}
            ></div>
          </div>
        )}
      </div>
      {onClose && (
        <button
          onClick={handleClose}
          className={`ml-3 rounded-full p-1.5 hover:${bgColor} hover:bg-opacity-80 transition-colors`}
          aria-label="Close"
        >
          <FiX className={textColor} size={16} />
        </button>
      )}
    </div>
  );
}

AlertMessage.propTypes = {
  message: PropTypes.string,
  type: PropTypes.oneOf(['success', 'error', 'warning', 'info']),
  onClose: PropTypes.func,
  autoClose: PropTypes.bool,
  autoCloseTime: PropTypes.number,
};

export default AlertMessage;
