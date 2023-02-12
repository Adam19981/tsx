import { createVNode, render } from "vue";
import Component from "./index";
import { ComponentPublicInstance } from "@vue/runtime-core";

interface TestInstance extends ComponentPublicInstance {
	testOpen: () => void;
}

class TestManager {
	instance: TestInstance | null = null;

	constructor() {}
	open() {
		this.getInstance().$.exposed!.testOpen();
	}

	private getInstance() {
		if (!this.instance) {
			const vNode = createVNode(Component, null, null);
			const container = document.createElement("div");
			render(vNode, container, false);
			document.body.appendChild(container.firstElementChild!);
			this.instance = vNode.component!.proxy as TestInstance;
		}
		console.log(this.instance);

		return this.instance;
	}
}

export const testInstance = new TestManager();
