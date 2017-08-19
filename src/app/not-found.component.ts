import {Component,PLATFORM_ID,OnInit,Inject, Optional} from '@angular/core'
import {Response} from 'express';
import {Zone} from 'zone.js/dist/zone-node';

import {isPlatformServer} from '@angular/common';
import {RESPONSE} from '@nguniversal/express-engine/tokens'
@Component({
  moduleId: module.id.toString(),
  selector: 'app-not-found',
  template: '<div>Page Not Found</div>',
})
export class NotFoundComponent implements OnInit{
  isServer = isPlatformServer(PLATFORM_ID);
  ngOnInit(){
  }
}
