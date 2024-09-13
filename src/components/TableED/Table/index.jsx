import React, { useState } from "react";
import { Table, InputNumber, Form, DatePicker } from "antd";
import moment from "moment";

const EditableTable = () => {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      dueDate: null, // 指令到期日
      orderAmount: 100, // 指令金额
      orderBalance: 50, // 指令余额
      orderShare: 50, // 指令份额 = 指令金额 - 指令余额
    },
    {
      key: '2',
      dueDate: null,
      orderAmount: 150,
      orderBalance: 160,
      orderShare: -10,
    },
  ]);

  const defaultDate = moment();  // 默认日期为当前日期

  const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    let childNode = children;

    if (editable) {
      // 动态判断是否可以编辑 dueDate
      if (dataIndex === 'dueDate' && record.orderAmount - record.orderBalance < 0) {
        // 如果 orderAmount - orderBalance 小于 0，不可编辑时显示默认时间
        childNode = <div>{ record.dueDate}</div>;
      } else if (dataIndex === 'dueDate') {
        // 如果 orderAmount - orderBalance 大于等于 0，显示 DatePicker
        childNode = (
          <Form.Item
            name={[record.key, dataIndex]} // 确保每个单元格都是唯一的
            style={{ margin: 0 }}
          >
            <DatePicker
              format="YYYY-MM-DD"
              value={record.dueDate ? moment(record.dueDate) : null}
              onChange={(date) => handleSave({ ...record, dueDate: date })}
            />
          </Form.Item>
        );
      } else {
        // 处理 orderAmount 和 orderBalance 的编辑，使用 onBlur 或 onPressEnter 保存
        childNode = (
          <Form.Item
            name={[record.key, dataIndex]} // 确保每个单元格都是唯一的
            style={{ margin: 0 }}
          >
            <InputNumber
              defaultValue={record[dataIndex]}
              onPressEnter={(e) => handleSave({ ...record, [dataIndex]: e.target.value })}
              onBlur={(e) => handleSave({ ...record, [dataIndex]: e.target.value })}
            />
          </Form.Item>
        );
      }
    }

    return <td {...restProps}>{childNode}</td>;
  };

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    // 更新 orderShare 为 orderAmount - orderBalance
    const updatedRow = { ...item, ...row, orderShare: row.orderAmount - row.orderBalance };
    newData.splice(index, 1, updatedRow);
    setDataSource(newData);
  };

  const columns = [
    {
      title: "Due Date", // 指令到期日
      dataIndex: "dueDate",
      editable: true,
      render: (text, record) => {
        return record.dueDate
          ? moment(record.dueDate).format("YYYY-MM-DD")
          : "Please select a date";
      },
    },
    {
      title: "Order Amount", // 指令金额
      dataIndex: "orderAmount",
      editable: true,
    },
    {
      title: "Order Balance", // 指令余额
      dataIndex: "orderBalance",
      editable: true,
    },
    {
      title: "Order Share", // 指令份额
      dataIndex: "orderShare",
      render: (text, record) => {
        return record.orderShare; // 动态显示 orderShare
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <Table
        bordered
        dataSource={dataSource}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={false}
        components={{
          body: {
            cell: EditableCell,
          },
        }}
      />
    </Form>
  );
};

export default EditableTable;
