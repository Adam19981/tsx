import { computed, defineComponent, nextTick, ref } from "vue";
import { ColumnProps, searchFormProps } from "@/components/ProTable/interface";
import { createProp } from "@/utils/propsDefault";
import { ElForm, ElFormItem, ElButton } from "element-plus";
import { Delete, Search } from "@element-plus/icons-vue";
import { userSearchForm } from "@/hooks/searchForm";

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

	const { date, setInput, setSelect, setRadio, setSwitch, setDatePicker } = userSearchForm(props.searchParam, props.search);

	// 根据是否展开配置搜索项长度
	const getSearchList = computed((): ColumnProps[] => {
		if (searchShow.value) return filterColumns(props.columns);
		return filterColumns(props.columns).slice(0, props.maxLength);
	});

	function filterColumns(columns: ColumnProps[]) {
		return columns.filter((column: ColumnProps) => {
			return column.searchOption?.search;
		});
	}

	async function handleSearchShow() {
		searchShow.value = !searchShow.value;
		await nextTick();
		props.setTableHeight(true);
	}

	function handleReset() {
		formRef.value.resetFields();
		date.value = null;
		props.reset();
	}

	function setFormItem(column: ColumnProps) {
		switch (column.searchOption?.searchType) {
			case "input":
			case undefined:
				return setInput(column);
			case "select":
				return setSelect(column);
			case "radio":
				return setRadio(column);
			case "switch":
				return setSwitch(column);
			case "date":
				return setDatePicker(column);
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
				<ElButton icon={Delete} size="default" onClick={handleReset}>
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
