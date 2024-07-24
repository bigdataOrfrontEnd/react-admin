import React, { useState } from 'react';
import { Table, Tabs } from 'antd';
import FirstTabComponent from './FirstTabComponent';
import SecondTabComponent from './SecondTabComponent';

const { TabPane } = Tabs;

const MainComponent = () => {
  const [activeKey, setActiveKey] = useState('1');
  const [selectedRowKey, setSelectedRowKey] = useState(null);
  const handleTabChange = (key) => {
    setActiveKey(key);
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Age', dataIndex: 'age', key: 'age' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
  ];

  // 示例数据
  const tableData = [
    { key: '1', name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park' },
    { key: '2', name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park' },
    // 更多数据...
  ];
  const handleRowClick = (record) => {
    setSelectedRowKey(record.key);
  };
  return (
    <div>
      <Table dataSource={tableData} columns={columns} pagination={false}  onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })} />
      <Tabs activeKey={activeKey} onChange={handleTabChange}>
        <TabPane tab="First Tab" key="1">
          <FirstTabComponent key="1" selectedRowKey={selectedRowKey} />
        </TabPane>
        <TabPane tab="Second Tab" key="2">
          <SecondTabComponent key="2" selectedRowKey={selectedRowKey}/>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default MainComponent;
