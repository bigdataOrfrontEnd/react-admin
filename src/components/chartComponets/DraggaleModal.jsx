import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { Modal } from "antd";

const DraggableModal = (props) => {
  const modalRef = useRef(null);
  const [deltaX, setDeltaX] = useState(0);
  const [deltaY, setDeltaY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        const newDeltaX = e.pageX - startPosition.x;
        const newDeltaY = e.pageY - startPosition.y;
        setDeltaX(currentPosition.x + newDeltaX);
        setDeltaY(currentPosition.y + newDeltaY);
      }
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        setCurrentPosition({ x: deltaX, y: deltaY });
      }
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, startPosition, currentPosition, deltaX, deltaY]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartPosition({ x: e.pageX, y: e.pageY });
  };

  // if (!open) return null;
  const { ...rest } = props;
  return <Modal {...rest} />;
};

export default DraggableModal;

// import { Modal } from "antd";
// import React from "react";
// export default class DraggableModal extends React.Component {
//   render() {
//     const { ...rest } = this.props;
//     return <Modal {...rest} />;
//   }
// }
