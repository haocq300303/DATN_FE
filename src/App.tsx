import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import DashboardPage from "./pages/Admin/Dashboard/DashboardPage";
import AdminLayout from "./layouts/AdminLayout";
import PostAdd from "./pages/Admin/Post/PostAdd/PostAdd";
import PostManagement from "./pages/Admin/Post/PostManagement/PostManagement";
import CommentManagement from "./pages/Admin/Comment/CommentManagement/CommentManagement";
import PitchList from "./pages/Admin/Pitch/PitchList";
import LocationList from "./pages/Admin/Location/LocationList";
import PaymentAdminPage from "./pages/Admin/Payment";
import BookingAdminPage from "./pages/Admin/Booking";

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
          <Route path={routes.comment} element={<CommentManagement />} />
          <Route path={routes.pitch} element={<PitchList />} />
          <Route path={routes.location} element={<LocationList />} />
          <Route path={routes.payment} element={<PaymentAdminPage />} />
          <Route path={routes.booking} element={<BookingAdminPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
