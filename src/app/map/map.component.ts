import { Component, OnInit, OnDestroy } from '@angular/core';
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {
    private root: am5.Root | undefined;

    constructor() { }

    ngOnInit(): void {
        this.root = am5.Root.new("chartdiv");

        let chart = this.root.container.children.push(am5map.MapChart.new(this.root, {
            panX: "rotateX",
            panY: "rotateY",
            projection: am5map.geoMercator()
        }));

        chart.series.push(am5map.MapPolygonSeries.new(this.root, {
            geoJSON: am5geodata_worldLow
        }));
    }

    ngOnDestroy(): void {
        if (this.root) {
            this.root.dispose();
        }
    }
}
