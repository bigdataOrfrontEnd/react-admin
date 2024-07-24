import React, { useEffect, useState } from 'react';

const FirstTabComponent = ({selectedRowKey }) => {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    console.log('Fetching data for First Tab');
    // 模拟数据请求
    const response = await new Promise((resolve) =>
      setTimeout(() => resolve('First Tab Data - ' + new Date().toISOString()), 1000)
    );
    setData(response);
  };

  useEffect(() => {
    if (selectedRowKey) {
        fetchData(selectedRowKey);
      } else {
        fetchData();
      }
  }, [selectedRowKey]);

  return (
    <div>
      <h2>First Tab Content</h2>
      <p>{data}</p>
    </div>
  );
};

export default FirstTabComponent;
