import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router'; // Import RouterModule
import {
  Component,
  ElementRef,
  Renderer2,
  AfterViewInit,
  OnInit,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [HttpClientModule], // Add HttpClientModule here
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
        countryData: any = {};

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private http: HttpClient
  ) {}
  ngAfterViewInit() {
    const countryPaths = this.el.nativeElement.querySelectorAll('path');
    countryPaths.forEach((path: HTMLElement) => {
      // Explicitly type 'path' as HTMLElement
      this.renderer.listen(path, 'click', (event) => {
        this.onCountryClick(
          event,
          path.id,
          path.getAttribute('name') as string
        ); // Remove the 'countryCapital' parameter
      });
    });
  }

  onCountryClick(event: MouseEvent, countryId: string, countryName: string) {
    console.log('Clicked country:', countryName, 'with ID:', countryId);

    const apiUrl = `http://api.worldbank.org/v2/country/${countryId}/?format=json`;

    this.http.get(apiUrl).subscribe(
      (data: any) => {
        if (data && data.length > 1 && data[1].length > 0) {
          const countryInfo = data[1][0];
         this.countryData = {
                name: countryName,
                capital: countryInfo.capitalCity,
                region: countryInfo.region.value,
                incomeLevel: countryInfo.incomeLevel.value,
                longitude: countryInfo.longitude,
                latitude: countryInfo.latitude
            };

    
          // Use capitalCity as needed for display or further processing
        }
      },
      (error: any) => {
        console.error('Error fetching data:', error);
      }
    );
  }
}
