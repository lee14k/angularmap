import {
  Component,
  ElementRef,
  Renderer2,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { CountryService } from '../country.service'; 
import { CommonModule } from '@angular/common';
@Component({
 selector: 'app-map',
  standalone: true,
  imports: [CommonModule],  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
@ViewChild('svgContainer') svgContainer!: ElementRef;
countryData: any = {};
flag: any;
selectedCountryFlagUrl: string = '';
    isCountrySelected: boolean = false; // This property will track if a country is selected


constructor(
    private renderer: Renderer2,
    private countryService: CountryService,
) {}

ngAfterViewInit() {
    const paths = this.svgContainer.nativeElement.querySelectorAll('path');
    let pather = Array.from(paths) as SVGPathElement[]; // Specify the type of array elements
    pather.forEach((path: SVGPathElement) => {
        this.renderer.listen(path, 'click', (event) => {
            const countryId = path.id;
            const countryName = path.getAttribute('name') ?? '';
            this.onCountryClick(event, countryId, countryName);
        });
    });
}

  onCountryClick(event: MouseEvent, countryId: string, countryName: string) {
    console.log('Clicked country:', countryName, 'with ID:', countryId);
    this.isCountrySelected = true; // Set to true when a country is clicked

    // Fetch country details and update
    this.countryService.getCountryInfoByName(countryId).subscribe((data: any) => {
      this.countryData = this.countryService.processCountryData(data);

  const flagUrl = this.countryService.getFlagUrl(countryId);

  // Update your component's view to show the flag
  // For example, you might set a component property that's bound to the template
  this.selectedCountryFlagUrl = flagUrl;
;
    }, (error: any) => {
      console.error('Error fetching data:', error);
    });
  }
}
