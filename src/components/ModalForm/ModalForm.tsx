import React from "react";
import { Modal, Button } from "antd";

interface IModalForm {
  children: React.ReactNode;
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  modalMode: string;
}
const ModalForm = ({
  children,
  isModalOpen,
  setIsModalOpen,
  form,
  modalMode,
}: IModalForm) => {
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      title={modalMode === "add" ? "Create Post" : "Edit Post"}
      open={isModalOpen}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          // loading={loading}
          onClick={() => form.submit()}
          className="bg-[#1677ff]"
        >
          {modalMode === "add" ? "Create" : "Edit"}
        </Button>,
      ]}
    >
      {children}
    </Modal>
  );
};

export default ModalForm;
