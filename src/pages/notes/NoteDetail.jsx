import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import useTranslation from '../../hooks/useTranslation';
import ErrorMessage from '../../components/ErrorMessage';
import { useNoteDetail } from '../../hooks/useNotes';
import Loading from '../../components/Loading';
import NoteDetailHeader from '../../components/noteDetail/NoteDetailHeader';
import NoteContent from '../../components/noteDetail/NoteContent';
import NoteActions from '../../components/noteDetail/NoteActions';

function NoteDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { note, isLoading, error, loadNote, deleteNote, toggleArchive, isProcessing } =
    useNoteDetail(id);

  useEffect(() => {
    loadNote();
  }, [id]);

  const handleDelete = async () => {
    const confirmation = window.confirm(t('deleteConfirmation'));

    if (confirmation) {
      try {
        const { error } = await deleteNote(id);

        if (error) {
          alert(t('errorDeletingNote'));
        } else {
          navigate(-1, { state: { message: t('noteDeleted') } });
        }
      } catch (err) {
        alert(t('errorDeletingNote'));
      }
    }
  };

  const handleToggleArchive = async () => {
    try {
      if (note.archived) {
        const { error } = await toggleArchive(id);
        if (!error) {
          alert(t('noteUnarchived'));
        } else {
          alert(t('errorUnarchivingNote'));
        }
      } else {
        const { error } = await toggleArchive(id);
        if (!error) {
          alert(t('noteArchived'));
        } else {
          alert(t('errorArchivingNote'));
        }
      }
    } catch (err) {
      alert(note.archived ? t('errorUnarchivingNote') : t('errorArchivingNote'));
    }
  };

  if (isLoading) {
    return <Loading message={t('loadingNote')} className="h-64" />;
  }

  if (error || !note) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <ErrorMessage message={t('noteNotFound')} />
        <div className="mt-6">
          <NoteDetailHeader note={null} />
        </div>
      </div>
    );
  }

  return (
    <>
      <NoteDetailHeader note={note} />

      <div className="bg-card border-border overflow-hidden rounded-lg border">
        <NoteContent title={note.title} body={note.body} createdAt={note.createdAt} />

        <NoteActions
          note={note}
          onDelete={handleDelete}
          onToggleArchive={handleToggleArchive}
          isProcessing={isProcessing}
        />
      </div>
    </>
  );
}

export default NoteDetail;
