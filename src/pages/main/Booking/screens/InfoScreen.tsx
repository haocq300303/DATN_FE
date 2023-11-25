import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row } from "antd";
import Form from "antd/es/form";
import { useForm } from "antd/es/form/Form";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

type InfoScreenProps = {
    setCurrent: React.Dispatch<number>;
};
const InfoScreen = ({ setCurrent }: InfoScreenProps) => {
    const [isDisabled, setIsDisabled] = useState<boolean>(false);

    const [form] = useForm();
    const [, setSearchParams] = useSearchParams();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const currentUser: any = {
        _id: "655c53ed6c0689551d7528a3",
        phone: "0788062634",
        fullname: "Trương Minh Hiếu",
        email: "hahuu02dev@gmail.com",
    };
    // const currentUser = undefined;
    const handleNextStep = (values: any) => {
        if (currentUser) {
            setSearchParams({ mode: "order" });
            setCurrent(1);
        }
        if (!currentUser) {
            alert("Check sms");
            console.log(values);
        }
    };

    useEffect(() => {
        if (currentUser) setIsDisabled(true);
    }, [currentUser]);

    return (
        <div className="border border-solid px-5 py-2 rounded-md border-[#e7e7e7]">
            <div className="note">Vui lòng điền đúng thông tin để chúng tôi có thể xử lý cho bạn chính xác nhất</div>
            <h2 className="bg-[#EBF3FF] pl-2 py-1 my-4 text-xl font-semibold">Thông tin về bạn</h2>

            <div className="">
                <Form
                    form={form}
                    initialValues={currentUser}
                    key={JSON.stringify(currentUser)}
                    labelCol={{ span: 12 }}
                    wrapperCol={{ span: 12 }}
                    name="nest-messages"
                    onFinish={handleNextStep}
                >
                    <Row gutter={60}>
                        <Col span={12}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                name="phone"
                                label="Số điện thoại"
                                rules={[{ required: true }, { whitespace: true }]}
                            >
                                <Input disabled={isDisabled} size="large" placeholder="Số diện thoại..." />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                name="fullname"
                                label="Họ và tên"
                                rules={[{ required: true }, { whitespace: true }]}
                            >
                                <Input disabled={isDisabled} size="large" placeholder="Họ và tên..." />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} name="phone_another" label="Số điện thoại khác (nếu có)">
                                <Input size="large" placeholder="Số điện thoại.." />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                name="mail_another"
                                label="Địa chỉ email (nếu có)"
                                rules={[{ type: "email" }]}
                            >
                                <Input size="large" placeholder="Địa chỉ email.." />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} name="mail" label="Địa chỉ của bạn (nếu có)">
                                <Input size="large" placeholder="Địa chỉ.." />
                            </Form.Item>
                        </Col>
                        <Col span={24} className="flex flex-col items-end space-x-5">
                            <Button type="primary" htmlType="submit" icon={<ArrowRightOutlined />} className="ml-6 bg-[#34e43d] text-white">
                                Tiếp theo: Sang bước tiếp theo nhé
                            </Button>
                            <p className="mt-3 text-xs italic ">Đừng lo — bạn chưa bị trừ tiền đâu!</p>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    );
};

export default InfoScreen;
