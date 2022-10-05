import AMapLoader from "@amap/amap-jsapi-loader/index";
import { MapInterface } from "@/components/map/MapInterface";

export class mapPublic implements MapInterface.Map {
	public readonly key: string = "67d8bee1ac1651e1117725a5efe39a47";
	public mapClass: any;
	public mapInstance: any;

	public async createMapClass(id: string, options: MapInterface.MapOptions): Promise<void> {
		this.mapClass = await AMapLoader.load({
			key: this.key,
			version: "2.0",
			plugins: options.plugins
		});
	}

	public async createMapInstance(id: string, options: MapInterface.MapOptions): Promise<void> {
		await this.createMapClass(id, options);
		this.mapInstance = new this.mapClass.Map(id, {
			mapStyle: `amap://styles/${options.mapStyle}`,
			resizeEnable: options.resizeEnable,
			zoom: options.zoom,
			center: options.center
		});
	}

	public createIcon(options: MapInterface.MarkerIcon) {
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

	public createCommonMarker(options: MapInterface.CommonMarker): any {
		//创建一个常规点标记
		return new this.mapClass.Marker(options);
	}

	public createTextMarker(options: MapInterface.TextMarker): any {
		//创建文本标记
		return new this.mapClass.Text(options);
	}

	public createCircleMarker(options: MapInterface.CircleMarkerOptions): any {
		return new this.mapClass.CircleMarker(options);
	}

	public createMarker(type: string, options: any) {
		switch (type) {
			case "text":
				return this.createTextMarker(options);
			case "common":
				return this.createCommonMarker(options);
			case "circle":
				return this.createCircleMarker(options);
		}
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
		//设置地图中心点s
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

	public setFeatures(features: string | Array<string>): void {
		//通过setFeatures方法设置显示部分底图元素： bg//point//road//building
		this.mapInstance.setFeatures(features);
	}

	public setMapStyle(mapStyle: string): void {
		//设置map的自定义样式
		this.mapInstance.setMapStyle(mapStyle);
	}
}

export const mapManager = new mapPublic();
