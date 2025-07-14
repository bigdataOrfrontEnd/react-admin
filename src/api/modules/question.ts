import http from "@/api";

// * 获取问题列表
export const getquestionList = () => {
	return http.get<any>(`/exam/question/all`);
};
