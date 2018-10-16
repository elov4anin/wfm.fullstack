import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Overview} from '../interfaces/overview.interface';
import {AnalyticsInterface} from '../interfaces/analytics.interface';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(private http: HttpClient) {}

  getOverview(): Observable<Overview> {
    return this.http.get<Overview>(`/api/analytics/overview`);
  }

  getAnalytics(): Observable<AnalyticsInterface> {
    return this.http.get<AnalyticsInterface>(`/api/analytics/analytics`);
  }
}
