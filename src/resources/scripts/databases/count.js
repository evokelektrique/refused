import { Dexie } from 'dexie'

const browser = require("webextension-polyfill");

/**
 * Database for total blocked ads for given domain counter
 * @class
 */
export class CountDatabase {

  // Database
  columns          = "++id, domain, count" // Databased indexed columns
  name             = "Counter"             // Database Name
  version          = 1                     // Database Version

  // Configuration
  increment_number = 1                     // Count increment number

  /**
   * Initialize default values
   *
   * @param  {object} data Contain configuration
   * @return {void}
   */
  constructor(data) {
    this.count  = data.count ? parseInt(data.count) : 1 // Set to 1 on default
    this.domain = data.domain ? data.domain : false
  }

  /**
   * Open database and define its stores and indexed columns
   *
   * @return {Dexie} Dexie database instance
   */
  async open() {
    const db = new Dexie(this.name)
    db.version(this.version).stores({ domains: this.columns })

    return db
  }

  /**
   * Find or create counter based on domain
   *
   * @param  {Dexie} db Dexie database instance
   * @return {object}   Found or created domain counter object
   */
  async find_or_create(db) {
    // Determine weither the domain is created or updated
    let is_created = true

    const object   = { domain: this.domain, count: this.count }
    const domain   = await db.domains.get({ domain: this.domain })

    // If domain does not exists, return the current object
    if(!domain) {
      is_created = false
      await db.domains.add(object)
      return { domain: object, is_created: is_created }
    }

    return { domain: domain, is_created: is_created }
  }

  /**
   * Increment current domain counter based on the configured `increment_number`
   *
   * @param  {Dexie} db Dexie indexedDB instance
   * @return {object}   Incremented domain counter
   */
  async increment(db) {
    // Fetch the given domain
    const { domain } = await this.find_or_create(db)

    // Increment its counter
    domain.count += this.increment_number

    // Do the update here
    const update = await db.domains.update(domain.id, { count: domain.count })

    return { domain: domain, update_status: update }
  }

  /**
   * Increase the given domain counter
   *
   * @return {object} incremented domain with its update status
   */
  async increase() {
    const db        = await this.open()
    const increment = await this.increment(db)

    return increment
  }

  /**
   * Get domain counter
   *
   * @param  {string} domain Web page domain name
   * @return {object}        Domain and its properties from database
   */
  async get_domain(domain) {
    const db    = await this.open()
    const value = db.domains.get({ domain: domain })

    return value
  }

}
