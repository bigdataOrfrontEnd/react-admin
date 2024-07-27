import React from "react";
import { Table, Tabs,Button  } from 'antd';
import TableEd from "./TableEd"
const { TabPane } = Tabs;
const MyTable=()=>{
  return<Tabs >
  <TabPane tab="可编辑table" key="1">
    <TableEd key="1"  />
  </TabPane>
  {/* <TabPane tab="Second Tab" key="2">
   
  </TabPane> */}
</Tabs>
}
export default MyTable