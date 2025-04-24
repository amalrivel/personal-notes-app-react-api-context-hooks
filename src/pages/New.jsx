import { useState } from 'react';
import { useNavigate } from 'react-router';
import useTranslation from '../hooks/useTranslation';
import { useNoteActions } from '../hooks/useNotes';
import ErrorMessage from '../components/ErrorMessage';
import TitleInput from '../components/new/TitleInput';
import ContentInput from '../components/new/ContentInput';
import FormActions from '../components/new/FormActions';

function New() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { createNote, isProcessing } = useNoteActions();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState(null);

  const maxTitleChars = 50;
  const isTitleEmpty = title.trim() === '';
  const isTitleLimitReached = title.length >= maxTitleChars;

  const handleSubmit = async e => {
    e.preventDefault();

    if (title.trim() === '') {
      setError(t('titleRequired'));
      return;
    }

    setError(null);

    try {
      const { error } = await createNote({ title, body });

      if (error) {
        setError(error);
      } else {
        navigate('/', { state: { message: t('noteAdded') } });
      }
    } catch (err) {
      setError(t('errorAddingNote'));
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-foreground text-2xl font-bold">{t('addNote')}</h1>
      </div>

      {error && <ErrorMessage message={error} />}

      <form onSubmit={handleSubmit} className="space-y-6">
        <TitleInput
          value={title}
          onChange={setTitle}
          disabled={isProcessing}
          maxChars={maxTitleChars}
        />

        <ContentInput value={body} onChange={setBody} disabled={isProcessing} />

        <FormActions
          onCancel={handleCancel}
          isSubmitDisabled={isProcessing || isTitleLimitReached || isTitleEmpty}
          isProcessing={isProcessing}
        />
      </form>
    </div>
  );
}

export default New;
