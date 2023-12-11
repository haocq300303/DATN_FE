import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "~/Redux/store";
import { routes } from "~/routes";

function PrivateLayout({ children }: any) {
  const role_name = useSelector((state: RootState) => state.user.role_name);

  if (role_name !== "admin") {
    return children;
  }
  return <Navigate to={routes.notfound} />;
}

export default PrivateLayout;
