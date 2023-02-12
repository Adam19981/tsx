export namespace MapInterface {
	export interface Map {
		readonly key: string;
		mapClass: any;
		mapInstance: any;
		createMapClass: (id: string, options: any) => void;
		createMapInstance: (id: string, options: any) => void;
	}
	export interface MapOptions {
		plugins?: Array<string>;
		mapStyle?: string;
		resizeEnable?: boolean;
		zoom?: number;
		center?: [number, number];
	}
	export interface CommonMarker {
		position: [number, number];
		title?: string;
		icon?: any;
	}
	export interface MarkerIcon {
		image: string;
		size: [number, number];
		imageSize: [number, number];
		imageOffset: [number, number];
	}
	export interface TextMarker {
		text: string;
		style: { [key: string]: string | number };
		position: [number, number];
		cursor: string;
		draggable: boolean;
		angle: number;
		anchor: string;
	}
	export interface CircleMarkerOptions {
		center: [number, number]; //圆心位置
		radius?: number; //3D视图下，CircleMarker半径不要超过64px
		strokeColor?: string; //线条颜色，使用16进制颜色代码赋值。默认值为#006600
		strokeWeight?: number; //轮廓线宽度
		strokeOpacity?: number; //轮廓线透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.9
		fillColor?: string; //圆形填充颜色,使用16进制颜色代码赋值。默认值为#006600
		fillOpacity?: number; //	圆形填充透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.9
		zIndex?: number; //层叠顺序默认zIndex:10
		bubble?: boolean; //是否将覆盖物的鼠标或touch等事件冒泡到地图上
	}
}
