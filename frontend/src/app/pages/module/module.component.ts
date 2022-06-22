import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

//interfaces
import { Module } from '@app/shared/interfaces/global.type';
//services
import { ModuleService } from "@app/shared/services/module.service";
//others
import { Helper } from '@app/shared/helper';
//components
import { ModuleModalComponent } from './module-modal/module-modal.component';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css']
})
export class ModuleComponent implements OnInit {

  modules: Module[] = [];
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
    private moduleService: ModuleService,
    private notification: NzNotificationService,
    private modalService: NzModalService
  ) { }

  ngOnInit(): void {
  }

  getModules(): void {
    this.loading = true;
    this.moduleService.getAll(this.params)
      .subscribe((res) => {
        this.loading = false;
        this.modules = res['hydra:member'];
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
    this.getModules();
  }

  search(){
    this.params.page = 1;
    this.params.name = this.searchInput;
    this.getModules();
  }

  openAdd(){
    this.action = 'create';
    const a: any = this.modalService.create({
      nzTitle: 'Ajouter un module',
      nzContent: ModuleModalComponent,
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

  openEdit(module){
    this.action = 'edit';
    const a: any = this.modalService.create({
      nzTitle: 'Modifier le module',
      nzContent: ModuleModalComponent,
      nzComponentParams: {
        module: {...module},
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
          let index = this.modules.findIndex(x => x.id === e.id);
          if(index !== -1)
            this.modules[index] = {...e};
        }
      }
    });
  }

  deleteItem(module){
    this.confirmModal = this.modalService.confirm({
      nzTitle: 'Etes-vous sûr de vouloir supprimer cet élément?',
      nzContent: 'Une fois supprimée, vous ne pourrez plus récupérer cet élement',
      nzCancelText: 'Annuler',
      nzOkText: 'Confirmer',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          this.moduleService.delete(module.id)
            .subscribe(() => {
              this.notification.success("Succés", "Elément supprimé avec succès!");
              this.search();
              resolve(1);
            }, err => {
              reject();
            })
        }).catch(() => {
          this.notification.error("Erreur", "Une erreur s'est produite lors de la suppression!");
        })
    });
  }

}
