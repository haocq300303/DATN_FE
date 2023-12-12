import React from "react";
import { Modal, Button } from "antd";

interface IModalForm {
  children: React.ReactNode;
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  modalMode: string;
  title?: string;
  classNames?: string;
}
const ModalForm = ({
  children,
  isModalOpen,
  setIsModalOpen,
  form,
  modalMode,
  title,
  classNames,
}: IModalForm) => {
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      title={title}
      open={isModalOpen}
      centered
      onCancel={handleCancel}
      className={classNames}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Hủy
        </Button>,
        <Button
          key="submit"
          type="primary"
          // loading={loading}
          onClick={() => form.submit()}
          className="bg-[#1677ff]"
        >
          {modalMode === "add" ? "Thêm Mới" : "Sửa"}
        </Button>,
      ]}
    >
      <div className="max-h-[70vh] overflow-auto modal-scroll">{children}</div>
    </Modal>
  );
};

export default ModalForm;
