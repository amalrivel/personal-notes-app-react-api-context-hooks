import PropTypes from 'prop-types';

function Loading({ message = '', className = '' }) {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="flex flex-col items-center gap-4">
        <div className="border-primary h-12 w-12 animate-spin rounded-full border-t-2 border-b-2"></div>
        {message && <p className="text-muted-foreground">{message}</p>}
      </div>
    </div>
  );
}

Loading.propTypes = {
  message: PropTypes.string,
  className: PropTypes.string,
};

export default Loading;
