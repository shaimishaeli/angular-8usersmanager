import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { RepositoryService } from '../../shared/repoistory.service'
import { User } from '../../models/User.model'

@Component({
    selector: 'app-dialog',
    templateUrl: './edit-user-dialog.component.html',
    styleUrls: ['./edit-user-dialog.component.css']
})
export class EditUserDialogComponent implements OnInit {
    private dialogConfig;

    constructor(public dialogRef: MatDialogRef<EditUserDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: User, private dialog: MatDialog, private repoService: RepositoryService) {
        this.dialogConfig = {
            height: '400px',
            width: '400px',
            disableClose: true,
            data: {}
        }
    }

    ngOnInit() {
    }

    public closeDialog = () => {
        this.dialogRef.close();
    }

    submitBtnTitle = 'Update User';

    submitCallback = (form) => {
        if (form.valid) {
            let user: User = {
                UserName: form.controls.username.value,
                Password: form.controls.password.value,
                Email: form.controls.email.value,
                DateOfBirth: form.controls.dateOfBirth.value,
                Residency: form.controls.residency.value
            };

            this.repoService.updateUser(this.data, user);

            this.dialogConfig.data = { title: 'Update succeeded', message: '' };
            this.dialog.open(DialogComponent, this.dialogConfig);

            this.closeDialog();
        }
    }

}