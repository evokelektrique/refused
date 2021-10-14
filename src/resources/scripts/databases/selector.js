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

    selectors.forEach(async selector => {
      await this.find_or_create(db, selector)
    })

    return Promise.resolve(selectors)
  }

  async get_selectors(domain) {
    const db = await this.open()
    const selectors = await db.selectors.filter(selector => {
      if(selector.wildcard.indexOf(domain) !== -1) {
        return selector
      }
    }).toArray()

    return Promise.resolve(selectors)
  }

  /**
   * Find or create filter based on selector
   *
   * @param  {Dexie} db Dexie database instance
   * @return {object}   Found or created selector filter object
   */
  async find_or_create(db, selector) {

    // Determine weither the selector is created or updated
    let is_created = true

    const object   = { path: selector.path, wildcard: selector.wildcard }
    const get_selector = await db.selectors.get({ path: selector.path, wildcard: selector.wildcard })

    // If selector does not exists, return the current object
    if(!get_selector) {
      is_created = false
      await db.selectors.add(object)
      return { selector: object, is_created: is_created }
    }

    return { selector: get_selector, is_created: is_created }
  }

  async get_selectors_txt() {
    const url      = constants.github_raw_base + constants.github_raw_selectors_path
    const response = await fetch(url)
    const body     = await response.text()

    return body
  }

  parse_selectors(body) {
    const temp_lines = Helper.parse_txt(body)
    const lines = []
    const split_tag = " @ "

    temp_lines.forEach(line => {
      const splitted = line.split(split_tag)
      lines.push({
        path: splitted[0],
        wildcard: splitted[1]
      })
    })

    return lines
  }


}
