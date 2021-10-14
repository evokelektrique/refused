import { SettingsDatabase } from "./databases/settings"
import { SelectorDatabase } from "./databases/selector"
import { FilterDatabase } from "./databases/filter"
import { TabManager } from "./tab_manager"
import { BlockerV1 } from "./blocker_v1"
import { constants } from "./constants"
import { Refused } from "./refused"
import { styles } from "./styles"
import { Helper } from "./helper"

const browser = require("webextension-polyfill");

// Initialize tab manager
const tab_manager = new TabManager();


// Initialize alarms
const alarm_delay   = 1
const alarm_period  = 1
const alarm_options = {
  periodInMinutes: alarm_period
}
browser.alarms.create(constants.alarm_selectors, alarm_options);
browser.alarms.create(constants.alarm_filters, alarm_options);
browser.alarms.onAlarm.addListener(Refused.handle_alarms);


// (async () => {
//   // Initialize default settings
//   await new SettingsDatabase().set_settings()

//   // Update selectors database
//   const db_key = "last_selectors_update"
//   const data   = await new SettingsDatabase().get(db_key)
//   const result = data.result
//   const db     = data.db
//   console.log(data)

//   if(!result) {
//     return
//   }

//   const last_updated_at = result.last_selectors_update
//   const six_hours       = 6 * 60 * 60 * 1000

//   if(!last_updated_at) {
//     return
//   }

//   const six_hours_date = new Date(last_updated_at + six_hours)
//   console.log("Date check is: ", (Date.now() - last_updated_at) < six_hours_date)
//   if((Date.now() - last_updated_at) < six_hours_date) {
//     // Initialize default css selectors
//     const selectors = await new SelectorDatabase().set_selectors()
//     console.log('selectors', selectors)
//     await db.settings.update(result.id, { value: Date.now() })
//   } else {
//     console.log("Now", Date.now(), "last_updated_at", last_updated_at, 'six_hours_date', six_hours_date)
//   }
// })

// Handle install or updates
browser.runtime.onInstalled.addListener(Refused.upgrade_listener)

// Initialize Badge
browser.browserAction.setBadgeBackgroundColor({
  color: styles.badge_color
})

// Initialize a Refused class
// And setting up its handlers
const refused   = new Refused()
refused.blocker = BlockerV1

// Start Blocking Ads On Install
refused.start()

// Open communication port
browser.runtime.onConnect.addListener(port => {
  port.onMessage.addListener(msg => console.log(msg))
})

// Listener
browser.runtime.onMessage.addListener(async message => {
  switch(message.type) {
    case 'get_selectors':
      return await new SelectorDatabase().get_selectors(message.domain)
      break

    case constants.hide_element:
      console.log('hide element')
      break

    case constants.toggle_status:
      console.log('toggle status')
      new SettingsDatabase().open().then(async db => {
        // Find status from settings database
        const key        = "status"
        const get        = await db.settings.get({ key: key })
        const status     = get.value
        const new_status = !status
        await db.settings.update(get.id, { value: new_status })

        // Toggle blocker
        if(new_status) {
          refused.start()
        } else {
          refused.stop()
        }

        return Promise.resolve({ status: new_status })
      })
      break

    default:
      console.log("Unknown message", message)
      break
  }

  return true
})
