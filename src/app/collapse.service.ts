import {Injectable} from '@angular/core';
@Injectable()

export class CollapseService {
  public isCollapsed = true;
  constructor( ) { };
  collapse(){
    this.isCollapsed = !this.isCollapsed;
  }

}
