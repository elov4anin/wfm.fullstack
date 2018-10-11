import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {MaterialInstance, MaterialService} from '../../shared/classes/material.service';
import {OrderService} from './order.service';
import {Order, OrderPosition} from '../../shared/interfaces/order.interface';
import {OrdersService} from '../../shared/services/orders.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css'],
  providers: [OrderService]
})
export class OrderPageComponent implements OnInit, OnDestroy, AfterViewInit {
  isRoot: boolean;
  @ViewChild('modal') modalRef: ElementRef;
  modal: MaterialInstance;
  pendingToSrv = false;

  oSub: Subscription;

  constructor(
    private router: Router,
    public orderService: OrderService,
    private ordersService: OrdersService
  ) {
  }

  ngOnInit() {
    this.isRoot = this.router.url === '/order';
    this.router.events.subscribe(event => {
      console.log(event);
      if (event instanceof NavigationEnd) {
        this.isRoot = this.router.url === '/order';
      }
    });
  }

  ngOnDestroy() {
    this.modal.destroy();
    if (this.oSub) {
      this.oSub.unsubscribe();
    }
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef);
  }

  open() {
    this.modal.open();
  }

  cancel() {
    this.modal.close();
  }

  submit() {
    this.pendingToSrv = true;
    const order: Order = {
      list: this.orderService.list.map(item => {
        delete item._id;
        return item;
      })
    };
   this.oSub =  this.ordersService.create(order).subscribe(o => {
      MaterialService.toast(`Заказ ${o.order} был добавлен`);
      this.orderService.clear();
      },
      error1 => {
      MaterialService.toast(error1.error.message);
      },
    () => {
      this.modal.close();
      this.pendingToSrv = false;
    });
  }

  removePosition(o: OrderPosition) {
    this.orderService.remove(o);
  }
}
