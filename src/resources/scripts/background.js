import { SettingsDatabase } from "./databases/settings"
import { FilterDatabase } from "./databases/filter"
import { TabManager } from "./tab_manager"
import { BlockerV1 } from "./blocker_v1"
import { constants } from "./constants"
import { Refused } from "./refused"
import { styles } from "./styles"
import { Helper } from "./helper"

const browser  = require("webextension-polyfill")

// Initialize tab manager
const tab_manager = new TabManager()

// Initialize default settings
new SettingsDatabase().set_settings()

// Handle install or updates
browser.runtime.onInstalled.addListener(Refused.upgrade_listener)

// Initialize Badge
browser.browserAction.setBadgeBackgroundColor({
  color: styles.badge_color
});

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
browser.runtime.onMessage.addListener(message => {
  switch(message.type) {
    case constants.hide_element:
      break

    case constants.toggle_status:
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
