import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { showFormattedDate } from '../utils';
import useLocale from '../hooks/useLocale';

function NoteItem({ note }) {
  const { locale } = useLocale();

  const formattedDate = showFormattedDate(note.createdAt, locale);

  return (
    <Link
      to={`/notes/${note.id}`}
      className="border-border hover:border-primary focus:ring-primary/50 group block h-full overflow-hidden rounded-md border transition-colors focus:ring-2 focus:outline-none"
    >
      <div className="flex h-full flex-col p-5">
        <h3 className="text-foreground group-hover:text-primary mb-2 line-clamp-2 text-lg font-semibold transition-colors">
          {note.title}
        </h3>

        <time className="text-muted-foreground mb-3 text-sm">{formattedDate}</time>

        <p className="text-foreground/80 line-clamp-4 flex-grow text-sm">{note.body}</p>
      </div>
    </Link>
  );
}

NoteItem.propTypes = {
  note: PropTypes.object.isRequired,
};

export default NoteItem;
