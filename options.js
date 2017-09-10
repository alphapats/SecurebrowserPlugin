// Saves options to chrome.storage.sync.
var blockedlist;
function save_options() {
  
  var UAbox = document.getElementById('UAbox').checked;
  var imagebox = document.getElementById('imagebox').checked;
  var scriptbox = document.getElementById('scriptbox').checked;
  var blockURLbox = document.getElementById('blockURLbox').checked;
  var httpsbox = document.getElementById('httpsbox').checked;
   var appbox = document.getElementById('appbox').checked;
    var exebox = document.getElementById('exebox').checked;
  var newblockedURL=document.getElementById('newURL').value;
   var removeblockedURL=document.getElementById('removeURL').value;


chrome.storage.sync.get({list:[]}, function(items) {
  blockedlist=items.list;
   if(newblockedURL)
  {
    blockedlist.push(newblockedURL);  
    
  }

    if(removeblockedURL)
  {
    /*
    var index = blockedlist.indexOf(removeblockedURL);
    if (index >= 0) {
    blockedlist.splice( index, 1 );
      }
    */
    blockedlist = blockedlist.filter(val => val !== removeblockedURL);

  }
       
     
  chrome.storage.sync.set({
    "list":blockedlist
}, function() {
    console.log("added to list");
});
  chrome.extension.getBackgroundPage().addURL(blockURLbox,blockedlist); 
 });

  chrome.storage.sync.set({
    "UAbox": UAbox,
    "imagebox": imagebox,
    "scriptbox": scriptbox,
    "httpsbox":httpsbox,
    "blockURLbox":  blockURLbox ,
    "appbox":appbox,
    "exebox":exebox,
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
  
  var bgPage = chrome.extension.getBackgroundPage();
  // make the changes, persist them to localStorage
  bgPage.save_UAsettings(UAbox);
   bgPage.save_imagesettings(imagebox);
   bgPage.save_scriptsettings(scriptbox);
   bgPage.save_httpssettings(httpsbox);
   bgPage.block_application(appbox);
   bgPage.block_executable(exebox);

   //bgPage.blocksettings(blockURLbox);
  
  
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    UAbox: false,
    imagebox: false,
    scriptbox: false,
    blockURLbox: false,
    httpsbox: false,
    appbox:false,
    exebox:false,
    list: [],
  }, function(items) {
    document.getElementById('UAbox').checked = items.UAbox;
   document.getElementById('imagebox').checked = items.imagebox;
   document.getElementById('scriptbox').checked = items.scriptbox;
    document.getElementById('blockURLbox').checked= items.blockURLbox;
    document.getElementById('httpsbox').checked= items.httpsbox;
    document.getElementById('appbox').checked= items.appbox;
    document.getElementById('exebox').checked= items.exebox;
    document.getElementById("listofURL").innerText = "URL list :"+JSON.stringify(list);

  });
}



function init()

{

restore_options();
document.getElementById('save').addEventListener('click',
    save_options);



}

document.addEventListener('DOMContentLoaded', init);


document.body.onload = function() {
  chrome.storage.sync.get("UAbox", function(items) {
    if (!chrome.runtime.error) {
       document.getElementById("UAstatus").innerText = "User Agent setting :"+items.UAbox;
    }
  });
   chrome.storage.sync.get("imagebox", function(items) {
    if (!chrome.runtime.error) {
       document.getElementById("imagestatus").innerText = "Image box setting :"+items.imagebox;
    }
  });

    chrome.storage.sync.get("scriptbox", function(items) {
    if (!chrome.runtime.error) {
       document.getElementById("scriptstatus").innerText = "script box setting :"+items.scriptbox;
    }
  });

    chrome.storage.sync.get("blockURLbox", function(items) {
    if (!chrome.runtime.error) {
       document.getElementById("blockURLstatus").innerText = "Blocking enabled setting :"+items.blockURLbox;
    }
  });
     chrome.storage.sync.get("list", function(items) {
    if (!chrome.runtime.error) {
       document.getElementById("listofURL").innerText = "URL list :"+JSON.stringify(items.list);
    }
  });

chrome.storage.sync.get("httpsbox", function(items) {
    if (!chrome.runtime.error) {
       document.getElementById("httpsstatus").innerText = "Blocking non https connection setting :"+items.httpsbox;
    }
  });

chrome.storage.sync.get("appbox", function(items) {
    if (!chrome.runtime.error) {
       document.getElementById("appstatus").innerText = "Blocking all application downloads setting :"+items.appbox;
    }
  });

chrome.storage.sync.get("exebox", function(items) {
    if (!chrome.runtime.error) {
       document.getElementById("exestatus").innerText = "Blocking onle executables :"+items.exebox;
    }
  });



}
