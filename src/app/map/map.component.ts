import { Component, OnInit, OnDestroy } from '@angular/core';
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit, OnDestroy {
  constructor(private http: HttpClient) { }
    private root: am5.Root | undefined;

  

 ngOnInit(): void {
    this.root = am5.Root.new("chartdiv");

    let chart = this.root.container.children.push(am5map.MapChart.new(this.root, {
        panX: "rotateX",
        panY: "rotateY",
        projection: am5map.geoMercator()
    }));

    let worldSeries = chart.series.push(am5map.MapPolygonSeries.new(this.root, {
        geoJSON: am5geodata_worldLow
    }));

    worldSeries.mapPolygons.template.events.on("pointerover", (ev) => {
        if (ev.target.dataItem) {
            let country = ev.target.dataItem.dataContext as any;
            console.log(country.name);  // You can replace this with a call to your API
            // Fetch country information from the API here
            function fetchCountryData(countryCode: string) {
                // Function implementation goes here
            }
            fetchCountryData(country.code); // Call the function with the correct parameter
        }
    });

    // Example API call
    const countryCode = "US"; // Replace with the actual country code
    const url = `https://api.geonames.org/countryInfoJSON?formatted=true&lang=en&country=${countryCode}&username=demo&style=full`;
    this.http.get(url).subscribe(data => {
        console.log(data); // Handle the API response here
    });
}
  }

  ngOnDestroy(): void {
    if (this.root) {
        this.root.dispose();
    }
  }
}

function fetchCountryData(countryCode: any, string: any) {
    throw new Error('Function not implemented.');
}
function ngOnDestroy() {
    throw new Error('Function not implemented.');
}

