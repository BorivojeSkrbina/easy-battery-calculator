import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  series: number = 14;
  parallel: number = 5;
  cellCurrent: number = 10;
  batteryPackVoltage: number = 50.4;
  batteryPackChargeVoltage: number = 58.8;
  numberOfCells: number = 70;
  maxDischargeCurrent: number = 50;
  batteryCapacity: number = 17.5;
  batteryPower: number = 882;
  
  cellVoltage: number = 3.6;
  cellChargeVoltage: number = 4.2;
  cellCapacity: number = 3400;
  cellWeight: number = 45;
  batteryWeight: number = 3.15;

  constructor() {}

  update(form: NgForm) {                                                                                                                                                                                                                                                                                            
    console.log('update')
    this.series = form.value.series;
    this.parallel = form.value.parallel;
    this.batteryPackVoltage = Number((form.value.series * this.cellVoltage).toFixed(1)); 
    this.batteryPackChargeVoltage = Number((form.value.series * this.cellChargeVoltage).toFixed(1)); 
    this.numberOfCells = form.value.series * form.value.parallel;
    this.maxDischargeCurrent = form.value.cellCurrent * form.value.parallel;
    this.batteryCapacity = Number((form.value.parallel * form.value.cellCapacity / 1000).toFixed(2));
    this.batteryPower = Number(((form.value.parallel * form.value.cellCapacity) * (this.cellVoltage * form.value.series) / 1000).toFixed(2));
    this.batteryWeight = this.cellWeight * form.value.parallel * form.value.series / 1000;
  }

}
