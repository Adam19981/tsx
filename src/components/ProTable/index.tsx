import { defineComponent, ref, h, onMounted } from "vue";
import { ColumnProps, ProTableProps } from "@/components/ProTable/interface";
import { ElTable, ElTableColumn, ElPagination, ElButton } from "element-plus";
import { Operation } from "@element-plus/icons-vue";
import props from "./props";
import { useTable } from "@/hooks/proTable";
import { getLocalDate } from "@/utils/date";
import ColSetting from "@/components/ProTable/components/ColSetting/index";
import SearchForm from "@/components/ProTable/components/SearchForm/index";
import tableBg from "@/assets/images/notData.png";

const proTable = defineComponent<ProTableProps>((props, ctx) => {
	const { expose, slots } = ctx;
	const tableRef = ref();
	const colRef = ref();
	const searchFormRef = ref();
	const selectedListIds = ref<any[]>();
	const tableHeight = ref<number>();
	const maxLength = ref<number>(0);

	// 表格操作 Hooks
	const { tableData, searchParam, pageable, watchReset, getTableList, search, reset, handleCurrentChange, handleSizeChange } =
		useTable(props.requestApi, props.initParam, props.showPagination, props.dataCallback);

	const tableColumns = ref<ColumnProps[]>();
	tableColumns.value = props.columns.map(column => {
		return {
			...column,
			isShow: column.isShow ?? true
		};
	});

	const colSetting = tableColumns.value.filter((column: ColumnProps) => {
		return column.isShow && !column.type;
	});

	onMounted(async () => {
		await getTableList();
		setTableHeight();
		window.addEventListener("resize", () => {
			setTableHeight();
		});
	});

	function openColSetting() {
		colRef.value.openColSetting();
	}

	function selectionChange(val: any[]) {
		selectedListIds.value = val;
	}

	function getSearchDateNum(): number {
		let num: number = 0;
		props.columns.forEach((column: ColumnProps) => {
			column.searchOption?.searchType === "dateRange" && (num += 1);
		});
		return num;
	}

	function setTableHeight(changeFormHeight: boolean = false) {
		tableHeight.value = window.innerHeight - 155;
		props.toolButton && (tableHeight.value -= 52);
		props.showPagination && (tableHeight.value -= 46);
		if (props.showSearch) {
			maxLength.value =
				Math.trunc((searchFormRef.value.$el.offsetWidth - 230 - getSearchDateNum() * 400) / 210) + getSearchDateNum();
			if (changeFormHeight) {
				tableHeight.value -= searchFormRef.value.$el.offsetHeight + 10;
			} else {
				tableHeight.value -= 60;
			}
		}
	}

	function setIndexOrSelectColumn(column: ColumnProps) {
		return (
			<ElTableColumn
				type={column.type}
				reserveSelection={column.type == "selection"}
				label={column.label}
				width={column.width}
				minWidth={column.minWidth}
				fixed={column.fixed}
			/>
		);
	}
	function setExpandColumn(column: ColumnProps) {
		return (
			<ElTableColumn
				type={column.type}
				label={column.label}
				width={column.width}
				minWidth={column.minWidth}
				fixed={column.fixed}
				v-slots={{
					default: (scope: any) => {
						return slots[column.prop] ? slots[column.prop]!(scope) : null;
					}
				}}
			/>
		);
	}
	function setColumn(column: ColumnProps) {
		return (
			<ElTableColumn
				prop={column.prop}
				label={column.label}
				width={column.width}
				minWidth={column.minWidth}
				sortable={column.sortable}
				showOverflowTooltip={column.prop !== "operation"}
				resizable={true}
				fixed={column.fixed}
				v-slots={{
					default: (scope: any) => {
						return slots[column.prop] ? slots[column.prop]!(scope) : setDefaultOrRender(column, scope);
					}
				}}
			/>
		);
	}

	function setDefaultOrRender(column: ColumnProps, scope: any) {
		if (column.render) {
			return column.render(h, scope);
		} else if (column.dateFormat) {
			return <span>{getLocalDate(column.dateFormat, scope.row[column.prop])}</span>;
		} else {
			return <span>{scope.row[column.prop] ? scope.row[column.prop] : "—"}</span>;
		}
	}

	function searchFormSlots(params: any) {
		const obj: { [key: string]: any } = {};
		for (const paramsKey in params) {
			if (slots["search_form_" + paramsKey]) {
				obj["search_form_" + paramsKey] = slots["search_form_" + paramsKey]!();
			}
		}
		return obj;
	}

	expose({
		search,
		searchParam,
		selectedListIds,
		watchReset
	});
	return () => (
		<div class="table-box">
			{props.showSearch ? (
				<SearchForm
					reset={reset}
					search={search}
					ref={searchFormRef}
					setTableHeight={setTableHeight}
					columns={tableColumns.value!}
					searchParam={searchParam.value}
					maxLength={maxLength.value}
					v-slots={searchFormSlots(props.initParam)}
				></SearchForm>
			) : null}
			<div class="table-header">
				<div class="header-button-lf">{slots.tableHeader ? slots.tableHeader() : null}</div>
				{props.toolButton ? (
					<ElButton class="header-button-ri" icon={Operation} circle onClick={openColSetting}></ElButton>
				) : null}
			</div>

			<ElTable
				height={tableHeight.value}
				ref={tableRef}
				data={tableData.value}
				border={props.border}
				onSelection-change={selectionChange}
				rowKey={props.rowKey}
				stripe={props.stripe}
				treeProps={{ children: props.childrenName }}
				v-slots={{
					empty: () => (
						<div class="table-empty">
							<img src={tableBg} alt="notData" />
							<div>暂无数据</div>
						</div>
					)
				}}
			>
				{tableColumns.value?.map((column: ColumnProps) => {
					if (column.type === "selection" || column.type === "index") return setIndexOrSelectColumn(column);
					if (column.type === "expand") return setExpandColumn(column);
					if (!column.type && column.isShow) return setColumn(column);
				})}
			</ElTable>

			{props.showPagination ? (
				<ElPagination
					style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
					v-model:currentPage={pageable.value.pageNum}
					v-model:page-size={pageable.value.pageSize}
					total={pageable.value.total}
					layout=" sizes, prev, pager, next, total, jumper"
					onSize-change={handleSizeChange}
					onCurrent-change={handleCurrentChange}
				></ElPagination>
			) : null}
			{props.toolButton ? <ColSetting ref={colRef} colSetting={colSetting}></ColSetting> : null}
		</div>
	);
});

proTable.props = props;
proTable.name = "ProTable";
export default proTable;
