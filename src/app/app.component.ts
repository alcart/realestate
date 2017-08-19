import { Component, OnInit, Renderer2,PLATFORM_ID,Inject} from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute} from '@angular/router';
import {Title, Meta} from '@angular/platform-browser';
import {CollapseService} from './collapse.service'
import {isPlatformBrowser} from '@angular/common';

declare let ga: Function;

@Component({
  moduleId: module.id.toString(),
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
 export class AppComponent implements OnInit {
   isBrowser = isPlatformBrowser(this.platform_id);
   mainTitle = 'Missoni Baia Miami Luxury Condo';
   window;
   constructor (
     private titleService: Title,
     private meta: Meta,
     private route: ActivatedRoute,
     private _router: Router,
     private renderer: Renderer2,
     @Inject(PLATFORM_ID) private platform_id,
     private collapseService: CollapseService
    ) { }
    public setTitle(newTitle: string){
      this.titleService.setTitle(newTitle);
    }

   ngOnInit(){
     if (this.isBrowser){
       if (window.outerWidth < 950){
         this.collapseService.isCollapsed = false;
       }
       this.window = window;
     }
     this._router.events.subscribe((event) => {
        if (event instanceof NavigationEnd){
          if (this.isBrowser) {
            ga('set', 'page', event.urlAfterRedirects);
            ga('send', 'pageview');
          }
          switch (event.urlAfterRedirects){
            case '/':
              this.titleService.setTitle(this.mainTitle+' - Home');
              this.meta.addTag({
                name: 'description',
                content: 'Missoni Baia Residences New Waterfront Luxury Condos in Miami, FL. Prices From $538K'
              }, false);
              break;
            case '/floor-plans':
              this.titleService.setTitle(this.mainTitle+' - Floor Plans');
              this.meta.addTag({
                name: 'description',
                content: 'Missoni Baia one- to five-bedrooms from 776 to 3,788 square feet (72 to 352 square meters). Direct water views'
              }, false);
              break;
            case '/amenities':
              this.titleService.setTitle(this.mainTitle+' - Amenties');
              if(this.window){this.window.scrollTo(0,0);}
              this.meta.addTag({
                name: 'description',
                content: 'Missoni Baia Condos amenities that include pools, media room, beauty salon, children’s playroom, pet spa, gym, spa, cabanas, and elevated tennis court'
              }, false);
              break;
            case '/team':
              this.titleService.setTitle(this.mainTitle+' - Team');
              this.meta.addTag({
                name: 'description',
                content: ' East Edgewater, Miami, condos by Fashion Label Missoni and Developed by OKO GROUP, OB GROUP, and CAIN INTERNATIONAL'
              }, false);
              break;
            case '/price-list':
              this.titleService.setTitle(this.mainTitle+' - Price List');
              this.meta.addTag({
                name: 'description',
                content: 'Missoni Baia Residences call today to get an updated price list on Miami’s Best investment in Real Estate.'
              }, false);
              break;
          }
        }
     })

   }
}
