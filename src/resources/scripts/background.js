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
const tab_manager = new TabManager()

new SettingsDatabase().set_settings()

// Initialize alarms
const alarm_options = { periodInMinutes: 1 }
browser.alarms.create(constants.alarm_selectors, alarm_options);
browser.alarms.create(constants.alarm_filters, alarm_options);
browser.alarms.onAlarm.addListener(Refused.handle_alarms);

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
  let result

  switch(message.type) {
    case constants.get_selectors:
      return await new SelectorDatabase().get_selectors(message.domain)
      break

    case constants.hide_element:
      break

    case constants.toggle_status:
      // Get status
      result = await Helper.get_extension_status()

      // Update status
      const db = await new SettingsDatabase().open()
      await db.settings.update(result.id, { value: !result.status })

      // Toggle blocker
      if(!result.status) {
        refused.start()
      } else {
        refused.stop()
      }

      return Promise.resolve({ status: !result.status })
      break

    case constants.get_status:
      // Get status
      result = await Helper.get_extension_status()

      return Promise.resolve(result)
      break

    default:
      console.log("Unknown message", message)
      break
  }

  return true
})
