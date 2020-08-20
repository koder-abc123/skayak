import Ipfs from "ipfs";
import Orbit from "orbit_";
import { SkynetClient } from "skynet-js";
//import OpusMediaRecorder from 'opus-media-recorder';
// Use worker-loader
//import EncoderWorker from 'worker-loader!opus-media-recorder/encoderWorker.js';
// You should use file-loader in webpack.config.js.
// See webpack example link in the above section for more detail.
// import OggOpusWasm from 'opus-media-recorder/OggOpusEncoder.wasm';
// import WebMOpusWasm from 'opus-media-recorder/WebMOpusEncoder.wasm';
//import AudioRecorder from 'https://cdn.jsdelivr.net/npm/audio-recorder-polyfill/index.js'
import AudioRecorder from "audio-recorder-polyfill";
import AudioFeeder from "audio-feeder";
import repoNodejs from "ipfs/src/core/runtime/repo-nodejs";
import { getDataByLanguage } from "i18next";

window.MediaRecorder = AudioRecorder;

//window.LOG = 'debug'

let connectButton = document.getElementById("connect");
let messageField = document.getElementById("message");
let sendButton = document.getElementById("send");
let sendGreetingButton = document.getElementById("send2");
const channelNameElement = document.getElementById("channel");
const messagesElement = document.getElementById("messages");
const usernameElement = document.getElementById("username");
const userField = document.getElementById("user");
const peersElm = document.getElementById("peersCount");
let playDataElm = document.getElementById("play");
let stopDataElm = document.getElementById("stop");
let recordButton = document.getElementById("record");
let stopButton = document.getElementById("stopRecord");
let audioElement = document.getElementById("player");
let playWavElm = document.getElementById("playwav");
let playWavStopElm = document.getElementById("playwavstop");
let joinChannelElm = document.getElementById("joinchannel");
let full_string = "";
let interv = 0;
let isStopRecording = false;
let streamer;
let feeder = new AudioFeeder();
let myName = "";
let latest = 0;
let sync_timestamp = 0;
let current_link = "";
let next_link = "";
let first_chunk_message = true;
let channel_message_counter = 0;
let orbity;
let redeemingData = false;
let first_run = 1;

let latestChannel = "";
let latestChannelObject;

let castChannelObject;
let castChannelName = "";
let listenChannel;
let listenChannelName = "";
let CastingChannelTable = {};

//window.MediaRecorder = OpusMediaRecorder;

const visibleMessages = 20;

// Non-standard options
// const workerOptions = {
//     encoderWorkerFactory: _ => new EncoderWorker(),
//     OggOpusEncoderWasmPath: OggOpusWasm,
//     WebMOpusEncoderWasmPath: WebMOpusWasm
//   };

let recorder;
const username = "Anonymous" + new Date().getTime().toString().slice(-4);

//const channelName = 'orbit-browser-example'
let channelName = "";

const ipfsOptions = {
  EXPERIMENTAL: {
    pubsub: true,
    sharding: false,
    dht: false,
  },
  preload: { enabled: false },
  config: {
    Addresses: {
      //   Swarm: ['/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star']
      Swarm: [
        "/dns4/glacial-bastion-28924.herokuapp.com/tcp/443/wss/p2p-webrtc-star",
      ],
    },
  },
};

const client = new SkynetClient("https://siasky.net");
const onUploadProgress = (progress, { loaded, total }) => {
  console.info(`Progress ${Math.round(progress * 100)}%`);
};

const orbitOptions = {
  dbOptions: { maxHistory: visibleMessages },
};

let messages = [];

function startIpfs(username) {
  userField.value = username;
  usernameElement.innerHTML = username;
  myName = username;

  // Change the repo path so it includes our username
  // This makes each chat per username an independent instance
  ipfsOptions.repo = `/orbit/browser-example/${username}`;
  const ipfs = new Ipfs(ipfsOptions);
  ipfs.on("ready", () => initOrbit(ipfs, username));
}

