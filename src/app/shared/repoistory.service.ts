import { Injectable } from '@angular/core';
import { User } from '../models/User.model'
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RepositoryService {
    public getAllUsers(): any {

        const usersObservable = new Observable(observer => {
            setTimeout(() => {
                observer.next(JSON.parse(localStorage.getItem('usersData')));
            }, 200);
        });

        return usersObservable;
    }

    public getAllUsersUpdate(): any {
        return Observable.create((observer) => {
            const interval = window.setInterval(() => {
                observer.next(JSON.parse(localStorage.getItem('usersData')));
            }, 1000);

            return () => window.clearInterval(interval);
        });
    }

    public getUser(email: String, password: String): User {
        let users: User[] = JSON.parse(localStorage.getItem('usersData'));
        if (users != null) {
            return users.find(x => x.Email === email && x.Password === password);
        }

        return null;
    }

    public loginUser(email: String, password: String): User {
        let user = this.getUser(email, password);
        if (user != undefined && user != null) {
            this.setLogin();
            return user;
        }

        return null;
    }

    private setLogin() {
        localStorage.setItem('loggedInUser', "true");
    }

    public logoutUser() {
        localStorage.removeItem('loggedInUser');
    }

    public checkLogin(): boolean {
        let isLoggedIn: boolean = false;

        let isLoggedInStr = localStorage.getItem('loggedInUser');
        if (isLoggedInStr == 'true') {
            isLoggedIn = true;
        }

        return isLoggedIn;
    }

    public createUser(user: User) {
        let users: User[] = JSON.parse(localStorage.getItem('usersData'));
        if (users == null) {
            users = [];
        }

        users.push(user);

        localStorage.setItem('usersData', JSON.stringify(users));

        this.setLogin();
    }

    public updateUser(oldUser: User, newUser: User) {
        this.delete(oldUser);
        this.createUser(newUser);
    }

    public delete(user: User) {
        let users: User[] = JSON.parse(localStorage.getItem('usersData'));
        var index = users.findIndex(x => x.Email == user.Email && x.Password == user.Password);
        if (index > -1) {
            users.splice(index, 1);
        }

        localStorage.setItem('usersData', JSON.stringify(users));
    }
}
