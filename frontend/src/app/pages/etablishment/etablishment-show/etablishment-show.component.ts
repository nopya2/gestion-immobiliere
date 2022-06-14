import { Component, OnInit, Input } from '@angular/core';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
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

@Component({
  selector: 'app-etablishment-show',
  templateUrl: './etablishment-show.component.html',
  styleUrls: ['./etablishment-show.component.css']
})
export class EtablishmentShowComponent implements OnInit {

  isEdit: boolean = false;
  productEditForm: FormGroup;
  previewImage: string = '';
  previewVisible: boolean = false;
  etablishment: Etablishment;
  showSkeleton: boolean = true;
  isLoading: boolean = true;
  itemId: any = null;
  sub: any;
  etablishmentTypes = EtablishmentTypeEnum;

  fileList = [
      {
          uid: -1,
          name: 'product-1.jpg',
          status: 'done',
          url: 'assets/images/others/product-1.jpg'
      },
      {
          uid: 0,
          name: 'product-2.jpg',
          status: 'done',
          url: 'assets/images/others/product-2.jpg'
      },
      {
          uid: 1,
          name: 'product-3.jpg',
          status: 'done',
          url: 'assets/images/others/product-3.jpg'
      }
  ];

  productData = {
      productName: 'Skinny Men Blazer',
      price: 199,
      category: 'Cloths',
      brand: 'H&M',
      status: 'In Stock',
      size: ['S', ' M', ' L', ' XL'],
      colors: ['Dark Blue', 'Gray', 'Gray Blue'],
      fit: 'Skinny',
      material: ['Polyester'],
      shipFrom: 'Columbia',
      description: '<p><span style="color: rgb(114, 132, 154);">Special cloth alert. The key to more success is to have a lot of pillows. Surround yourself with angels, positive energy, beautiful people, beautiful souls, clean heart, angel. They will try to close the door on you, just open it. A major key, never panic. Don’t panic, when it gets crazy and rough, don’t panic, stay calm. They key is to have every key, the key to open every door.</span></p><p><span style="color: rgb(114, 132, 154);">The other day the grass was brown, now it’s green because I ain’t give up. Never surrender. Lion! I’m up to something. Always remember in the jungle there’s a lot of they in there, after you overcome they, you will make it to paradise.</span></p>'
  }

  constructor(
    private modalService: NzModalService, 
    private fb: FormBuilder, 
    private msg: NzMessageService,
    private etablishmentService: EtablishmentService,
    private route: ActivatedRoute) {
  }
  
  ngOnInit(): void {
      this.productEditForm = this.fb.group({
          productName:    [ this.productData.productName,     [ Validators.required ] ],
          price:          [ this.productData.price,           [ Validators.required ] ],
          category:       [ this.productData.category,        [ Validators.required ] ],
          brand:          [ this.productData.brand,           [ Validators.required ] ],
          status:         [ this.productData.status,          [ Validators.required ] ],
          size:           [ this.productData.size,            [ Validators.required ] ],
          colors:         [ this.productData.colors,          [ Validators.required ] ],
          fit:            [ this.productData.fit,             [ Validators.required ] ],
          material:       [ this.productData.material,        [ Validators.required ] ],
          shipFrom:       [ this.productData.shipFrom,        [ Validators.required ] ],
          description:    [ this.productData.description,     [ Validators.required ] ],
      });

      this.sub = this.route.params.subscribe(params => {
        this.itemId = +params['id']; // (+) converts string 'id' to a number
  
        this.getItem(this.itemId);
  
     });
  }

  submitForm(): void {
      for (const i in this.productEditForm.controls) {
          this.productEditForm.controls[ i ].markAsDirty();
          this.productEditForm.controls[ i ].updateValueAndValidity();
      }
  }

  edit() {
      this.isEdit = true;
  }

  editClose() {
      this.isEdit = false;
  }

  save() {
      this.modalService.confirm({
          nzTitle  : '<i>Do you want your changes?</i>',
          nzOnOk   : () => this.editClose()
      });
  }

  handlePreview = (file: NzUploadFile) => {
      this.previewImage = file.url || file.thumbUrl;
      this.previewVisible = true;
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

}
