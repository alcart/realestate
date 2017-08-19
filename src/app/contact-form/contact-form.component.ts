import {Component,Input,Output,EventEmitter,ViewChild, OnInit} from '@angular/core'
import {FormGroup,FormBuilder,Validators} from '@angular/forms'
import { ConnectService } from '../app-connect.service'
import { CollapseService } from '../collapse.service'

export class ContactInfo {
  name: string;
  number: string;
  email: string;
}
let ga: Function;

@Component({
  moduleId: module.id.toString(),
  selector: "app-contact",
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit{


  contactInfo: ContactInfo = new ContactInfo();
  contactForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private connect: ConnectService,
    private collapseService: CollapseService
  ) { }
  ga = ga;
  information:string;
  removeBorder = false;
  isModal = false;
  title = 'Get More Information';
  button_title = 'Request Information';
  @Output() collapseChange = new EventEmitter();
  submitInfo(event) {
    if (this.contactForm.valid) {
      this.contactInfo.name = this.contactForm.get('name').value;
      this.contactInfo.number = this.contactForm.get('phone').value;
      this.contactInfo.email = this.contactForm.get('email').value;
      this.connect.sendEmail(this.contactInfo)
      .then(res => {this.information = res.text()})
      .catch(error => {this.information = "Error Has Occurred"});
      this.ga('send', 'event', {
        eventCategory: 'Submit Form',
        eventLabel: 'Form Submitted'
      })
      this.contactForm.reset()
    }
  }

  ngOnInit() {
    this.buildForm();
  }
  buildForm() {
    this.contactForm = this.fb.group({
      'name': [this.contactInfo.name, [
        Validators.required
      ]],
      'phone': [this.contactInfo.number, [
        Validators.required,
        Validators.pattern("[0-9]+")
      ]],
      'email': [this.contactInfo.email, [
        Validators.required,
        Validators.email
      ]]
    })
    this.contactForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onValueChanged(data?: any){
    if (!this.contactForm){ return ;}
    const form = this.contactForm;
    for (const field in this.formErrors){
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid){
        const message = this.errorMessage[field];
        for (var key in control.errors){
          this.formErrors[field] += message[key]+ ' ';
        }
      }
    }
  }

  formErrors = {
    "name": '',
    "email": '',
    "phone": ''
  }

  errorMessage = {
    'name': {
      'required': 'Name is required'
    },
    'phone': {
      'required': 'Phone is required',
      'pattern': 'That is not a valid phone'
    },
    'email': {
      'required': 'Email is required',
      'email': 'Email is invalid'
    }
  }
  @Input('modal-style')
  set setModal(val){
    this.isModal = val;
  }
  @Input('title')
  set setTitle(val){
    this.title = val;
  }
  @Input('button-title')
  set setButtonTittle(val){
    this.button_title = val;
  }
  @Input('removeBorder')
  set border(val){
    this.removeBorder = val;
  }

  collapse(){
    if (!this.isModal){
      this.collapseService.collapse();
    }
  }
}
