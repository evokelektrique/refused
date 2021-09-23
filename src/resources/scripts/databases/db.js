// Core Database class
export class Database {

  database = null // IndexedDB database name
  instance = null // IndexedDB database instance
  versio   = 1    // IndexedDB database version
  data     = []

  // Handlers
  onerror         = null
  onsuccess       = null
  onupgradeneeded = null

  /**
   * Initialize an IndexedDB database
   * @param  {string}  database Database name
   * @param  {integer} version  Database version number
   * @return {void}
   */
  constructor(database, version = 1) {
    if(!database) {
      return "Database not defined"
    }

    // Check if current browser support IndexedDB
    if(!this.is_supported()) {
      return "Your browser doesn not support indexedDB"
    }

    this.version  = version
    this.database = database
  }

  /**
   * Open an IndexedDB database
   * @return {void}
   */
  open() {
    this.instance = window.indexedDB.open(this.database, this.version)

    // Attach event handlers to current database instance
    this.instance.onerror         = event => this.onerror(event)
    this.instance.onsuccess       = event => this.onsuccess(event)
    this.instance.onupgradeneeded = event => this.onupgradeneeded(event)
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
