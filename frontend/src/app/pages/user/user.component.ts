import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

//interfaces
import { User } from '../../shared/interfaces/user.type';
//services
import { UserService } from "../../shared/services/user.service";
//others
import { Helper } from '../../shared/helper';
//components
import { UserAddComponent } from './user-add/user-add.component';
import { UserResetPwdComponent } from './user-reset-pwd/user-reset-pwd.component';
//enums
import { RoleEnum } from '../../shared/enumarations/role.enum';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: User[] = [];
  total = 0;
  loading = true;
  searchInput: string = "";
  params: any = {
    page : 1,
    itemsPerPage : 10,
    "order[name]": 'asc',
    name: "",
  }
  filterEnabled = [
    { text: 'Activé', value: true },
    { text: 'Désactivé', value: false }
  ];
  rolesEnum = RoleEnum;
  action: string;
  confirmModal?: NzModalRef;

  constructor(
    private userService: UserService,
    private notification: NzNotificationService,
    private modalService: NzModalService
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
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || 'name';
    const sortOrder = (currentSort && currentSort.value) || 'asc';
    
    this.params.page = pageIndex;
    this.params.itemsPerPage = pageSize;
    this.params['order['+sortField+']'] = Helper.transformOrder(sortOrder);
    // this.loadDataFromServer(pageIndex, pageSize, sortField, sortOrder, filter);
    this.getUsers();
  }

  search(){
    this.params.page = 1;
    this.params.name = this.searchInput;
    this.getUsers();
  }

  openAdd(){
    this.action = 'create';
    const a: any = this.modalService.create({
      nzTitle: 'Ajouter un utilisateur',
      nzContent: UserAddComponent,
      nzComponentParams: {
        action: this.action
      },
      nzStyle: {
        top: '30px'
      },
      nzMaskClosable: false,
      nzWidth: 650,
      nzOnOk: (event) => {
      }
    });
    a.afterClose.subscribe((e) => {
      if(e){
        this.searchInput = ""
        this.search();
      }
    });
  }

  openEdit(user){
    this.action = 'edit';
    const a: any = this.modalService.create({
      nzTitle: 'Modifier l\'utilisateur',
      nzContent: UserAddComponent,
      nzComponentParams: {
        user: {...user},
        action: this.action
      },
      nzStyle: {
        top: '30px'
      },
      nzMaskClosable: false,
      nzWidth: 650,
      nzOnOk: (event) => {
      }
    });
    a.afterClose.subscribe((e) => {
      if(e){
        if(this.action === 'create'){
          this.searchInput = ""
          this.search();
        }
        if(this.action === 'edit'){
          let index = this.users.findIndex(x => x.id === e.id);
          if(index !== -1)
            this.users[index] = {...e};
        }
      }
    });
  }

  deleteItem(user){
    this.confirmModal = this.modalService.confirm({
      nzTitle: 'Etes-vous sûr de vouloir supprimer cet élément?',
      nzContent: 'Une fois supprimée, vous ne pourrez plus récupérer cet élement',
      nzCancelText: 'Annuler',
      nzOkText: 'Confirmer',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          this.userService.delete(user.id)
            .subscribe(() => {
              this.notification.success("Succés", "Elément supprimé avec succès!");
              this.search();
              resolve(1);
            }, err => {
              reject();
            })
        }).catch(() => console.log('Oops errors!'))
    });
  }

  resetPassword(user){
    const a: any = this.modalService.create({
      nzTitle: 'Réinitialisation du mot de passe',
      nzContent: UserResetPwdComponent,
      nzComponentParams: {
        user: user
      },
      nzStyle: {
        top: '30px'
      },
      nzMaskClosable: false,
      // nzWidth: 650,
      nzOnOk: (event) => {
      }
    });
  }

}
