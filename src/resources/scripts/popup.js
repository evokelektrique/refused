const browser = require("webextension-polyfill");

// Initialize Configuration & Display
(async () => {
  const current_tab = await browser.tabs.query({currentWindow: true, active: true}).then(tab => tab[0])
  // Set up current tab url
  document.getElementById("current_tab_url").innerHTML = new URL(current_tab.url).host

  const lang_status_on = browser.i18n.getMessage("status_on")
  const lang_status_off = browser.i18n.getMessage("status_off")
  const element_status = document.getElementById("status")

  // Get power status and add class to it's element
  browser.storage.local.get("status").then(data => {
    // console.log(data)
    const status = data.status
    const power_element = document.getElementById("power_button")
    if(status) {
      power_element.classList.add("power_on")
      document.getElementById("block_information").classList.add("visible")
    } else {
      power_element.classList.add("power_off")
      document.getElementById("block_information").classList.remove("visible")
    }

    element_status.innerHTML = lang_status_off

    if(status) {
      element_status.innerHTML = lang_status_on
    }
  })

  // Power Button Listener
  document.getElementById("power_button").addEventListener("click", async e => {
    e.preventDefault()
    e.target.classList.toggle("power_on")
    document.getElementById("block_information").classList.toggle("visible")
    if(element_status.innerHTML === lang_status_on) {
      element_status.innerHTML = lang_status_off
    } else {
      element_status.innerHTML = lang_status_on
    }
    
    const sender = await browser.runtime.sendMessage("toggle_status")
    // console.log(sender)
  })


  browser.storage.local.get("total_blocks").then(data => {
    document.getElementById("total_blocks").innerHTML = data.total_blocks
  })
})()

