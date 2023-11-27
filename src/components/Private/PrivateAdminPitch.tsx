import { Navigate } from 'react-router-dom';
import { routes } from '~/routes';
import { checkAdminPitch } from '~/utils/auth';

function PrivateAdminPitch({ children }: any) {
  if (!checkAdminPitch()) {
    return <Navigate to={routes.home} />;
  }
  return children;
}

export default PrivateAdminPitch;
