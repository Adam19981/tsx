<template>
	<div class="content-box">
		<span class="text">ๅพ็ไธไผ  ๐๐๐๐</span>
		<UploadImg v-model:imageUrl="avatar" :uploadStyle="uploadStyle">
			<template #tip> ไธไผ ๆๅ่ฟๅๅพ็ๆฏๆจกๆๅบๅฎ็ </template>
		</UploadImg>
	</div>
</template>

<script setup lang="ts" name="uploadImg">
import { ref } from "vue";
import UploadImg from "@/components/UploadImg/index.vue";

const avatar = ref("");
const uploadStyle = { width: "175px", height: "175px" };
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
