import PropTypes from 'prop-types';
import useTranslation from '../../hooks/useTranslation';

function ContentInput({ value, onChange, disabled }) {
  const { t } = useTranslation();

  return (
    <div>
      <label htmlFor="body" className="text-foreground mb-1 block text-sm font-medium">
        {t('noteContent')}
      </label>

      <textarea
        id="body"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={t('noteContentPlaceholder')}
        className="bg-background border-input text-foreground focus:ring-primary/50 min-h-[300px] w-full rounded-md border px-3 py-2 focus:ring-2 focus:outline-none"
        disabled={disabled}
        rows={10}
      ></textarea>
    </div>
  );
}

ContentInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

ContentInput.defaultProps = {
  disabled: false,
};

export default ContentInput;
