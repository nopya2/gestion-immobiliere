import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

//interfaces
import { Customer } from '@app/shared/interfaces/customer.type';
//services
import { CustomerService } from "@app/shared/services/customer.service";
//others
import { Helper } from '@app/shared/helper';
import { CustomerFormModalComponent } from '../modal/form/form.component';
//components
// import { ModuleModalComponent } from './module-modal/module-modal.component';

@Component({
  selector: 'app-operation-type-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class CustomerListComponent implements OnInit {

  customers: Customer[] = [];
  total = 0;
  loading = true;
  searchInput: string = "";
  params: any = {
    page : 1,
    itemsPerPage : 10,
    simplesearch: "",
  }
  action: string;
  confirmModal?: NzModalRef;

  constructor(
    private customerService: CustomerService,
    private notification: NzNotificationService,
    private modalService: NzModalService
  ) { }

  ngOnInit(): void {
  }

  getTypes(): void {
    this.loading = true;
    this.customerService.getAll(this.params)
      .subscribe((res) => {
        this.loading = false;
        this.customers = res['hydra:member'] as Customer[];
        this.total = res['hydra:totalItems'];
      }, error => {
        this.loading = false;
        this.notification.error("Erreur", "Erreur lors du chargement des données!")
      })
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || 'numFolder';
    const sortOrder = (currentSort && currentSort.value) || 'asc';
    
    this.params.page = pageIndex;
    this.params.itemsPerPage = pageSize;
    this.resetParams(sortField, sortOrder);
    // this.loadDataFromServer(pageIndex, pageSize, sortField, sortOrder, filter);
    this.getTypes();
  }

  search(){
    this.params.page = 1;
    this.params.simplesearch = this.searchInput;
    this.getTypes();
  }

  openAdd(){
    this.action = 'create';
    const a: any = this.modalService.create({
      nzTitle: 'Ajouter un client',
      nzContent: CustomerFormModalComponent,
      nzComponentParams: {
        action: this.action
      },
      nzStyle: {
        top: '30px',
      },
      nzWidth: "700px",
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

  openEdit(customer: Customer){
    this.action = 'edit';
    const a: any = this.modalService.create({
      nzTitle: 'Modifier le client',
      nzContent: CustomerFormModalComponent,
      nzComponentParams: {
        customer: {...customer},
        action: this.action
      },
      nzStyle: {
        top: '30px'
      },
      nzWidth: "700px",
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
          let index = this.customers.findIndex(x => x.id === e.id);
          if(index !== -1)
            this.customers[index] = {...e};
        }
      }
    });
  }

  deleteItem(customer: Customer){
    this.confirmModal = this.modalService.confirm({
      nzTitle: 'Etes-vous sûr de vouloir supprimer cet élément?',
      nzContent: 'Une fois supprimée, vous ne pourrez plus récupérer cet élement',
      nzCancelText: 'Annuler',
      nzOkText: 'Confirmer',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          this.customerService.delete(customer.id)
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

  resetParams(sortField, sortOrder){
    this.params = {
      page : 1,
      itemsPerPage : 10,
      simplesearch: "",
    }

    this.params['order['+sortField+']'] = Helper.transformOrder(sortOrder);
  }

}
