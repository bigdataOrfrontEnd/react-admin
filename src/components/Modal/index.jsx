import React, { useState, useRef } from "react";
import { Modal, Button } from "antd";
import FormChild from "./ModalForm";

const ParentComponent = () => {
  const [visible, setVisible] = useState(false);
  const formRef = useRef(null);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    if (formRef.current) {
      formRef.current
        .validateFields()
        .then((values) => {
          console.log("Form values:", values);
          setVisible(false);
          formRef.current.resetFields();
        })
        .catch((info) => {
          console.log("Validate Failed:", info);
        });
    }
  };

  const handleCancel = () => {
    setVisible(false);
    if (formRef.current) {
      formRef.current.resetFields();
    }
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>

      <Modal
        title="Form in Modal"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
        afterClose={() => formRef.current && formRef.current.resetFields()}
      >
        <FormChild ref={formRef} />
      </Modal>
    </div>
  );
};

export default ParentComponent;
