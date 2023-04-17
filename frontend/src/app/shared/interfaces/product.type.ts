import { OperationType } from "./operation-type.type";
import { Owner } from "./owner.type";
import { ProductPrice } from "./product-price.type";
import { TypeConstruction } from "./type-construction.type";
import { TypeProduit } from "./type-produit.type";
import { User } from "./user.type";
import { environment } from "@environments/environment";
import { Image } from "./image.type";


const IMAGE_PATH = "images/products";

export interface Product {
  "@id"?: string;
  id?: number;
  name: string;
  reference: string;
  owner: Owner | string;
  constructionType: TypeConstruction | string;
  productType: TypeProduit | string;
  operationTypes: OperationType[] | string[];
  city: string;
  neighborhood: string;
  observation: string;
  commission: 0;
  status: string;
  prices: ProductPrice[];
  images: string[] | Image[];
  lon?: number;
  lat?: number;
  user?: User | string
}

export function showPicture(filePath?){
  if(filePath){
    return `${environment.endpoint}/${IMAGE_PATH}/${filePath}`;
  }

  return 'assets/images/others/local-image.jpg'
}