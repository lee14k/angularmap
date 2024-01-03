import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  constructor(private http: HttpClient) { }

  getCountryInfoByName(countryName: string): Observable<any> {
    const url = `https://api.worldbank.org/v2/country/${countryName}?format=json`;
    return this.http.get(url);
  }
   processCountryData(apiResponse: any): any {
    if (apiResponse && apiResponse.length > 1 && apiResponse[1].length > 0) {
      const countryInfo = apiResponse[1][0];
      return {
        name: countryInfo.name,
        capital: countryInfo.capitalCity,
        region: countryInfo.region.value,
        incomeLevel: countryInfo.incomeLevel.value,
        longitude: countryInfo.longitude,
        latitude: countryInfo.latitude
      };
    }
    return null;
  }
  getFlagUrl(countryCode: string): string {
    // Use a fixed width for the flag, or adjust as needed
      let url = `https://flagcdn.com/${countryCode.toLowerCase()}.svg`;
      
    return `https://flagcdn.com/${countryCode.toLowerCase()}.svg`;
    
  }
 applyFlagToCountry(pathElement: SVGPathElement, countryCode: string): void {
  const patternUrl = `url(#flag-${countryCode})`;
  console.log('Pattern URL:', patternUrl);
  pathElement.style.fill = patternUrl;
}
}
