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
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
  @ViewChild('svgContainer') svgContainer!: ElementRef;
  countryData: any = {};
  flag: any;
  selectedCountryFlagUrl: string = '';
  isCountrySelected: boolean = false;

  constructor(
    private renderer: Renderer2,
    private countryService: CountryService
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
    this.isCountrySelected = true;
    this.countryService.getCountryInfoByName(countryId).subscribe(
      (data: any) => {
        this.countryData = this.countryService.processCountryData(data);

        const flagUrl = this.countryService.getFlagUrl(countryId);

        this.selectedCountryFlagUrl = flagUrl;
      },
      (error: any) => {
        console.error('Error fetching data:', error);
      }
    );
  }
}
