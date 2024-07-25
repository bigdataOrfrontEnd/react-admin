import React, { useState, useEffect, useRef } from "react";
import { Pagination, Table } from "antd";
const dataSource = [
  // 模拟数据
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  { key: "2", name: "Jim Green", age: 42, address: "London No. 1 Lake Park" },
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  { key: "2", name: "Jim Green", age: 42, address: "London No. 1 Lake Park" },
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  { key: "2", name: "Jim Green", age: 42, address: "London No. 1 Lake Park" },
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  { key: "2", name: "Jim Green", age: 42, address: "London No. 1 Lake Park" },
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  { key: "2", name: "Jim Green", age: 42, address: "London No. 1 Lake Park" },
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  { key: "2", name: "Jim Green", age: 42, address: "London No. 1 Lake Park" },
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  { key: "2", name: "Jim Green", age: 42, address: "London No. 1 Lake Park" },
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  { key: "2", name: "Jim Green", age: 42, address: "London No. 1 Lake Park" },
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  { key: "2", name: "Jim Green", age: 42, address: "London No. 1 Lake Park" },
];

const columns = [
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Age", dataIndex: "age", key: "age" },
  { title: "Address", dataIndex: "address", key: "address" },
];
export default function () {
  const {
    currentPage,
    pageSize,
    totalItems,
    totalPages,
    goToPage,
    setItemsPerPage,
    setTotalItemsCount,
  } = usePage(1, 10);

  useEffect(() => {
    // 模拟数据加载
    // setTotalItemsCount(dataSource.length);
  }, [setTotalItemsCount]);

  const handlePageChange = (page, pageSize) => {
    console.log(page, pageSize);
    goToPage(page);
    setItemsPerPage(pageSize);
  };

  return (
    <div>
      111
      <Table
        dataSource={dataSource.slice(
          (currentPage - 1) * pageSize,
          currentPage * pageSize
        )}
        columns={columns}
        pagination={false}
      />
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={totalItems}
        onChange={goToPage} //在goToPage中去判断是页面个数变化还是当前页变化
        //useEffect的监听去掉，然后在onChange里面调用接口，
        showSizeChanger
        // onShowSizeChange={(curnet,size)=>setItemsPerPage(size)}，这个不用
      />
    </div>
  );
}
function usePage(initalPage = 1, initPagesize = 10) {
  const [currentPage, setCurrentPage] = useState(initalPage); //当前页
  const [pageSize, setPageSize] = useState(initPagesize); //每页的个数
  const [totalItems, setTotalItems] = useState(50); //总页数
  const totalPages = Math.ceil(totalItems / pageSize);
  //设置当前页

  const goToPage = (page, size) => {
    if (page != currentPage) {
      setCurrentPage(page);
    }
    if (pageSize != size) {
      setPageSize(size);
      setCurrentPage(1);
    }
    // if (page < 1) page = 1;
    // if (page > totalPages) page = totalPages;
    // setCurrentPage(page);
  };
  // 设置每页条数
  const setItemsPerPage = (itemPerPage) => {
    setPageSize(itemPerPage);
    setCurrentPage(1);
  };
  //设置总条数
  const setTotalItemsCount = (count) => {
    setTotalItems(count);
  };
  // 重置到第一页
  const resetToFirstPage = () => {
    setCurrentPage(1);
  };
  return {
    currentPage,
    pageSize,
    totalItems,
    totalPages,
    goToPage,
    setItemsPerPage,
    setTotalItemsCount,
    setCurrentPage,
    resetToFirstPage,
  };
}
