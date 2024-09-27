import React, { useState } from "react";
import { Table, InputNumber, Form, DatePicker } from "antd";
import moment from "moment";

const EditableTable = () => {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      dueDate: null,
      orderAmount: 100,
      orderBalance: 50,
      orderShare: 50,
    },
    {
      key: '2',
      dueDate: null,
      orderAmount: 150,
      orderBalance: 160,
      orderShare: -10,
    },
  ]);

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
      if (dataIndex === 'dueDate') {
        childNode = (
          <Form.Item
            name={[record.key, dataIndex]}
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
        childNode = (
          <Form.Item
            name={[record.key, dataIndex]}
            style={{ margin: 0 }}
          >
            <InputNumber
              defaultValue={record[dataIndex]}
              formatter={value => {
                if (value || value === 0) {
                  return `${Number(value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
                }
                return ''; // 当值为空时显示空字符串
              }}
              parser={value => value ? value.replace(/,/g, '') : ''}
              onPressEnter={(e) => handleSave({ ...record, [dataIndex]: Number(e.target.value.replace(/,/g, '')) })}
              onBlur={(e) => handleSave({ ...record, [dataIndex]: Number(e.target.value.replace(/,/g, '')) })}
              style={{ width: '100%' }}
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

    const orderAmount = row.orderAmount !== undefined ? Number(row.orderAmount) : 0;
    const orderBalance = row.orderBalance !== undefined ? Number(row.orderBalance) : 0;
    
    const updatedRow = {
      ...item,
      ...row,
      orderShare: orderAmount - orderBalance,
    };

    newData.splice(index, 1, updatedRow);
    setDataSource(newData);
  };

  const columns = [
    {
      title: "Due Date",
      dataIndex: "dueDate",
      editable: true,
      render: (text, record) => {
        return record.dueDate
          ? moment(record.dueDate).format("YYYY-MM-DD")
          : ""; // 如果没有日期，则显示空字符串
      },
    },
    {
      title: "Order Amount",
      dataIndex: "orderAmount",
      editable: true,
      render: (text) => {
        return text !== undefined && text !== null
          ? `${Number(text).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
          : ''; // 如果数据为空，显示空字符串
      },
    },
    {
      title: "Order Balance",
      dataIndex: "orderBalance",
      editable: true,
      render: (text) => {
        return text !== undefined && text !== null
          ? `${Number(text).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
          : ''; // 如果数据为空，显示空字符串
      },
    },
    {
      title: "Order Share",
      dataIndex: "orderShare",
      render: (text, record) => {
        return record.orderShare !== undefined && record.orderShare !== null && !isNaN(record.orderShare)
          ? `${Number(record.orderShare).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
          : ''; // 如果为 NaN 或为空，显示空字符串
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
