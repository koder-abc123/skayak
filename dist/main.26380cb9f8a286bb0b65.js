!function(e){function t(t){for(var r,o,c=t[0],i=t[1],u=t[2],p=0,m=[];p<c.length;p++)o=c[p],Object.prototype.hasOwnProperty.call(s,o)&&s[o]&&m.push(s[o][0]),s[o]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);for(l&&l(t);m.length;)m.shift()();return a.push.apply(a,u||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],r=!0,c=1;c<n.length;c++){var i=n[c];0!==s[i]&&(r=!1)}r&&(a.splice(t--,1),e=o(o.s=n[0]))}return e}var r={},s={0:0},a=[];function o(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=r,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="./";var c=this.webpackJsonp=this.webpackJsonp||[],i=c.push.bind(c);c.push=t,c=c.slice();for(var u=0;u<c.length;u++)t(c[u]);var l=i;a.push([621,1]),n()}({1031:function(e,t){},1033:function(e,t){},1134:function(e,t){},1169:function(e,t){},1196:function(e,t){},1373:function(e,t){},1469:function(e,t){},1483:function(e,t){},1510:function(e,t){},1512:function(e,t){},1535:function(e,t){},1536:function(e,t){},1571:function(e,t){},284:function(e,t){},490:function(e,t){},621:function(e,t,n){n(622),e.exports=n(808)},808:function(e,t,n){"use strict";n.r(t),function(e){var t,r=n(616),s=n.n(r),a=n(617),o=n.n(a),c=n(619),i=n(620),u=n(618),l=n.n(u);n(584),n(1644);function p(e,t,n,r,s,a,o){try{var c=e[a](o),i=c.value}catch(e){return void n(e)}c.done?t(i):Promise.resolve(i).then(r,s)}function m(e){return function(){var t=this,n=arguments;return new Promise((function(r,s){var a=e.apply(t,n);function o(e){p(a,r,s,o,c,"next",e)}function c(e){p(a,r,s,o,c,"throw",e)}o(void 0)}))}}(t="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.enterModule:void 0)&&t(e);"undefined"!=typeof reactHotLoaderGlobal&&reactHotLoaderGlobal.default.signature;window.MediaRecorder=i.a;var y,g,k,f,d=document.getElementById("connect"),h=document.getElementById("message"),v=document.getElementById("send"),j=document.getElementById("send2"),D=document.getElementById("channel"),A=document.getElementById("messages"),b=document.getElementById("username"),w=document.getElementById("user"),x=document.getElementById("peersCount"),E=document.getElementById("play"),I=document.getElementById("stop"),C=document.getElementById("record"),S=document.getElementById("stopRecord"),B=document.getElementById("player"),M=document.getElementById("playwav"),R=document.getElementById("playwavstop"),L=document.getElementById("joinchannel"),O=0,T=!1,_=new l.a,N="",P=0,H=0,G=0,J=!1,W=1,F="",U="",q="",X={},z=20,K="Anonymous"+(new Date).getTime().toString().slice(-4),Q="",V={EXPERIMENTAL:{pubsub:!0,sharding:!1,dht:!1},preload:{enabled:!1},config:{Addresses:{Swarm:["/dns4/glacial-bastion-28924.herokuapp.com/tcp/443/wss/p2p-webrtc-star"]}}},Y=new c.a("https://siasky.net"),Z=function(e,t){t.loaded,t.total;console.info("Progress ".concat(Math.round(100*e),"%"))},$={dbOptions:{maxHistory:z}},ee=[];function te(e){w.value=e,b.innerHTML=e,N=e,V.repo="/orbit/browser-example/".concat(e);var t=new s.a(V);t.on("ready",(function(){return re(t,e)}))}function ne(e){return console.log("sleeping ",e/1e3),new Promise((function(t){return setTimeout(t,e)}))}function re(e,t){$.dbOptions.directory="/orbit/browser-example/".concat(t);var n=new o.a(e,$);y=n,n.events.on("connected",(function(){return n.join(Q)})),n.events.on("joined",oe),n.events.on("replicate.progress",(function(e,t,n,r,s){console.log("replicating",e,t,n,r,s)})),n.events.on("write",(function(e,t,n){console.log("writing",e,t,n)})),n.events.on("closed",(function(e){console.log("closing")})),n.connect(t),(d=fe(d)).addEventListener("click",m(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,n.disconnect();case 2:return t.next=4,e.stop();case 4:te(w.value);case 5:case"end":return t.stop()}}),t)})))),n.events.on("entry",(function(e,t){e.payload.value}))}function se(e){return J=!0,fetch(e.next).then((function(e){return e.text()})).then((function(e){var t=JSON.parse(e);fetch(t.link).then((function(e){return e.arrayBuffer()})).then((function(e){_._backend._context.decodeAudioData(e,(function(e){a_buffer=[e.getChannelData(0)],_.bufferData(a_buffer),"none"!==t.next?se(t):J=!1})),console.log(e)}))}))}function ae(e){var t;return fetch(e.link).then((function(e){return e.arrayBuffer()})).then((function(e){_._backend._context.decodeAudioData(e,(function(e){t=[e.getChannelData(0)],_.bufferData(t)})),console.log(e)}))}function oe(e,t){ee=[],"skayak-user"===e.substring(0,11)?(k=t,console.log("user channel joined",e)):g=t,h=fe(h),v=fe(v),j=fe(j),M=fe(M),C=fe(C),D.innerHTML="#"+e,t.on("ready",m(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.peers.then(ke);case 1:case"end":return e.stop()}}),e)})))),t.on("entry",(function(e){ge(ee=[].concat(ee,[e.payload.value]).sort((function(e,t){return e.meta.ts-t.meta.ts}))),t.peers.then(ke),console.log("channel entry",G++);try{var n=JSON.parse(e.payload.value.content);if("none"===n.link&&""!==n.newChannelName&&e.payload.value.meta.from.name!==N){X[n.newChannelName]=n.ChannelStatus;var r=document.getElementById("channelList").querySelectorAll("#"+n.newChannelTitle);if(n.ChannelStatus&&0==r.length){var s=document.createElement("button");s.setAttribute("id",n.newChannelTitle),s.appendChild(document.createTextNode(n.newChannelTitle)),s.addEventListener("click",m(regeneratorRuntime.mark((function e(){var t,r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return Ae(),e.next=3,fetch("https://time.akamai.com").then((function(e){return e.text()}));case 3:t=e.sent,r=parseInt(t/50),q="skayak-user-"+n.newChannelTitle+"-"+r.toString();case 6:case"end":return e.stop()}}),e)})))),document.getElementById("channelList").appendChild(s)}else n.ChannelStatus||(document.getElementById(n.newChannelTitle).remove(),""!=q&&(R.click(),y.leave(q),fetch("https://time.akamai.com").then((function(e){return e.text()})).then((function(e){var t=parseInt(e/50);F="skayak-general-"+t.toString(),y.join(F),q=""}))))}e.payload.value.meta.from.name!==N&&n.ts>P&&"none"!==n.link&&(P=n.ts,console.log("TT link ",e.payload.value.meta.from.name,n.ts),ae(n))}catch(e){console.log(e)}})),v.addEventListener("click",(function(){return ce()})),L.addEventListener("click",(function(){y.join(F)})),h.addEventListener("keyup",(function(e){13===e.keyCode&&ce()})),M.addEventListener("click",m(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",Ae());case 1:case"end":return e.stop()}}),e)})))),C.addEventListener("click",(function(){return be()})),t.load(10),W=0}function ce(){g.sendMessage(h.value),h.value=null}function ie(e){}function ue(e,t){return e.lastModifiedDate=new Date,e.name=t,e}function le(e){return pe.apply(this,arguments)}function pe(){return(pe=m(regeneratorRuntime.mark((function e(t){var n,r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Y.upload(t,{onUploadProgress:Z});case 3:return n=e.sent,r=n.skylink,e.abrupt("return",r);case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}function me(e){O=setInterval(m(regeneratorRuntime.mark((function e(){var t,n,r,s;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=Math.random().toString(36).substring(7),n=new Blob([t],{type:"text/html"}),r=ue(n,"my-text.html"),e.prev=4,e.next=7,le(r);case 7:s=e.sent,{link:"https://siasky.net/"+s},console.log("joined channel!!"),e.next=16;break;case 13:e.prev=13,e.t0=e.catch(4),console.log("error skylkiknking");case 16:case"end":return e.stop()}}),e,null,[[4,13]])}))),1e4)}function ye(e){console.log("stopping data"),clearInterval(O)}function ge(e){A.innerHTML=e.slice(-z).map((function(e){return"".concat(de(e.meta.ts)," &lt;").concat(e.meta.from.name,"&gt; ").concat(e.content,"<br/>")})).join("\n")}function ke(e){x.innerHTML="Peers: "+(e?e.length:0)}function fe(e){var t=e.cloneNode(!0);return e.parentNode.replaceChild(t,e),t}function de(e){var t=function(e){return("0"+e).slice(-2)},n=new Date(e);return t(n.getHours())+":"+t(n.getMinutes())+":"+t(n.getSeconds())}function he(e){navigator.mediaDevices.getUserMedia({audio:!0}).then((function(e){T=!1;(f=new MediaRecorder(e)).start(),console.log("record start"),f.addEventListener("dataavailable",function(){var e=m(regeneratorRuntime.mark((function e(t){var n,r,s,a;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return B.src=URL.createObjectURL(t.data),n=ue(t.data,"1.wav"),e.prev=2,e.next=5,le(n);case 5:return r=e.sent,s="https://siasky.net/"+r,a={},console.log(s),e.next=11,fetch("https://time.akamai.com").then((function(e){return e.text()}));case 11:H=e.sent,a={link:s,ts:parseInt(H)},k.sendMessage(JSON.stringify(a)),e.next=19;break;case 16:e.prev=16,e.t0=e.catch(2),console.log("error skylkiknking");case 19:case"end":return e.stop()}}),e,null,[[2,16]])})));return function(t){return e.apply(this,arguments)}}())}))}function ve(){return je.apply(this,arguments)}function je(){return(je=m(regeneratorRuntime.mark((function e(){var t,n,r,s,a;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://time.akamai.com").then((function(e){return e.text()}));case 2:return t=e.sent,n=parseInt(parseInt(t)/100),F="skayak-general-"+n.toString(),console.log(F),Q=F,te(K),e.next=10,fetch("https://time.akamai.com").then((function(e){return e.text()}));case 10:t=e.sent,n=parseInt(parseInt(t)/100),r=1e3*(100-parseInt(t)%100);case 13:return e.next=16,ne(r);case 16:return""!=q?y.leave(q):""!=U?y.leave(U):y.leave(F),console.log("leaving",F),e.next=20,fetch("https://time.akamai.com").then((function(e){return e.text()}));case 20:t=e.sent,n=parseInt(t/100),""!=q?(s=parseInt(t/50),q="skayak-user-"+q.substring(12,25)+"-"+s.toString(),F="skayak-general-"+n.toString(),console.log("joining",q),r=1e3*(50-parseInt(s)%50),y.join(q)):""!=U?(a=parseInt(t/50),U="skayak-user-"+U.substring(12,25)+"-"+a.toString(),F="skayak-general-"+n.toString(),console.log("joining",U),r=1e3*(50-parseInt(a)%50),y.join(U)):(F="skayak-general-"+n.toString(),console.log("joining",F),y.join(F),r=1e5),e.next=13;break;case 25:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function De(e){var t=Math.round(48e3*e),n=261*Math.ceil(t/261),r=[new Float32Array(n)];_.bufferData(r)}function Ae(){console.log("playwav start"),_.init(1,44100),De(1),_.start()}function be(){return we.apply(this,arguments)}function we(){return(we=m(regeneratorRuntime.mark((function e(){var t,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return T=!1,e.next=3,fetch("https://time.akamai.com").then((function(e){return e.text()}));case 3:t=e.sent,n=parseInt(t/100),U="skayak-user-"+K+"-"+n.toString(),y.join(U),g.sendMessage(JSON.stringify({link:"none",newChannelName:U,newChannelTitle:K,ChannelStatus:!0}));case 8:if(T){e.next=16;break}return f&&(f.stop(),f.stream.getTracks().forEach((function(e){return e.stop()}))),console.log("start record time "),he(),e.next=14,ne(1e4);case 14:e.next=8;break;case 16:case"end":return e.stop()}}),e)})))).apply(this,arguments)}S.addEventListener("click",m(regeneratorRuntime.mark((function e(){var t,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return f.stop(),console.log("record stop"),T=!0,k.sendMessage(JSON.stringify({link:"none",newChannelName:U,newChannelTitle:K,ChannelStatus:!1})),e.next=6,fetch("https://time.akamai.com").then((function(e){return e.text()}));case 6:t=e.sent,n=parseInt(t/100),F="skayak-general-"+n.toString(),y.leave(U),y.join(F),console.log("joining back",F),g.sendMessage(JSON.stringify({link:"none",newChannelName:U,newChannelTitle:K,ChannelStatus:!1})),U="",f.stream.getTracks().forEach((function(e){return e.stop()}));case 15:case"end":return e.stop()}}),e)})))),ve();var xe,Ee;_.onstarved=function(){console.log("starving"),De(1)},_.onbufferlow=function(){console.log("buffer low"),De(2)},R.addEventListener("click",(function(){console.log(_._backend),_.stop(),console.log("stopping feeder")})),(xe="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0)&&(xe.register(d,"connectButton","/home/cyril/Documents/skayak/src/App.js"),xe.register(h,"messageField","/home/cyril/Documents/skayak/src/App.js"),xe.register(v,"sendButton","/home/cyril/Documents/skayak/src/App.js"),xe.register(j,"sendGreetingButton","/home/cyril/Documents/skayak/src/App.js"),xe.register(D,"channelNameElement","/home/cyril/Documents/skayak/src/App.js"),xe.register(A,"messagesElement","/home/cyril/Documents/skayak/src/App.js"),xe.register(b,"usernameElement","/home/cyril/Documents/skayak/src/App.js"),xe.register(w,"userField","/home/cyril/Documents/skayak/src/App.js"),xe.register(x,"peersElm","/home/cyril/Documents/skayak/src/App.js"),xe.register(E,"playDataElm","/home/cyril/Documents/skayak/src/App.js"),xe.register(I,"stopDataElm","/home/cyril/Documents/skayak/src/App.js"),xe.register(C,"recordButton","/home/cyril/Documents/skayak/src/App.js"),xe.register(S,"stopButton","/home/cyril/Documents/skayak/src/App.js"),xe.register(B,"audioElement","/home/cyril/Documents/skayak/src/App.js"),xe.register(M,"playWavElm","/home/cyril/Documents/skayak/src/App.js"),xe.register(R,"playWavStopElm","/home/cyril/Documents/skayak/src/App.js"),xe.register(L,"joinChannelElm","/home/cyril/Documents/skayak/src/App.js"),xe.register("","full_string","/home/cyril/Documents/skayak/src/App.js"),xe.register(O,"interv","/home/cyril/Documents/skayak/src/App.js"),xe.register(T,"isStopRecording","/home/cyril/Documents/skayak/src/App.js"),xe.register(void 0,"streamer","/home/cyril/Documents/skayak/src/App.js"),xe.register(_,"feeder","/home/cyril/Documents/skayak/src/App.js"),xe.register(N,"myName","/home/cyril/Documents/skayak/src/App.js"),xe.register(P,"latest","/home/cyril/Documents/skayak/src/App.js"),xe.register(H,"sync_timestamp","/home/cyril/Documents/skayak/src/App.js"),xe.register("","current_link","/home/cyril/Documents/skayak/src/App.js"),xe.register("","next_link","/home/cyril/Documents/skayak/src/App.js"),xe.register(!0,"first_chunk_message","/home/cyril/Documents/skayak/src/App.js"),xe.register(G,"channel_message_counter","/home/cyril/Documents/skayak/src/App.js"),xe.register(y,"orbity","/home/cyril/Documents/skayak/src/App.js"),xe.register(J,"redeemingData","/home/cyril/Documents/skayak/src/App.js"),xe.register(W,"first_run","/home/cyril/Documents/skayak/src/App.js"),xe.register(F,"latestChannel","/home/cyril/Documents/skayak/src/App.js"),xe.register(g,"latestChannelObject","/home/cyril/Documents/skayak/src/App.js"),xe.register(k,"castChannelObject","/home/cyril/Documents/skayak/src/App.js"),xe.register(U,"castChannelName","/home/cyril/Documents/skayak/src/App.js"),xe.register(void 0,"listenChannel","/home/cyril/Documents/skayak/src/App.js"),xe.register(q,"listenChannelName","/home/cyril/Documents/skayak/src/App.js"),xe.register(X,"CastingChannelTable","/home/cyril/Documents/skayak/src/App.js"),xe.register(z,"visibleMessages","/home/cyril/Documents/skayak/src/App.js"),xe.register(f,"recorder","/home/cyril/Documents/skayak/src/App.js"),xe.register(K,"username","/home/cyril/Documents/skayak/src/App.js"),xe.register(Q,"channelName","/home/cyril/Documents/skayak/src/App.js"),xe.register(V,"ipfsOptions","/home/cyril/Documents/skayak/src/App.js"),xe.register(Y,"client","/home/cyril/Documents/skayak/src/App.js"),xe.register(Z,"onUploadProgress","/home/cyril/Documents/skayak/src/App.js"),xe.register($,"orbitOptions","/home/cyril/Documents/skayak/src/App.js"),xe.register(ee,"messages","/home/cyril/Documents/skayak/src/App.js"),xe.register(te,"startIpfs","/home/cyril/Documents/skayak/src/App.js"),xe.register(ne,"sleepp","/home/cyril/Documents/skayak/src/App.js"),xe.register(re,"initOrbit","/home/cyril/Documents/skayak/src/App.js"),xe.register(se,"getWavData","/home/cyril/Documents/skayak/src/App.js"),xe.register(ae,"getWavFile","/home/cyril/Documents/skayak/src/App.js"),xe.register(oe,"onJoinedChannel","/home/cyril/Documents/skayak/src/App.js"),xe.register(ce,"sendMessage","/home/cyril/Documents/skayak/src/App.js"),xe.register(ie,"sendGreeting","/home/cyril/Documents/skayak/src/App.js"),xe.register(ue,"blobToFile","/home/cyril/Documents/skayak/src/App.js"),xe.register(le,"uploadExample","/home/cyril/Documents/skayak/src/App.js"),xe.register(me,"sendData","/home/cyril/Documents/skayak/src/App.js"),xe.register(ye,"stopData","/home/cyril/Documents/skayak/src/App.js"),xe.register(ge,"renderMessages","/home/cyril/Documents/skayak/src/App.js"),xe.register(ke,"renderPeers","/home/cyril/Documents/skayak/src/App.js"),xe.register(fe,"replaceElement","/home/cyril/Documents/skayak/src/App.js"),xe.register(de,"formatTimestamp","/home/cyril/Documents/skayak/src/App.js"),xe.register(he,"startRecording","/home/cyril/Documents/skayak/src/App.js"),xe.register(ve,"startup","/home/cyril/Documents/skayak/src/App.js"),xe.register(De,"bufferSineWave","/home/cyril/Documents/skayak/src/App.js"),xe.register(void 0,"daty","/home/cyril/Documents/skayak/src/App.js"),xe.register(Ae,"playWav","/home/cyril/Documents/skayak/src/App.js"),xe.register(be,"startStream","/home/cyril/Documents/skayak/src/App.js"),xe.register(0,"sampleCounter","/home/cyril/Documents/skayak/src/App.js")),(Ee="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.leaveModule:void 0)&&Ee(e)}.call(this,n(809)(e))},921:function(e,t){},931:function(e,t){},942:function(e,t){},944:function(e,t){}});