import PropTypes from 'prop-types';

function AuthFormHeader({ title, subtitle }) {
  return (
    <div className="mb-8 flex flex-col items-center">
      <h1 className="text-foreground mb-2 text-3xl font-bold">{title}</h1>
      <p className="text-muted-foreground text-center">{subtitle}</p>
    </div>
  );
}

AuthFormHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default AuthFormHeader;
