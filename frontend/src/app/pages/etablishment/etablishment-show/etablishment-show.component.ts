import { Component, OnInit, Input } from '@angular/core';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from "@angular/router";
import { Store, select } from '@ngrx/store';
import { Observable, Observer } from 'rxjs';

//services
import { EtablishmentService } from '../../../shared/services/etablishment.service';
//interfaces
import { Etablishment } from '../../../shared/interfaces/etablishment.type';
//enumeration
import { EtablishmentTypeEnum } from '../../../shared/enumerations/etablishment-type.enum';
//others
import { Helper } from '../../../shared/helper';
//component
import { AddManagerEtablishmentComponent } from '../add-manager-etablishment/add-manager-etablishment.component';
import { EtablishmentAddComponent } from '../etablishment-add/etablishment-add.component';

@Component({
  selector: 'app-etablishment-show',
  templateUrl: './etablishment-show.component.html',
  styleUrls: ['./etablishment-show.component.css']
})
export class EtablishmentShowComponent implements OnInit {

  isEdit: boolean = false;
  etablishment: Etablishment;
  showSkeleton: boolean = true;
  isLoading: boolean = true;
  itemId: any = null;
  sub: any;
  etablishmentTypes = EtablishmentTypeEnum;
  confirmModal?: NzModalRef;

  constructor(
    private modalService: NzModalService, 
    private fb: FormBuilder, 
    private msg: NzMessageService,
    private etablishmentService: EtablishmentService,
    private route: ActivatedRoute,
    private notification: NzNotificationService,
    private router: Router) {
  }
  
  ngOnInit(): void {
      this.sub = this.route.params.subscribe(params => {
        this.itemId = +params['id']; // (+) converts string 'id' to a number
  
        this.getItem(this.itemId);
  
     });
  }


  editorConfig = {
      toolbar: [
          ['bold', 'italic', 'underline', 'strike'],        
          ['blockquote', 'code-block'],
          [{ 'header': 1 }, { 'header': 2 }],               
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'size': ['small', false, 'large', 'huge'] }],  
          [{ 'align': [] }],
          ['link', 'image']                        
      ]
  };

  getItem(itemId){
    this.etablishmentService.getOne(itemId)
      .subscribe((res) => {
        this.etablishment = res;
        this.showSkeleton = false;
      }, error => {
        this.showSkeleton = false;
      })
  }

  formatUrl(url: string){
    return Helper.formatUrl(url);
  }

  addManager(item, action){
    const a: any = this.modalService.create({
      nzTitle: action === 'add' ? 'Sélectionnez un responsable' : 'Changer le manager',
      nzContent: AddManagerEtablishmentComponent,
      nzComponentParams: {
        etablishment: {...item}
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
        this.etablishment = {...e};
      }
    });
  }

  openEdit(item){
    const a: any = this.modalService.create({
      nzTitle: 'Modifier l\'établissement',
      nzContent: EtablishmentAddComponent,
      nzComponentParams: {
        etablishment: {...item},
        action: 'edit'
      },
      nzStyle: {
        top: '30px'
      },
      nzMaskClosable: false,
      nzWidth: 700,
      nzOnOk: (event) => {
      }
    });
    a.afterClose.subscribe((e) => {
      if(e){
        this.etablishment = {...e};
      }
    });
  }

  deleteItem(item){
    this.confirmModal = this.modalService.confirm({
      nzTitle: 'Etes-vous sûr de vouloir supprimer cet élément?',
      nzContent: 'Une fois supprimée, vous ne pourrez plus récupérer cet élement',
      nzCancelText: 'Annuler',
      nzOkText: 'Confirmer',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          this.etablishmentService.delete(item.id)
            .subscribe(() => {
              this.notification.success("Succés", "Elément supprimé avec succès!");
              this.router.navigate(['/pages/etablishments']);
              resolve(1);
            }, err => {
              reject();
            })
        }).catch(() => this.notification.error("Echec", "Erreur lors de la suppression de l'élément!"))
    });
  }

}
