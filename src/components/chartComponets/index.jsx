import React from "react";
import { Button, Col } from "antd";
import DraggableModal from "./DraggaleModal";
import { useState } from "react";
import Chat from "../chat/index";
import styles from "./index.less";
const ChatModal = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  return (
    <>
      <Col>
        <Button onClick={() => setIsChatOpen(!isChatOpen)}>聊天</Button>
      </Col>
      <DraggableModal
        width={"750px"}
        footer={null}
        open={isChatOpen}
        onCancel={() => setIsChatOpen(false)}
        className={styles["chat-modal"]}
        title={<div>聊天</div>}
      >
        <Chat />
      </DraggableModal>
    </>
  );
};
export default ChatModal;
