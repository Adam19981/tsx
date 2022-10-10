import { RouteRecordRaw } from "vue-router";

// 数据大屏模块
const loginRouter: Array<RouteRecordRaw> = [
	{
		path: "/login",
		name: "login",
		component: () => import("@/views/login/index.vue"),
		meta: {
			requiresAuth: false,
			title: "登录页",
			hidden: true,
			key: "login"
		}
	}
];

export default loginRouter;
