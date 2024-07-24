import React, { useState, useRef } from "react";
import { Pagination } from "antd";
export default function () {
  return (
    <Pagination
      current={currentPage}
      pageSize={pageSize}
      total={totalItems}
      onChange={goToPage}
      onShowSizeChange={(current, size) => set}
    />
  );
}
function usePage(initalPage = 1, initPagesize = 10) {
  const [currentPage, setCurrentPage] = useState(initalPage); //当前页
  const [pageSize, setPageSize] = useState(initPagesize); //每页的个数
  const [totalItems, setTotalItems] = useState(0); //总页数
  const totalPages = Math.ceil(totalItems / pageSize);
  //设置当前页
  const goToPage = (page) => {
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    setCurrentPage(page);
  };
  // 设置每页条数
  const setItemsPerPage = (itemPerPage) => {
    setPageSize(initPagesize);
    setCurrentPage(1);
  };
  //设置总条数
  const setTotalItemsCount = (count) => {
    setTotalItems(count);
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
  };
}
