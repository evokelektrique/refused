import { SettingsDatabase } from "./databases/settings"
import { SelectorDatabase } from "./databases/selector"
import { constants } from "./constants"
import { Helper } from "./helper"

export async function MessageListener(refused, message) {
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
}
