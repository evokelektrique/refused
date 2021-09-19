// Core Database class
export class Database {

  database = null // IndexedDB database name
  instance = null // IndexedDB database instance
  version  = 1    // IndexedDB database version
  data     = []

  constructor(database) {
    if(!database) {
      return "Database not defined"
    }

    if(!this.is_supported()) {
      return "Your browser doesn not support indexedDB"
    }

    this.database = database
    this.open()
  }

  /**
   * Open an IndexedDB database
   * @return {IDBOpenDBRequest} Interface of the IndexedDB API
   */
  open() {
    this.instance = window.indexedDB.open(this.database, this.version)
  }

  /**
   * Check if current browser supports IndexedDB
   * @return {Boolean} Status of browser support
   */
  is_supported() {
    if(window.indexedDB) {
      return true
    }

    return false
  }

  get data() {
    return this.data
  }

  set data(data) {
    this.data = data
  }
}
