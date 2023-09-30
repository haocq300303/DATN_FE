import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import DashboardPage from "./pages/Admin/Dashboard/DashboardPage";
import AdminLayout from "./layouts/AdminLayout";
import PostAdd from "./pages/Admin/Post/PostAdd/PostAdd";
import PostManagement from "./pages/Admin/Post/PostManagement/PostManagement";
import BannerManagement from './pages/Admin/Banner/BannerManagement/BannerManagement';
import BannerAdd from "./pages/Admin/Banner/BannerAdd/BannerAdd";
import ServiceManagement from "./pages/Admin/Service/ServiceManagement/ServiceManagement";
import ServiceAdd from "./pages/Admin/Service/ServiceAdd/ServiceAdd";
import BannerUpdate from "./pages/Admin/Banner/BannerUpdate/BannerUpdate";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.register} element={<Register />} />
        <Route index path={routes.login} element={<Login />} />
        {/* Admin */}
        <Route path={routes.admin} element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path={routes.post} element={<PostManagement />} />
          <Route path={routes.postAdd} element={<PostAdd />} />
          <Route path={routes.banner} element={<BannerManagement />} />
          <Route path={routes.bannerAdd} element={<BannerAdd />} />
          <Route path={routes.bannerUpdate} element={<BannerUpdate />} />
          <Route path={routes.service} element={<ServiceManagement />} />
          <Route path={routes.serviceAdd} element={<ServiceAdd />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
