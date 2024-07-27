import React, { useState, useEffect } from "react";
import { Form, Select, Radio, Input } from "antd";
//1.后端返回的单位净值可能是空的，这个时候如果不处理作为除数就会出错
//2.inputNumber框保留两位小数，当后端传来的值不是两位小数如何处理
//3.父子直接通信，尝试使用一下redux
// 4.看懂table的某一列可编辑
// 5.字典表的显示问题
const MyForm = () => {
  const [tradeType, setTradeType] = useState("01"); // 默认值设置为“认购”
  const [fullRedemption, setFullRedemption] = useState(null);

  useEffect(() => {
    setTradeType("01"); // 设置表单初始值
  }, []);

  const handleTradeChange = (value) => {
    setTradeType(value);
    if (value === "03") {
      setFullRedemption("1"); // 设置全额赎回默认值为“是”
    } else {
      setFullRedemption(null); // 重置全额赎回选项
    }
  };

  const handleFullRedemptionChange = (e) => {
    setFullRedemption(e.target.value);
  };
  return (
    <Form style={{ width: "400px" }} initialValues={{ trade: "01" }}>
      <Form.Item label="方向" name="trade">
        <Select
          options={[
            { value: "01", label: <span>认购</span> },
            { value: "02", label: <span>申购</span> },
            { value: "03", label: <span>赎回</span> },
          ]}
          onChange={handleTradeChange}
          defaultValue="01" // 默认值设置为“认购”
        />
      </Form.Item>

      {tradeType === "03" && (
        <Form.Item label="全额赎回" name="all" initialValue="1">
          <Radio.Group
            onChange={handleFullRedemptionChange}
            value={fullRedemption}
          >
            <Radio value="1">是</Radio>
            <Radio value="0">否</Radio>
          </Radio.Group>
        </Form.Item>
      )}

      <Form.Item label="指令金额" name="price">
        <Input
          disabled={
            (tradeType === "03" && fullRedemption !== "0") ||
            !tradeType ||
            tradeType === "03"
          }
        />
      </Form.Item>

      <Form.Item label="指令份额" name="quantity">
        <Input
          disabled={tradeType !== "03" || fullRedemption === "1" || !tradeType}
        />
      </Form.Item>
    </Form>
  );
};

export default MyForm;

// import React, { useRef, useState } from "react";
// import { Form, Select, Radio, Input } from "antd";
// const MyForm = () => {
//   const tradeType = useRef();
//   const trade = (value) => {
//     switch (value) {
//       case "03":
//         tradeType.current = "03";
//         break;
//       case "02":
//         tradeType.current = "02";
//         break;
//       case "01":
//         tradeType.current = "01";
//         break;
//     }
//   };
//   return (
//     <Form>
//       <Form.Item label="方向" name={"trdee"}>
//         <Select
//           options={[
//             { value: "01", label: <span>认购</span> },
//             { value: "02", label: <span>申购</span> },
//             { value: "03", label: <span>赎回</span> },
//           ]}
//           onChange={trade}
//         />
//       </Form.Item>
//       <Form.Item label="全额赎回" name={"all"}>
//         <Radio.Group>
//           <option value="1">是</option>
//           <option value="0">否</option>
//         </Radio.Group>
//       </Form.Item>
//       <Form.Item label="指令金额" name={"prce"}>
//        <Input/>
//       </Form.Item>
//       <Form.Item label="指令份额" name={"fen"}>
//         <Input/>
//       </Form.Item>
//     </Form>
//   );
// };
