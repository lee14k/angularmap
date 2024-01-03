// src/app/app.component.ts
import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { MapComponent } from './map/map.component'; // Import MapComponent

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule, RouterModule, MapComponent], // Add RouterModule to imports
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myApp';
}