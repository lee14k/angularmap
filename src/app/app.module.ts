import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MapComponent } from '../app/map/map.component'; // Adjust path as necessary

import { routes } from './app.routes'; // If you're using app.routes.ts for routing

@NgModule({
    declarations: [
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        MapComponent // Add MapComponent to imports
    ],
    providers: [],
})
export class AppModule { }
