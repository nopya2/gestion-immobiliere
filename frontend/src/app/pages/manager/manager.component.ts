import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

//interfaces
import { Manager } from '../../shared/interfaces/manager.type';
//services
import { ManagerService } from "../../shared/services/manager.service";
//others
import { Helper } from '../../shared/helper';
//components
import { ManagerAddComponent } from './manager-add/manager-add.component';
import { ManagerResetPwdComponent } from './manager-reset-pwd/manager-reset-pwd.component';
//enums
import { RoleEnum } from '../../shared/enumerations/role.enum';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {

  managers: Manager[] = [];
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
    private managerService: ManagerService,
    private notification: NzNotificationService,
    private modalService: NzModalService
  ) { }

  ngOnInit(): void {
    // this.getManagers();
  }

  getManagers(): void {
    this.loading = true;
    this.managerService.getAll(this.params)
      .subscribe((res) => {
        this.loading = false;
        this.managers = res['hydra:member'];
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
    console.log(sortOrder);
    this.params['order['+sortField+']'] = Helper.transformOrder(sortOrder);
    // this.loadDataFromServer(pageIndex, pageSize, sortField, sortOrder, filter);
    this.getManagers();
  }

  search(){
    this.params.page = 1;
    this.params.name = this.searchInput;
    this.getManagers();
  }

  openAdd(){
    this.action = 'create';
    const a: any = this.modalService.create({
      nzTitle: 'Ajouter un responsable',
      nzContent: ManagerAddComponent,
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

  openEdit(manager){
    this.action = 'edit';
    const a: any = this.modalService.create({
      nzTitle: 'Modifier le responsable',
      nzContent: ManagerAddComponent,
      nzComponentParams: {
        manager: {...manager},
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
          let index = this.managers.findIndex(x => x.id === e.id);
          if(index !== -1)
            this.managers[index] = {...e};
        }
      }
    });
  }

  deleteItem(manager){
    this.confirmModal = this.modalService.confirm({
      nzTitle: 'Etes-vous sûr de vouloir supprimer cet élément?',
      nzContent: 'Une fois supprimée, vous ne pourrez plus récupérer cet élement',
      nzCancelText: 'Annuler',
      nzOkText: 'Confirmer',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          this.managerService.delete(manager.id)
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

  resetPassword(manager){
    const a: any = this.modalService.create({
      nzTitle: 'Réinitialisation du mot de passe',
      nzContent: ManagerResetPwdComponent,
      nzComponentParams: {
        manager: manager
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
