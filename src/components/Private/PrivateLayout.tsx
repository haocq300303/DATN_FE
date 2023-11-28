import { Navigate } from 'react-router-dom';
import { routes } from '~/routes';
import { checkAdmin } from '~/utils/auth';

function PrivateLayout({ children }: any) {
  if (!checkAdmin()) {
    return <Navigate to={routes.home} />;
  }
  return children;
}

export default PrivateLayout;
