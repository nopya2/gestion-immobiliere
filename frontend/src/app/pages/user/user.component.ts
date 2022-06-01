import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTableQueryParams } from 'ng-zorro-antd/table';

import { User } from '../../shared/interfaces/user.type';
import { UserService } from "../../shared/services/user.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: User[] = [];
  total = 1;
  loading = true;
  params: any = {
    page : 1,
    itemsPerPage : 10,
    "order[name]": 'asc',
  }
  filterEnabled = [
    { text: 'Activé', value: true },
    { text: 'Désactivé', value: false }
  ];

  constructor(
    private userService: UserService,
    private notification: NzNotificationService,
  ) { }

  ngOnInit(): void {
    // this.getUsers();
  }

  getUsers(): void {
    this.loading = true;
    this.userService.getAll(this.params)
      .subscribe((res) => {
        this.loading = false;
        this.users = res['hydra:member'];
        this.total = res['hydra:totalItems'];
      }, error => {
        this.loading = false;
        this.notification.error("Erreur", "Erreur lors du chargement des données!")
      })
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params);
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || 'name';
    const sortOrder = (currentSort && currentSort.value) || 'asc';
    this.params = {
      page : pageIndex,
      itemsPerPage: pageSize,
    }
    this.params['order['+sortField+']'] = sortOrder
    // this.loadDataFromServer(pageIndex, pageSize, sortField, sortOrder, filter);
    this.getUsers();
  }

}
