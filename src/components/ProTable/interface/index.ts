export interface EnumProps {
	label: string; // 选项框显示的文字
	value: any; // 选项框值
	disabled?: boolean; // 是否禁用此选项
	tagType?: string; // 当 tag 为 true 时，此选择会指定 tag 显示类型
	children?: EnumProps[]; // 为树形选择时，可以通过 children 属性指定子选项
	[key: string]: any;
}

export type SearchType = "input" | "select" | "multipleSelect" | "radio" | "switch" | "treeSelect" | "dateRange" | "date";

export type TypeProp = "index" | "selection" | "expand";

export type FixedProp = "left" | "right";

export type DateType = "year" | "month" | "date" | "dates" | "datetime" | "week" | "datetimerange" | "daterange" | "monthrange";

export interface ColumnProps {
	type?: TypeProp; // index | selection | expand（特殊类型）
	prop: string; // 单元格数据（非特殊类型必填）
	label?: string; // 单元格标题（非特殊类型必填）
	width?: number | string; // 列宽
	minWidth?: number | string; // 最小列宽
	isShow?: boolean; // 是否显示在表格当中
	sortable?: boolean; // 是否可排序（静态排序）
	fixed?: FixedProp; // 固定列
	searchOption?: {
		search?: boolean; // 是否为搜索项
		searchType?: SearchType; // 搜索项类型
		dateOption?: {
			dateTye?: DateType; //时间搜索类型
			dateKey: string | string[];
			dateValue: number | number[] | null;
			change?: (event: any, key: string | string[]) => void;
			dateDefaultValue: number | number[] | null;
			format?: string;
		};
		switchValue?: {
			active: any;
			inactive: any;
		};
		enum?: EnumProps[];
		keyConfig?: {
			label: string;
			value: string | number;
		};
	};
	renderHeader?: (params: any) => any; // 自定义表头
	render?: (h: any, params: any) => any;
	dateFormat?: string;
}

export interface searchFormProps {
	columns: ColumnProps[]; // 搜索配置列
	searchParam: any; // 搜索参数
	maxLength: number;
	search: () => void; // 搜索方法
	reset: () => void; // 重置方法
	setTableHeight: (changeFormHeight: boolean) => void; // 重置方法
}

export interface ProTableProps {
	columns: ColumnProps[]; // 列配置项
	requestApi: (params: any) => Promise<any>; // 请求表格数据的api ==> 必传
	dataCallback?: (data: any) => any; // 返回数据的回调函数，可以对数据进行处理
	showPagination?: boolean; // 是否需要分页组件 ==> 非必传（默认为true）
	initParam?: any; // 初始化请求参数 ==> 非必传（默认为{}）
	border?: boolean; // 表格是否显示边框 ==> 非必传（默认为true）
	stripe?: boolean; // 是否带斑马纹表格 ==> 非必传（默认为false）
	toolButton?: boolean; // 是否显示表格功能按钮 ==> 非必传（默认为true）
	showSearch?: boolean;
	rowKey?: string;
	childrenName?: string; // 当数据存在 children 时，指定 children key 名字 ==> 非必传（默认为"children"）
}