function sleepp(ms) {
  console.log("sleeping ", ms / 1000);
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function initOrbit(ipfs, username) {
  // Change the db directory path so it includes our username
  // This makes each chat per username an independent instance
  orbitOptions.dbOptions.directory = `/orbit/browser-example/${username}`;
  const orbit = new Orbit(ipfs, orbitOptions);
  orbity = orbit;
  orbit.events.on("connected", () => orbit.join(channelName));
  orbit.events.on("joined", onJoinedChannel);

  orbit.events.on(
    "replicate.progress",
    (address, hash, entry, progress, total) => {
      console.log("replicating", address, hash, entry, progress, total);
    }
  );

  orbit.events.on("write", (address, entry, heads) => {
    console.log("writing", address, entry, heads);
  });

  orbit.events.on("closed", (dbname) => {
    console.log("closing");
  });

  orbit.connect(username);

  connectButton = replaceElement(connectButton);
  connectButton.addEventListener("click", async () => {
    // Reconnect
    await orbit.disconnect();
    await ipfs.stop();
    startIpfs(userField.value);
  });

  orbit.events.on("entry", (entry, channelName) => {
    const post = entry.payload.value;
    //    console.log(`[${post.meta.ts}] < ${post.meta.from.name}> ${post.content}`)
  });
}

function getWavData(tt) {
  redeemingData = true;

  return fetch(tt.next)
    .then((response) => response.text())
    .then((text) => {
      let json = JSON.parse(text);
      fetch(json.link)
        .then((response) => {
          //console.log(response);
          return response.arrayBuffer();
        })
        .then((arrayBuffer) => {
          feeder._backend._context.decodeAudioData(arrayBuffer, function (
            decodedData
          ) {
            a_buffer = [decodedData.getChannelData(0)];
            feeder.bufferData(a_buffer);
            if (json.next !== "none") {
              getWavData(json);
            } else {
              redeemingData = false;
            }
          });

          console.log(arrayBuffer);
        });
    });
}

function getWavFile(tt) {
  // return fetch(tt.next).then(response => response.text())
  //       .then(text => {
  //             let json = JSON.parse(text);

  //       })
  let a_buffer;
  return fetch(tt.link)
    .then((response) => {
      //console.log(response);
      return response.arrayBuffer();
    })
    .then((arrayBuffer) => {
      feeder._backend._context.decodeAudioData(arrayBuffer, function (
        decodedData
      ) {
        a_buffer = [decodedData.getChannelData(0)];
        feeder.bufferData(a_buffer);
      });

      console.log(arrayBuffer);
    });
}

function onJoinedChannel(channelName, channel) {
  messages = [];

  if (channelName.substring(0, 11) === "skayak-user") {
    castChannelObject = channel;
    console.log("user channel joined", channelName);
  } else {
    latestChannelObject = channel;
  }

  // Replace HTML elements so their eventListeners are cleared
  messageField = replaceElement(messageField);
  sendButton = replaceElement(sendButton);
  sendGreetingButton = replaceElement(sendGreetingButton);
  playWavElm = replaceElement(playWavElm);
  recordButton = replaceElement(recordButton);

  channelNameElement.innerHTML = "#" + channelName;

  channel.on("ready", async () => {
    //channel.sendMessage(`/me has joined ${channelName}`)
    //console.log("joined channel!!")
    channel.peers.then(renderPeers);
  });

  channel.on("entry", (entry) => {
    messages = [...messages, entry.payload.value].sort(
      (a, b) => a.meta.ts - b.meta.ts
    );
    renderMessages(messages);
    channel.peers.then(renderPeers);
    // console.log("Entry:", entry.payload.value.content);
    // console.log("Entry:", entry.payload.value);

    console.log("channel entry", channel_message_counter++);

    

    try {
      let tt = JSON.parse(entry.payload.value.content);

      if (
        tt.link === "none" &&
        tt.newChannelName !== "" &&
        entry.payload.value.meta.from.name !== myName
      ) {
        CastingChannelTable[tt.newChannelName] = tt.ChannelStatus;

        let x = document
          .getElementById("channelList")
          .querySelectorAll("#" + tt.newChannelTitle);
        if (tt.ChannelStatus && x.length == 0) {
          var element = document.createElement("button");
          element.setAttribute("id", tt.newChannelTitle);
          element.appendChild(document.createTextNode(tt.newChannelTitle));
          element.addEventListener("click", async function () {
            playWav();
            let latestTimestring = await fetch(
              "https://time.akamai.com"
            ).then((response) => response.text());
            let latestTimestamp = parseInt(latestTimestring / 50);
            //latestChannel = "skayak-general-" + latestTimestamp.toString();
            listenChannelName =
              "skayak-user-" +
              tt.newChannelTitle +
              "-" +
              latestTimestamp.toString();
          });
          let channelList = document.getElementById("channelList");
          channelList.appendChild(element);
        } else if (!tt.ChannelStatus) {
          // let x = document.getElementById("channelList").querySelectorAll("#" + tt.newChannelTitle);
          // for (i = 0; i < x.length; i++) {
          //   x[i].remove()
          // }
          document.getElementById(tt.newChannelTitle).remove();
          if (listenChannelName != "") {
            playWavStopElm.click();
            orbity.leave(listenChannelName);
            fetch("https://time.akamai.com")
              .then((response) => response.text())
              .then((latestTimestring) => {
                let latestTimestamp = parseInt(latestTimestring / 50);
                latestChannel = "skayak-general-" + latestTimestamp.toString();
                orbity.join(latestChannel);
                listenChannelName = "";
              });

            //latestChannel = "skayak-general-" + latestTimestamp.toString();
          }
        }
      }

      //if(entry.payload.value.meta.from.name !== myName  && latest > entry.payload.value.meta.ts)
      if (
        entry.payload.value.meta.from.name !== myName &&
        tt.ts > latest &&
        tt.link !== "none"
      ) {
        latest = tt.ts;
        console.log("TT link ", entry.payload.value.meta.from.name, tt.ts);
        getWavFile(tt);
      }
    } catch (e) {
      console.log(e);
    }
  });

  //sendGreetingButton.addEventListener('click', () => sendGreeting(channel))
  sendButton.addEventListener("click", () => sendMessage());
  //playDataElm.addEventListener('click', () => sendData(channel))
  //stopDataElm.addEventListener('click', () => stopData(channel))

  joinChannelElm.addEventListener("click", () => {
    // /channel.join();
    orbity.join(latestChannel);
  });

  messageField.addEventListener("keyup", (event) => {
    if (event.keyCode === 13) sendMessage();
  });

  playWavElm.addEventListener("click", async () => playWav());
  recordButton.addEventListener("click", () => startStream());

  channel.load(10);
  first_run = 0;
}

function sendMessage() {
  latestChannelObject.sendMessage(messageField.value);
  messageField.value = null;
}

function sendGreeting(channel) {
  const creatures = ["👻", "🐙", "🐷", "🐬", "🐞", "🐈", "🙉", "🐸", "🐓"];
  //channel.sendMessage('Greetings! ' + creatures[Math.floor(Math.random() * creatures.length)])
  //console.log("joined channel!!");
}

function blobToFile(theBlob, fileName) {
  //A Blob() is almost a File() - it's just missing the two properties below which we will add
  theBlob.lastModifiedDate = new Date();
  theBlob.name = fileName;
  return theBlob;
}

async function uploadExample(file) {
  try {
    const { skylink } = await client.upload(file, { onUploadProgress });
    return skylink;
  } catch (error) {
    console.log(error);
  }
}

function sendData(channel) {
  interv = setInterval(async function () {
    let r = Math.random().toString(36).substring(7);
    //console.log("random", r);

    //   let myBlobParts = ['<html><h2>'+ r +'</h2></html>'];
    let myBlobParts = [r];

    let myBlob = new Blob(myBlobParts, { type: "text/html" });

    let myFile = blobToFile(myBlob, "my-text.html");
    // uploadExample(myFile).then((res) => {
    //     console.log("file uploaded",res);
    // }).catch((e) => {
    //     console.log("file upload error",e);
    // })

    let skylink;
    try {
      skylink = await uploadExample(myFile);
      let full_link = "https://siasky.net/" + skylink;
      // console.log(full_link);
      let yy = {
        link: full_link,
      };
      //channel.sendMessage(JSON.stringify(yy));
      console.log("joined channel!!");
    } catch (e) {
      console.log("error skylkiknking");
    }
  }, 10000);
}

function stopData(channel) {
  console.log("stopping data");
  clearInterval(interv);
}

function renderMessages(messages) {
  messagesElement.innerHTML = messages
    .slice(-visibleMessages)
    .map(
      (msg) =>
        `${formatTimestamp(msg.meta.ts)} &lt;${msg.meta.from.name}&gt; ${
          msg.content
        }<br/>`
    )
    .join("\n");

  //messagesElement.innerHTML = messy
  //console.log(messy);
}

function renderPeers(peers) {
  peersElm.innerHTML = "Peers: " + (peers ? peers.length : 0);
}

function replaceElement(oldElement) {
  const newElement = oldElement.cloneNode(true);
  oldElement.parentNode.replaceChild(newElement, oldElement);
  return newElement;
}

function formatTimestamp(timestamp) {
  const safeTime = (time) => ("0" + time).slice(-2);
  const date = new Date(timestamp);
  return (
    safeTime(date.getHours()) +
    ":" +
    safeTime(date.getMinutes()) +
    ":" +
    safeTime(date.getSeconds())
  );
}

//navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {streamer = stream});

function startRecording(channel) {
  //console.log("recordgin");

  //    if(isStopRecording) return;
  navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
    isStopRecording = false;

    let options = { mimeType: "audio/ogg" };
    // Start recording
    recorder = new MediaRecorder(stream);
    recorder.start();
    console.log("record start");
    // Set record to <audio> when recording will be finished
    recorder.addEventListener("dataavailable", async (e) => {
      audioElement.src = URL.createObjectURL(e.data);
      // let myBlob = new Blob([e.data], {type : 'audio/wav'});
      let myFile = blobToFile(e.data, "1.wav");

      let skylink;
      try {
        skylink = await uploadExample(myFile);
        let full_link = "https://siasky.net/" + skylink;
        let yy = {};
        console.log(full_link);

        sync_timestamp = await fetch(
          "https://time.akamai.com"
        ).then((response) => response.text());

        // let pointerJson = {
        //   "next":
        // };

        yy = {
          link: full_link,
          ts: parseInt(sync_timestamp),
        };

        castChannelObject.sendMessage(JSON.stringify(yy));
        //console.log("joined channel!!");
      } catch (e) {
        console.log("error skylkiknking");
      }

      //  console.log("got start",e.data);
    });
  });

  //   recorder.ondataavailable = function(e) {
  //     //log('mediaRecorder.ondataavailable, e.data.size='+e.data.size);
  //     //chunks.push(e.data);
  //     audioElement.src = URL.createObjectURL(e.data);
  //     console.log("got start");
  //   };
}

