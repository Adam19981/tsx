<template>
	<div class="main">
		<div class="navigation" :class="active ? 'navigationActive' : ''" @click="handleClick" ref="navigation">
			<span style="

--i: 0; --x: -1; --y: 0">
				<el-icon> <Star /></el-icon>
			</span>
			<span style="

--i: 1; --x: 1; --y: 0">
				<el-icon> <Star /></el-icon
			></span>
			<span style="

--i: 2; --x: 0; --y: -1">
				<el-icon> <Star /></el-icon
			></span>
			<span style="

--i: 3; --x: 0; --y: 1">
				<el-icon> <Star /></el-icon
			></span>
			<span style="

--i: 4; --x: 1; --y: 1">
				<el-icon> <Star /></el-icon
			></span>

			<span style="

--i: 5; --x: -1; --y: -1">
				<el-icon> <Star /></el-icon
			></span>
			<span style="

--i: 6; --x: 0; --y: 0" @click="handlePush">
				<el-icon> <HomeFilled /></el-icon
			></span>
			<span style="

--i: 7; --x: -1; --y: 1">
				<el-icon> <Star /></el-icon
			></span>
			<span style="

--i: 8; --x: 1; --y: -1">
				<el-icon> <Star /></el-icon
			></span>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import routers from "@/routers";

const active = ref<boolean>(false);
const navigation = ref();
onMounted(() => {
	window.addEventListener("click", handleClickBlank);
});

function handleClickBlank(e: any) {
	if (navigation.value && !navigation.value.contains(e.target)) {
		if (active.value === true) {
			active.value = false;
		}
	}
}
function handleClick() {
	active.value = true;
}
function handlePush() {
	routers.push({ name: "login" });
}

onUnmounted(() => {
	window.removeEventListener("click", handleClickBlank);
});
</script>

<style scoped lang="scss">
.main {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	background: #10131c;
	.navigation {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 120px;
		height: 120px;
		cursor: pointer;
		background: #212532;
		border-radius: 10px;
		transition: 0.5s;
		transition-delay: 0.8s;
		span {
			position: absolute;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 14px;
			height: 14px;
			background: #ffffff;
			border-radius: 50%;
			transition: transform 0.5s, width 0.5s, height 0.5s, background 0.5s;
			transition-delay: calc(0.1s * var(--i));
			transform: translate(calc(30px * var(--x)), calc(30px * var(--y)));
			i {
				font-size: 0;
				transition: 0.5s;
			}
		}
	}
	.navigationActive {
		width: 250px;
		height: 250px;
		transition-delay: 0s;
		span {
			width: 45px;
			height: 45px;
			background: #333849;
			transform: translate(calc(70px * var(--x)), calc(70px * var(--y)));
			i {
				font-size: 1.35em;
				color: #ffffff;
			}
		}
		span:hover i {
			color: #2dfc52;
			filter: drop-shadow(0 0 2px #2dfc52) drop-shadow(0 0 5px #2dfc52) drop-shadow(0 0 15px #2dfc52);
		}
	}
}
</style>
