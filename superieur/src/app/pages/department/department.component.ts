import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

//interfaces
import { Department } from '@app/shared/interfaces/department.type';
//others
import { Helper } from '@app/shared/helper';
//components
import { DepartmentModalComponent } from './department-modal/department-modal.component';
import { DepartmentService } from '@app/shared/services/department.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  departments: Department[] = [];
  total = 0;
  loading = true;
  searchInput: string = "";
  params: any = {
    page : 1,
    itemsPerPage : 10,
    "order[name]": 'asc',
    simplesearch: "",
  }
  action: string;
  confirmModal?: NzModalRef;

  constructor(
    private departmentService: DepartmentService,
    private notification: NzNotificationService,
    private modalService: NzModalService
  ) { }

  ngOnInit(): void {
  }

  getDepartments(): void {
    this.loading = true;
    this.departmentService.getAll(this.params)
      .subscribe((res) => {
        this.loading = false;
        this.departments = res['hydra:member'];
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
    this.getDepartments();
  }

  search(){
    this.params.page = 1;
    this.params.simplesearch = this.searchInput;
    this.getDepartments();
  }

  openAdd(){
    this.action = 'create';
    const a: any = this.modalService.create({
      nzTitle: 'Ajouter un département',
      nzContent: DepartmentModalComponent,
      nzComponentParams: {
        action: this.action
      },
      nzStyle: {
        top: '30px'
      },
      nzWidth: '600px',
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

  openEdit(department){
    this.action = 'edit';
    const a: any = this.modalService.create({
      nzTitle: 'Modifier un département',
      nzContent: DepartmentModalComponent,
      nzComponentParams: {
        department: {...department},
        action: this.action
      },
      nzStyle: {
        top: '30px'
      },
      nzWidth: '600px',
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
          let index = this.departments.findIndex(x => x.id === e.id);
          if(index !== -1)
            this.departments[index] = {...e};
        }
      }
    });
  }

  deleteItem(department){
    this.confirmModal = this.modalService.confirm({
      nzTitle: 'Etes-vous sûr de vouloir supprimer cet élément?',
      nzContent: 'Une fois supprimée, vous ne pourrez plus récupérer cet élement',
      nzCancelText: 'Annuler',
      nzOkText: 'Confirmer',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          this.departmentService.delete(department.id)
            .subscribe(() => {
              this.notification.success("Succés", "Elément supprimé avec succès!");
              this.search();
              resolve(1);
            }, err => {
              reject();
            })
        }).catch(() => this.notification.error("Erreur", "Erreur lors de la suppression de l'element"))
    });
  }

}
