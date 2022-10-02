import AMapLoader from "@amap/amap-jsapi-loader/index";
import { mapInterface } from "@/components/map/mapInterface";

export class mapPublic implements mapInterface.map {
	constructor(key: string) {
		this.key = key;
	}
	public readonly key: string;
	public mapClass: any;
	public mapInstance: any;

	public async createMapClass(id: string, options: mapInterface.mapOptions): Promise<void> {
		this.mapClass = await AMapLoader.load({
			key: this.key,
			version: "2.0",
			plugins: options.plugins
		});
	}

	public async createMapInstance(id: string, options: mapInterface.mapOptions): Promise<void> {
		await this.createMapClass(id, options);
		this.mapInstance = new this.mapClass.Map(id, {
			mapStyle: `amap://styles/${options.mapStyle}`,
			resizeEnable: options.resizeEnable,
			zoom: options.zoom,
			center: options.center
		});
	}

	public createIcon(options: mapInterface.icon) {
		return new this.mapClass.Icon({
			// 图标尺寸
			size: new this.mapClass.Size(options.size[0], options.size[1]),
			// 图标的取图地址
			image: options.image,
			// 图标所用图片大小
			imageSize: new this.mapClass.Size(options.imageSize[0], options.imageSize[1]),
			// 图标取图偏移量
			imageOffset: new this.mapClass.Pixel(options.imageOffset[0], options.imageOffset[1])
		});
	}

	public setFeatures(features: string | Array<string>): void {
		//通过setFeatures方法设置显示部分底图元素： bg//point//road//building
		this.mapInstance.setFeatures(features);
	}

	public setMapStyle(mapStyle: string): void {
		//设置map的自定义样式
		this.mapInstance.setMapStyle(mapStyle);
	}

	public createMarker(options: mapInterface.marker): any {
		//创建一个点标记
		return new this.mapClass.Marker({
			position: options.position,
			icon: options.icon,
			title: options.title
		});
	}

	public addMarker(marker: any | any[]): void {
		//在地图上增加点标记
		this.mapInstance.add(marker);
	}

	public removeMarker(marker: any | any[]): void {
		//在地图上移除点标记
		this.mapInstance.remove(marker);
	}

	public getMapZoom(): number {
		//获取地图缩放比例
		return this.mapInstance.getZoom();
	}

	public getMapCenter(): number[] {
		//获取地图中心点
		return this.mapInstance.getCenter();
	}

	public setMapCenter(center: [number, number]): void {
		//设置地图中心点m
		this.mapInstance.setCenter(center);
	}
	public setMapZoom(zoom: number): void {
		//设置地图缩放比例
		this.mapInstance.setZoom(zoom);
	}
	public setMapZoomAndCenter(zoom: number, center: [number, number]): void {
		//设置地图中心点和缩放比例
		this.mapInstance.setZoomAndCenter(zoom, center);
	}
}

export const mapManager = new mapPublic("67d8bee1ac1651e1117725a5efe39a47");
