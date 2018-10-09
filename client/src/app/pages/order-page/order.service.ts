import {Injectable} from '@angular/core';
import {Position} from '../../shared/interfaces/position.interface';

@Injectable()
export class OrderService {
  public list = [];
  public price = 0;


  add(p: Position) {
  }

  remove() {
  }

  clear() {
  }
}
