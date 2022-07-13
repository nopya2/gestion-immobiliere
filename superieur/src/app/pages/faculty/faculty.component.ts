import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

//interfaces
import { Faculty } from '@app/shared/interfaces/faculty.type';
//services
import { FacultyService } from "@app/shared/services/faculty.service";
//others
import { Helper } from '@app/shared/helper';
//components
import { FacultyModalComponent } from './faculty-modal/faculty-modal.component';
import { FacultyAddDiplomaModalComponent } from './faculty-add-diploma-modal/faculty-add-diploma-modal.component';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css']
})
export class FacultyComponent implements OnInit {

  faculties: Faculty[] = [];
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
    private facultyService: FacultyService,
    private notification: NzNotificationService,
    private modalService: NzModalService
  ) { }

  ngOnInit(): void {
  }

  getFaculties(): void {
    this.loading = true;
    this.facultyService.getAll(this.params)
      .subscribe((res) => {
        this.loading = false;
        this.faculties = res['hydra:member'];
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
    this.getFaculties();
  }

  search(){
    this.params.page = 1;
    this.params.name = this.searchInput;
    this.getFaculties();
  }

  openAdd(){
    this.action = 'create';
    const a: any = this.modalService.create({
      nzTitle: 'Ajouter une filière',
      nzContent: FacultyModalComponent,
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

  openEdit(faculty){
    this.action = 'edit';
    const a: any = this.modalService.create({
      nzTitle: 'Modifier la filière',
      nzContent: FacultyModalComponent,
      nzComponentParams: {
        faculty: {...faculty},
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
          let index = this.faculties.findIndex(x => x.id === e.id);
          if(index !== -1)
            this.faculties[index] = {...e};
        }
      }
    });
  }

  deleteItem(faculty){
    this.confirmModal = this.modalService.confirm({
      nzTitle: 'Etes-vous sûr de vouloir supprimer cet élément?',
      nzContent: 'Une fois supprimée, vous ne pourrez plus récupérer cet élement',
      nzCancelText: 'Annuler',
      nzOkText: 'Confirmer',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          this.facultyService.delete(faculty.id)
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

  addDiploma(item){
    const a: any = this.modalService.create({
      nzTitle: 'Ajouter les diplômes',
      nzContent: FacultyAddDiplomaModalComponent,
      nzComponentParams: {
        faculty: {...item}
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
        let index = this.faculties.findIndex(x => x.id === e.id);
          if(index !== -1)
          this.faculties[index] = {...e};
      }
    });
  }

  deleteDiploma(item){
    
  }

}
