import { FiInfo } from 'react-icons/fi';
import PropTypes from 'prop-types';

function ErrorMessage({ message }) {
  return (
    <div className="bg-destructive/10 border-destructive text-destructive w-full rounded-md border px-4 py-3">
      <p className="flex items-center gap-2">
        <FiInfo className="h-5 w-5" />
        <span>{message}</span>
      </p>
    </div>
  );
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorMessage;
