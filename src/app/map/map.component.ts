import {
  Component,
  ElementRef,
  Renderer2,
  AfterViewInit,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CountryService } from '../country.service'; 
import { FlagService} from '../flag.service';
import { Inject } from '@angular/core';
@Component({
  selector: 'app-map',
  standalone: true,

  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
updateCountryAttributes(arg0: any) {
throw new Error('Method not implemented.');
}
        countryData: any = {};
    flag: any;

        constructor(
            private el: ElementRef,
            private renderer: Renderer2,
            private countryService: CountryService,
  private flagService: FlagService        ) {}
ngAfterViewInit() {
    const countryPaths = this.el.nativeElement.querySelectorAll('path');
    const countryPathsArray = Array.from(countryPaths);
    countryPathsArray.forEach((path: unknown) => {
        // Explicitly type 'path' as 'unknown' and cast it to 'HTMLElement'
        this.renderer.listen(path as HTMLElement, 'click', (event) => {
            this.onCountryClick(
                event,
                (path as HTMLElement).id,
                (path as HTMLElement).getAttribute('name') as string
            ); // Remove the 'countryCapital' parameter
        });
    });
}

onCountryClick(event: MouseEvent, countryId: string, countryName: string) {
  console.log('Clicked country:', countryName, 'with ID:', countryId);

  // Use the service to get country details
  this.countryService.getCountryInfoByName(countryId).subscribe((data: any) => {
    this.countryData = this.countryService.processCountryData(data);

    // Get the flag URL
    const flagUrl = this.countryService.getFlagUrl(countryId);

    // Create the flag pattern and apply it to the country path
 this.flagService.createFlagPattern(event.target as HTMLElement, countryId, flagUrl);


    // Apply the flag pattern as the background
    this.flagService.applyFlagToCountry(event.target as SVGPathElement, countryId);
  }, (error: any) => {
    console.error('Error fetching data:', error);
  });
}
}
