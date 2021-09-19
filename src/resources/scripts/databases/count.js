import { Database } from './db'

const browser  = require("webextension-polyfill");

// Blocked ads counter class
export class CountDatabase extends Database {
  /**
   * Initialize default values
   * @param  {string} domain Current website domain
   * @return {void}
   */
  constructor(domain) {
    super("counter") // Open "counter" database
    this.domain = domain
    this.count  = 0 // Set to 0 on default
  }

  increase(number) {
    browser.storage.local.get(this.domain).then(result => {
      if(Object.keys(result).length !== 0) {
        this.count = result
      }

      console.log(this)
    })
  }
}
