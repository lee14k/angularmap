import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { Component, ElementRef, Renderer2, AfterViewInit,OnInit, OnDestroy  } from '@angular/core';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [HttpClientModule], // Add HttpClientModule here
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
    constructor(private el: ElementRef, private renderer: Renderer2) {}
    ngAfterViewInit() {
        const countryPaths = this.el.nativeElement.querySelectorAll('path');
        countryPaths.forEach((path: HTMLElement) => { // Explicitly type 'path' as HTMLElement
            this.renderer.listen(path, 'click', (event) => {
                this.onCountryClick(event, path.id, path.getAttribute('name') as string); // Add type assertion
            });
        });
    }

    onCountryClick(event: MouseEvent, countryId: string, countryName: string) {
        console.log('Clicked country ID:', countryId);
        console.log('Country name:', countryName);
        // You can use countryName here for further actions
    }
}
