import { Navigate } from "react-router-dom";
import { JwtDecode } from "../../utils/auth";
import { ReactNode } from "react";

interface MyComponentProps {
  children: ReactNode;
}

const PrivateRouter: React.FC<MyComponentProps> = ({ children }) => {
  if (JwtDecode()) return <Navigate to="/" />;
  return children;
};

export default PrivateRouter;
