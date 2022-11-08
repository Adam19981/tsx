type propType = Function | Object | Array<any> | String | Boolean | Number;

export class createProp {
	static createAll(type: propType, defaultValue: any) {
		return { type: type, default: defaultValue };
	}

	static createFunction(defaultValue: (() => any) | null = null) {
		return this.createAll(Function, defaultValue);
	}

	static createObject(defaultValue: { [key: string]: any } | null = {}) {
		return this.createAll(Object, () => defaultValue);
	}

	static createArray(defaultValue: Array<any> | null = []) {
		return this.createAll(Array, () => defaultValue);
	}

	static createString(defaultValue: string | null = "") {
		return this.createAll(String, defaultValue);
	}

	static createBoolean(defaultValue: boolean | null = false) {
		return this.createAll(Boolean, defaultValue);
	}

	static createNumber(defaultValue: number | null = 0) {
		return this.createAll(Number, defaultValue);
	}
}
