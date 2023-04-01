import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

//interfaces
import { OperationType } from '@app/shared/interfaces/operation-type.type';
//services
import { OperationTypeService } from "@app/shared/services/operation-type.service";
//others
import { Helper } from '@app/shared/helper';
import { OperationTypeFormModalComponent } from '../modal/form/form.component';
//components
// import { ModuleModalComponent } from './module-modal/module-modal.component';

@Component({
  selector: 'app-operation-type-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class OperationTypeListComponent implements OnInit {

  operationTypes: OperationType[] = [];
  total = 0;
  loading = true;
  searchInput: string = "";
  params: any = {
    page : 1,
    itemsPerPage : 10,
    "order[label]": 'asc',
    label: "",
  }
  action: string;
  confirmModal?: NzModalRef;

  constructor(
    private operationTypeService: OperationTypeService,
    private notification: NzNotificationService,
    private modalService: NzModalService
  ) { }

  ngOnInit(): void {
  }

  getTypes(): void {
    this.loading = true;
    this.operationTypeService.getAll(this.params)
      .subscribe((res) => {
        this.loading = false;
        this.operationTypes = res['hydra:member'];
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
    this.getTypes();
  }

  search(){
    this.params.page = 1;
    this.params.label = this.searchInput;
    this.getTypes();
  }

  openAdd(){
    this.action = 'create';
    const a: any = this.modalService.create({
      nzTitle: 'Ajouter un type de produit',
      nzContent: OperationTypeFormModalComponent,
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

  openEdit(operationType: OperationType){
    this.action = 'edit';
    const a: any = this.modalService.create({
      nzTitle: 'Modifier le type de produit',
      nzContent: OperationTypeFormModalComponent,
      nzComponentParams: {
        operationType: {...operationType},
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
          let index = this.operationTypes.findIndex(x => x.id === e.id);
          if(index !== -1)
            this.operationTypes[index] = {...e};
        }
      }
    });
  }

  deleteItem(operationType: OperationType){
    this.confirmModal = this.modalService.confirm({
      nzTitle: 'Etes-vous sûr de vouloir supprimer cet élément?',
      nzContent: 'Une fois supprimée, vous ne pourrez plus récupérer cet élement',
      nzCancelText: 'Annuler',
      nzOkText: 'Confirmer',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          this.operationTypeService.delete(operationType.id)
            .subscribe(() => {
              this.notification.success("Succès", "Elément supprimé avec succès!");
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
