import React from "react";
import ContactList from "./ContactList/index";
import ChatDetail from "./ChatRight/index";
import { contactList } from "../../Data/DsplayData";
import "./index.css";
const Chat = () => {
  return (
    <div className="content">
      <ContactList
        data={contactList}
        // data={[
        //   {
        //     id: 9,
        //     avatar: "//game.gtimg.cn/images/lol/act/img/champion/Rengar.png",
        //     nickname: "雷恩加尔",
        //     message: "您已被该玩家禁言",
        //     date: "02-07",
        //   },
        // ]}
        // style={{
        //   marginRight: 10,
        //   height: 500,
        //   borderRadius: 5,
        //   overflow: "hidden",
        //   width: 240,
        //   border: "1px solid rgb(226, 226, 226)",
        // }}
      />
      <div className="right">
        <ChatDetail />
      </div>
    </div>
  );
};
export default Chat;
