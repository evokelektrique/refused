import { Dexie } from 'dexie'

const browser = require("webextension-polyfill");

export class SettingsDatabase {

  columns = "++id, key, value" // Databased indexed columns
  name    = "Settings"         // Database Name
  version = 1                  // Database Version

  // Configuration
  default_settings = {
    // Power on/off switch status
    status: true,
    total_blocks: 0,
    last_filters_update: null
  }

  /**
   * Initialize
   *
   * @return {void}
   */
  constructor() { /*...*/ }

  /**
   * Open database and define its stores and indexed columns
   *
   * @return {Dexie} Dexie database instance
   */
  async open() {
    const db = new Dexie(this.name)
    db.version(this.version).stores({ settings: this.columns })

    return db
  }

  /**
   * Iterate through default settings keys,
   * Then find / create defined keys based on their values
   *
   * @return {object} Settings stored in indexedDB
   */
  async set_settings() {
    const db = await this.open()

    Object.entries(this.default_settings).forEach(async ([key, value]) => {
      console.log(`Setting up "${key}"->(${value})`) // TODO: Remove
      await this.find_or_create(db, key, value)
    })
  }

  /**
   * Find or create objects based on their key and value
   *
   * @param  {Dexie}  db    Enhanced IndexedDB instance
   * @param  {string} key   Key name
   * @param  {string} value Value to store
   * @return {object}       Object found or created in indexedDB database
   */
  async find_or_create(db, key, value = null) {
    const found = await db.settings.get({ key: key })

    if(!found) {
      await db.settings.add({ key: key, value: this.get_default_value(key) })
      return { key: key, value: this.get_default_value(key) }
    }

    return { key: found.key, value: found.value }
  }

  /**
   * Fetch default settings value
   *
   * @param  {string} key Key name
   * @return {string}     Value
   */
  get_default_value(key) {
    return this.default_settings[key]
  }

  /**
   * Increase total blocked ads
   *
   * @param  {Number} count Incremental step number
   * @return {void}
   */
  async increase_total_blocks(count = 1) {
    const db = await this.open()
    const key = "total_blocks"
    const get = await db.settings.get({ key: key })

    await db.settings.update(get.id, { value: get.value + count })
  }

}
