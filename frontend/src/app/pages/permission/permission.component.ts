import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

//interfaces
import { Permission } from '@app/shared/interfaces/global.type';
//services
import { PermissionService } from "@app/shared/services/permission.service";
//others
import { Helper } from '@app/shared/helper';
//components
import { PermissionModalComponent } from './permission-modal/permission-modal.component';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.css']
})
export class PermissionComponent implements OnInit {

  permissions: Permission[] = [];
  total = 0;
  loading = true;
  searchInput: string = "";
  params: any = {
    page : 1,
    itemsPerPage : 10,
    "order[name]": 'asc',
    name: "",
  }
  action: string;
  confirmModal?: NzModalRef;

  constructor(
    private permissionService: PermissionService,
    private notification: NzNotificationService,
    private modalService: NzModalService
  ) { }

  ngOnInit(): void {
  }

  getPermissions(): void {
    this.loading = true;
    this.permissionService.getAll(this.params)
      .subscribe((res) => {
        this.loading = false;
        this.permissions = res['hydra:member'];
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
    this.getPermissions();
  }

  search(){
    this.params.page = 1;
    this.params.name = this.searchInput;
    this.getPermissions();
  }

  openAdd(){
    this.action = 'create';
    const a: any = this.modalService.create({
      nzTitle: 'Ajouter une permission',
      nzContent: PermissionModalComponent,
      nzComponentParams: {
        action: this.action
      },
      nzStyle: {
        top: '30px'
      },
      nzMaskClosable: false,
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

  openEdit(permission){
    this.action = 'edit';
    const a: any = this.modalService.create({
      nzTitle: 'Modifier la permission',
      nzContent: PermissionModalComponent,
      nzComponentParams: {
        permission: {...permission},
        action: this.action
      },
      nzStyle: {
        top: '30px'
      },
      nzMaskClosable: false,
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
          let index = this.permissions.findIndex(x => x.id === e.id);
          if(index !== -1)
            this.permissions[index] = {...e};
        }
      }
    });
  }

  deleteItem(permission){
    this.confirmModal = this.modalService.confirm({
      nzTitle: 'Etes-vous sûr de vouloir supprimer cet élément?',
      nzContent: 'Une fois supprimée, vous ne pourrez plus récupérer cet élement',
      nzCancelText: 'Annuler',
      nzOkText: 'Confirmer',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          this.permissionService.delete(permission.id)
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

}
