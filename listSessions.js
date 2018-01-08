async function openSessionList() {
  //asynchron muss mit callback oder promise arbeiten
  let sessions = await getSavedSessions()
  //somehow print the sessions as clickable itmes
  $("#SessionList").append("<ul></ul>")
  for(var i in sessions) {
    var li = "<li>";
    $("ul").append(li.concat(sessions[i]))
  }
}


function getSavedSessions() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get((sessions) => {
      if(!chrome.runtime.lastError) {
        resolve(sessions)
      } else {
        reject(chrome.runtime.lastError)
      }
    })
  })
}

function removeSavedSession(sessionName) {

}

document.addEventListener('DOMContentLoaded', () => {
  let test = document.getElementById('test')

  test.addEventListener('click', () => {
    openSessionList()
  })
})