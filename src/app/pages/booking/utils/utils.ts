import {PipeTransform} from "@angular/core";
import { Itinerary } from "../model/itinerary.model";


export type SortColumn = keyof Itinerary | '';
export type SortDirection = 'asc' | 'desc' | '';

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;


export function sort(customers: Itinerary[], column: SortColumn, direction: string): Itinerary[] {
  if (direction === '' || column === '') {
    return customers;
  } else {
    return [...customers].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

export function matches(customers: Itinerary, term: string, pipe: PipeTransform) {
  return customers.cityOrigin.toLowerCase().includes(term.toLowerCase());
}
