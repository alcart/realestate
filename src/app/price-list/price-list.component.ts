import {Component}  from '@angular/core'
import {CollapseService} from '../collapse.service'

let BAY_INFORMATION = [
  {unitNumber: "1201", model: "Bay Unit 01 - NE", closedArea: "2608", totalArea: "2956", price: "$1,908,258", maintance: "$1,878"},
  {unitNumber: "1002", model: "Bay Unit 02 - E", closedArea: "2303", totalArea: "2774", price: "$1,685,430", maintance: "$1,658"},
  {unitNumber: "803", model: "Bay Unit 03 - SE", closedArea: "1932", totalArea: "2280", price: "$1,395,292", maintance: "$1,391"},
  {unitNumber: "1004", model: "Bay Unit 04 - S", closedArea: "771", totalArea: "771", price: "$538,900", maintance: "$555"},
  {unitNumber: "905", model: "Bay Unit 05 - SW", closedArea: "1092", totalArea: "1346", price: "$716,900", maintance: "$786"},
  {unitNumber: "1006", model: "Bay Unit 06 - NW", closedArea: "1226", totalArea: "1480", price: "$810,589", maintance: "$883"},
]
let TOWER_INFORMATION = [
  {unitNumber: "4001", model: "Tower Unit 01 - N", closedArea: "3791", totalArea: "4393", price: "$2,897,226", maintance: "$2,730"},
  {unitNumber: "4302", model: "Tower Unit 02 - E", closedArea: "2438", totalArea: "2909", price: "$2,204,200", maintance: "$1,755"},
  {unitNumber: "3902", model: "Tower Unit 03 - S", closedArea: "3794", totalArea: "4396", price: "$3,405,018", maintance: "$2,732"},
]
@Component({
  moduleId: module.id.toString(),
  selector: 'app-price-list',
  templateUrl: 'price-list.component.html',
  styleUrls: ['price-list.component.css']
})
export class PriceListComponent{
  public bay_information = BAY_INFORMATION;
  public tower_information = TOWER_INFORMATION;
  Math: any;
  constructor(
    public collapseService: CollapseService){
      this.Math = Math;
    }

}
