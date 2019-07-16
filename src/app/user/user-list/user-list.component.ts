import { Component, OnInit, ViewChild, AfterContentInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { RepositoryService } from '../../shared/repoistory.service';
import { User } from '../../models/User.model'

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, AfterContentInit {

  displayedColumns: string[] = ['UserName', 'Email', 'Residency', 'DateOfBirth', 'Edit', 'Delete'];
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];

  dataSource = new MatTableDataSource();

  constructor(private repoService: RepositoryService) { }

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.getAllUsers();
  }

  ngAfterContentInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public getAllUsers = () => {
    this.repoService.getAllUsers().subscribe((usersData: User[]) => {
      this.dataSource.data = usersData;
    });
  }

  public updateUser = (email: string) => {
    // let url: string = `/user/update/${id}`;
    // this.router.navigate([url]);
  }

  public deleteUser = (email: string) => {
    let usersData = JSON.parse(localStorage.getItem('usersData'));

  }
}
