import {NgModule} from '@angular/core'
import {Router, RouterModule} from '@angular/router'

import {HomeComponent} from "./home/home.component";
import {FloorplansComponent} from './floor-plans/floorplans.component';
import {AmenitiesComponent} from './amenities/amenities.component';
import {TeamComponent} from './team/team.component';
import {PriceListComponent} from './price-list/price-list.component';
import {NotFoundComponent} from './not-found.component'

const routes = [
  // {path: 'gallery', component: 'GalleryComponent'}
  {
    path: 'amenities', component: AmenitiesComponent,
    data: {title: ' - Amenties', metaDescription: ''}
  },
  {path: 'floor-plans', component: FloorplansComponent},
  {path: 'team', component: TeamComponent},
  {path: 'price-list', component: PriceListComponent},
  {
    path: '', component: HomeComponent,
    data: {title: ' - Home', metaDescription: 'Missoni Baia Residences New Waterfront Luxury Condos in Miami, FL. Prices From $538K'}
  },
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutesModule { }
