import React, { useEffect, useState } from 'react';

const SecondTabComponent = ({selectedRowKey }) => {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    console.log('Fetching data for Second Tab');
    // 模拟数据请求
    const response = await new Promise((resolve) =>
      setTimeout(() => resolve('Second Tab Data - ' + new Date().toISOString()), 1000)
    );
    setData(response);
  };

  useEffect(() => {
    fetchData();
  }, [selectedRowKey]);

  return (
    <div>
      <h2>Second Tab Content</h2>
      <p>{data}</p>
    </div>
  );
};

export default SecondTabComponent;
