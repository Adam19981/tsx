import { createProp } from "@sworks/utils";

export default {
	columns: createProp.createArray(),
	showPagination: createProp.createBoolean(true),
	initParam: createProp.createObject(),
	border: createProp.createBoolean(true),
	stripe: createProp.createBoolean(),
	requestApi: createProp.createFunction(),
	dataCallback: createProp.createFunction(),
	toolButton: createProp.createBoolean(true),
	showSearch: createProp.createBoolean(true),
	childrenName: createProp.createString("children"),
	rowKey: createProp.createString("id")
};
