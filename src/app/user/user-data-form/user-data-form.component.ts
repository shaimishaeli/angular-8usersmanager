import { OnInit, Component, Input, AfterContentInit } from '@angular/core';
import { FormGroup, FormGroupDirective, NgForm, Validators, FormBuilder, FormControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material';
import { RepositoryService } from '../../shared/repoistory.service'
import { User } from '../../models/User.model';

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
        const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

        return (invalidCtrl || invalidParent);
    }
}

@Component({
    selector: 'user-data-form',
    templateUrl: './user-data-form.component.html',
    styleUrls: ['./user-data-form.component.css']
})
export class UserDataFormComponent implements OnInit, AfterContentInit {
    public form: FormGroup;
    private dialogConfig;

    matcher = new MyErrorStateMatcher();

    constructor(private formBuilder: FormBuilder, private dialog: MatDialog, private repoService: RepositoryService) {
        this.dialogConfig = {
            height: '400px',
            width: '400px',
            disableClose: true,
            data: {}
        }
    }

    ngOnInit() {
    }

    ngAfterContentInit(): void {
        this.form = this.formBuilder.group({
            username: [this.userData != null ? this.userData.UserName : '', Validators.required],
            email: [this.userData != null ? this.userData.Email : '', [Validators.required, Validators.email]],
            dateOfBirth: [this.userData != null ? this.userData.DateOfBirth : new Date()],
            password: [this.userData != null ? this.userData.Password : '', Validators.required],
            passwordCheck: [this.userData != null ? this.userData.Password : '', Validators.required],
            residency: [this.userData != null ? this.userData.Residency : '', Validators.required]
        }, { validator: this.checkPasswords });
    }

    checkPasswords(group: FormGroup) { // here we have the 'passwords' group
        let pass = group.controls.password.value;
        let confirmPass = group.controls.passwordCheck.value;

        return pass === confirmPass ? null : { notSame: true }
    }

    @Input() userData: User;
    @Input() submitCallback: any;
    @Input() submitBtnTitle: any;
}