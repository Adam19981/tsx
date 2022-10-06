import { RouteRecordRaw } from "vue-router";

// 首页模块
const entrance: Array<RouteRecordRaw> = [
	{
		path: "/entrance",
		component: () => import("@/views/entrance/index.vue"),
		meta: {
			title: "入口",
			hidden: true,
			key: "entrance"
		}
	}
];

export default entrance;
