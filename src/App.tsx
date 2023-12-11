import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import Home from "./pages/Home/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import DashboardPage from "./pages/Admin/Dashboard/DashboardPage";
import AdminLayout from "./layouts/AdminLayout";
import PostAdd from "./pages/Admin/Post/PostAdd/PostAdd";
import PostManagement from "./pages/Admin/Post/PostManagement/PostManagement";
import BannerManagement from "./pages/Admin/Banner/BannerManagement/BannerManagement";
import ServiceManagement from "./pages/Admin/Service/ServiceManagement/ServiceManagement";
import CommentManagement from "./pages/Admin/Comment/CommentManagement/CommentManagement";
import MainLayout from "./layouts/MainLayout";
import LayoutPage from "./components/LayoutPage";
import PitchList from "./pages/Admin/Pitch/PitchList";
import LocationList from "./pages/Admin/Location/LocationList";
import PaymentAdminPage from "./pages/Admin/Payment";
import BookingAdminPage from "./pages/Admin/Booking";
import PitchPage from "./pages/PitchPage/pitchPage";
import PitchDetailPage from "./pages/PitchDetailPage";
import BookingPage from "./pages/main/Booking";
import BookingHistoryPage from "./pages/main/BookingHistory";
import ChildrentPitch from "./pages/Admin/ChildrentPitch/ChildrentPitch";
import PostPage from "./pages/PostPage/PostPage";
import PostDetailPage from "./pages/PostDetailPage/PostDetailPage";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Shift from "./pages/Admin/shift/shift";
import FindOpponentPage from "./pages/FindOpponent/FindOpponentPage";
import VerifyOtp from "./pages/VerifyOtp";
import NotFound from "./pages/NotFound";
import PrivateLayout from "./components/Private/PrivateLayout";
import PrivateAdminPitch from "./components/Private/PrivateAdminPitch";
import AdminPitchLayout from "./layouts/AdminPitchLayout";
import { useDispatch } from "react-redux";
import { saveUserValues } from "./Redux/Slices/userSlice";
import jwtDecode from "jwt-decode";
import DashboardPitchPage from "./pages/Admin/DashboardPitch/DashboardPitchpage";

function App() {
    const dispatch = useDispatch();
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
        const decode: any = jwtDecode(accessToken);
        dispatch(
            saveUserValues({
                accessToken: accessToken,
                values: decode,
                role_name: decode.role_name,
            })
        );
    }
    return (
        <Router>
            <Routes>
                <Route path={routes.home} element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path={routes.about} element={<About />} />
                    <Route path={routes.contact} element={<Contact />} />
                </Route>

                <Route path="/" element={<LayoutPage />}>
                    <Route index path={routes.checkout} element={<BookingPage />} />
                    <Route index path={routes.bookingHistory} element={<BookingHistoryPage />} />
                </Route>
                {/* Pitch Page */}
                <Route path="/pitch" element={<LayoutPage />}>
                    <Route index path={routes.pitch_client} element={<PitchPage />} />
                    <Route path={routes.pitch_detail} element={<PitchDetailPage />} />
                    <Route path={routes.find_opponent} element={<FindOpponentPage />} />
                </Route>
                <Route path="/post" element={<LayoutPage />}>
                    <Route index path={routes.post_client} element={<PostPage />} />
                    <Route path={routes.post_detail} element={<PostDetailPage />} />
                </Route>
                {/* Admin */}
                <Route
                    path={routes.admin}
                    element={
                        <PrivateLayout>
                            <AdminLayout />
                        </PrivateLayout>
                    }
                >
                    <Route index path={routes.post} element={<PostManagement />} />
                    <Route path={routes.postAdd} element={<PostAdd />} />
                    <Route path={routes.banner} element={<BannerManagement />} />
                    <Route path={routes.service} element={<ServiceManagement />} />
                    <Route path={routes.comment} element={<CommentManagement />} />
                    <Route path={routes.pitch} element={<PitchList />} />
                    <Route path={routes.childrenpitch} element={<ChildrentPitch />} />
                    <Route path={routes.location} element={<LocationList />} />
                    <Route path={routes.payment} element={<PaymentAdminPage />} />
                    <Route path={routes.booking} element={<BookingAdminPage />} />
                    <Route path={routes.shift} element={<Shift />} />
                </Route>
                <Route
                    path={routes.admin_pitch}
                    element={
                        <PrivateAdminPitch>
                            <AdminPitchLayout />
                        </PrivateAdminPitch>
                    }
                >
                    <Route index element={<DashboardPitchPage />} />
                    <Route path={routes.service_admin} element={<ServiceManagement />} />
                    <Route path={routes.pitch_admin} element={<PitchList />} />
                    <Route path={routes.childrenpitch_admin} element={<ChildrentPitch />} />
                    <Route path={routes.location_admin} element={<LocationList />} />
                    <Route path={routes.payment_admin} element={<PaymentAdminPage />} />
                    <Route path={routes.booking_admin} element={<BookingAdminPage />} />
                    <Route path={routes.shift_admin} element={<Shift />} />
                </Route>
                <Route path={routes.register} element={<Register />} />
                <Route index path={routes.login} element={<Login />} />
                <Route path={routes.verify} element={<VerifyOtp />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
