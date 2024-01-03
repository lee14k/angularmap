import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlagService{
  el: any;
  constructor() {}
createFlagPattern(element: HTMLElement, countryCode: string, flagUrl: string): void {
  const svgns = "http://www.w3.org/2000/svg";
  const pattern = document.createElementNS(svgns, 'pattern');
  pattern.setAttribute('id', `flag-${countryCode}`);
  pattern.setAttribute('patternUnits', 'userSpaceOnUse');


  const image = document.createElementNS(svgns, 'image');
  image.setAttributeNS('http://www.w3.org/1999/xlink', 'href', flagUrl);
  image.setAttribute('width', '100');
  image.setAttribute('height', '60');

  pattern.appendChild(image);

  const defs = element.querySelector('defs') || this.createDefs(element);
  defs.appendChild(pattern);
}

  createDefs(element: HTMLElement): SVGDefsElement {
    const svgns = "http://www.w3.org/2000/svg";
    const defs = document.createElementNS(svgns, 'defs');
    element.appendChild(defs);
    return defs;
  }


  applyFlagToCountry(pathElement: SVGPathElement, countryCode: string): void {
    pathElement.style.fill = `url('https://flagcdn.com/${countryCode.toLowerCase()}.svg')`
    pathElement.style.height="100px";
  }

  // ... any other related methods ...
}
