export namespace mapInterface {
	export interface map {
		readonly key: string;
		mapClass: any;
		mapInstance: any;
		createMapClass: (id: string, options: any) => void;
		createMapInstance: (id: string, options: any) => void;
	}
	export interface mapOptions {
		plugins?: Array<string>;
		mapStyle?: string;
		resizeEnable?: boolean;
		zoom?: number;
		center?: [number, number];
	}
	export interface marker {
		position: [number, number];
		title?: string;
		icon?: any;
	}
	export interface icon {
		image: string;
		size: [number, number];
		imageSize: [number, number];
		imageOffset: [number, number];
	}
}
