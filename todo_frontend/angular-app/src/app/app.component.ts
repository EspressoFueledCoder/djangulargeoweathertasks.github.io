import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MenuItem} from 'primeng/api';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'angular-app';

  items: MenuItem[] = [];

  constructor(private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.items = [
      {label: 'Dashboard', icon: 'fa fa-home',routerLink: ['/dashboard']},
      {label: 'All Tasks', icon: 'fa fa-calendar',routerLink: ['/tasks']},
      {label: 'Servers', icon: 'fa fa-tasks',routerLink: ['/servers']},
      {label: 'My Profile', icon: 'fa fa-users',routerLink: ['/profile']},
      {label: 'Settings', icon: 'fa fa-sliders',routerLink: ['/settings']},
    ];
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }
}
