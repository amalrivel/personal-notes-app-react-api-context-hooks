import PropTypes from 'prop-types';
import NoteItem from './NoteItem';

function NoteList({ notes }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {notes.map(note => (
        <NoteItem key={note.id} note={note} />
      ))}
    </div>
  );
}

NoteList.propTypes = {
  notes: PropTypes.array.isRequired,
};

export default NoteList;
