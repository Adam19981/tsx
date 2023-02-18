<template>
	<textarea id="editor" name="editor"></textarea>
</template>

<script lang="ts" setup>
import { Jodit } from "jodit";
import "jodit/build/jodit.min.css";

import { onMounted } from "vue";
let editor: Jodit;
onMounted(() => {
	editor = Jodit.make("#editor");
	editor.value = '<div style="color:red">测试</div>';
});
</script>

<style></style>
