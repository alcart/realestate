import {Injectable} from "@angular/core"

@Injectable()

export class ImageMapService {
  responsiveMap(coords: any, width, height, originalWidth): any {
    var newCoords = [];
    coords.forEach(value => {
      var temp = value.coords.split(',');
      var newNumbers = [];
      var x;
      var y;
      temp.forEach((number, index) => {
        if (index % 2 == 0){
          x = Math.floor(+number * (width/originalWidth));
        }
        else {
          y =  Math.floor(+number * (width/originalWidth));
          newNumbers.push(x,y);
        }
      });
      newCoords.push({coords: newNumbers.toString(), url: value.url, alt: value.alt});
    })
    return newCoords;
  }
}
