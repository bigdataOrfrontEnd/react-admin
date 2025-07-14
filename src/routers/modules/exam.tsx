// import React from "react";
// import lazyLoad from "@/routers/util/lazyLoad";
import { LayoutIndex } from "@/routers/constant";
import { RouteObject } from "@/routers/interface";
import Exam from "@/views/Exam/index";

// 首页模块
const homeRouter: Array<RouteObject> = [
	{
		element: <LayoutIndex />,
		children: [
			{
				path: "/home/exam",
				// element: lazyLoad(React.lazy(() => import("@/views/home/index"))),
				element: <Exam />,
				meta: {
					requiresAuth: true,
					title: "考试列表",
					key: "exam"
				}
			}
		]
	}
];

export default homeRouter;