// Stop recording
stopButton.addEventListener("click", async () => {
  recorder.stop();
  console.log("record stop");
  isStopRecording = true;
  
    castChannelObject.sendMessage(
      JSON.stringify({
        link: "none",
        newChannelName: castChannelName,
        newChannelTitle: username,
        ChannelStatus: false,
      })
    );

  let latestTimestring = await fetch(
    "https://time.akamai.com"
  ).then((response) => response.text());
  let latestTimestamp = parseInt(latestTimestring / 100);
  latestChannel = "skayak-general-" + latestTimestamp.toString();
  orbity.leave(castChannelName);
  orbity.join(latestChannel);
  console.log("joining back", latestChannel);
  latestChannelObject.sendMessage(
    JSON.stringify({
      link: "none",
      newChannelName: castChannelName,
      newChannelTitle: username,
      ChannelStatus: false,
    })
  );

  castChannelName = "";
  // Remove “recording” icon from browser tab
  recorder.stream.getTracks().forEach((i) => i.stop());
});

// Recording should be started in user-initiated event like buttons

//let channelName = latestChannel

async function startup() {
  let latestTimestring = await fetch(
    "https://time.akamai.com"
  ).then((response) => response.text());
  let latestTimestamp = parseInt(parseInt(latestTimestring) / 100);
  latestChannel = "skayak-general-" + latestTimestamp.toString();
  console.log(latestChannel);

  channelName = latestChannel;
  startIpfs(username);
  latestTimestring = await fetch("https://time.akamai.com").then((response) =>
    response.text()
  );
  latestTimestamp = parseInt(parseInt(latestTimestring) / 100);
  let sleepTime = (100 - (parseInt(latestTimestring) % 100)) * 1000;

  while (1) {
    await sleepp(sleepTime);

    if (listenChannelName != "") {
      orbity.leave(listenChannelName);
    } else if (castChannelName != "") {
      orbity.leave(castChannelName);
    } else {
      orbity.leave(latestChannel);
    }

    console.log("leaving", latestChannel);
    latestTimestring = await fetch("https://time.akamai.com").then((response) =>
      response.text()
    );
    latestTimestamp = parseInt(latestTimestring / 100);

    if (listenChannelName != "") {
      let latestListenTimestamp = parseInt(latestTimestring / 50);
      listenChannelName =
        "skayak-user-" +
        listenChannelName.substring(12, 25) +
        "-" +
        latestListenTimestamp.toString();
      latestChannel = "skayak-general-" + latestTimestamp.toString();
      console.log("joining", listenChannelName);
      sleepTime = (50 - (parseInt(latestListenTimestamp) % 50)) * 1000;
      orbity.join(listenChannelName);

      //sleepTime = 50000;
    } else if (castChannelName != "") {
      let latestCastTimestamp = parseInt(latestTimestring / 50);
      castChannelName =
        "skayak-user-" +
        castChannelName.substring(12, 25) +
        "-" +
        latestCastTimestamp.toString();
      latestChannel = "skayak-general-" + latestTimestamp.toString();
      console.log("joining", castChannelName);
      sleepTime = (50 - (parseInt(latestCastTimestamp) % 50)) * 1000;
      orbity.join(castChannelName);
      //sleepTime = 50000;
    } else {
      latestChannel = "skayak-general-" + latestTimestamp.toString();
      console.log("joining", latestChannel);
      orbity.join(latestChannel);
      sleepTime = 100000;
    }
  }
}

