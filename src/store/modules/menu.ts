import { defineStore } from "pinia";
import { MenuState } from "../interface";
import piniaPersistConfig from "@/config/piniaPersist";

// MenuStore
export const MenuStore = defineStore({
	id: "MenuState",
	state: (): MenuState => ({
		// menu collapse
		isCollapse: false,
		// menu List
		menuList: []
	}),
	getters: {},
	actions: {
		async setCollapse() {
			this.isCollapse = !this.isCollapse;
		},
		async setMenuList(menuList: any) {
			this.menuList = menuList;
		}
	},
	persist: piniaPersistConfig("MenuState")
});
