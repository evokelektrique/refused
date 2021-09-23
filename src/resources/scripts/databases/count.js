import { Database } from './db'

const browser  = require("webextension-polyfill");

// Blocked ads counter class
export class CountDatabase {

  version = 1

  /**
   * Initialize default values
   * @param  {object} data Contain configuration
   * @return {void}
   */
  constructor(data) {
    this.count  = data.count ? data.count : 0 // Set to 0 on default
    this.domain = data.domain
  }

  /**
   * Open or upgrade a database
   * @return {void}
   */
  open() {
    const instance = new Database(this.domain, this.version)

    // Attach database handlers
    instance.onerror         = event => this.onerror(event)
    instance.onsuccess       = event => this.onsuccess(event)
    instance.onupgradeneeded = event => this.onupgradeneeded(event)

    instance.open()
  }

  /**
   * Handle database errors
   * @param  {Event} event
   * @return {void}
   */
  onerror(event) {
    console.log("Database error")
  }

  /**
   * Handle database success
   * @param  {Event} event
   * @return {void}
   */
  onsuccess(event) {
    console.log("Successfull")
    const db = event.target.result
    // console.log(db)
    // db.createObjectStore('books', {keyPath: 'id'});
    let transaction = db.transaction("books", "readwrite"); // (1)

    // get an object store to operate on it
    let books = transaction.objectStore("books"); // (2)

    let book = {
      id: 'js',
      price: 10,
      created: new Date()
    };

    let request = books.add(book); // (3)

    request.onsuccess = function() { // (4)
      console.log("Book added to the store", request.result);
    };

    request.onerror = function() {
      console.log("Error", request.error);
    };
  }

  onupgradeneeded(event) {
    console.log(event, "Database change detected")
    let db = event.target.result;
    if (!db.objectStoreNames.contains('books')) { // if there's no "books" store
      db.createObjectStore('books', {keyPath: 'id'}); // create it
    }
  }

  increase(db) {
    // browser.storage.local.get(this.domain).then(result => {
    //   if(Object.keys(result).length !== 0) {
    //     this.count = result
    //   }

    //   console.log(this)
    // })
  }
}
