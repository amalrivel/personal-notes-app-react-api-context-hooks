import { Navigate } from 'react-router';
import PropTypes from 'prop-types';
import { useAuth } from '../hooks/useAuth';

function ProtectedRoute({ children }) {
  const { authUser, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="border-primary h-12 w-12 animate-spin rounded-full border-t-2 border-b-2"></div>
      </div>
    );
  }

  if (!authUser) {
    return <Navigate to="/" />;
  }

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
