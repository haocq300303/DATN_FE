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
import PaymentAdminPage from "./pages/Admin/Payment";
import BookingAdminPage from "./pages/Admin/Booking";
import BookingPage from "./pages/main/Booking";

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
                    <Route path={routes.paymentAdmin} element={<PaymentAdminPage />} />
                    <Route path={routes.bookingAdmin} element={<BookingAdminPage />} />
                </Route>
                <Route path={routes.bookingMain} element={<BookingPage />} />
            </Routes>
        </Router>
    );
}

export default App;
