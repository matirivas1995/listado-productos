import { Component } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import {ProductoDetailComponent} from './producto-detail.component'

export interface ConfirmModel {
  title:string;
  message:string;
}
@Component({  
    selector: 'confirm',
    templateUrl: 'producto-detail.component.html'
})
export class ConfirmComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
  title: string;
  message: string;
  constructor(dialogService: DialogService) {
    super(dialogService);
  }
  confirm() {
    // we set dialog result as true on click on confirm button, 
    // then we can get dialog result from caller code 
    this.result = true;
    this.close();
  }
}