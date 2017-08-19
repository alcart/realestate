import {Component} from '@angular/core'
import {CollapseService} from '../collapse.service'

@Component({
  moduleId: module.id.toString(),
  selector: 'app-team',
  templateUrl: 'team.component.html',
  styleUrls: ['team.component.css']

})

export class TeamComponent {
  constructor(public collapseService: CollapseService){ }

}
