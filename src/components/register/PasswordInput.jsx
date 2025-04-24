import { useState } from 'react';
import PropTypes from 'prop-types';
import { FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import IconInput from './IconInput';

function PasswordInput({
  id,
  name,
  value,
  onChange,
  label,
  placeholder,
  disabled,
  required,
  autoComplete,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const toggleButton = (
    <button
      type="button"
      className="absolute inset-y-0 right-0 flex items-center pr-3"
      onClick={togglePasswordVisibility}
      tabIndex="-1"
    >
      {showPassword ? (
        <FiEyeOff className="text-muted-foreground h-5 w-5" />
      ) : (
        <FiEye className="text-muted-foreground h-5 w-5" />
      )}
    </button>
  );

  return (
    <IconInput
      id={id}
      name={name}
      type={showPassword ? 'text' : 'password'}
      value={value}
      onChange={onChange}
      label={label}
      placeholder={placeholder}
      icon={FiLock}
      disabled={disabled}
      required={required}
      autoComplete={autoComplete}
      rightElement={toggleButton}
    />
  );
}

PasswordInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  autoComplete: PropTypes.string,
};

export default PasswordInput;