// async function notifyChannel() {
//   while (1) {
//     await sleepp(10000);

//     if (castChannelName != "") {
//       latestChannelObject.sendMessage(
//         JSON.stringify({
//           link: "none",
//           newChannelName: latestChannel,
//           newChannelTitle: username,
//           ChannelStatus: true,
//         })
//       );
//     } else {
//       latestChannelObject.sendMessage(
//         JSON.stringify({
//           link: "none",
//           newChannelName: latestChannel,
//           newChannelTitle: username,
//           ChannelStatus: false,
//         })
//       );
//     }

//     console.log("notifications");
//   }
// }

startup();
//notifyChannel();

// // Set up 2-channel stereo, 48 kHz sampling rate

function bufferSineWave(time) {
  var freq = 261, // middle C
    shellFreq = 0.5, // fade in/out over 2 seconds
    rate = 48000,
    chunkSamples = Math.round(time * rate), // buffer 1s at a time
    samples = Math.ceil(chunkSamples / freq) * freq,
    buffer = new Float32Array(samples),
    packet = [buffer];

  // for (var i = 0; i < samples; i++) {
  //   // buffer[i] = Math.sin((sampleCounter / rate) * freq * 2 * Math.PI)
  //   //   * Math.sin((sampleCounter / rate) * shellFreq * 2 * Math.PI);
  //   buffer[i] = 0;
  //   //sampleCounter++;
  // }

  feeder.bufferData(packet);
}

