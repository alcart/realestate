import {Injectable} from '@angular/core'
import {Http, Headers, RequestOptions } from '@angular/http'
import 'rxjs/add/operator/toPromise';
import {ContactInfo} from './contact-form/contact-form.component'

@Injectable()

export class ConnectService {
  constructor(private http: Http) { }

  sendEmail(body: ContactInfo): any {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post('/api/sendemail', JSON.stringify(body), options)
    .toPromise()
  }
}
