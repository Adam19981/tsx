import { RouteRecordRaw } from "vue-router";
import { Layout } from "@/routers/constant";

// dashboard 模块
const dashboardRouter: Array<RouteRecordRaw> = [
	{
		path: "/test",
		component: Layout,
		name: "test",
		redirect: "/test/info",
		meta: {
			icon: "Platform",
			title: "测试"
		},
		children: [
			{
				path: "/test/info",
				name: "testInfo",
				component: () => import("@/views/test/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true
				}
			}
		]
	}
];

export default dashboardRouter;
