import { OnInit, Component, Output, EventEmitter } from '@angular/core';
import { RouterService } from '../../shared/router.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { User } from '../../models/User.model';
import { RepositoryService } from '../../shared/repoistory.service'


@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent implements OnInit {
  public form: FormGroup;
  private dialogConfig;

  constructor(private formBuilder: FormBuilder, private dialog: MatDialog, private repoService: RepositoryService, private router: RouterService) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.dialogConfig = {
      height: '400px',
      width: '400px',
      disableClose: true,
      data: {}
    }
  }

  ngOnInit() {
    if (this.repoService.checkLogin()) {
      this.router.redirectToUsersGrid();
    }
  }

  submit() {
    if (this.form.valid) {
      let user = this.repoService.loginUser(this.form.controls.email.value, this.form.controls.password.value);
      if (user != undefined && user != null) {
        this.dialogConfig.data = {
          title: `Hello ${user.UserName} from ${user.Residency}`, message: 'You are in', callback: () => {
            this.router.redirectToUsersGrid();
          }
        };
      }
      else {
        this.dialogConfig.data = { title: 'Login failed', message: 'Incorrect email or password' };
      }
      this.dialog.open(DialogComponent, this.dialogConfig);
    }
  }

  redirectToRegister() {
    console.log('redirectToRegister')
    this.router.redirectToRegistration();
  }
}