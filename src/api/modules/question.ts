import http from "@/api";

// * 获取问题列表
export const getquestionList = () => {
	return http.get<any>(`/exam/question/all`);
};
//获取问题分类
export const getSelection = () => {
	return http.get<any>(`/exam/question/selection`);
};
//获取问题类型
export const gettype = () => {
	return http.get<any>(`/exam/question/type/list`);
};
//创建问题
export const create = (param: any) => {
	return http.post<any>(`/exam/question/create`, param);
};
