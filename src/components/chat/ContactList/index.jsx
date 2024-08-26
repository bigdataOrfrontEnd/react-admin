import React, { useState } from "react";
// https://gitee.com/wx_504ae56474/react-jwchat/repository/archive/main.zip
import ContactItem from "../ContactItem/index";
const ContactList = (props) => {
  const [selectId, setSelectId] = useState();
  const selectContactHandle = (con) => {
    console.log("con", con);
    setSelectId(con.id);

    if (props.onSelect) props.onSelect(con);
  };
  return (
    <div className="list_area">
      {props.data.map((contact, index) => {
        return (
          <ContactItem
            contact={contact}
            key={contact.id}
            border={index + 1 !== props.data.length}
            selected={selectId === contact.id}
            onClick={selectContactHandle.bind(null, contact)}
          />
        );
      })}
    </div>
  );
};
export default ContactList;
