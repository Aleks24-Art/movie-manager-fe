import {Film} from "./film";
import {Pageable} from "./pageable";
import {Sort} from "./sort";

export interface Page {
  content: Film[];
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  sort: Sort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}
