import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import {AppComponent} from './app.component';
import {AppModule} from './app.module'

@NgModule({
  imports: [
    ServerModule,
    AppModule
  ],
  providers: [
    { provide: 'isNode', useValue: true }
  ],
  bootstrap: [AppComponent]
})
export class AppServerModule { }
