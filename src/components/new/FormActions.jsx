import PropTypes from 'prop-types';
import { FiSave, FiX } from 'react-icons/fi';
import useTranslation from '../../hooks/useTranslation';

function FormActions({ onCancel, isSubmitDisabled, isProcessing }) {
  const { t } = useTranslation();

  return (
    <div className="flex justify-end gap-3">
      <button
        type="button"
        onClick={onCancel}
        className="border-input bg-background text-foreground hover:bg-muted flex items-center gap-2 rounded-md border px-4 py-2 transition-colors"
        disabled={isProcessing}
      >
        <FiX />
        {t('cancel')}
      </button>

      <button
        type="submit"
        disabled={isSubmitDisabled}
        className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2 rounded-md px-4 py-2 transition-colors disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isProcessing ? (
          <>
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
            {t('saving')}
          </>
        ) : (
          <>
            <FiSave />
            {t('saveNote')}
          </>
        )}
      </button>
    </div>
  );
}

FormActions.propTypes = {
  onCancel: PropTypes.func.isRequired,
  isSubmitDisabled: PropTypes.bool.isRequired,
  isProcessing: PropTypes.bool.isRequired,
};

export default FormActions;
