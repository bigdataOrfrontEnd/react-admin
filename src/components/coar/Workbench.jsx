// Workbench.js
import React from "react";
import { useDrop } from "react-dnd";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";

const Workbench = ({ components }) => {
  const [, drop] = useDrop({
    accept: "card",
    drop: () => ({ name: "Workbench" }),
  });

  const layout = components.map((component, index) => ({
    i: component + index,
    x: (index % 2) * 3,
    y: Math.floor(index / 2) * 3,
    w: 3,
    h: 2,
  }));

  return (
    <div ref={drop} style={{ border: "1px solid #ccc", minHeight: "400px" }}>
      <GridLayout
        className="layout"
        layout={layout}
        cols={6}
        rowHeight={100}
        width={600}
      >
        {components.map((component, index) => (
          <div key={component + index}>
            <BusinessComponent type={component} />
          </div>
        ))}
      </GridLayout>
    </div>
  );
};

const BusinessComponent = ({ type }) => {
  switch (type) {
    case "account":
      return <div style={{ padding: "10px", border: "1px solid #000" }}>账户信息</div>;
    case "history":
      return <div style={{ padding: "10px", border: "1px solid #000" }}>交易历史</div>;
    case "transfer":
      return <div style={{ padding: "10px", border: "1px solid #000" }}>资金转账</div>;
    default:
      return null;
  }
};

export default Workbench;
