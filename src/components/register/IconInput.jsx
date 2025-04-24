import PropTypes from 'prop-types';

function IconInput({
  id,
  name,
  type,
  value,
  onChange,
  label,
  placeholder,
  icon: Icon,
  disabled,
  required,
  autoComplete,
  rightElement,
}) {
  return (
    <div>
      <label htmlFor={id} className="text-foreground mb-1 block text-sm font-medium">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Icon className="text-muted-foreground h-5 w-5" />
          </div>
        )}
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          disabled={disabled}
          className={`${Icon ? 'pl-10' : 'pl-3'} bg-background border-input text-foreground focus:ring-primary/50 w-full rounded-md border px-3 py-2 focus:ring-2 focus:outline-none`}
          placeholder={placeholder}
          required={required}
        />
        {rightElement}
      </div>
    </div>
  );
}

IconInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  icon: PropTypes.elementType,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  autoComplete: PropTypes.string,
  rightElement: PropTypes.node,
};

IconInput.defaultProps = {
  type: 'text',
  disabled: false,
  required: false,
};

export default IconInput;
