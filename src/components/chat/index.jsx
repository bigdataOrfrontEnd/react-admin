import React from "react";
import { Button, Col } from "antd";
import DraggableModal from "./DraggaleModal";
import { useState } from "react";
import styles from "./index.less";
const Chat = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  return (
    <>
      <Col>
        <Button onClick={() => setIsChatOpen(!isChatOpen)}>聊天</Button>
      </Col>
      <DraggableModal
        width="650"
        footer={null}
        open={isChatOpen}
        onCancel={() => setIsChatOpen(false)}
        className={styles["chat-modal"]}
        title={<div>聊天</div>}
      />
    </>
  );
};
export default Chat;
