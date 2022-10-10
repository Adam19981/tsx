import { defineComponent } from "vue";
import { RouteRecordRaw } from "vue-router";
import { createProp } from "@/utils/propsDefault";
import * as icon from "@element-plus/icons-vue";

const props = {
	menuList: createProp.createArray()
};

interface prop {
	menuList: Array<RouteRecordRaw>;
}

const subItem = defineComponent<prop>(props => {
	function setChildrenMenu(menu: RouteRecordRaw) {
		const Icon: any = icon[menu.meta?.icon as keyof typeof icon];
		return (
			<el-sub-menu
				index={menu.path}
				v-slots={{
					title: () => (
						<>
							{menu.meta?.icon ? (
								<el-icon>
									<Icon />
								</el-icon>
							) : null}
							<span>{menu.meta?.title ?? ""}</span>
						</>
					)
				}}
			>
				{menu.children?.map((item: RouteRecordRaw) => {
					return setMenu(item);
				})}
			</el-sub-menu>
		);
	}

	function setNoChildrenMenu(menu: RouteRecordRaw) {
		const Icon: any = icon[menu.meta?.icon as keyof typeof icon];
		return (
			<el-menu-item
				index={menu.path}
				v-slots={{
					title: () => <span>{menu.meta?.title ?? ""}</span>
				}}
			>
				{menu.meta?.icon ? (
					<el-icon>
						<Icon />
					</el-icon>
				) : null}
			</el-menu-item>
		);
	}

	function setMenu(menu: RouteRecordRaw) {
		return menu.meta?.hidden ? null : menu.meta?.showChildren ? setChildrenMenu(menu) : setNoChildrenMenu(menu);
	}

	return () => {
		return props.menuList.map((menu: RouteRecordRaw) => {
			return setMenu(menu);
		});
	};
});

subItem.props = props;

export default subItem;
