import { Component, OnInit, ViewChild } from '@angular/core';
import { RepositoryService } from './shared/repoistory.service';
import { MatMenuTrigger } from '@angular/material'
import { NavItem } from './models/nav-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'usersManager';
  navItems: NavItem[];

  constructor(private repoService: RepositoryService) {
  }

  @ViewChild(MatMenuTrigger, { static: true }) trigger: MatMenuTrigger;

  someMethod() {
    if (this.repoService.checkLogin()) {
      this.navItems = [
        { Title: 'Logout', Route: '/logout' }
      ];
    }
    else {
      this.navItems = [
        { Title: 'Login', Route: '/login' },
        { Title: 'Register', Route: '/register' }
      ];
    }
    this.trigger.openMenu();
  }

  ngOnInit() {

  }
}