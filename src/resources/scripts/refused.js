import { SettingsDatabase } from "./databases/settings"
import { SelectorDatabase } from "./databases/selector"
import { FilterDatabase } from "./databases/filter"
import { constants } from "./constants"

const browser = require("webextension-polyfill");

export class Refused {

  blocker = null

  constructor() {}

  /**
   * @param  {class} blocker 
   */
  set blocker(blocker) {
    this.blocker = blocker
  }

  /**
   * Starts blocking the ads
   */
  async start() {
    const filters = await new FilterDatabase().set_filters()

    if(!this.blocker) {
      throw new Error("Blocker is not set up")
    }

    if(!filters.length > 0) {
      throw new Error("No filter found")
    }

    // Initiate Blocker class
    // it will start blocking urls by its own handler
    new this.blocker().block_urls(filters)
  }

  /**
   * Stops blocking the ads, by removing its listener
   */
  stop() {
    browser.webRequest.onBeforeRequest.removeListener(new this.blocker().listener)
  }

  /**
   * Handle extension updates or install
   *
   * @param  {object} details Contains reason and previous extension version
   * @return {void}
   */
  static upgrade_listener(details) {
    // On install
    if(details.reason === "install") {
      browser.tabs.create({ url: constants.base_url + "/install.html" })
    }

    // On update
    if(details.reason === "update") {
      browser.tabs.create({ url: constants.base_url + "/update.html" })
    }
  }

  /**
   * Handle browser alarms
   *
   * @param  {object} alarm AlarmInfo
   */
  static async handle_alarms(alarm) {
    const db = await new SettingsDatabase().open()

    switch(alarm.name) {
      case constants.alarm_selectors:
        const selectors_update = await Refused.check_selectors_update(db)

        if(selectors_update.status) {
          await new SelectorDatabase().set_selectors()
          await db.settings.update(selectors_update.next_update.id, {
            value: selectors_update.six_hours_date
          })
        }

        await db.settings.update(selectors_update.last_update.id, {
          value: selectors_update.now
        })
        break

      case constants.alarm_filters:
        const filters_update = await Refused.check_filters_update(db)

        if(filters_update.status) {
          await new FilterDatabase().set_filters()
          await db.settings.update(filters_update.next_update.id, { value: filters_update.six_hours_date })
        }

        await db.settings.update(filters_update.last_update.id, {
          value: filters_update.now
        })
        break

      default:
        console.log("Unknown alarm")
        break
    }
  }

  /**
   * Update filters database
   *
   * @param  {object} db Dexie database instance
   * @return {object}    Update status and information about time
   */
  static async check_filters_update(db) {
    let update_status = false

    const key_1    = "last_filters_update"
    const data_1   = await new SettingsDatabase().get(key_1)
    const result_1 = data_1.result

    const key_2    = "next_filters_update"
    const data_2   = await new SettingsDatabase().get(key_2)
    const result_2 = data_2.result

    const now             = Date.now()
    const last_updated_at = result_1.value
    const six_hours       = 6 * 60 * 60 * 1000
    let six_hours_date

    if(last_updated_at) {
      six_hours_date  = new Date(last_updated_at + six_hours).getTime()
    } else {
      six_hours_date  = new Date(now + six_hours).getTime()
    }
    if(last_updated_at === null || result_2.value < last_updated_at) {
      update_status = true
    }

    return Promise.resolve({
      status: update_status,
      now: now,
      last_update: result_1,
      next_update: result_2,
      six_hours_date: six_hours_date
    })
  }

  /**
   * Update selectors database
   *
   * @param  {object} db Dexie database instance
   * @return {object}    Update status and information about time
   */
  static async check_selectors_update(db) {
    let update_status = false

    const key_1    = "last_selectors_update"
    const data_1   = await new SettingsDatabase().get(key_1)
    const result_1 = data_1.result

    const key_2    = "next_selectors_update"
    const data_2   = await new SettingsDatabase().get(key_2)
    const result_2 = data_2.result

    const now             = Date.now()
    const last_updated_at = result_1.value
    const six_hours       = 6 * 60 * 60 * 1000
    let six_hours_date

    if(last_updated_at) {
      six_hours_date  = new Date(last_updated_at + six_hours).getTime()
    } else {
      six_hours_date  = new Date(now + six_hours).getTime()
    }
    if(last_updated_at === null || result_2.value < last_updated_at) {
      update_status = true
    }

    return Promise.resolve({
      status: update_status,
      now: now,
      last_update: result_1,
      next_update: result_2,
      six_hours_date: six_hours_date
    })
  }

}
