import { Database } from './db'

export class FilterDatabase extends Database {
  filters = []

  constructor() {}

  set filter(key, value) {
    this.filters[key] = value
  }

  get filter() {
    return this.filter;
  }
}
