import { Component, OnInit } from '@angular/core';
import { RouterService } from './router.service';
import { RepositoryService } from './repoistory.service';

@Component({
    template: ''
})

export class LogoutComponent implements OnInit {

    constructor(private repoService: RepositoryService, private router: RouterService) { }

    ngOnInit() {
        this.repoService.logoutUser();
        this.router.redirectToLogin();
    }
}