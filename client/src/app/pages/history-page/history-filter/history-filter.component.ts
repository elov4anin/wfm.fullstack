import {AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {FilterInterface} from '../../../shared/interfaces/filter.interface';
import {MaterialDatepicker, MaterialService} from '../../../shared/classes/material.service';

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.css']
})
export class HistoryFilterComponent implements OnDestroy, AfterViewInit {
  @Output() onFilter = new EventEmitter<FilterInterface>();

  @ViewChild('start') startRef: ElementRef;
  @ViewChild('end') endRef: ElementRef;
  order: number;

  start: MaterialDatepicker;
  end: MaterialDatepicker;

  isValid = true;

  ngOnDestroy() {
    this.start.destroy();
    this.end.destroy();

  }

  ngAfterViewInit() {
    this.start = MaterialService.initDatePicker(this.startRef, this.validate.bind(this));
    this.end = MaterialService.initDatePicker(this.endRef, this.validate.bind(this));
  }

  validate() {
    if (!this.start.date || !this.end.date) {
      this.isValid = true;
      return;
    }

    this.isValid = this.start.date < this.end.date;

  }

  submitFilter() {
    const filter: FilterInterface = {};

    if (this.order) {
      filter.order = this.order;
    }
    if (this.start.date) {
      filter.start = this.start.date;
    }
    if (this.end.date) {
      filter.end = this.end.date;
    }

    this.onFilter.emit(filter);
  }
}
