import { ThunderboltOutlined, RocketOutlined,  TeamOutlined} from '@ant-design/icons';
import './Home.css';
// import { Link } from 'react-router-dom';
const Home = () => {
    return (
        <>
            <div className='container'>
                <h1 className='text-center text-4xl font-semibold py-8'>ĐIỂM KHÁC BIỆT CỦA CHÚNG TÔI</h1>
            <div className="mx-auto p-5 Other-box-grid-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                    <div className="bg-white p-4 shadow-lg rounded-lg text-center">
                    <ThunderboltOutlined className='icon-antd'/>
                        <h2 className="text-xl font-semibold">ĐƠN GIẢN - DỄ SỬ DỤNG</h2>
                        <p>Giao diện thân thiện với người dùng. Thao tác đơn giản chỉ với 5p làm quen là có thể sử dụng phần mềm thành thạo.</p>
                    </div>

                    <div className="bg-white p-4 shadow-lg rounded-lg text-center">
                    <RocketOutlined  className='icon-antd'/>
                        <h2 className="text-xl font-semibold">TƯƠNG THÍCH VỚI MỌI THIẾT BỊ</h2>
                        <p>Phần mềm PosApp tương thích với mọi thiết bị như máy in, máy quét mã vạch, ngăn kéo đừng tiền, máy POS chuyên dụng...</p>
                    </div>
                    <div className="bg-white p-4 shadow-lg rounded-lg text-center">
                    <TeamOutlined  className='icon-antd'/>
                        <h2 className="text-xl font-semibold">ĐỘI NGŨ HỖ TRỢ KỸ THUẬT</h2>
                        <p>Đội ngũ nhân viên PosApp luôn sẵn sàng hỗ trợ kỹ thuật, tư vấn 7 ngày/tuần (từ 8h30-12h & 13h - 22h). Đặc biệt hỗ trợ nâng cấp phần mềm miễn phí</p>
                    </div>
                </div>
            </div>
            </div>

        </>
    );
};

export default Home;
