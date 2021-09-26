import { Dexie } from 'dexie'

const browser = require("webextension-polyfill");

export class SettingsDatabase {

  columns = "++id, key, value" // Databased indexed columns
  name    = "Settings"         // Database Name
  version = 1                  // Database Version

  // Configuration
  default_settings = {
    test: "test !",
    status: true
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
  async get_settings() {
    const db = await this.open()
    const settings = {}

    console.log(this.default_settings)

    Object.entries(this.default_settings).forEach(async ([key, value]) => {
      const setting = await this.find_or_create(db, key, value)
      if(setting) {
        settings[setting.key] = setting.value
      }
    })

    return settings
  }

  /**
   * Find or create objects based on their key and value
   *
   * @param  {Dexie}  db    Enhanced IndexedDB instance
   * @param  {string} key   Key name
   * @param  {string} value Value to store
   * @return {object}       Object found or created in indexedDB database
   */
  async find_or_create(db, key, value) {
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

}
