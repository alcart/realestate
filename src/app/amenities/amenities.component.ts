import {Component, ViewChild, ElementRef,OnInit,Renderer2} from '@angular/core'
import {CollapseService} from '../collapse.service'

@Component({
  moduleId: module.id.toString(),
  selector: 'app-amenities',
  templateUrl: './amenities.component.html',
  styleUrls: ['./amenities.component.css']
})
export class AmenitiesComponent implements OnInit{
  constructor(public collapseService: CollapseService, private renderer: Renderer2){ }
  @ViewChild("introductory")
  introductory: ElementRef;

  ngOnInit(){

    // this.renderer.setStyle(
    //   this.renderer.selectRootElement('#introductory-page'),
    //   'background-size',
    //   'auto 100vh'
    // );
    // this.renderer.setStyle(
    //   this.renderer.selectRootElement('#tennis-introduction'),
    //   'background-size',
    //   'auto 100vh'
    // );
    // this.renderer.setStyle(
    //   this.renderer.selectRootElement('#gym-introduction'),
    //   'background-size',
    //   'auto 100vh'
    // );
    // this.renderer.setStyle(
    //   this.renderer.selectRootElement('#spa-introduction'),
    //   'background-size',
    //   'auto 100vh'
    // );

  }
}
