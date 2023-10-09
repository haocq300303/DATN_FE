import './Footer.css';
import { SafetyOutlined } from '@ant-design/icons';
const Footer = () => {
    return (
        <footer className="	bg-slate-100 text-dark">
            <div className="container py-8 px-16">
                <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-5 gap-8">
                    <div className="col-span-1">
                        <h5 className="text-xl font-semibold mb-4">Chính Sách</h5>
                        <ul className="list-none">
                            <li>
                                <a href="#">Chính sách bảo mật</a>
                            </li>
                            <li>
                                <a href="#">Điều khoản sử dụng</a>
                            </li>
                            <li>
                                <a href="#">Hướng dẫn đổi trả</a>
                            </li>
                            <li>
                                <a href="#">Cam kết chất lượng</a>
                            </li>
                            <li>
                                <a href="#">Giao hàng & Nhận hàng</a>
                            </li>
                            <li>
                                <a href="#">Đặt hàng & Thanh toán</a>
                            </li>
                            <li>
                                <a href="#">Tuyển dụng</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-span-1">
                        <h5 className="text-xl font-semibold mb-4">Hỗ Trợ</h5>
                        <ul className="list-none">
                            <li>
                                <a href="#">Liên hệ</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-span-1">
                        <h5 className="text-xl font-semibold mb-4">Thông Tin</h5>
                        <ul className="list-none">
                            <li>
                                <a href="#">Videos</a>
                            </li>
                            <li>
                                <a href="#">Liên hệ</a>
                            </li>
                            <li>
                                <a href="#">Trung tâm bảo hành</a>
                            </li>
                            <li>
                                <a href="#">Tin nội bộ</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-span-1">
                        <h5 className="text-xl font-semibold mb-4">Hợp Tác</h5>
                        <ul className="list-none">
                            <li>
                                <a href="#">Giới thiệu Thế Giới Thể Thao</a>
                            </li>
                            <li>
                                <a href="#">Hợp tác với nhà thầu</a>
                            </li>
                            <li>
                                <a href="#">Hợp tác các shop thể thao</a>
                            </li>
                            <li>
                                <a href="#">Hợp tác cầu thủ bóng đá</a>
                            </li>
                            <li>
                                <a href="#">Hợp tác các cụm thể thao</a>
                            </li>
                            <li>
                                <a href="#">Hợp tác với các giải đấu</a>
                            </li>
                            <li>
                                <a href="#">Hợp tác với các trường học</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-span-1 img-footer-o">
                        <img src="https://thegioithethao.vn/images/config/unnamed_1625469781.png" alt="" />
                        <img src="https://images.dmca.com/Badges/_dmca_premi_badge_5.png?ID=99e11c4a-f5ea-49ac-b028-9bf6e4563353" alt="" />
                    </div>
                </div>
            </div>
            <div className="container-sm mx-auto py-4">
                <div className="grid grid-cols-2 gap-8">
                    <div className="col-span-1 flex items-center gap-2">
                        <SafetyOutlined className="text-3xl" />
                        <div className="text-Encoding">
                            <h5 className="font-semibold text-xl">Giao dịch an toàn</h5>
                            <p>Mã hóa SSL an toàn</p>
                        </div>
                    </div>
                    <div className="col-span-1">
                        <img src="https://thegioithethao.vn/images/config/thanhtoan_1677577659.jpg" alt="" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
