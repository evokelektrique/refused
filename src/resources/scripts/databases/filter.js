import { Dexie } from 'dexie'
import { constants } from "../constants"

const browser = require("webextension-polyfill");

/**
 * Database for wildcard filters
 * @class
 */
export class FilterDatabase {

  // Database
  columns = "++id, wildcard" // Database indexed columns
  name    = "Filters"        // Database Name
  version = 1                // Database Version

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
    db.version(this.version).stores({ filters: this.columns })

    return db
  }

  async set_filters() {
    const db   = await this.open()
    const body = await this.get_filters_txt()
    const filters = this.parse_filters(body)

    filters.forEach(async wildcard => {
      await this.find_or_create(db, wildcard)
    })

    return Promise.resolve(filters)
  }

  async get_filters() {
    const filters = []
    const db = await this.open()
    await db.filters.each(filter => {
      filters.push(filter.wildcard)
    })
    return filters
  }

  /**
   * Find or create filter based on wildcard
   *
   * @param  {Dexie} db Dexie database instance
   * @return {object}   Found or created wildcard filter object
   */
  async find_or_create(db, wildcard) {

    // Determine weither the wildcard is created or updated
    let is_created = true

    const object       = { wildcard: wildcard }
    const get_wildcard = await db.filters.get({ wildcard: wildcard })

    // If wildcard does not exists, return the current object
    if(!get_wildcard) {
      is_created = false
      await db.filters.add(object)
      return { wildcard: object, is_created: is_created }
    }

    return { wildcard: get_wildcard, is_created: is_created }
  }

  async get_filters_txt() {
    const url      = constants.github_raw_base + constants.github_raw_filters_path
    const response = await fetch(url)
    const body     = await response.text()

    return body
  }

  parse_filters(filters_body) {
    const filters = []
    const splited = filters_body.split("\r\n").map(line => line.split("\n"))

    if(splited[0]) {
      const lines = splited[0]
      lines.forEach(line => {
        if(line !== "" && !line.startsWith("!")) {
          filters.push(line)
        }
      })
    }

    return filters
  }

}
