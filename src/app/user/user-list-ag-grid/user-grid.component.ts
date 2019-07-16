import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '../../shared/repoistory.service';
import { RouterService } from '../../shared/router.service';
import { GridOptions } from "ag-grid-community";
import { MatDialog } from '@angular/material';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
import { User } from '../../models/User.model'

@Component({
    selector: 'app-user-grid',
    templateUrl: './user-grid.component.html',
    styleUrls: ['./user-grid.component.css'],
    providers: [RepositoryService]
})
export class UserGridComponent implements OnInit {
    gridOptions: GridOptions;
    initialRowDataLoad$;
    rowDataUpdates$;

    private gridApi: any;
    rowData: any;

    private dialogConfig;

    columnDefs = [
        { headerName: 'UserName', field: 'UserName', sortable: true, filter: true },
        { headerName: 'Email', field: 'Email', sortable: true, filter: true },
        { headerName: 'Residency', field: 'Residency', sortable: true, filter: true },
        {
            headerName: 'DateOfBirth', field: 'DateOfBirth', sortable: true, filter: true,
            cellRenderer: (data) => {
                return data.value ? (new Date(data.value)).toLocaleDateString('en-GB') : '';
            }
        }
    ];

    constructor(private repoService: RepositoryService, private dialog: MatDialog, private router: RouterService) {
        this.dialogConfig = {
            disableClose: true,
            data: {}
        }

        this.initialRowDataLoad$ = repoService.getAllUsers();
        this.rowDataUpdates$ = repoService.getAllUsersUpdate();

        this.gridOptions = <GridOptions>{
            columnDefs: this.columnDefs,

            deltaRowDataMode: true,
            getRowNodeId: function (data) {
                return data.Email;
            },

            onGridReady: () => {
                this.initialRowDataLoad$.subscribe(
                    rowData => {
                        if (this.gridOptions.api) {
                            this.gridOptions.api.setRowData(rowData);
                        }

                        this.rowDataUpdates$.subscribe((newRowData) => {
                            if (this.gridOptions.api) {
                                this.gridOptions.api.setRowData(newRowData)
                            }
                        });
                    }
                );
            },

            onFirstDataRendered(params) {
                params.api.sizeColumnsToFit();
            }
        };
    }

    ngOnInit() {
        let isLoggedIn = this.repoService.checkLogin();
        console.log(isLoggedIn);
        if (isLoggedIn) {
            this.rowData = this.repoService.getAllUsers();
        }
        else {
            this.router.redirectToLogin();
        }
    }

    onPageSizeChanged(newPageSize) {
        var value = document.getElementById("page-size").nodeValue;
        this.gridApi.paginationSetPageSize(Number(value));
    }

    onGridReady(params) {
        this.gridApi = params.api;
    }

    onCellDoubleClicked(params) {
        let user = params.data as User;
        this.dialogConfig.data = user;
        this.dialog.open(EditUserDialogComponent, this.dialogConfig);
    }
}