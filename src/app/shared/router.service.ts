import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class RouterService {
    constructor(private router: Router) {
    }

    public redirectToLogin() {
        this.router.navigate(['/login']);
    }

    public redirectToRegistration() {
        this.router.navigate(['/register']);
    }

    public redirectToUsersGrid() {
        this.router.navigate(['/usersGrid']);
    }
}
