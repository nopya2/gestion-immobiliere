import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

//interfaces
import { Product } from '@app/shared/interfaces/product.type';
//services
import { ProductService } from "@app/shared/services/product.service";
//others
import { Helper } from '@app/shared/helper';
//components
// import { ModuleModalComponent } from './module-modal/module-modal.component';

@Component({
  selector: 'app-products',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
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
  expandSet = new Set<number>();

  constructor(
    private productService: ProductService,
    private notification: NzNotificationService,
    private modalService: NzModalService
  ) { }

  ngOnInit(): void {
  }

  getTypes(): void {
    this.loading = true;
    this.productService.getAll(this.params)
      .subscribe((res) => {
        this.loading = false;
        this.products = res['hydra:member'] as Product[];
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
    
  }

  openEdit(product: Product){
    
  }

  deleteItem(product: Product){
    this.confirmModal = this.modalService.confirm({
      nzTitle: 'Etes-vous sûr de vouloir supprimer cet élément?',
      nzContent: 'Une fois supprimée, vous ne pourrez plus récupérer cet élement',
      nzCancelText: 'Annuler',
      nzOkText: 'Confirmer',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          this.productService.delete(product.id)
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

  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

}
