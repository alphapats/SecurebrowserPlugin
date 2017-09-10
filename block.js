
blockflag=false
UAflag=false
imflag=false
scriptflag=false
appflag=false
exeflag=false
myfilters=null
blockflag=false

function save_UAsettings(UAflag){

if (!UAflag) {
    return;
  }


chrome.webRequest.onBeforeSendHeaders.addListener(
        function(details) {
          for (var i = 0; i < details.requestHeaders.length; ++i) {
            if (details.requestHeaders[i].name === 'User-Agent') {
              alert("blocking User-Agent");
              details.requestHeaders.splice(i, 1);
            
              break;
            }
          }
          return {requestHeaders: details.requestHeaders};
        },
        {urls: ["<all_urls>"]},
        ["blocking", "requestHeaders"]);
}


function save_imagesettings(imflag){

if (!imflag) {
    return;
  }
chrome.webRequest.onBeforeRequest.addListener(
  function(details) { alert("blocking images");
  return {cancel: true}; },
  // filters
  {
    urls: ["<all_urls>"],
    types: ["image"]
  },
  // extraInfoSpec
  ["blocking"]);
}

function save_scriptsettings(scriptflag){

if (!scriptflag) {
    return;
  }
chrome.webRequest.onBeforeRequest.addListener(
  function(details) { alert("blocking scripts");
  return {cancel: true}; },
  // filters
  {
    urls: ["http://*/*", "https://*/*"],
    types: ["script"]
  },
  // extraInfoSpec
  ["blocking"]);
}





/*
function addURL(blockflag,blist){
//var filter={urls: blist};
alert((blist));
chrome.webRequest.onBeforeRequest.addListener(
        function(details) { alert("blocking URLs");
        return {cancel: details.url.indexOf(blist) != -1}; },{urls: ["<all_urls>"]},["blocking"]);
}


*/

function addURL(blockflag,blist){
  if (!blockflag) {
    return;
  }

//var filter={urls: blist};
alert((blist));
chrome.webRequest.onBeforeRequest.addListener(
        function(details) { return {cancel: true}; },
        {urls: blist},
        ["blocking"]);
}


function save_httpssettings(httpsflag){
  if (!httpsflag) {
    return;
  }

//var filter={urls: blist};


chrome.webRequest.onBeforeRequest.addListener(
        function(details) { return {cancel: true}; },
        {urls: ["http://*/*"]},
        ["blocking"]);
}


function block_application(appflag) {
 if (!appflag) {
    return;
  } 

  chrome.webRequest.onHeadersReceived.addListener(
  function(details) {
          for (var i = 0; i < details.responseHeaders.length; ++i) {
            if(details.responseHeaders[i].name.toLowerCase() == 'content-type') {
              var headervalue=(details.responseHeaders[i].value.toLowerCase());
              //alert(headervalue);
              var app= headervalue.search("application")
              if(app >-1){
              //if (details.responseHeaders[i].value.toLowerCase() == 'application/octect-stream'){

               alert(details.responseHeaders[i].value);
              //details.responseHeaders.splice(i, 1);
              return {cancel: true};
              break;
            }
          }
          }
          return {requestHeaders: details.requestHeaders};
        },
  // filters
  {
    urls: ["http://*/*", "https://*/*"],
    
  },
  // extraInfoSpec
  ["blocking","responseHeaders"]);

}

function block_executable(exeflag) {
 if (!exeflag) {
    return;
  } 

  chrome.webRequest.onHeadersReceived.addListener(
  function(details) {
          for (var i = 0; i < details.responseHeaders.length; ++i) {
            if(details.responseHeaders[i].name.toLowerCase() == 'content-type') {
              var headervalue=(details.responseHeaders[i].value.toLowerCase());
              //alert(headervalue);
              var app= headervalue.search("application/octet-stream")
              if(app >-1){
              //if (details.responseHeaders[i].value.toLowerCase() == 'application/octect-stream'){

               alert(details.responseHeaders[i].value);
              //details.responseHeaders.splice(i, 1);
              return {cancel: true};
              break;
            }
          }
          }
          return {requestHeaders: details.requestHeaders};
        },
  // filters
  {
    urls: ["http://*/*", "https://*/*"],
    
  },
  // extraInfoSpec
  ["blocking","responseHeaders"]);

}
