import { createProp } from "@/utils/propsDefault";

export default {
	columns: createProp.createArray(),
	showPagination: createProp.createBoolean(true),
	initParam: createProp.createObject({}),
	border: createProp.createBoolean(true),
	stripe: createProp.createBoolean(),
	requestApi: createProp.createFunction(null),
	dataCallback: createProp.createFunction(null),
	toolButton: createProp.createBoolean(true),
	showSearch: createProp.createBoolean(true),
	childrenName: createProp.createString("children"),
	rowKey: createProp.createString("id")
};
