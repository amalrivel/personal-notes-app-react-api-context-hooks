import useLocale from '../../hooks/useLocale';
import { showFormattedDate } from '../../utils';
import PropTypes from 'prop-types';

function NoteContent({ title, body, createdAt }) {
  const { locale } = useLocale();

  return (
    <div className="p-6">
      <h1 className="text-foreground mb-2 text-2xl font-bold">{title}</h1>

      <time className="text-muted-foreground mb-4 block text-sm">
        {showFormattedDate(createdAt, locale)}
      </time>

      <div className="prose dark:prose-invert max-w-none">
        <p className="text-foreground whitespace-pre-line">{body}</p>
      </div>
    </div>
  );
}

NoteContent.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default NoteContent;
