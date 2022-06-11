import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

//interfaces
import { Etablishment } from '../../shared/interfaces/etablishment.type';
//services
import { EtablishmentService } from "../../shared/services/etablishment.service";
//others
import { Helper } from '../../shared/helper';
//components
import { EtablishmentAddComponent } from './etablishment-add/etablishment-add.component';
//enums
import { RoleEnum } from '../../shared/enumarations/role.enum';

@Component({
  selector: 'app-etablishment',
  templateUrl: './etablishment.component.html',
  styleUrls: ['./etablishment.component.css']
})
export class EtablishmentComponent implements OnInit {

  etablishments: Etablishment[] = [];
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
    private etablishmentService: EtablishmentService,
    private notification: NzNotificationService,
    private modalService: NzModalService
  ) { }

  ngOnInit(): void {
    // this.getEtablishments();
  }

  getEtablishments(): void {
    this.loading = true;
    this.etablishmentService.getAll(this.params)
      .subscribe((res) => {
        this.loading = false;
        this.etablishments = res['hydra:member'];
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
    this.getEtablishments();
  }

  search(){
    this.params.page = 1;
    this.params.name = this.searchInput;
    this.getEtablishments();
  }

  openAdd(){
    this.action = 'create';
    const a: any = this.modalService.create({
      nzTitle: 'Ajouter un établissement',
      nzContent: EtablishmentAddComponent,
      nzComponentParams: {
        action: this.action
      },
      nzStyle: {
        top: '30px'
      },
      nzMaskClosable: false,
      nzWidth: 750,
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

  openEdit(etablishment){
    this.action = 'edit';
    const a: any = this.modalService.create({
      nzTitle: 'Modifier l\'établissement',
      nzContent: EtablishmentAddComponent,
      nzComponentParams: {
        etablishment: {...etablishment},
        action: this.action
      },
      nzStyle: {
        top: '30px'
      },
      nzMaskClosable: false,
      nzWidth: 750,
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
          let index = this.etablishments.findIndex(x => x.id === e.id);
          if(index !== -1)
            this.etablishments[index] = {...e};
        }
      }
    });
  }

  deleteItem(etablishment){
    this.confirmModal = this.modalService.confirm({
      nzTitle: 'Etes-vous sûr de vouloir supprimer cet élément?',
      nzContent: 'Une fois supprimée, vous ne pourrez plus récupérer cet élement',
      nzCancelText: 'Annuler',
      nzOkText: 'Confirmer',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          this.etablishmentService.delete(etablishment.id)
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
