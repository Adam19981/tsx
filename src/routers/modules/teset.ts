import { RouteRecordRaw } from "vue-router";
import { Layout } from "@/routers/constant";

// 超级表格模块
const TestRouter: Array<RouteRecordRaw> = [
	{
		path: "/proTable1",
		component: Layout,
		redirect: "/proTable/useHooks",
		meta: {
			title: "超级表格111"
		},
		children: [
			{
				path: "/proTable1/useHooks",
				name: "useHooks",
				component: () => import("@/views/proTable/useHooks/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "使用 Hooks",
					key: "useHooks"
				}
			},
			{
				path: "/proTable1/useComponent",
				name: "useComponent",
				component: () => import("@/views/proTable/useComponent/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "使用 Component",
					key: "useComponent"
				}
			}
		]
	}
];

export default TestRouter;
