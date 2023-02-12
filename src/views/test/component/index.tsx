import { ref } from "vue";

import { defineComponent } from "vue";

const test = defineComponent((props, ctx) => {
	const { expose } = ctx;

	const test = ref<string>("a");

	function testOpen() {
		console.log(1);
	}

	expose({
		test,
		testOpen
	});

	return () => <div>{test.value}</div>;
});

export default test;
