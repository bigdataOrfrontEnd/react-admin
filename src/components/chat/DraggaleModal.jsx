import { Modal } from "antd";
import React from "react";
export default class DraggableModal extends React.Component {
  render() {
    const { ...rest } = this.props;
    return <Modal {...rest} />;
  }
}
