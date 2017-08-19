import {Component, ViewChild, ElementRef, HostListener} from '@angular/core'
import {ImageMapService} from '../image-maps.service';
import {CollapseService} from '../collapse.service';


const AREA_COORDINATES_1 = [
  {coords: "57,22,57,167,164,167,164,149,191,149,191,22", url: "assets/images/floorplans/Bay-Residence-06-NW.png", alt: "Missoni Baia Bay Residence 06 Northwest"},
  {coords: "193,23,193,182,224,182,224,211,262,211,262,182,410,182,410,23", url: "assets/images/floorplans/Bay-Residence-01-NE.png", alt: "Missoni Baia Bay Residence 01 Northeast"},
  {coords: "412,190,349,190,349,188,262,188,262,212,224,212,224,341,268,341,268,376,353,376,353,371,412,371", url: "assets/images/floorplans/Bay-Residence-02-E.png", alt: "Missoni Baia Bay Residence 02 East"},
  {coords: "224,341,224,412,236,412,236,458,286,458,286,540,412,540,412,378,268,378,268,341", url: "assets/images/floorplans/Bay-Residence-03-SE.png", alt: "Missoni Baia Bay Residence 03 Southeast"},
  {coords: "189,540,286,540,286,458,235,458,235,412,225,412,225,396,189,396,189,392,148,392,148,414,183,414,183,439,189,439", url: "assets/images/floorplans/Bay-Residence-04-S.png", alt: "Missoni Baia Bay Residence 04 East"},
  {coords: "57,392,102,392,102,414,147,414,147,430,164,430,164,414,182,414,182,438,190,438,190,540,57,540", url: "assets/images/floorplans/Bay-Residence-05-SW.png", alt: "Missoni Baia Bay Residence 05 Southwest"},
]

const AREA_COORDINATES_2 = [
  {coords: "68,36,68,205,189,205,189,184,219,184,219,221,259,221,259,251,302,251,302,222,471,222,471,36", url: "assets/images/floorplans/Tower-Residence-01-N.png", alt: "Missoni Baia Tower Residence 01 North"},
  {coords: "258,418,301,418,301,446,471,446,471,221,302,221,302,251,258,251", url: "assets/images/floorplans/Tower-Residence-02-E.png", alt: "Missoni Baia Tower Residence 01 East"},
  {coords: "68,630,471,630,471,447,301,447,301,418,257,418,257,446,217,446,217,484,188,484,188,463,68,463", url: "assets/images/floorplans/Tower-Residence-03-S.png", alt: "Missoni Baia Tower Residence 03 South"}
]
@Component({
  selector: 'app-floorplans',
  moduleId: module.id.toString(),
  templateUrl: './floorplans.component.html',
  styleUrls: ['./floorplans.component.css']
})
export class FloorplansComponent{
  constructor(private imageMapService: ImageMapService,
     public collapseService: CollapseService
   ) { }
    @ViewChild("bayUnits") bayUnits: ElementRef;
    @ViewChild("towerUnits") towerUnits: ElementRef;
    @ViewChild("canvas1") canvas1: ElementRef;
    @ViewChild("canvas2") canvas2: ElementRef;

    public ctx;
    public percentage;
    public coords = AREA_COORDINATES_1;
    public coords2 = AREA_COORDINATES_2
    showImageViewer: boolean = false;
    showImageViewer2: boolean = false;
    current_active = 0;

  setProperties(i) {
      // Canvas 1
      if (i==1) {

      this.coords = this.imageMapService.responsiveMap(this.coords,
      this.bayUnits.nativeElement.width,
      this.bayUnits.nativeElement.height, 481);
      this.canvas1.nativeElement.width = this.bayUnits.nativeElement.width;
      this.canvas1.nativeElement.height = this.bayUnits.nativeElement.height;
    }
      // Canvas 2
      else if (i==2) {
      this.coords2 = this.imageMapService.responsiveMap(this.coords2,
      this.towerUnits.nativeElement.width,
      this.towerUnits.nativeElement.height, 555);
      this.canvas2.nativeElement.width = this.towerUnits.nativeElement.width;
      this.canvas2.nativeElement.height = this.towerUnits.nativeElement.height;
    }
      this.percentage = this.bayUnits.nativeElement.width/1200;
  }
  hideImageViewer(i:number){
    if (i == 1){
      this.showImageViewer = false;
    }
    else {
      this.showImageViewer2 = false;
    }
  }
  showImage(i:number,index) {
    if (i == 1){
      this.drawCanvas(1, index)
      this.current_active = index;
      this.showImageViewer = true;
    }
    else {
      this.drawCanvas(2, index-6)
      this.current_active = index;
      this.showImageViewer = true;
    }
  }
  test() {
    console.log("mouse entered");
  }
  drawCanvas(canvas: number, area_index: number){
    let actual_coord:Array<Array<number>>
    if (canvas == 1){
      this.ctx =
      this.canvas1.nativeElement.getContext("2d");
      actual_coord = this.getCoords(1,area_index);
    }
    else {
      this.ctx =
      this.canvas2.nativeElement.getContext("2d");
      actual_coord = this.getCoords(2,area_index);
    }
    this.ctx.beginPath();
    actual_coord.forEach((value, index) => {
      if (index != 0 && index != actual_coord.length-1){
        this.ctx.lineTo(value[0], value[1]);
      }
      else if (index == actual_coord.length-1){
        this.ctx.lineTo(value[0], value[1]);
        this.ctx.lineTo(actual_coord[0][0], actual_coord[0][1]);
        this.ctx.lineWidth = 9*this.percentage;
        this.ctx.strokeStyle = '#14CB93';
        this.ctx.stroke();
      }
      else if (index == 0){
        this.ctx.moveTo(value[0], value[1])
      }
    });
  }

  deleteCanvas(w:number, h:number){
    this.ctx.clearRect(0,0,w,h);
  }


  getCoords(i,area_index): Array<Array<number>> {
    let actual_coord: Array<Array<number>> = new Array();
    let temp1: Array<number> = new Array();
    let temp
    if (i == 1){
      temp = this.coords[area_index].coords.split(',');
    }
    else {
      temp = this.coords2[area_index].coords.split(',');
    }
    temp.forEach((value, index) => {
      let int_value = +value;
      if (index % 2 != 0){
        temp1.push(int_value);
        actual_coord.push(temp1);
        temp1 = new Array();

      }
      else {
        temp1.push(int_value);
      }
    });
    return actual_coord;
  }
}
