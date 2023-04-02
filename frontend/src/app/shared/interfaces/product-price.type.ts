import { OperationType } from "./operation-type.type";

export interface ProductPrice {
  "@id": string;
  id: number;
  amount: number;
  operation: OperationType | string;
}