import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Modal, Button, Checkbox } from 'antd';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const App = () => {
  const [columnDefs, setColumnDefs] = useState([
    { headerName: '列1', field: 'column1', hide: false },
    { headerName: '列2', field: 'column2', hide: false },
    // 添加更多列定义...
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [columns, setColumns] = useState(columnDefs);

  // 示例数据源
  const dataSource = [
    { column1: '数据1', column2: '数据2' },
    { column1: '数据3', column2: '数据4' },
    // 添加更多数据...
  ];

  const handleColumnToggle = (field) => {
    setColumns(prev =>
      prev.map(col => (col.field === field ? { ...col, hide: !col.hide } : col))
    );
  };

  const handleOk = () => {
    setColumnDefs(columns);
    setModalVisible(false);
  };

  return (
    <div>
      <Button onClick={() => setModalVisible(true)}>设置列</Button>
      <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
        <AgGridReact
          columnDefs={columnDefs.filter(col => !col.hide)}
          rowData={dataSource}
        />
      </div>

      <Modal
        title="设置列"
        visible={modalVisible}
        onOk={handleOk}
        onCancel={() => setModalVisible(false)}
      >
        {columns.map(col => (
          <Checkbox
            key={col.field}
            checked={!col.hide}
            onChange={() => handleColumnToggle(col.field)}
          >
            {col.headerName}
          </Checkbox>
        ))}
      </Modal>
    </div>
  );
};

export default App;
