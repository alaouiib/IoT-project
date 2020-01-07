// required when running on node.js
var mqtt = require("mqtt");
var fetch = require("node-fetch");
var switchToggle = false;
var client = mqtt.connect("mqtt://max.isasecret.com:1723", {
  username: "majinfo2019",
  password: "Y@_oK2"
});
// var client = mqtt.connect('mqtt://try:try@broker.shiftr.io', {
//   clientId: 'javascript'
// });

// mqtt://try:try@broker.shiftr.io
client.on("connect", function() {
  console.log("client has connected!");

  //  client.subscribe('/light/3');
  // client.unsubscribe('/example');
  client.subscribe("idrissi/switchOff");
  client.subscribe("idrissi/switchOn");
  client.subscribe("idrissi/update");
  client.subscribe("/toggle");

  //  setInterval(function(){
  // client.publish('/light/2', 'car coming from Javascr Arduino !');
  // client.publish('/intersection/1', 'ID_Car = JS, time= 22h00');
  //  }, 2000);
});

client.on("message", async function(topic, message) {
  console.log("new message:", topic, message.toString());
  if (topic === "idrissi/switchOn") {
    console.log("ONN", message.toString());
    await fetch(
      "http://192.168.1.131/api/763GH08ScIkJMhJuO8ZiCDUfYxxf2D7-cTGRcPJf/lights/" +
        message.toString() +
        "/state",
      {
        credentials: "omit",
        headers: {
          accept: "*/*",
          "accept-language":
            "en-US,en;q=0.9,fr-FR;q=0.8,fr;q=0.7,ar-MA;q=0.6,ar;q=0.5",
          "content-type": "text/plain;charset=UTF-8"
        },
        referrer:
          "http://192.168.1.131/debug/clip.html?commandurl=%2Fapi%2F763GH08ScIkJMhJuO8ZiCDUfYxxf2D7-cTGRcPJf&messagebody=&response=",
        referrerPolicy: "no-referrer-when-downgrade",
        body: '{"on":true}',
        method: "PUT",
        mode: "cors"
      }
    );
  } else if (topic === "idrissi/switchOff") {
    await fetch(
      "http://192.168.1.131/api/763GH08ScIkJMhJuO8ZiCDUfYxxf2D7-cTGRcPJf/lights/" +
        message.toString() +
        "/state",
      {
        credentials: "omit",
        headers: {
          accept: "*/*",
          "accept-language":
            "en-US,en;q=0.9,fr-FR;q=0.8,fr;q=0.7,ar-MA;q=0.6,ar;q=0.5",
          "content-type": "text/plain;charset=UTF-8"
        },
        referrer:
          "http://192.168.1.131/debug/clip.html?commandurl=%2Fapi%2F763GH08ScIkJMhJuO8ZiCDUfYxxf2D7-cTGRcPJf&messagebody=&response=",
        referrerPolicy: "no-referrer-when-downgrade",
        body: '{"on":false}',
        method: "PUT",
        mode: "cors"
      }
    );
  } else if (topic === "idrissi/update") {
    let body = message.toString().split("\n");
    console.log(body);

    await fetch(
      "http://192.168.1.131/api/763GH08ScIkJMhJuO8ZiCDUfYxxf2D7-cTGRcPJf/lights/" +
        message.toString() +
        "/state",
      {
        credentials: "omit",
        headers: {
          accept: "*/*",
          "accept-language":
            "en-US,en;q=0.9,fr-FR;q=0.8,fr;q=0.7,ar-MA;q=0.6,ar;q=0.5",
          "content-type": "text/plain;charset=UTF-8"
        },
        referrer:
          "http://192.168.1.131/debug/clip.html?commandurl=%2Fapi%2F763GH08ScIkJMhJuO8ZiCDUfYxxf2D7-cTGRcPJf&messagebody=&response=",
        referrerPolicy: "no-referrer-when-downgrade",
        body: '{"on":true,"hue":' + body[2] + ',"bri":' + body[1] + "}",
        method: "PUT",
        mode: "cors"
      }
    );
  } else if (topic === "/toggle") {
    console.log(message.toString());
    //   fetch("https://idrissi.cleverapps.io/api/lights", {
    //     credentials: "omit",
    //     headers: {
    //       accept: "*/*",
    //       "accept-language":
    //         "en-US,en;q=0.9,fr-FR;q=0.8,fr;q=0.7,ar-MA;q=0.6,ar;q=0.5",
    //       "content-type": "application/json",
    //       "sec-fetch-mode": "cors",
    //       "sec-fetch-site": "cross-site"
    //     },
    //     referrer: "http://localhost:8080/room/-10",
    //     referrerPolicy: "no-referrer-when-downgrade",
    //     body: `{"id":18,"hue":${message.toString()},"brightness":30}`,
    //     method: "POST",
    //     mode: "cors"
    //   });
    // }
    
    let body = JSON.stringify({on:switchToggle, bri: 150, hue:Number.parseInt(message.toString()) });
    console.log(body);
    switchToggle = !switchToggle;
    await fetch(
      "http://192.168.1.131/api/763GH08ScIkJMhJuO8ZiCDUfYxxf2D7-cTGRcPJf/lights/18/state",
      {
        credentials: "omit",
        headers: {
          accept: "*/*",
          "accept-language":
            "en-US,en;q=0.9,fr-FR;q=0.8,fr;q=0.7,ar-MA;q=0.6,ar;q=0.5",
          "content-type": "text/plain;charset=UTF-8"
        },
        referrer:
          "http://192.168.1.131/debug/clip.html?commandurl=%2Fapi%2F763GH08ScIkJMhJuO8ZiCDUfYxxf2D7-cTGRcPJf&messagebody=&response=",
        referrerPolicy: "no-referrer-when-downgrade",
        body: body,
        method: "PUT",
        mode: "cors"
      }
    );
  }
});
