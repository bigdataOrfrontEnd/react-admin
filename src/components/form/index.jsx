// FormComponent.jsx
//1.后端返回的单位净值可能是空的，这个时候如果不处理作为除数就会出错
//2.inputNumber框保留两位小数，当后端传来的值不是两位小数如何处理
//3.父子直接通信，尝试使用一下redux
// 4.看懂table的某一列可编辑-----解决
// 5.字典表的显示问题
import React, { useState } from "react";
import { data } from "./data";
const App = () => {
  return (
    <div>
      <h1>数据表单</h1>
      <FormComponent />
    </div>
  );
};

export default App;

const FormComponent = () => {
  // const [formData, setFormData] = useState(data);
  const [formData] = Form.useForm();

  const handleChange = (id, value) => {
    setFormData((prevData) =>
      prevData.map((item) => (item.id === id ? { ...item, value } : item))
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // try {
    //   const response = await fetch("your-backend-api-url", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(formData),
    //   });
    //   if (response.ok) {
    //     alert("数据提交成功");
    //   } else {
    //     alert("数据提交失败");
    //   }
    // } catch (error) {
    //   console.error("Error:", error);
    //   alert("提交过程中发生错误");
    // }
  };

  return (
    <form onSubmit={handleSubmit} form={formData}>
      <button type="submit">提交</button>
    </form>
  );
};
