import { DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Empty, Form, Image, Input, InputNumber, Select, Spin, message, } from "antd"
import { Option } from "antd/es/mentions";
import Dragger from "antd/es/upload/Dragger";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "~/Redux/hook";
import ModalForm from "~/components/ModalForm/ModalForm";
import { getUserPitch } from "~/api/pitch";
import { fetchUpdatePitch } from "~/Redux/Slices/pitchSlice";


const PitchUserList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("");
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [pitchs, setpitchs] = useState<any>({});
    const [imageList, setImageList] = useState([]);
    const [imageAvatar, setImageAvatar] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form] = Form.useForm();

    const dispatch = useAppDispatch();
    console.log("pitchs", pitchs);


    const host = "http://localhost:8080/api/location/";
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`${host}provinces`);
            setCities(response.data);
        };
        fetchData();
    }, []);
    useEffect(() => {
        try {
            setLoading(true);
            getUserPitch().then(({ data }) => {
                setpitchs(data.data);
                const dataImages = data.data?.images;
                setImageList(dataImages);
                const imageAvatar = data?.data?.avatar;
                setImageAvatar(imageAvatar);
                setLoading(false);
            });
        } catch (error) {
            console.log(error);
        }
    }, []);


    const showModal = (mode: string) => {
        setModalMode(mode);
        setIsModalOpen(true);
    };
    const handleCityChange = async (value: string) => {
        if (value !== "") {
            const response = await axios.get(`${host}districts?parent=${value}`);
            setDistricts(response.data);
        }
    };

    const handleDistrictChange = async (value: string) => {
        if (value !== "") {
            const response = await axios.get(`${host}wards?parent=${value}`);
            setWards(response.data);
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const uploadFiles = async (file: any) => {
        if (file) {
            const CLOUD_NAME = "dwp7umncy";
            const PRESET_NAME = "datn-img";
            const FOLDER_NAME = "datn-img";
            const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

            const formData = new FormData();
            formData.append("upload_preset", PRESET_NAME);
            formData.append("folder", FOLDER_NAME);
            formData.append("file", file);

            const response = await axios.post(api, formData);

            return response;
        }
    };
    const customRequest = async ({ file, onSuccess, onError }: any) => {
        try {
            // Gọi hàm tải lên ảnh của bạn và chờ kết quả
            const response = await uploadFiles(file);
            // Kiểm tra kết quả và xử lý tùy theo trạng thái tải lên
            if (response?.status === 200) {
                message.success(`${file.name} uploaded successfully`);
                onSuccess(response, file);
            } else {
                message.error(`${file.name} upload failed.`);
                onError(response);
            }
        } catch (error) {
            // Xử lý lỗi nếu có
            message.error("An error occurred while uploading the image.");
            onError(error);
        }
    };
    const fileList: any = imageList?.map((data, index) => ({
        uid: -index,
        name: data,
        status: 'done',
        url: data,
        thumbUrl: data,
    }));

    const fileAvatar: any[] = [
        {
            name: imageAvatar,
            status: 'done',
            url: imageAvatar,
            thumbUrl: imageAvatar,
        }
    ];


    const validateMessages = {
        required: "${label} chưa nhập!",
    };
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    const onFinish = async (values: any) => {
        if (modalMode === "edit") {
            console.log("values:", values);

            const images = values?.images?.fileList
                ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                values?.images?.fileList?.map((response: any) => response?.response?.data?.url || response?.url)
                : values.images;
            const avatar = values.avatar.fileList
                ? values?.avatar?.fileList[0]?.response?.data?.url || values?.avatar?.fileList[0]?.url
                : values.avatar;

            const newValues = { ...values, images, avatar };
            const { _id, ...pitch } = newValues;

            const reponse = await dispatch(fetchUpdatePitch({ _id, pitch }));
            setpitchs((prevPitchs: any) => ({
                ...prevPitchs,
                ...reponse?.payload,
            }));
            message.success(`Sửa Sân Bóng thành công!`);
        }
        setIsModalOpen(false);
    };
    return (
        <div>
            <div className="flex justify-between">
                <h1 className="text-[20px]">Sân Bóng Của Bạn : <span className="font-[600] text-blue-500 italic">{pitchs?.name}</span></h1>
                <div className="flex items-center gap-[5px] mr-[10px]">
                    <h1 className="text-[18px]">Hành Động:</h1>
                    <Button
                        type="primary"
                        onClick={() => {
                            form.setFieldsValue({
                                _id: pitchs?._id,
                                address: pitchs?.address,
                                name: pitchs?.name,
                                images: pitchs?.images,
                                numberPitch: pitchs?.numberPitch,
                                description: pitchs?.description,
                                districts_id: pitchs?.districts_id,
                                location_id: pitchs?.location_id,
                                avatar: pitchs?.avatar,
                            });
                            showModal("edit");
                        }}
                        ghost
                    >
                        Chỉnh Sửa Sân
                    </Button>
                </div>
            </div>
            {!loading ? (
                <div className="flex justify-between w-full mt-[20px]">
                    <div className=" w-full">
                        <h1 className="text-center text-[20px] font-[600]">Thông Tin Sân</h1>
                        <div className="text-[18px] pl-[100px] pt-[20px]">
                            <p className="py-[5px]">Chủ Sở Hữu : <span className="italic text-gray-700">{pitchs?.admin_pitch_id?.name || pitchs?.admin_pitch_id?.email}</span></p>
                            <p className="py-[5px]">Vị trí tìm kiếm : <span className="italic text-gray-700">{pitchs?.address}</span></p>
                            <p className="py-[5px]">Số lượng sân : <span className="italic text-gray-700">{pitchs?.numberPitch} sân</span></p>
                            <p className="py-[5px]">Giá tiền giao động : <span className="text-red-400">{pitchs?.average_price?.toLocaleString('vi-VN') || pitchs?.deposit_price?.toLocaleString('vi-VN')}₫ - 850.000₫</span></p>
                            <p className="py-[5px]">Ngày tạo sân : <span className="italic text-gray-700">{pitchs?.createdAt}</span></p>
                            <p className="py-[5px]">Ngày cập nhật sân gần nhất : <span className="italic text-gray-700">{pitchs?.updatedAt}</span></p>
                            <p className="py-[5px] w-[500px]">Dịch vụ :
                                <span>
                                    {pitchs && pitchs?.services?.length > 0 ? (
                                        pitchs?.services?.map((item: any) =>
                                            <Button size={'small'} className="text-blue-500"> {item?.name} - {item?.price?.toLocaleString('vi-VN')}</Button>
                                        )
                                    ) : (
                                        <Button size={'small'} className="text-blue-500"> Chưa Có Dịch Vụ</Button>
                                    )}
                                </span>
                            </p>
                            <p className="py-[5px] w-[500px]">Miêu tả sân : <span className="italic w-[200px] text-gray-700"> {pitchs?.description}</span></p>
                        </div>
                    </div>
                    <div className="pr-[20px]">
                        <div className="">
                            {pitchs?.images && pitchs.images.length > 0 && (
                                <Image
                                    width={650}
                                    height={350}
                                    src={pitchs?.avatar}
                                    preview={{
                                        src: `${pitchs?.avatar}`,
                                    }}
                                />
                            )}
                        </div>
                        <div className="flex justify-between ">
                            {pitchs?.images && pitchs.images.length > 0 && (
                                <Image
                                    width={200}
                                    height={150}
                                    src={pitchs?.images[0]}
                                    preview={{
                                        src: `${pitchs?.images[0]}`,
                                    }}
                                />
                            )}
                            {pitchs?.images && pitchs.images.length > 0 && (
                                <Image
                                    width={200}
                                    height={150}
                                    src={pitchs?.images[1]}
                                    preview={{
                                        src: `${pitchs?.images[1]}`,
                                    }}
                                />
                            )}

                            {pitchs?.images && pitchs.images.length > 0 && (
                                <Image
                                    width={200}
                                    height={150}
                                    src={pitchs?.images[2]}
                                    preview={{
                                        src: `${pitchs?.images[2]}`,
                                    }}
                                />
                            )}

                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <Spin tip="Loading" size="large">
                        <div className="content" />
                    </Spin>
                </div>
            )}

            {/*  */}
            <ModalForm
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                form={form}
                modalMode={modalMode}
            >
                {modalMode === "edit" && (
                    <Form.Item name="_id" initialValue={pitchs?._id} style={{ display: "none" }}>
                        <Input />
                    </Form.Item>
                )}
                <Form
                    form={form}
                    {...layout}
                    name="nest-messages"
                    onFinish={onFinish}
                    validateMessages={validateMessages}
                    layout="vertical"
                    className="flex gap-4"
                >
                    {modalMode === "edit" && (
                        <Form.Item name="_id" style={{ display: "none" }}>
                            <Input />
                        </Form.Item>
                    )}
                    <div className="w-1/2">
                        <Form.Item
                            name="address"
                            label="Địa chỉ"
                            rules={[
                                { required: true },
                                { whitespace: true, message: "${label} is required!" },
                            ]}
                        >
                            <Input.TextArea rows={2} placeholder="Địa chỉ Sân Bóng" />
                        </Form.Item>
                        <Form.Item
                            name="name"
                            label="Tên Sân"
                            rules={[
                                { required: true },
                                { whitespace: true, message: "${label} is required!" },
                            ]}
                        >
                            <Input size="large" placeholder="Tên Sân Bóng" />
                        </Form.Item>
                        <Form.Item
                            name="numberPitch"
                            label="Số Lượng Sân"
                            rules={[{ required: true, type: "number", min: 0 }]}
                        >
                            <InputNumber
                                size="large"
                                placeholder="Số Lượng Sân"
                                style={{ width: "100%" }}
                            />
                        </Form.Item>

                        <Form.Item name="images" label="Ảnh Sân Bóng" rules={[{ required: true }]}>
                            <Dragger multiple listType="picture" customRequest={customRequest} defaultFileList={[...fileList]} >
                                <Button icon={<UploadOutlined />}>Thêm Ảnh Sân</Button>
                            </Dragger>
                        </Form.Item>
                    </div>

                    <div className="w-1/2">
                        <Form.Item label="Tỉnh" rules={[{ required: true }]}>
                            <Select
                                onChange={handleCityChange}
                                size="large"
                                placeholder="---- Tỉnh ----"
                            >
                                {cities.map((item: { id: string; name: string }) => (
                                    <Option key={item.id} value={item?.id}>
                                        {item.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item name="districts_id" label="Quận, Huyện" rules={[{ required: true }]}>
                            <Select
                                onChange={handleDistrictChange}
                                size="large"
                                placeholder="---- Quận Huyện ----"
                            >
                                {districts.map((item: { id: string; name: string }) => (
                                    <Option key={item.id} value={item?.id}>
                                        {item.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item name="location_id" label="Phường,Xã" rules={[{ required: true }]}>
                            <Select size="large" placeholder="---- Phường,Xã ----">
                                {wards.map((item: { id: string; name: string }) => (
                                    <Option key={item.id} value={item.id}>
                                        {item.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="description"
                            label="Thông Tin Sân"
                            rules={[
                                { required: true },
                                { whitespace: true, message: "${label} is required!" },
                            ]}
                        >
                            <Input.TextArea rows={4} placeholder="Description" />
                        </Form.Item>

                        <Form.Item name="avatar" label="Ảnh Tổng Quan" rules={[{ required: true }]}>
                            <Dragger listType="picture" customRequest={customRequest} defaultFileList={[...fileAvatar]}>
                                <Button icon={<UploadOutlined />}>Thêm Ảnh Tổng Quan</Button>
                            </Dragger>
                        </Form.Item>

                    </div>
                </Form>
            </ModalForm>
        </div >
    )
}

export default PitchUserList