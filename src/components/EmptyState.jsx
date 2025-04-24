import PropTypes from 'prop-types';

function EmptyState({ icon, title, description, action }) {
  return (
    <div className="flex w-full flex-col items-center justify-center py-16 text-center">
      <div className="mb-4">{icon}</div>
      <h2 className="text-foreground mb-2 text-xl font-semibold">{title}</h2>
      <p className="text-muted-foreground mb-6 max-w-md">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
}

EmptyState.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  action: PropTypes.node,
};

export default EmptyState;
