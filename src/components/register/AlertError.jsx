import PropTypes from 'prop-types';
import { FiAlertCircle } from 'react-icons/fi';

function AlertError({ message }) {
  if (!message) return null;

  return (
    <div className="bg-destructive/10 border-destructive text-destructive mb-6 flex items-center rounded-md border px-4 py-3">
      <FiAlertCircle className="mr-2 h-5 w-5" />
      <p>{message}</p>
    </div>
  );
}

AlertError.propTypes = {
  message: PropTypes.string,
};

export default AlertError;
