import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidationErrors, FormArray } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { serialize } from 'object-to-formdata';

//interfaces
import { Product } from '@app/shared/interfaces/product.type';
//services
import { ProductService } from '@app/shared/services/product.service';
import { Owner } from '@app/shared/interfaces/owner.type';
import { TypeConstruction } from '@app/shared/interfaces/type-construction.type';
import { TypeProduit } from '@app/shared/interfaces/type-produit.type';
import { OperationType } from '@app/shared/interfaces/operation-type.type';
import { OwnerService } from '@app/shared/services/owner.service';
import { TypeConstructionService } from '@app/shared/services/type-construction.service';
import { TypeProduitService } from '@app/shared/services/type-produit.service';
import { OperationTypeService } from '@app/shared/services/operation-type.service';

const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

@Component({
  selector: 'app-produit-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class ProductNewComponent implements OnInit {

  form: FormGroup;
  isLoadingOne: Boolean = false;
  isLoadingTwo: Boolean = false;
  product: Product;
  owners: Owner[] = [];
  constructionTypes: TypeConstruction[] = [];
  productTypes: TypeProduit[] = [];
  operationTypes: OperationType[] = [];
  fileList: NzUploadFile[] = [];

  options = {
    /**
     * include array indices in FormData keys
     * defaults to false
     */
    indices: true,
    /**
     * treat null values like undefined values and ignore them
     * defaults to false
     */
    nullsAsUndefineds: false,
    /**
     * convert true or false to 1 or 0 respectively
     * defaults to false
     */
    booleansAsIntegers: false,
    /**
     * store arrays even if they're empty
     * defaults to false
     */
    allowEmptyArrays: false,
    /**
     * don't include array notation in FormData keys for Files in arrays
     * defaults to false
     */
    noFilesWithArrayNotation: false,
    /**
     * use dots instead of brackets for object notation in FormData keys
     * defaults to false
     */
    dotsForObjectNotation: false,
  };

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private ownerService: OwnerService,
    private constructionTypeService: TypeConstructionService,
    private productTypeService: TypeProduitService,
    private operationTypeService: OperationTypeService,
    private notification: NzNotificationService) {}

  ngOnInit(): void {
    this.initForm();

    this.loadParams();
  }

  get f(){
    return this.form.controls;
  }

  get images() {
    return this.form.controls["images"] as FormArray;
  }

  get prices() {
    return this.form.controls["prices"] as FormArray;
  }

  loadParams(){
    this.ownerService.getAll({}).subscribe((res) => {
      this.owners = res["hydra:member"];
    })

    this.constructionTypeService.getAll({}).subscribe((res) => {
      this.constructionTypes = res["hydra:member"];
    })

    this.productTypeService.getAll({}).subscribe((res) => {
      this.productTypes = res["hydra:member"];
    })

    this.operationTypeService.getAll({}).subscribe((res) => {
      this.operationTypes = res["hydra:member"];
    })
  }

  initForm(){
    this.form = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      reference: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      owner: [null, [Validators.required]],
      constructionType: [null, [Validators.required]],
      productType: [null, [Validators.required]],
      operationTypes: [null, [Validators.required]],
      city: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      neighborhood: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      observation: [null, [Validators.required]],
      commission: [null, [Validators.required]],
      prices: this.fb.array([]),
      lon: [null],
      lat: [null],
      images: this.fb.array([])
    }); 
    
  }

  submitForm(): void {    
    // for (const i in this.form.controls) {
    //   this.form.controls[i].markAsDirty();
    //   this.form.controls[i].updateValueAndValidity();
    // }

    // this.isLoading = true;
    // this.productService.create(this.form.value)
    //     .subscribe((res) => {
    //       this.isLoading = false;
    //       this.notification.success("Succés", "Elément ajouté avec succès!");
    //     }, error => {
    //       this.isLoading = false;
    //       this.notification.error("Echec création", "Erreur lors de la création du produit!");
    //     });
  }

  addImage = async (file: NzUploadFile) => {
    const imageForm = this.fb.group({
      file: [file, Validators.required],
    });

    this.images.push(imageForm);
  }

  deleteImage(index: number) {
    this.images.removeAt(index);
  }

  previewImage: string | undefined = '';
  previewVisible = false;

  handlePreview = async (file: NzUploadFile): Promise<void> => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file.preview;
    this.previewVisible = true;
    
  };

  /**
   * Cette fonction nous permettre d'ajouter les images au formulaire
   * @param file 
   * @returns 
   */
  beforeUpload = (file: NzUploadFile): boolean => {    
    this.fileList = this.fileList.concat(file);
    this.addImage(file);
    
    return true;
  }
  
  /**
   * Cette fonction nous permet de retirer les images du formulaire
   * @param file 
   * @returns 
   */
  removeUpload = (file: NzUploadFile): boolean => {
    //On recherche l'index ayant le uid equivalent dans la liste des fichiers
    let index = this.fileList.findIndex(x => x.uid === file.uid);
    if(index !== -1){
      this.deleteImage(index);
    }
    return true;
  }

  selectOperationType(event){    
    this.fillPrices(event);
  }

  fillPrices(operationTypes: string[]){
    //On initialise et on reprend l'ajout des prix
    this.prices.clear();

    operationTypes.forEach((el) => {
      this.prices.push(this.fb.group({
        amount: [null, Validators.required],
        operationType: [el, Validators.required],
      }));
    });
  }

  showLabelByJsonId = (jsonId: string) => {
    var index = this.operationTypes.findIndex(x => x["@id"] === jsonId);
    if(index !== -1){
      return this.operationTypes[index].label;
    }

    return "N/A";
  }

  saveAndContinue = () => {;
    
    this.isLoadingOne = true;
    var data = {...this.form.value};
    delete data.images;
    
    //On cree d'abord le produit
    this.productService.create(this.form.value).subscribe((res: Product) => {
      this.isLoadingOne = false

      //ensuite on ajoute les images au produit
      this.productService.addProductImage(res, this.transformToFormData({images: [...this.images.value]})).subscribe(() => {

      }, er => {

      }, () => {

      });

    }, er => {

    }, () => {
      this.isLoadingOne = false
    })
  }

  saveAndCreate = () => {

  }

  transformToFormData = (obj): FormData => {
    const formData = serialize(
      obj,
      this.options, // optional
    );

    return formData
  }
}