import { Button, Col, Input, Radio, Row, Space } from "antd";
import Form from "antd/es/form";
import React from "react";

type PaymentScreenProps = {
    current: number;
    setCurrent: React.Dispatch<number>;
};
const PaymentScreen = ({ setCurrent, current }: PaymentScreenProps) => {
    const handlePayment = () => {};
    return (
        <div className="border border-solid px-5 py-2 rounded-md border-[#e7e7e7]">
            <div className="note">Vui lòng điền đúng thông tin để chúng tôi có thể xử lý cho bạn chính xác nhất</div>
            <h1 className="text-2xl font-semibold">Thông tin về bạn</h1>

            <div className="">
                <Form labelCol={{ span: 12 }} wrapperCol={{ span: 12 }} name="nest-messages" onFinish={handlePayment}>
                    <Row gutter={30}>
                        <Col span={12}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                name="phone"
                                label="Số điện thoại"
                                rules={[{ required: true }, { whitespace: true }]}
                            >
                                <Input size="large" placeholder="Số diện thoại..." />
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
                                <Input size="large" placeholder="Họ và tên..." />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                name="mail"
                                label="Địa chỉ email (nếu có)"
                                rules={[{ type: "email" }]}
                            >
                                <Input size="large" placeholder="Địa chỉ email.." />
                            </Form.Item>
                        </Col>{" "}
                        <Col span={12}>
                            <Form.Item labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} name="mail" label="Địa chỉ của bạn (nếu có)">
                                <Input size="large" placeholder="Địa chỉ.." />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} name="payment_function" label="Địa chỉ email (nếu có)">
                                <Radio.Group>
                                    <Space direction="vertical">
                                        <Radio value={1}>Chuyển khoản toàn bộ</Radio>
                                        <Radio value={2}>Cọc trước (nhỏ nhất 20%)</Radio>
                                    </Space>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col span={24} className="flex justify-center space-x-5">
                            <Button htmlType="button" className="bg-red-500 text-white" onClick={() => setCurrent(current - 1)}>
                                Quay lại bước trước
                            </Button>
                            <Button type="primary" htmlType="submit" className="">
                                Thanh toán
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    );
};

export default PaymentScreen;
