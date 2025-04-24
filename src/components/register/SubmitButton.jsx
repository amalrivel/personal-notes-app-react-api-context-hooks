import PropTypes from 'prop-types';

function SubmitButton({ isLoading, loadingText, text }) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary/50 w-full rounded-md px-4 py-2 transition-colors focus:ring-2 focus:outline-none disabled:opacity-60"
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
          <span>{loadingText}</span>
        </div>
      ) : (
        text
      )}
    </button>
  );
}

SubmitButton.propTypes = {
  isLoading: PropTypes.bool,
  loadingText: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

SubmitButton.defaultProps = {
  isLoading: false,
};

export default SubmitButton;
