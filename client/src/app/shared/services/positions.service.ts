import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Position} from '../interfaces/position.interface';
import {Message} from '../interfaces/message.interface';

@Injectable({
  providedIn: 'root'
})
export class PositionsService {
  constructor(private http: HttpClient) {

  }

  fetch(id: string): Observable<Position[]> {
    return this.http.get<Position[]>(`/api/position/${id}`);
  }

  create(p: Position): Observable<Position> {
    return this.http.post<Position>(`/api/position/`, p);
  }

  update(p: Position): Observable<Position> {
    return this.http.patch<Position>(`/api/position/${p._id}`, p);
  }

  delete(p: Position): Observable<Message> {
    return this.http.delete<Message>(`/api/position/${p._id}`);
  }
}
