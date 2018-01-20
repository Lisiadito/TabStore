function getAllUrls(sessionName) {
  chrome.tabs.query({currentWindow: true}, tabs => {    
    let tabUrls = []
    tabs.forEach(tab => tabUrls.push(tab.url)) 
    saveSession(sessionName, tabUrls)
 })
}

function saveSession(sessionName, tabs) {
  chrome.storage.sync.set({[sessionName]:tabs})
}

document.addEventListener('DOMContentLoaded', () => {
  const saveButton = document.getElementById('savebtn')
  saveButton.addEventListener('click', () => {
    const sessionName = document.getElementById('sessionname').value
    sessionName ? getAllUrls(sessionName) : null
  })
})