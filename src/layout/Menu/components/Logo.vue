<template>
	<div class="logo flx-center">
		<img src="@/assets/images/logo.svg" alt="logo" />
		<span v-show="!isCollapse">Vue Tsx</span>
	</div>
</template>

<script setup lang="ts">
defineProps<{ isCollapse: boolean }>();
</script>

<style scoped lang="scss">
@import "../index.scss";
</style>
