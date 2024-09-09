// App.js
import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Card from "./Card";
import Workbench from "./Workbench";

const App = () => {
  const [components, setComponents] = useState([]);

  const addComponent = (component) => {
    setComponents([...components, component]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {/* 左边是可选的卡片 */}
        <div style={{ width: "200px", padding: "20px", borderRight: "1px solid #ccc" }}>
          <h3>选择卡片</h3>
          <Card title="账户信息" type="account" addComponent={addComponent} />
          <Card title="交易历史" type="history" addComponent={addComponent} />
          <Card title="资金转账" type="transfer" addComponent={addComponent} />
        </div>

        {/* 右边是工作台 */}
        <div style={{ flexGrow: 1, padding: "20px" }}>
          <h3>工作台</h3>
          <Workbench components={components} />
        </div>
      </div>
    </DndProvider>
  );
};

export default App;
