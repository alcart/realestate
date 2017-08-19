import {Component,Input,ViewChild,ElementRef,Renderer2} from '@angular/core';
import {CollapseService} from '../collapse.service'


var IMAGES = [
  {title: 'The Building', url: 'assets/images/misc/Tower_Day.jpg', alt: "Missoni Baia building view from the bay"},
  {title: 'Living Room', url: 'assets/images/residences/Missoni-Baia-Living-Area-Residence.jpg', alt: "Missoni Baia residence view to the bay"},
  {title: 'Balcony View to the Water', url: 'assets/images/residences/Missoni-Baia-South-Balcony.jpg', alt: "Balcony view to the water from residence"},
  {title: 'Residence Kitchen', url: 'assets/images/residences/Missoni-Baia-Kitchen.jpg', alt: "Residence Kitchen"},
  {title: 'Residence Master Bathroom', url: 'assets/images/residences/Missoni-Baia-Master-Bathroom.jpg', alt: "Residence Master Bathroom"},
  {title: 'Bayside Pool', url: 'assets/images/amenities/Bayside-Terrace-Infinity-Pool.jpg', alt: "Building Bayside Pool Amenitie"},
  {title: 'Missoni Baia Gymnasium', url: 'assets/images/amenities/Missoni-Baia-Gym.jpg', alt: "Building Gymnasium Amenitie"},
  {title: 'Building Spa', url: 'assets/images/amenities/Missoni-Baia-Spa.jpg', alt: "Building Spa Amenitie"},

]
@Component({
  selector: 'app-home',
  moduleId: module.id.toString(),
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{

  constructor(public collapseService: CollapseService) { }
  images = IMAGES;
  public activeSlide = 0;
  @ViewChild('galleryModal')
  galleryModal;
  onHover: boolean = false;
  showModal(index){
    this.activeSlide = index;
    this.galleryModal.show();
  }
}
