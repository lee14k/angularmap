import {
  Component,
  ElementRef,
  Renderer2,
  AfterViewInit,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CountryService } from '../country.service'; 

@Component({
  selector: 'app-map',
  standalone: true,

  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
        countryData: any = {};

        constructor(
            private el: ElementRef,
            private renderer: Renderer2,
            private countryService: CountryService // Correctly injected
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

  // Use the service to get country details
  this.countryService.getCountryInfoByName(countryId).subscribe((data: any) => {
  this.countryData = this.countryService.processCountryData(data);
}, (error: any) => {
  console.error('Error fetching data:', error);
});
}
}
