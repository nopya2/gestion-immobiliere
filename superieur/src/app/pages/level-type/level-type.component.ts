import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

//interfaces
import { LevelType } from '@app/shared/interfaces/level.type';
//others
import { Helper } from '@app/shared/helper';
//components
import { LevelTypeModalComponent } from './level-type-modal/level-type-modal.component';
import { LevelTypeService } from '@app/shared/services/level-type.service';

@Component({
  selector: 'app-level-type',
  templateUrl: './level-type.component.html',
  styleUrls: ['./level-type.component.css']
})
export class LevelTypeComponent implements OnInit {

  levelTypes: LevelType[] = [];
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
    private levelTypeService: LevelTypeService,
    private notification: NzNotificationService,
    private modalService: NzModalService
  ) { }

  ngOnInit(): void {
  }

  getLevelTypes(): void {
    this.loading = true;
    this.levelTypeService.getAll(this.params)
      .subscribe((res) => {
        this.loading = false;
        this.levelTypes = res['hydra:member'];
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
    this.getLevelTypes();
  }

  search(){
    this.params.page = 1;
    this.params.simplesearch = this.searchInput;
    this.getLevelTypes();
  }

  openAdd(){
    this.action = 'create';
    const a: any = this.modalService.create({
      nzTitle: 'Ajouter un parcours',
      nzContent: LevelTypeModalComponent,
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

  openEdit(levelType){
    this.action = 'edit';
    const a: any = this.modalService.create({
      nzTitle: 'Modifier parcours',
      nzContent: LevelTypeModalComponent,
      nzComponentParams: {
        levelType: {...levelType},
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
          let index = this.levelTypes.findIndex(x => x.id === e.id);
          if(index !== -1)
            this.levelTypes[index] = {...e};
        }
      }
    });
  }

  deleteItem(levelType){
    this.confirmModal = this.modalService.confirm({
      nzTitle: 'Etes-vous sûr de vouloir supprimer cet élément?',
      nzContent: 'Une fois supprimée, vous ne pourrez plus récupérer cet élement',
      nzCancelText: 'Annuler',
      nzOkText: 'Confirmer',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          this.levelTypeService.delete(levelType.id)
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
