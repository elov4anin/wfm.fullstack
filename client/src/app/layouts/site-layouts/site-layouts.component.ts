import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {Router} from '@angular/router';
import {MaterialService} from '../../shared/classes/material.service';

@Component({
  selector: 'app-site-layouts',
  templateUrl: './site-layouts.component.html',
  styleUrls: ['./site-layouts.component.css']
})
export class SiteLayoutsComponent implements AfterViewInit {

  @ViewChild('floating') floatingRef: ElementRef;
  links = [
    {url: '/overview', name: 'Обзор'},
    {url: '/analytics', name: 'Аналитика'},
    {url: '/history', name: 'История'},
    {url: '/order', name: 'Добавить заказ'},
    {url: '/categories', name: 'Ассортимент'}
  ];

  constructor(private auth: AuthService, private router: Router) {
  }

  ngAfterViewInit() {
    MaterialService.initializeFloatingButton(this.floatingRef);
  }

  logout(event: Event) {
    // event.preventDefault();
    this.auth.logout();
    this.router.navigate(['/login']);

  }
}
