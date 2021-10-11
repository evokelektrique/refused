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

// On Install Handler
function install_listener(details) {

  // Detect if the extension is installed or updated
  console.log(details)
  if(details.reason === "install") {
  } else {
    browser.tabs.create({url: constants.base_url + "/update.html"})
  }
}
browser.runtime.onInstalled.addListener(install_listener)

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
browser.runtime.onMessage.addListener( request => {
  if(request === "toggle_status") {
    new SettingsDatabase().open().then(async db => {
      // Find status from settings database
      const key        = "status"
      const get        = await db.settings.get({ key: key })
      const status     = get.value
      const new_status = !status
      await db.settings.update(get.id, {value: new_status})

      // Toggle blocker
      if(new_status) {
        refused.start()
      } else {
        refused.stop()
      }

      return Promise.resolve({ status: new_status })
    })
  }

  return true
})