let daty;
function playWav() {
  console.log("playwav start");
  // Remove “recording” icon from browser tab

  // feeder.bufferData([
  //   new Float32Array(12000)
  // ]);

  feeder.init(1, 44100);
  // bufferSineWave(1)
  // fetch('./1.wav').then(response => {
  //   console.log(response);
  //   return response.arrayBuffer();
  // }).then(arrayBuffer => {

  //   feeder._backend._context.decodeAudioData(arrayBuffer, function(decodedData) {
  //     //source.buffer = decodedData;
  //     //source.connect(audioCtx.destination);
  //     console.log(decodedData.getChannelData(0));

  //     daty = [decodedData.getChannelData(0)];
  //     feeder.bufferData(daty);
  //   });
  //   console.log(arrayBuffer);
  // })

  bufferSineWave(1);
  // Start playback...
  feeder.start();

  // setTimeout(function() {
  //   console.log(" stime ");
  // }, 4000);

  // while(!isStopRecording){
  //   await sleepp(4000);
  //   console.log(" stime ");
  // }

  //recordButton.click();
  //startRecording(channel);
}

async function startStream() {
  isStopRecording = false;

  let latestTimestring = await fetch(
    "https://time.akamai.com"
  ).then((response) => response.text());
  let latestTimestamp = parseInt(latestTimestring / 100);
  //latestChannel = "skayak-general-" + latestTimestamp.toString();

  castChannelName =
    "skayak-user-" + username + "-" + latestTimestamp.toString();
  orbity.join(castChannelName);

  latestChannelObject.sendMessage(
    JSON.stringify({
      link: "none",
      newChannelName: castChannelName,
      newChannelTitle: username,
      ChannelStatus: true,
    })
  );

  while (!isStopRecording) {
    if (recorder) {
      recorder.stop();
      recorder.stream.getTracks().forEach((i) => i.stop());
    }
    console.log("start record time ");
    startRecording(castChannelObject);
    await sleepp(10000);
  }
}

