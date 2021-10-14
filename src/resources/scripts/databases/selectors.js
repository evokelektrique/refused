import { Dexie } from 'dexie'
import { constants } from "../constants"
import { Helper } from "../helper"

const browser = require("webextension-polyfill");

/**
 * Database for selectors css path
 * @class
 */
export class SelectorDatabase {

  // Database
  columns = "++id, wildcard, path" // Database indexed columns
  name    = "Selectors"  // Database Name
  version = 1            // Database Version

  /**
   * Initialize
   *
   * @return {void}
   */
  constructor() {}

  /**
   * Open database and define its stores and indexed columns
   *
   * @return {Dexie} Dexie database instance
   */
  async open() {
    const db = new Dexie(this.name)
    db.version(this.version).stores({ selectors: this.columns })

    return db
  }

  async set_selectors() {
    const db   = await this.open()
    const body = await this.get_selectors_txt()
    const selectors = this.parse_selectors(body)

    selectors.forEach(async path => {
      await this.find_or_create(db, path)
    })

    return Promise.resolve(selectors)
  }

  async get_selectors() {
    const selectors = []
    const db = await this.open()
    await db.selectors.each(filter => {
      selectors.push(filter.path)
    })
    return selectors
  }

  /**
   * Find or create filter based on path
   *
   * @param  {Dexie} db Dexie database instance
   * @return {object}   Found or created path filter object
   */
  async find_or_create(db, path) {

    // Determine weither the path is created or updated
    let is_created = true

    const object   = { path: path }
    const get_path = await db.selectors.get({ path: path })

    // If path does not exists, return the current object
    if(!get_path) {
      is_created = false
      await db.selectors.add(object)
      return { path: object, is_created: is_created }
    }

    return { path: get_path, is_created: is_created }
  }

  async get_selectors_txt() {
    const url      = constants.github_raw_base + constants.github_raw_selectors_path
    const response = await fetch(url)
    const body     = await response.text()

    return body
  }

  parse_selectors(body) {
    const lines = Helper.parse_txt(body)

    return lines
  }

}
