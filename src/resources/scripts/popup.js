const lang_status_on = chrome.i18n.getMessage("status_on")
const lang_status_off = chrome.i18n.getMessage("status_off")
const element_status = document.getElementById("status")
const status = false

element_status.innerHTML = lang_status_off

if(status) {
  element_status.innerHTML = lang_status_on
}

document.getElementById("power_button").addEventListener("click", (e) => {
  e.preventDefault()
  e.target.classList.toggle("power_on")
  document.getElementById("block_information").classList.toggle("visible")
  if(element_status.innerHTML === lang_status_on) {
    element_status.innerHTML = lang_status_off
  } else {
    element_status.innerHTML = lang_status_on
  }
})

