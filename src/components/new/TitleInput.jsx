import PropTypes from 'prop-types';
import useTranslation from '../../hooks/useTranslation';

function TitleInput({ value, onChange, disabled, maxChars }) {
  const { t } = useTranslation();

  const remainingChars = maxChars - value.length;
  const isLimitReached = remainingChars <= 0;

  const handleChange = e => {
    const newValue = e.target.value;
    if (newValue.length <= maxChars) {
      onChange(newValue);
    }
  };

  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <label htmlFor="title" className="text-foreground block text-sm font-medium">
          {t('noteTitle')}
        </label>
        <span
          className={`text-xs ${isLimitReached ? 'text-destructive' : 'text-muted-foreground'}`}
        >
          {remainingChars} {t('remainingChars')}
        </span>
      </div>

      <input
        id="title"
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={t('noteTitlePlaceholder')}
        className="bg-background border-input text-foreground focus:ring-primary/50 w-full rounded-md border px-3 py-2 focus:ring-2 focus:outline-none"
        disabled={disabled}
        required
      />
    </div>
  );
}

TitleInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  maxChars: PropTypes.number,
};

TitleInput.defaultProps = {
  disabled: false,
  maxChars: 50,
};

export default TitleInput;
