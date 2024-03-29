import { RouteRecordRaw } from "vue-router";
import { Layout } from "@/routers/constant";

// dashboard 模块
const dashboardRouter: Array<RouteRecordRaw> = [
	{
		path: "/dashboard",
		component: Layout,
		name: "home",
		redirect: "/dashboard/dataVisualize",
		meta: {
			icon: "Platform",
			title: "首页",
			showChildren: true
		},
		children: [
			{
				path: "/dashboard/dataVisualize",
				name: "dataVisualize",
				component: () => import("@/views/dashboard/dataVisualize/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: false,
					title: "数据可视化",
					key: "dataVisualize"
				}
			},
			{
				path: "/dashboard/embedded",
				name: "embedded",
				component: () => import("@/views/dashboard/embedded/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "内嵌页面",
					key: "embedded"
				}
			}
		]
	}
];

export default dashboardRouter;
