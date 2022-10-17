import { computed, defineComponent, nextTick, ref } from "vue";
import { ColumnProps, searchFormProps, SearchType } from "@/components/ProTable/interface";
import { createProp } from "@/utils/propsDefault";
import { ElForm, ElFormItem, ElButton } from "element-plus";
import { Delete, Search } from "@element-plus/icons-vue";
import { ElInput, ElOption, ElRadioButton, ElRadioGroup, ElSelect, ElSwitch } from "element-plus/es";

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

	// 是否展开搜索项
	const searchShow = ref(false);

	// 根据是否展开配置搜索项长度
	const getSearchList = computed((): ColumnProps[] => {
		if (searchShow.value) return filterColumns(props.columns);
		return filterColumns(props.columns).slice(0, props.maxLength);
	});

	function setInput(column: ColumnProps) {
		return (
			<ElInput
				v-model={props.searchParam[column.prop]}
				placeholder={"请输入" + column.label}
				clearable
				onKeydown={(event: any) => event.keyCode === 13 && props.search()}
			></ElInput>
		);
	}

	function setSelect(column: ColumnProps) {
		const newLabel: string | undefined = column.searchOption?.keyConfig?.label;
		const newValue: string | number | undefined = column.searchOption?.keyConfig?.value;
		return (
			<ElSelect
				v-model={props.searchParam[column.prop]}
				placeholder={"请选择" + column.label}
				multiple={column.searchOption?.searchType === "multipleSelect"}
				clearable
				filterable
				onChange={props.search}
			>
				{column.searchOption?.enum?.map((item: any) => {
					return (
						<ElOption
							label={newLabel ? item[newLabel] : item.label}
							value={newValue ? item[newValue] : item.value}
							disabled={item.disabled}
						></ElOption>
					);
				})}
			</ElSelect>
		);
	}

	function setRadio(column: ColumnProps) {
		return (
			<ElRadioGroup v-model={props.searchParam[column.prop]} onChange={props.search}>
				{column.searchOption?.enum?.map((item: any) => {
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
		return (
			<ElSwitch
				v-model={props.searchParam[column.prop]}
				activeValue={column.searchOption?.switchValue?.active}
				inactiveValue={column.searchOption?.switchValue?.inactive}
				onChange={props.search}
			></ElSwitch>
		);
	}

	function setDatePicker(column: ColumnProps) {
		return (
			<el-date-picker
				v-model={column.searchOption!.dateOption!.dateValue}
				valueFormat="x"
				format={column.searchOption?.dateOption!.format}
				type={column.searchOption?.dateOption!.dateTye}
				onChange={(event: any) => {
					column.searchOption?.dateOption!.change
						? column.searchOption.dateOption.change(event, column.searchOption!.dateOption!.dateKey)
						: dateChange(event, column.searchOption!.dateOption!.dateKey);
				}}
				clearable
				editable={false}
				placeholder={"请选择" + column.label}
				startPlaceholder="开始时间"
				endPlaceholder="结束时间"
			></el-date-picker>
		);
	}

	function dateChange(event: number | number[], key: string | string[]) {
		if (event) {
			if (Array.isArray(event)) {
				props.searchParam[key[0]] = Math.round(event[0] / 1000);
				props.searchParam[key[1]] = Math.round(event[1] / 1000);
			} else {
				props.searchParam[key as string] = Math.round(event / 1000);
			}
		} else {
			if (Array.isArray(key)) {
				props.searchParam[key[0]] = 0;
				props.searchParam[key[1]] = 0;
			} else {
				props.searchParam[key as string] = 0;
			}
		}
		props.search();
	}

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
		getSearchList.value.forEach((item: ColumnProps) => {
			const type: SearchType | undefined = item.searchOption!.searchType;
			(type === "date" || type === "dateRange") &&
				(item.searchOption!.dateOption!.dateValue = item.searchOption!.dateOption!.dateDefaultValue);
		});
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
			<ElForm model={props.searchParam} inline={true} size="default">
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
