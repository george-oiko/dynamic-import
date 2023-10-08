import { Component, ComponentRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'dynamic-import';
  name: Promise<any> | undefined;
  information: Promise<any> | undefined;
  education: Promise<any> | undefined;

  constructor(){}
  
  ngOnInit(): void {
    this.information = import(/* webpackPrefetch: 1 */ './information/information.component').then(i => i.InformationComponent);
    this.education = import(/* webpackPrefetch: -100 */'./education/education.component').then(i => i.EducationComponent);
  }

  show() {
    this.name = import('./name/name.component').then(i => i.NameComponent);
  }
}
