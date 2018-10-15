import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MaterialInstance, MaterialService} from '../../shared/classes/material.service';
import {OrdersService} from '../../shared/services/orders.service';
import {Subscription} from 'rxjs';
import {Order} from '../../shared/interfaces/order.interface';
import {FilterInterface} from '../../shared/interfaces/filter.interface';

const STEP = 2;

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent implements OnInit, OnDestroy, AfterViewInit {
  isFilterVisible = false;
  @ViewChild('tooltip') tooltipRef: ElementRef;
  tooltip: MaterialInstance;
  offset = 0;
  limit = STEP;
  orders: Order[] = [];
  loading = false;
  reloading = false;
  osSub: Subscription;
  noMoreOrders = false;

  filter: FilterInterface = {};

  constructor(private ordersService: OrdersService) {
  }

  ngOnInit() {
    this.reloading = true;
    this.fetch();
  }

  ngOnDestroy() {
    this.tooltip.destroy();
    if (this.osSub) {
      this.osSub.unsubscribe();
    }

  }

  ngAfterViewInit() {
    this.tooltip = MaterialService.initTooltip(this.tooltipRef);
  }

  private fetch() {

    const params = Object.assign({}, this.filter,  {
      offset: this.offset,
      limit: this.limit
    });
    this.osSub = this.ordersService.fetch(params).subscribe(orders => {
      this.orders = this.orders.concat(orders);
      this.noMoreOrders = orders.length < STEP;
      this.loading = false;
      this.reloading = false;

    });
  }

  loadMore() {
    this.offset += STEP;
    this.loading = true;
    this.fetch();
  }

  applyFilter(filter: FilterInterface) {
    this.orders = [];
    this.offset = 0;
    this.filter = filter;
    this.reloading = true;
    this.fetch();
  }

  isFiltred(): boolean {
    return Object.keys(this.filter).length !== 0;
  }
}
