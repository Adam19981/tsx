<template>
	<el-button @click="handleTest">测试</el-button>
</template>

<script lang="ts" setup>
import { testInstance } from "@/views/test/component/manager";

function handleTest() {
	testInstance.open();
}
</script>

<style></style>
