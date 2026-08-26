// Minimal SCORM 1.2 API wrapper
var API = null;
var findAttempts = 0;

function findAPI(win) {
  while (win.API == null && win.parent != null && win.parent != win) {
    findAttempts++;
    if (findAttempts > 20) return null;
    win = win.parent;
  }
  return win.API;
}

function getAPI() {
  var theAPI = findAPI(window);
  if (theAPI == null && window.opener != null) {
    theAPI = findAPI(window.opener);
  }
  return theAPI;
}

function scormInitialize() {
  API = getAPI();
  if (API != null) {
    var result = API.LMSInitialize("");
    return result;
  }
  return "false";
}

function scormSetValue(element, value) {
  if (API != null) {
    API.LMSSetValue(element, value);
  }
}

function scormGetValue(element) {
  if (API != null) {
    return API.LMSGetValue(element);
  }
  return "";
}

function scormCommit() {
  if (API != null) {
    API.LMSCommit("");
  }
}

function scormFinish() {
  if (API != null) {
    API.LMSCommit("");
    API.LMSFinish("");
  }
}
