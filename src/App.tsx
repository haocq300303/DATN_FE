import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import Home from "./pages/Home/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import DashboardPage from "./pages/Admin/Dashboard/DashboardPage";
import AdminLayout from "./layouts/AdminLayout";
import PostAdd from "./pages/Admin/Post/PostAdd/PostAdd";
import PostManagement from "./pages/Admin/Post/PostManagement/PostManagement";
import BannerManagement from './pages/Admin/Banner/BannerManagement/BannerManagement';
import ServiceManagement from "./pages/Admin/Service/ServiceManagement/ServiceManagement";
import CommentManagement from "./pages/Admin/Comment/CommentManagement/CommentManagement";
import MainLayout from "./layouts/MainLayout";


function App() {
  return (
    <Router>
      <Routes>
      <Route element={<MainLayout />}>
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.register} element={<Register />} />
        <Route index path={routes.login} element={<Login />} />
        </Route>
        {/* Admin */}
        <Route path={routes.admin} element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path={routes.post} element={<PostManagement />} />
          <Route path={routes.postAdd} element={<PostAdd />} />
          <Route path={routes.banner} element={<BannerManagement />} />
          <Route path={routes.service} element={<ServiceManagement />} />
          <Route path={routes.comment} element={<CommentManagement />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
