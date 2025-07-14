import { useState, useEffect } from "react";
import "./index.less";
import { Table, Button, Space } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { getquestionList } from "@/api/modules/question";

interface DataType {
	key: React.Key;
	name: string;
	category: string;
	creator: string;
	description: string;
	level: string;
	options: [answer: string, content: string, description: string];
	type: string;
	updateTime: string;
}
const Exam = () => {
	useEffect(() => {
		getquesList();
	}, []);
	const [selectedRows, setSelectedRows] = useState<DataType[]>([]);
	const [dataSource, setDataSource] = useState<DataType[]>([]);
	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
	console.log(selectedRows);
	const columns: TableColumnsType<DataType> = [
		{
			title: "题目名称",
			dataIndex: "name",
			key: "name",
			align: "center"
		},
		{
			title: "创建者",
			dataIndex: "creator",
			key: "creator",
			align: "center"
		},
		{
			title: "问题分类",
			dataIndex: "category",
			key: "category",
			align: "center"
		},
		{
			title: "问题类型",
			dataIndex: "type",
			key: "type",
			align: "center"
		}
	];
	//勾选的数据
	const rowSelection: TableProps<DataType>["rowSelection"] = {
		type: "radio", // ✅ 设置为单选
		selectedRowKeys,
		onChange: (newSelectedRowKeys: React.Key[], selectedRows: DataType[]) => {
			// selectedRowKeys所在的行，selectedRows这一行的数据
			console.log(`selectedRowKeys: ${newSelectedRowKeys}`, "selectedRows: ", selectedRows);
			setSelectedRowKeys(newSelectedRowKeys);
			setSelectedRows(selectedRows);
		}
		// getCheckboxProps: (record: DataType) => ({
		// 	disabled: record.name === "Disabled User", // Column configuration not to be checked
		// 	name: record.name
		// })
	};
	// 接口
	const getquesList = () => {
		// 这里可以调用接口获取数据
		getquestionList()
			.then((res: any) => {
				console.log(res);
				setDataSource(res.data);
			})
			.catch((err: any) => {
				console.error("获取题目列表失败:", err);
				setDataSource([]);
				// 可以在这里处理错误，比如显示一个错误提示
			});
	};
	return (
		<div className="card content-box">
			<div className="auth">
				<Space>
					<Button type="primary">新建</Button>
					<Button type="primary">修改</Button>
					{/* <Button type="primary">我是 User 能看到的按钮</Button> */}
				</Space>
			</div>
			<Table rowKey="id" rowSelection={rowSelection} bordered={true} dataSource={dataSource} columns={columns} />
		</div>
	);
};

export default Exam;
