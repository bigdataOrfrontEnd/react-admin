import { useState, useEffect, useRef } from "react";
import "./index.less";
import { Table, Button, Space, Tooltip } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { getquestionList } from "@/api/modules/question";
import QuestionFormModal from "./QuestionForm/QuestionForm";
interface DataType {
	key: React.Key;
	name: string;
	category: string;
	creator: string;
	description: string;
	level: string;
	options: [answer: string, content: string, description: string];
	type: string;
	qyr: string;
	updateTime: string;
}
const Exam = () => {
	useEffect(() => {
		getquesList();
	}, []);
	const [selectedRows, setSelectedRows] = useState<DataType[]>([]);
	const [dataSource, setDataSource] = useState<DataType[]>([]);
	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
	const modalRef = useRef<{ open: (record?: any) => void; close: () => void }>(null);

	console.log(selectedRows);
	const handleCreate = () => {
		modalRef.current?.open();
	};
	const columns: TableColumnsType<DataType> = [
		{
			title: "真题年份",
			dataIndex: "qyr",
			key: "qyr",
			align: "center"
		},
		{
			title: "题目名称",
			dataIndex: "name",
			key: "name",
			align: "center",
			width: 200, // 固定列宽
			ellipsis: true, // 自动省略显示
			render: (text: string) => (
				<Tooltip placement="topLeft" title={text}>
					{text}
				</Tooltip>
			)
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
					<Button type="primary" onClick={handleCreate}>
						新建
					</Button>
					<Button type="primary">修改</Button>
					{/* <Button type="primary">我是 User 能看到的按钮</Button> */}
				</Space>
			</div>
			<Table rowKey="id" rowSelection={rowSelection} bordered={true} dataSource={dataSource} columns={columns} />
			<QuestionFormModal
				ref={modalRef}
				onSuccess={() => {
					getquesList();
					console.log("保存成功后刷新列表或执行其他逻辑");
				}}
			/>
		</div>
	);
};

export default Exam;
