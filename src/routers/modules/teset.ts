import { RouteRecordRaw } from "vue-router";
import { Layout } from "@/routers/constant";

// 超级表格模块
const TestRouter: Array<RouteRecordRaw> = [
	{
		path: "/proTable1",
		component: Layout,
		redirect: "/proTable/useHooks",
		meta: {
			title: "超级表格",
			icon: "DocumentCopy",
			showChildren: true
		},
		children: [
			{
				path: "/proTable1/useComponent",
				name: "useComponent",
				component: () => import("@/views/proTable/useComponent/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "好用的Table",
					key: "useComponent"
				}
			}
		]
	}
];

export default TestRouter;
