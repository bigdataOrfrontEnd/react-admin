// FormComponent.jsx
//1.后端返回的单位净值可能是空的，这个时候如果不处理作为除数就会出错----解决
//2.inputNumber框保留两位小数，当后端传来的值不是两位小数如何处理
//3.父子直接通信，尝试使用一下redux
// 4.看懂table的某一列可编辑-----解决
// 5.字典表的显示问题
import React, { useState } from "react";
import {
  Form,
  InputNumber,
  Select,
  DatePicker,
  Input,
  Table,
  Button,
} from "antd";
import { data, SPV } from "./data";
const App = () => {
  const currentTimestamp = Date.now();
  const [value, setValue] = useState("");
  return (
    <div>
      <h1>数据表单</h1>
      <FormComponent />
      <Pick currentTimestamp={currentTimestamp} />
      {/* <MyTable /> */}
      <Inpit />
      <NumberInput value={value} onChange={setValue} placeholder="请输入数字" />
    </div>
  );
};

export default App;
//多表单联动
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
//计算公式
// const MyTable = ({ data }) => {
//   const [totalFunds, setTotalFunds] = useState(0);

//   const handleInputChange = (e) => {
//     setTotalFunds(Number(e.target.value));
//   };

//   const calculateAmounts = (data, totalFunds) => {
//     const totalPcs = data.reduce(
//       (acc, item) => acc + Math.max(item.pcsTotalAmt, 0),
//       0
//     );
//     let remainingFunds = totalFunds;

//     return data
//       .map((item, index) => {
//         if (item.pcsTotalAmt <= 0) {
//           return { ...item, amount: 0 };
//         } //直接给0
//         const amount = (item.pcsTotalAmt / totalPcs) * totalFunds;
//         remainingFunds -= amount;

//         return { ...item, amount: parseFloat(amount.toFixed(2)) };
//       })
//       .map((item, index, arr) => {
//         // Distribute remaining funds to the last valid row
//         if (index === arr.length - 1 && arr[index].pcsTotalAmt > 0) {
//           const amount = item.amount + remainingFunds;
//           return { ...item, amount: parseFloat(amount.toFixed(2)) };
//         }
//         return item;
//       });
//   };

//   const columns = [
//     { title: "pcsTotalAmt", dataIndex: "pcsTotalAmt", key: "pcsTotalAmt" },
//     { title: "amount", dataIndex: "amount", key: "amount" },
//     { title: "share", dataIndex: "share", key: "share" },
//   ];

//   const processedData = calculateAmounts(data, totalFunds);

//   return (
//     <div>
//       <Input
//         type="number"
//         placeholder="输入总资金"
//         onChange={handleInputChange}
//         style={{ marginBottom: 16 }}
//       />
//       <Table dataSource={processedData} columns={columns} rowKey="id" />
//     </div>
//   );
// };
const MyTable = ({ data }) => {
  const [totalFunds, setTotalFunds] = useState(0);

  const handleInputChange = (e) => {
    setTotalFunds(Number(e.target.value));
  };

  const calculateAmounts = (data, totalFunds) => {
    const totalPcs = data.reduce(
      (acc, item) => acc + Math.max(item.pcsTotalAmt, 0),
      0
    );
    let remainingFunds = totalFunds;

    // First pass: Calculate initial amounts
    const updatedData = data.map((item) => {
      if (item.pcsTotalAmt <= 0) {
        return { ...item, amount: 0 };
      }
      const amount = (item.pcsTotalAmt / totalPcs) * totalFunds;
      remainingFunds -= amount;

      return { ...item, amount: parseFloat(amount.toFixed(2)) };
    });

    // Second pass: Distribute remaining funds to the last valid row
    for (let i = updatedData.length - 1; i >= 0; i--) {
      if (updatedData[i].pcsTotalAmt > 0) {
        const finalAmount = updatedData[i].amount + remainingFunds;
        updatedData[i] = {
          ...updatedData[i],
          amount: parseFloat(finalAmount.toFixed(2)),
        };
        break; // Only update the last valid row
      }
    }

    return updatedData;
  };

  const columns = [
    { title: "pcsTotalAmt", dataIndex: "pcsTotalAmt", key: "pcsTotalAmt" },
    { title: "amount", dataIndex: "amount", key: "amount" },
    { title: "share", dataIndex: "share", key: "share" },
  ];

  const processedData = calculateAmounts(data, totalFunds);

  return (
    <div>
      <Input
        type="number"
        placeholder="输入总资金"
        onChange={handleInputChange}
        style={{ marginBottom: 16 }}
      />
      <Table dataSource={processedData} columns={columns} rowKey="id" />
    </div>
  );
};
const Inpit = () => {
  const [form] = Form.useForm(); // 使用 Form 实例

  const handleBlur = () => {
    const value = form.getFieldValue("amount");
    if (value !== undefined && value !== null) {
      const num = parseFloat(value);
      console.log(num.toFixed(2));
      if (!isNaN(num)) {
        form.setFieldValue("amount", num.toFixed(2)); // 格式化为两位小数
      }
    }
  };

  return (
    <Form
      form={form}
      name="custom_input_number_form"
      initialValues={{ amount: undefined }} // 初始值为空
    >
      <Form.Item
        name="password"
        label="password"
        rules={[{ required: true, message: "Please input your amount!" }]}
      >
        <InputNumber
          onBlur={(e) => {
            console.log(e.target.value);
            const value = form.getFieldValue("password");
            // console.log(String(e.target.value).toFixed(2))
            form.setFieldValue(
              "password",
              Number(value)
                .toFixed(2)
                .toString()
                .replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, "$&,")
            );
          }}
          formatter={(value) =>
            value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""
          }
          parser={(value) => (value ? value.replace(/,/g, "") : "")}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
const NumberInput = ({ value, onChange, ...rest }) => {
  const formatNumber = (num) => {
    if (!num) return "";

    // 保留两位小数
    const [integerPart, decimalPart] = num.split(".");
    const formattedInteger = parseFloat(
      integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    );

    // 保留两位小数
    const formattedDecimal = decimalPart
      ? decimalPart.padEnd(2, "0").slice(0, 2)
      : "00";

    return `${formattedInteger}.${formattedDecimal}`;
  };

  const handleChange = (e) => {
    const { value } = e.target;

    // 只允许输入数字和小数点
    const numericValue = value.replace(/[^0-9.]/g, "");

    // 防止多于一个小数点
    const parts = numericValue.split(".");
    if (parts.length > 2) return;

    onChange(formatNumber(numericValue));
  };

  const handleBlur = () => {
    // 格式化为保留两位小数
    onChange(formatNumber(value));
  };

  return (
    <Input
      {...rest}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
};
