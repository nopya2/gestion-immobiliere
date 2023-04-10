import { OperationType } from "./operation-type.type";
import { Owner } from "./owner.type";
import { ProductPrice } from "./product-price.type";
import { TypeConstruction } from "./type-construction.type";
import { TypeProduit } from "./type-produit.type";
import { User } from "./user.type";

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
  images: string[];
  lon?: number;
  lat?: number;
  user?: User | string
}