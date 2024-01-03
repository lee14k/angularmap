import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MapComponent } from '../app/map/map.component'; 

import { routes } from './app.routes'; 

@NgModule({
    declarations: [
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        MapComponent 
    ],
    providers: [],
})
export class AppModule { }
