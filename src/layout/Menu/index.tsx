import { computed, defineComponent, onMounted, ref } from "vue";
import { MenuStore } from "@/store/modules/menu";
import { RouteRecordRaw, useRoute } from "vue-router";
import { AuthStore } from "@/store/modules/auth";
import { routerArray } from "@/routers/router";
import { handleRouter } from "@/utils/util";
import { loadingSvg } from "@/utils/svg";
import SubItem from "./components/subItem";
import "./index.scss";
import logo from "@/assets/images/logo.svg";

const menu = defineComponent(() => {
	const route = useRoute();
	const menuStore = MenuStore();
	const authStore = AuthStore();
	const activeMenu = computed((): string => route.path);
	const isCollapse = computed((): boolean => menuStore.isCollapse);
	const menuList = computed((): RouteRecordRaw[] => menuStore.menuList);
	// 菜单加载 loading
	const loading = ref(false);

	// aside 自适应
	const screenWidth = ref<number>(0);

	onMounted(async () => {
		// 获取菜单列表
		loading.value = true;
		try {
			// const res = await getMenuList();
			if (!(routerArray && routerArray.length)) return;
			// 把路由菜单处理成一维数组（存储到 pinia 中）
			const dynamicRouter = handleRouter(routerArray);
			await authStore.setAuthRouter(dynamicRouter);
			await menuStore.setMenuList(routerArray);
		} finally {
			loading.value = false;
		}
	});

	// 监听窗口大小变化，合并 aside
	function listeningWindow() {
		window.onresize = () => {
			return (() => {
				screenWidth.value = document.body.clientWidth;
				if (!isCollapse.value && screenWidth.value < 1200) menuStore.setCollapse();
				if (isCollapse.value && screenWidth.value > 1200) menuStore.setCollapse();
			})();
		};
	}
	listeningWindow();

	return () => (
		<div
			class="menu"
			style={{ width: isCollapse.value ? "65px" : "220px" }}
			v-loading={loading.value}
			element-loading-text="Loading..."
			element-loading-spinner={loadingSvg}
			elementLoading-svg-view-box="-10, -10, 50, 50"
			elementLoading-background="rgba(122, 122, 122, 0.01)"
		>
			<div class="logo flx-center">
				<img src={logo} alt="logo" />
				<span v-show={!isCollapse.value}>Vue Tsx</span>
			</div>
			<el-scrollbar>
				<el-menu
					defaultActive={activeMenu.value}
					router={true}
					collapse={isCollapse.value}
					collapseTransition={false}
					uniqueOpened={true}
					backgroundColor="#191a20"
					textColor="#bdbdc0"
					activeTextColor="#fff"
				>
					<SubItem menuList={menuList.value}></SubItem>
				</el-menu>
			</el-scrollbar>
		</div>
	);
});

export default menu;
