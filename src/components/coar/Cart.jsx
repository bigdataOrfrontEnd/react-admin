// Card.js
import React from "react";
import { useDrag } from "react-dnd";

const Card = ({ title, type, addComponent }) => {
  const [, drag] = useDrag({
    type: "card",
    item: { type },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (dropResult) {
        addComponent(type);
      }
    },
  });

  return (
    <div ref={drag} style={{ padding: "10px", margin: "10px 0", border: "1px solid #ccc", cursor: "move" }}>
      {title}
    </div>
  );
};

export default Card;
