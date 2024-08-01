// FormComponent.jsx
//1.后端返回的单位净值可能是空的，这个时候如果不处理作为除数就会出错----解决
//2.inputNumber框保留两位小数，当后端传来的值不是两位小数如何处理
//3.父子直接通信，尝试使用一下redux
// 4.看懂table的某一列可编辑-----解决
// 5.字典表的显示问题
import React, { useState } from "react";
import { Form, InputNumber, Select, DatePicker } from "antd";
import { data, SPV } from "./data";
const App = () => {
  const currentTimestamp = Date.now();
  return (
    <div>
      <h1>数据表单</h1>
      <FormComponent />
      <Pick currentTimestamp={currentTimestamp} />
    </div>
  );
};

export default App;

const FormComponent = () => {
  // const [formData, setFormData] = useState(data);
  const [formData] = Form.useForm();
  const [dayValue, setDayValue] = useState();
  const [direction, setDirection] = useState(null);
  const handleChange = (id, value) => {
    console.log(value, data[0]);
    switch (id) {
      case "01":
        let da = data[0];
        console.log("1111", da);
        setDayValue(da.dayValue);
        break;
      case "02":
        let daa = data[1];
        console.log("1111", daa);
        setDayValue(daa.dayValue);
        break;
    }
  };

  const handleSubmit = (value) => {
    // let formdata = formData.getFieldsValue(true);
    console.log(value);
  };

  return (
    <Form onFinish={handleSubmit} form={formData}>
      <Form.Item name={"dataCode"} label="资管代码">
        <Select options={SPV.code} onChange={handleChange} />
      </Form.Item>
      <Form.Item name={"trandy"} label="方向">
        <Select
          options={SPV.code}
          onChange={(value) => {
            setDirection(value);
          }}
        />
      </Form.Item>
      <Form.Item
        name={"aws"}
        label="指令金额"
        rules={[
          {
            required: direction === "01" || direction === "02",
            message: "请输入",
          },
        ]}
      >
        <InputNumber
          onChange={(aws) => {
            let value = dayValue === NaN ? aws / dayValue : ""; //当拿不到dayValue的值就直接置空
            formData.setFieldValue("share", value);
          }}
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          precision={4}
        />
      </Form.Item>
      <Form.Item name={"share"} label="指令份额">
        <InputNumber />
      </Form.Item>

      <button type="submit">提交</button>
    </Form>
  );
};
//日期框
const Pick = ({ currentTimestamp }) => {
  const [formDat] = Form.useForm();
  const handleChange = (value) => {
    const { picker } = value;
    // picker.valueOf()这个是将moment的数据格式转换成时间戳
    console.log(picker.valueOf());
    let dd = formDat.getFieldsValue("picker"); //拿到的是一个对象，
    console.log(dd.picker.format("YYYY-MM-DD"));
  };
  return (
    <Form form={formDat} onFinish={handleChange}>
      <Form.Item name={"picker"} label="日期">
        <DatePicker
        // onChange={handleChange}
        // // defaultValue={new Date(currentTimestamp).toLocaleString()}
        />
      </Form.Item>
      <Form.Item>
        <button type="submit">提交</button>
      </Form.Item>
    </Form>
  );
};
