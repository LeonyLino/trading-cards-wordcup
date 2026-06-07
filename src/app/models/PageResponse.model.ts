import { Sticker } from "./sticker.model";

export interface PageResponse<T> {
  content: Sticker[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}