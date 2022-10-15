import { defineComponent, ref } from "vue";
import { ElDrawer, ElTable, ElTableColumn, ElSwitch } from "element-plus";
import { ColumnProps } from "@/components/ProTable/interface";
import { createProp } from "@/utils/propsDefault";

interface ColSettingProps {
	colSetting: ColumnProps[];
}
const props = {
	colSetting: createProp.createArray()
};
const colSetting = defineComponent<ColSettingProps>((props, ctx) => {
	const { expose } = ctx;
	const drawerVisible = ref<boolean>(false);

	function openColSetting(): void {
		drawerVisible.value = true;
	}

	expose({
		openColSetting
	});

	return () => (
		<ElDrawer title="列设置" v-model={drawerVisible.value} size="400px">
			<div class="table-box">
				<ElTable
					height="575"
					data={props.colSetting}
					border={true}
					v-slots={{
						empty: () => (
							<div class="table-empty">
								<img src={"@/assets/images/notData.png"} alt="notData" />
								<div>暂无数据</div>
							</div>
						)
					}}
				>
					<ElTableColumn prop="label" label="列名" />
					<ElTableColumn
						prop="name"
						label="显示"
						v-slots={{
							default: (scope: any) => <ElSwitch v-model:value={scope.row.isShow}></ElSwitch>
						}}
					></ElTableColumn>
				</ElTable>
			</div>
		</ElDrawer>
	);
});
colSetting.props = props;
export default colSetting;
