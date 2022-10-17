import { Table } from "./interface";
import { reactive, computed, toRefs, watch } from "vue";

/**
 * @description table 页面操作方法封装
 * @param {Function} api 获取表格数据 api 方法(必传)
 * @param {Object} initParam 获取数据初始化参数(非必传，默认为{})
 * @param {Boolean} isPageable 是否有分页(非必传，默认为true)
 * @param {Function} dataCallBack 对后台返回的数据进行处理的方法(非必传)
 * */
export function useTable(
	api: (params: any) => Promise<any>,
	initParam: object = {},
	isPageable: boolean = true,
	dataCallBack?: (data: any) => any
) {
	const state = reactive<Table.TableStateProps>({
		// 表格数据
		tableData: [],
		watchReset: false,
		// 分页数据
		pageable: {
			// 当前页数
			pageNum: 1,
			// 每页显示条数
			pageSize: 10,
			// 总条数
			total: 0
		},
		// 查询参数(只包括查询)
		searchParam: { ...initParam },
		// 初始化默认的查询参数
		// 总参数(包含分页和查询参数)
		totalParam: {}
	});

	watch(
		() => initParam,
		value => {
			console.log(value);
		}
	);

	/**
	 * @description 分页查询参数(只包括分页和表格字段排序,其他排序方式可自行配置)
	 * */
	const pageParam = computed({
		get: () => {
			return {
				pageNum: state.pageable.pageNum,
				pageSize: state.pageable.pageSize
			};
		},
		set: (newVal: any) => {
			console.log("我是分页更新之后的值", newVal);
		}
	});

	/**
	 * @description 获取表格数据
	 * @return void
	 * */
	async function getTableList() {
		try {
			// 先把初始化参数和分页参数放到总参数里面
			Object.assign(state.totalParam, state.searchParam, isPageable ? pageParam.value : {});
			console.log(state.totalParam);
			let { data } = await api(state.totalParam);
			console.log(data);
			let { datalist, total } = data;
			dataCallBack && (datalist = dataCallBack(datalist));
			state.tableData = datalist;
			state.pageable.total = total;
		} catch (error) {
			console.log(error);
		}
	}

	/**
	 * @description 表格数据查询
	 * @return void
	 * */
	function search() {
		state.pageable.pageNum = 1;
		getTableList();
	}

	/**
	 * @description 表格数据重置
	 * @return void
	 * */
	function reset() {
		state.pageable.pageNum = 1;
		state.searchParam = { ...initParam };
		state.watchReset = !state.watchReset;
		getTableList();
	}

	/**
	 * @description 每页条数改变
	 * @param {Number} val 当前条数
	 * @return void
	 * */
	function handleSizeChange(val: number) {
		state.pageable.pageNum = 1;
		state.pageable.pageSize = val;
		getTableList();
	}

	/**
	 * @description 当前页改变
	 * @param {Number} val 当前页
	 * @return void
	 * */
	function handleCurrentChange(val: number) {
		state.pageable.pageNum = val;
		getTableList();
	}

	return {
		...toRefs(state),
		getTableList,
		search,
		reset,
		handleSizeChange,
		handleCurrentChange
	};
}
