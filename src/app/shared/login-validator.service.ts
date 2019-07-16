import { Injectable } from '@angular/core';
import { User } from '../models/User.model'
import { Observable } from 'rxjs';
import { RepositoryService } from './repoistory.service'

@Injectable({
    providedIn: 'root'
})
export class LoginValidatorService {
    constructor(private repoService: RepositoryService) {
    }
}
