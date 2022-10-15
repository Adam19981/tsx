import { computed, defineComponent, nextTick, ref } from "vue";
import { ColumnProps, searchFormProps } from "@/components/ProTable/interface";
import { createProp } from "@/utils/propsDefault";
import { ElForm, ElFormItem, ElButton, ElInput, ElSelect, ElOption, ElRadioGroup, ElRadioButton, ElSwitch } from "element-plus";
import { Delete, Search } from "@element-plus/icons-vue";

const props = {
	columns: createProp.createArray(),
	searchParam: createProp.createObject(),
	search: createProp.createFunction(null),
	reset: createProp.createFunction(null),
	setTableHeight: createProp.createFunction(null),
	maxLength: createProp.createNumber()
};
const searchForm = defineComponent<searchFormProps>((props, ctx) => {
	const { slots } = ctx;
	const formRef = ref();

	// 是否展开搜索项
	const searchShow = ref(false);

	//容纳的搜索框的数量
	// const maxLength = ref<number>(0);

	// 根据是否展开配置搜索项长度
	const getSearchList = computed((): ColumnProps[] => {
		if (searchShow.value) return filterColumns(props.columns);
		return filterColumns(props.columns).slice(0, props.maxLength);
	});

	function filterColumns(columns: ColumnProps[]) {
		return columns.filter((column: ColumnProps) => {
			return column.search;
		});
	}

	async function handleSearchShow() {
		searchShow.value = !searchShow.value;
		await nextTick();
		props.setTableHeight();
	}

	function setInput(column: ColumnProps) {
		return <ElInput v-model={props.searchParam[column.prop]} placeholder={"请输入" + column.label} clearable></ElInput>;
	}

	function setSelect(column: ColumnProps) {
		return (
			<ElSelect v-model={props.searchParam[column.prop]} placeholder={"请选择" + column.label} clearable filterable>
				{column.enum?.map((item: any) => {
					return <ElOption label={item.label} value={item.value} disabled={item.disabled}></ElOption>;
				})}
			</ElSelect>
		);
	}
	function setRadio(column: ColumnProps) {
		return (
			<ElRadioGroup v-model={props.searchParam[column.prop]}>
				{column.enum?.map((item: any) => {
					return (
						<ElRadioButton label={item.value} disabled={item.disabled}>
							{item.label}
						</ElRadioButton>
					);
				})}
			</ElRadioGroup>
		);
	}
	function setSwitch(column: ColumnProps) {
		return <ElSwitch v-model={props.searchParam[column.prop]} activeValue={1} inactiveValue={2}></ElSwitch>;
	}
	function setFormItem(column: ColumnProps) {
		switch (column.searchType) {
			case "input":
			case undefined:
				return setInput(column);
			case "select":
				return setSelect(column);
			case "radio":
				return setRadio(column);
			case "switch":
				return setSwitch(column);
		}
	}
	return () => (
		<div class="table-search" onSubmit={event => event.preventDefault()}>
			<ElForm ref={formRef} model={props.searchParam} inline={true} size="default">
				{getSearchList.value.map((item: ColumnProps) => {
					return <ElFormItem prop={item.prop}>{slots[item.prop] ? slots[item.prop]!() : setFormItem(item)}</ElFormItem>;
				})}
			</ElForm>
			<div class="search-operation">
				<ElButton type="primary" size="default" icon={Search} onClick={props.search}>
					搜索
				</ElButton>
				<ElButton icon={Delete} size="default" onClick={props.reset}>
					重置
				</ElButton>
				{props.columns.length > props.maxLength ? (
					<ElButton type="primary" link class="search-isOpen" onClick={handleSearchShow}>
						{searchShow.value ? "合并" : "展开"}
					</ElButton>
				) : null}
			</div>
		</div>
	);
});
searchForm.props = props;
export default searchForm;
