import { ColumnProps } from "@/components/ProTable/interface";
import { ElInput, ElOption, ElRadioButton, ElRadioGroup, ElSelect, ElSwitch } from "element-plus/es";

export function userSearchForm(searchParam: any, search: () => void) {
	function dateChange(event: number | number[], key: string | string[]) {
		if (event) {
			if (Array.isArray(event)) {
				searchParam[key[0]] = Math.round(event[0] / 1000);
				searchParam[key[1]] = Math.round(event[1] / 1000);
			} else {
				searchParam[key as string] = Math.round(event / 1000);
			}
		} else {
			if (Array.isArray(key)) {
				searchParam[key[0]] = 0;
				searchParam[key[1]] = 0;
			} else {
				searchParam[key as string] = 0;
			}
		}
		search();
	}

	function setInput(column: ColumnProps) {
		return (
			<ElInput
				v-model={searchParam[column.prop]}
				placeholder={"请输入" + column.label}
				clearable
				onKeydown={(event: any) => event.keyCode === 13 && search()}
			></ElInput>
		);
	}

	function setSelect(column: ColumnProps) {
		const newLabel: string | undefined = column.searchOption?.keyConfig?.label;
		const newValue: string | number | undefined = column.searchOption?.keyConfig?.value;
		return (
			<ElSelect
				v-model={searchParam[column.prop]}
				placeholder={"请选择" + column.label}
				multiple={column.searchOption?.searchType === "multipleSelect"}
				clearable
				filterable
				onChange={search}
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
			<ElRadioGroup v-model={searchParam[column.prop]} onChange={search}>
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
				v-model={searchParam[column.prop]}
				activeValue={column.searchOption?.switchValue?.active}
				inactiveValue={column.searchOption?.switchValue?.inactive}
				onChange={search}
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

	return {
		setInput,
		setSelect,
		setRadio,
		setSwitch,
		setDatePicker
	};
}
