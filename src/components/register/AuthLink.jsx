import PropTypes from 'prop-types';
import { Link } from 'react-router';

function AuthLink({ text, linkText, to }) {
  return (
    <p className="text-muted-foreground text-center text-sm">
      {text}{' '}
      <Link to={to} className="text-primary hover:underline">
        {linkText}
      </Link>
    </p>
  );
}

AuthLink.propTypes = {
  text: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default AuthLink;