let sampleCounter = 0;

feeder.onstarved = function () {
  console.log("starving");
  bufferSineWave(1);
};

feeder.onbufferlow = function () {
  console.log("buffer low");
  // while (feeder.durationBuffered < feeder.bufferThreshold) {
  //   feeder.bufferData([
  //     new Float32Array(12000)
  //   ]);
  // }
  bufferSineWave(2);

  // fetch('./1.wav').then(response => {
  //   console.log(response);
  //   return response.arrayBuffer();
  // }).then(arrayBuffer => {

  //   feeder._backend._context.decodeAudioData(arrayBuffer, function(decodedData) {
  //     //source.buffer = decodedData;
  //     //source.connect(audioCtx.destination);
  //     console.log(decodedData.getChannelData(0));

  //     a_buffer = [decodedData.getChannelData(0)];
  //     feeder.bufferData(a_buffer);
  //   });
  //   console.log(arrayBuffer);
  // })
};

playWavStopElm.addEventListener("click", () => {
  // You can pause output at any time:
  console.log(feeder._backend);
  feeder.stop();
  console.log("stopping feeder");
  // to release resources, call feeder.close() instead.
});

// feeder.waitUntilReady(function() {

//   // Buffer some data before we start playback...
//   //
//   // Each channel gets its own 32-bit float array of samples;
//   // this will be 0.25 seconds of silence at 2ch/48kHz.
//   //
//   // Note it's ok for each bufferData() call to have a different
//   // number of samples, such as when working with a data format
//   // with variable packet size (Vorbis).
//   //
//   feeder.bufferData([
//     new Float32Array(12000),
//     new Float32Array(12000)
//   ]);
//   console.log("waiting ready");
//   // Start playback...
//   feeder.start();

//   playWavStopElm.addEventListener('click', function() {
//     // You can pause output at any time:
//     feeder.stop();
//     // to release resources, call feeder.close() instead.
//   });

//   // Callback when buffered data runs below feeder.bufferThreshold seconds:
//   feeder.onbufferlow = function() {
//     console.log("low buffer");
//     while (feeder.durationBuffered < feeder.bufferThreshold) {
//       feeder.bufferData([
//         new Float32Array(12000),
//         new Float32Array(12000)
//       ]);
//     }
//   };

// });

//console.log(feeder._backend);

//console.log("helloworld");
