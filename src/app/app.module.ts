import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {CarouselModule, BsDropdownModule, ModalModule} from 'ngx-bootstrap'
import  {RoutesModule} from './app-routes.module';
import {Ng2StickyModule} from 'ng2-sticky';

import {HomeComponent} from './home/home.component';
import { AppComponent } from './app.component';
import {FloorplansComponent} from './floor-plans/floorplans.component';
import {ContactFormComponent} from './contact-form/contact-form.component';
import {AmenitiesComponent} from './amenities/amenities.component';
import {TeamComponent} from './team/team.component';
import {PriceListComponent} from './price-list/price-list.component';
import {NotFoundComponent} from './not-found.component'

import{CollapseService} from './collapse.service'
import {ImageMapService} from './image-maps.service';
import { ConnectService } from './app-connect.service'
import {RESPONSE} from '@nguniversal/express-engine/tokens'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FloorplansComponent,
    ContactFormComponent,
    AmenitiesComponent,
    TeamComponent,
    PriceListComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'missoni'}),
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RoutesModule,
    CarouselModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    Ng2StickyModule
  ],
  providers: [
    ImageMapService,
    ConnectService,
    CollapseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
