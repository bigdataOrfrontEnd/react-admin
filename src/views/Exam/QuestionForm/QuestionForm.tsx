import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Modal, Form, Input, Select, Checkbox, Space, Button, message, Row, Col } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { getSelection, create } from "@/api/modules/question";

const { Option } = Select;

interface OptionItem {
	id: number;
	name: string;
	description: string;
}

interface QuestionOption {
	content: string;
	answer: boolean;
}

interface QuestionFormValues {
	name: string;
	desc: string;
	level: number;
	type: number;
	category: number;
	options: QuestionOption[];
}

interface QuestionFormModalProps {
	onSuccess?: () => void;
}

const QuestionFormModal = forwardRef((props: QuestionFormModalProps, ref) => {
	const [visible, setVisible] = useState(false);
	const [form] = Form.useForm<QuestionFormValues>();
	const [categories, setCategories] = useState<OptionItem[]>([]);
	const [levels, setLevels] = useState<OptionItem[]>([]);
	const [types, setTypes] = useState<OptionItem[]>([]);

	useImperativeHandle(ref, () => ({
		open: (record?: Partial<QuestionFormValues>) => {
			if (record) {
				form.setFieldsValue(record);
			} else {
				form.resetFields();
			}
			setVisible(true);
			fetchSelections();
			// getype();
		},
		close: () => setVisible(false)
	}));
	//获取分类
	const fetchSelections = async () => {
		const res = await getSelection();
		// if (res.code === 0) {
		console.log(res.data);

		setCategories(res.data.categories);
		setLevels(res.data.levels);
		setTypes(res.data.types);
		// }
	};
	// 获取题目类型
	// const getype = async () => {
	// 	const res = await gettype();
	// 	if (res.data.code === 0) {
	// 		setTypes(res.data);
	// 	}
	// };

	const handleSubmit = async (values: QuestionFormValues) => {
		try {
			const payload = {
				name: values.name,
				desc: values.desc,
				level: values.level,
				type: values.type,
				category: values.category,
				options: values.options ?? []
			};
			const res = await create(payload);

			if (res.code === 0) {
				message.success(res.msg);
				setVisible(false);
				props.onSuccess?.();
			}

			// 	message.success("题目保存成功");
			//
			// 	form.resetFields();
			// 	props.onSuccess?.();
			// } else {
			// 	message.error(res.data.message || "保存失败");
			// }
		} catch {
			message.error("保存失败");
		}
	};

	return (
		<Modal
			title="题目录入"
			visible={visible}
			onCancel={() => setVisible(false)}
			onOk={() => form.submit()}
			okText="提交"
			cancelText="取消"
			width={600}
			destroyOnClose
		>
			<Form form={form} layout="vertical" onFinish={handleSubmit} initialValues={{ options: [{ content: "", answer: false }] }}>
				<Form.Item label="题目名称" name="name" rules={[{ required: true, message: "请输入题目名称" }]}>
					<Input.TextArea rows={3} placeholder="请输入题目名称" />
				</Form.Item>

				<Row gutter={16}>
					<Col span={8}>
						<Form.Item label="题目分类" name="category" rules={[{ required: true, message: "请选择题目分类" }]}>
							<Select placeholder="请选择题目分类" allowClear>
								{categories.map(item => (
									<Option key={item.id} value={item.id}>
										{item.name}
									</Option>
								))}
							</Select>
						</Form.Item>
					</Col>

					<Col span={8}>
						<Form.Item label="题目类型" name="type" rules={[{ required: true, message: "请选择题目类型" }]}>
							<Select placeholder="请选择题目类型" allowClear>
								{types.map(item => (
									<Option key={item.id} value={item.id}>
										{item.description}
									</Option>
								))}
							</Select>
						</Form.Item>
					</Col>

					<Col span={8}>
						<Form.Item label="难易程度" name="level" rules={[{ required: true, message: "请选择难易程度" }]}>
							<Select placeholder="请选择难易程度" allowClear>
								{levels.map(item => (
									<Option key={item.id} value={item.id}>
										{item.description}
									</Option>
								))}
							</Select>
						</Form.Item>
					</Col>
				</Row>

				<Form.List name="options">
					{(fields, { add, remove }) => (
						<>
							<label>题目选项</label>
							{fields.map(({ key, name, ...restField }) => (
								<Space key={key} align="baseline" style={{ display: "flex", marginBottom: 8, width: "100%" }}>
									<Form.Item
										{...restField}
										name={[name, "content"]}
										rules={[{ required: true, message: "请输入选项内容" }]}
										style={{ flex: 1 }}
									>
										<Input placeholder="选项内容" />
									</Form.Item>
									<Form.Item {...restField} name={[name, "answer"]} valuePropName="checked">
										<Checkbox>正确</Checkbox>
									</Form.Item>
									<MinusCircleOutlined onClick={() => remove(name)} />
								</Space>
							))}
							<Form.Item>
								<Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
									添加选项
								</Button>
							</Form.Item>
						</>
					)}
				</Form.List>
				<Form.Item label="题目解析" name="desc">
					<Input.TextArea rows={3} placeholder="请输入题目解析" />
				</Form.Item>
			</Form>
		</Modal>
	);
});
QuestionFormModal.displayName = "QuestionFormModal";
export default QuestionFormModal;
