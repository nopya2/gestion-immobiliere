import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

//interfaces
import { Employee } from '../../shared/interfaces/employee.type';
//services
import { EmployeeService } from "../../shared/services/employee.service";
//others
import { Helper } from '../../shared/helper';
//components
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { EmployeeResetPwdComponent } from './employee-reset-pwd/employee-reset-pwd.component';
//enums
import { RoleEnum } from '../../shared/enumerations/role.enum';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employees: Employee[] = [];
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
    private employeeService: EmployeeService,
    private notification: NzNotificationService,
    private modalService: NzModalService
  ) { }

  ngOnInit(): void {
    // this.getEmployees();
  }

  getEmployees(): void {
    this.loading = true;
    this.employeeService.getAll(this.params)
      .subscribe((res) => {
        this.loading = false;
        this.employees = res['hydra:member'];
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
    this.getEmployees();
  }

  search(){
    this.params.page = 1;
    this.params.name = this.searchInput;
    this.getEmployees();
  }

  openAdd(){
    this.action = 'create';
    const a: any = this.modalService.create({
      nzTitle: 'Ajouter un responsable',
      nzContent: EmployeeAddComponent,
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

  openEdit(employee){
    this.action = 'edit';
    const a: any = this.modalService.create({
      nzTitle: 'Modifier le responsable',
      nzContent: EmployeeAddComponent,
      nzComponentParams: {
        employee: {...employee},
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
          let index = this.employees.findIndex(x => x.id === e.id);
          if(index !== -1)
            this.employees[index] = {...e};
        }
      }
    });
  }

  deleteItem(employee){
    this.confirmModal = this.modalService.confirm({
      nzTitle: 'Etes-vous sûr de vouloir supprimer cet élément?',
      nzContent: 'Une fois supprimée, vous ne pourrez plus récupérer cet élement',
      nzCancelText: 'Annuler',
      nzOkText: 'Confirmer',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          this.employeeService.delete(employee.id)
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

  resetPassword(employee){
    const a: any = this.modalService.create({
      nzTitle: 'Réinitialisation du mot de passe',
      nzContent: EmployeeResetPwdComponent,
      nzComponentParams: {
        employee: employee
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
