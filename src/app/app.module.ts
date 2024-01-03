import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MapComponent } from '../components/map/map.component'; // Adjust path as necessary

import { routes } from './app.routes'; // If you're using app.routes.ts for routing

@NgModule({
    declarations: [
        MapComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes) // Set up routing using your appRoutes
        // ... any other modules you need ...
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
