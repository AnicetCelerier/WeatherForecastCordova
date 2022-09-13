/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  // Cordova is now initialized. Have fun!

  console.log("Running cordova-" + cordova.platformId + "@" + cordova.version);
  //   document.getElementById("deviceready").classList.add("ready");
  window.addEventListener("batterystatus", onBatteryStatus, false);
  //   window.addEventListener("batterylow", onBatteryStatus, false);
  //   window.addEventListener("batterycritical", onBatteryStatus, false);
}

// window.addEventListener("batterystatus", onBatteryStatus, false);

function onBatteryStatus(status) {
  console.log("Level: " + status.level + " isPlugged: " + status.isPlugged);
}

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
  console.log("navigator.geolocation works well");
  navigator.geolocation.getCurrentPosition(
    geolocationSuccess,
    [geolocationError],
    [geolocationOptions]
  );
}

var onSuccess = function (position) {
  alert(
    "Latitude: " +
      position.coords.latitude +
      "\n" +
      "Longitude: " +
      position.coords.longitude +
      "\n" +
      "Altitude: " +
      position.coords.altitude +
      "\n" +
      "Accuracy: " +
      position.coords.accuracy +
      "\n" +
      "Altitude Accuracy: " +
      position.coords.altitudeAccuracy +
      "\n" +
      "Heading: " +
      position.coords.heading +
      "\n" +
      "Speed: " +
      position.coords.speed +
      "\n" +
      "Timestamp: " +
      position.timestamp +
      "\n"
  );
};

// onError Callback receives a PositionError object
//
function onError(error) {
  alert("code: " + error.code + "\n" + "message: " + error.message + "\n");
}

navigator.geolocation.getCurrentPosition(onSuccess, onError);

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
  console.log(navigator.camera);
}

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
  window.open = cordova.InAppBrowser.open;

  var ref = cordova.InAppBrowser.open(
    "https://joazco.com",
    "_blank",
    "location=yes"
  );
  ref.addEventListener("loadstart", function (event) {
    alert(event.url);
  });
}

// var ref = cordova.InAppBrowser.open('https://joazco.com', '_blank', 'location=yes');
// ref.addEventListener(eventname, callback);

// var inAppBrowserRef;

// function showHelp(url) {

//     var target = "_blank";

//     var options = "location=yes,hidden=yes,beforeload=yes";

//     inAppBrowserRef = cordova.InAppBrowser.open(url, target, options);

//     inAppBrowserRef.addEventListener('loadstart', loadStartCallBack);

//     inAppBrowserRef.addEventListener('loadstop', loadStopCallBack);

//     inAppBrowserRef.addEventListener('loaderror', loadErrorCallBack);

//     inAppBrowserRef.addEventListener('beforeload', beforeloadCallBack);

//     inAppBrowserRef.addEventListener('message', messageCallBack);
// }

// function loadStartCallBack() {

//     $('#status-message').text("loading please wait ...");

// }

// function loadStopCallBack() {

//     if (inAppBrowserRef != undefined) {

//         inAppBrowserRef.insertCSS({ code: "body{font-size: 25px;}" });

//         inAppBrowserRef.executeScript({ code: "\
//             var message = 'this is the message';\
//             var messageObj = {my_message: message};\
//             var stringifiedMessageObj = JSON.stringify(messageObj);\
//             webkit.messageHandlers.cordova_iab.postMessage(stringifiedMessageObj);"
//         });

//         $('#status-message').text("");

//         inAppBrowserRef.show();
//     }

// }

// function loadErrorCallBack(params) {

//     $('#status-message').text("");

//     var scriptErrorMesssage =
//        "alert('Sorry we cannot open that page. Message from the server is : "
//        + params.message + "');"

//     inAppBrowserRef.executeScript({ code: scriptErrorMesssage }, executeScriptCallBack);

//     inAppBrowserRef.close();

//     inAppBrowserRef = undefined;

// }

// function executeScriptCallBack(params) {

//     if (params[0] == null) {

//         $('#status-message').text(
//            "Sorry we couldn't open that page. Message from the server is : '"
//            + params.message + "'");
//     }

// }

// function beforeloadCallBack(params, callback) {

//     if (params.url.startsWith("https://joazco.com")) {

//         // Load this URL in the inAppBrowser.
//         callback(params.url);
//     } else {

//         // The callback is not invoked, so the page will not be loaded.
//         $('#status-message').text("This browser only opens pages on https://joazco.com");
//     }

// }

// function messageCallBack(params){
//     $('#status-message').text("message received: "+params.data.my_message);
// }

// window.addEventListener("orientationchange", function () {
//   console.log(screen.orientation.type); // e.g. portrait
//   window.screen.orientation.lock("landscape");
//   console.log("Orientation is " + screen.orientation.type);
// });


document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
  window.screen.orientation.lock("portrait");
  console.log(StatusBar);
  StatusBar.backgroundColorByName("orange");
}
