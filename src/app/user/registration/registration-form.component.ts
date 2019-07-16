import { OnInit, Component, Output, EventEmitter } from '@angular/core';
import { RepositoryService } from '../../shared/repoistory.service';
import { RouterService } from '../../shared/router.service';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { User } from '../../models/User.model';

@Component({
  selector: 'registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {
  private dialogConfig;

  constructor(private repoService: RepositoryService, private dialog: MatDialog, private router: RouterService) {
    this.dialogConfig = {
      height: '400px',
      width: '400px',
      disableClose: true,
      data: {}
    }
  }

  ngOnInit() {
  }

  submitBtnTitle = "Register";

  submitCallback = (form) => {
    if (form.valid) {
      let user: User = {
        UserName: form.controls.username.value,
        Password: form.controls.password.value,
        Email: form.controls.email.value,
        DateOfBirth: form.controls.dateOfBirth.value,
        Residency: form.controls.residency.value
      };

      this.repoService.createUser(user);

      this.dialogConfig.data = {
        title: 'Registration succeeded', message: `New user: ${user.UserName} from: ${user.Residency} registered successfully`, callback: () => {
          this.router.redirectToUsersGrid();
        }
      };
      this.dialog.open(DialogComponent, this.dialogConfig);
    }
  }
}