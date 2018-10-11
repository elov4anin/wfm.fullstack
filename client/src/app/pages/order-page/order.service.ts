import {Injectable} from '@angular/core';
import {Position} from '../../shared/interfaces/position.interface';
import {OrderPosition} from '../../shared/interfaces/order.interface';

@Injectable()
export class OrderService {
  public list: OrderPosition[] = [];
  public price = 0;


  add(p: Position) {
    const orderPosition = Object.assign({}, {
      name: p.name,
      cost: p.cost,
      quantity: p.quantity,
      _id: p._id
    });
    const candidate = this.list.find(pos => pos._id === orderPosition._id);

    if (candidate) {
      // change count
      candidate.quantity += orderPosition.quantity;
    } else  {
      this.list.push(orderPosition);
    }

    this.computePrice();

  }

  remove(o: OrderPosition) {
    const idx = this.list.findIndex(p => p._id === o._id);
    this.list.splice(idx, 1);
    this.computePrice();
  }

  clear() {
    this.list = [];
    this.price = 0;
  }

  private computePrice() {
    this.price = this.list.reduce((total, item) => {
      return total += item.quantity * item.cost;
    }, 0);
  }
}
