var vm = new Vue({
  el: ".app",
  data() {
    return {
      rooms: [{id:11,
        lightStatus:"ON",
      lightLevel:100},{id:12,
        lightStatus:"OFF",
      lightLevel:200}],
      isLightTrue: true,
      isNoiseTrue: true,
      activeHue:0,
    };
  },
  async created() {
    var res = await fetch(`http://localhost:8080/api/rooms`);
    var data = await res.json();
    console.table(data);

    this.rooms = data;
    this.rooms.forEach(room => {
      if (room.lightStatus == "ON") {
        room.isLightTrue = true;
      } else {
        room.isLightTrue = false;
      }
      // if (room.noise.status == "ON") {
      //   room.isNoiseTrue = true;
      // } else {
      //   room.isNoiseTrue = false;
      // }
    });
  },

  methods: {
    async switchLight(index) {
      try {
        this.rooms[index].isLightTrue = !this.rooms[index].isLightTrue;
        if (this.rooms[index].isLightTrue == true) {
          this.rooms[index].lightStatus = "ON";
        } else {
          this.rooms[index].lightStatus = "OFF";
        }
        console.log(this.rooms[index].lightStatus);
        console.log(this.rooms[index].isLightTrue);

        var res = await fetch(`http://localhost:8080/api/rooms/${index + 1}`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json; charset=UTF-8" // Indicates the content
          },
          body: JSON.stringify({
            id: index,
            lightLevel: 2022,
            lightStatus: this.rooms[index].lightStatus
          })
        });
        var hueId;
        if (this.rooms[index].id == 0) {
          hueId = 13; // 5F925F
          this.activeHue = 13;
        } else if (this.rooms[index].id == 1) {
          hueId = 16; // 848E28
          this.activeHue = 16;

        }
        var stateResp = await fetch(
          `http://192.168.1.131/api/y-BOjmEAbvMv0DXUJflvMeevnlzJ0r2toez5iiUm/lights/${hueId}/`
        );
        var data = await stateResp.json();
        const state = data.state;
        const color = state.hue;
        const bri = state.bri;
        // console.log(data.state);
        var myRange = document.getElementById("myRange");
        myRange.value = color;
        var demo = document.getElementById("demo");
        demo.textContent = color;
        var myRange2 = document.getElementById("myRangeBri");
      var demo2 = document.getElementById("demo2");
      myRange2.value = bri; 
      demo2.textContent = bri;
        fetch(
          `http://192.168.1.131/api/y-BOjmEAbvMv0DXUJflvMeevnlzJ0r2toez5iiUm/lights/${hueId}/state`,
          {
            credentials: "omit",
            headers: {
              accept: "*/*",
              "accept-language":
                "en-US,en;q=0.9,fr-FR;q=0.8,fr;q=0.7,ar-MA;q=0.6,ar;q=0.5",
              "content-type": "text/plain;charset=UTF-8"
            },
            referrer: "http://192.168.1.131/debug/clip.html",
            referrerPolicy: "no-referrer-when-downgrade",
            body: `{"on":${this.rooms[index].isLightTrue},"hue":${color},"bri":${bri}}`,
            method: "PUT",
            mode: "cors"
          }
        );

        // var data = await res.json();
        // console.log(data);
      } catch (error) {
        console.error(error);
      }

      //  this.rooms[index].lightStatus = data[index].lightStatus;
      // if (this.rooms[index].lightStatus == "ON") {
      //   this.rooms[index].isLightTrue = true;
      // } else {
      //   this.rooms[index].isLightTrue = false;
      // }
      //  console.log("light:", data[index].lightStatus);
    },
    async switchRinger(index) {
      var res = await fetch(
        `http://thawing-journey-78988.herokuapp.com/api/rooms/${index +
          1}/switch-ringer-and-list`,
        {
          method: "PUT",
          body: {}
        }
      );
      var data = await res.json();
      this.rooms[index].noise.status = data[index].noise.status;
      console.log("ringer:", data[index].noise.status);

      // console.log("ringer:", data);
    },
    async changeColor() {
      var myRange = document.getElementById("myRange");
      var demo = document.getElementById("demo");
      demo.textContent = myRange.value;
      fetch(
        `http://192.168.1.131/api/y-BOjmEAbvMv0DXUJflvMeevnlzJ0r2toez5iiUm/lights/${this.activeHue}/state`,
        {
          credentials: "omit",
          headers: {
            accept: "*/*",
            "accept-language":
              "en-US,en;q=0.9,fr-FR;q=0.8,fr;q=0.7,ar-MA;q=0.6,ar;q=0.5",
            "content-type": "text/plain;charset=UTF-8"
          },
          referrer: "http://192.168.1.131/debug/clip.html",
          referrerPolicy: "no-referrer-when-downgrade",
          body: `{"on":true,"hue":${myRange.value}}`,
          method: "PUT",
          mode: "cors"
        }
      )
        .then(res => res.json())
        .then(data => console.log(data));
    },
    async changeBri() {
      var myRange2 = document.getElementById("myRangeBri");
      var demo2 = document.getElementById("demo2");
      demo2.textContent = myRange2.value;
      fetch(
        `http://192.168.1.131/api/y-BOjmEAbvMv0DXUJflvMeevnlzJ0r2toez5iiUm/lights/${this.activeHue}/state`,
        {
          credentials: "omit",
          headers: {
            accept: "*/*",
            "accept-language":
              "en-US,en;q=0.9,fr-FR;q=0.8,fr;q=0.7,ar-MA;q=0.6,ar;q=0.5",
            "content-type": "text/plain;charset=UTF-8"
          },
          referrer: "http://192.168.1.131/debug/clip.html",
          referrerPolicy: "no-referrer-when-downgrade",
          body: `{"on":true, "sat":254, "bri":${myRange2.value}}`,
          method: "PUT",
          mode: "cors"
        }
      )
        .then(res => res.json())
        .then(data => console.log(data));
    },
    async test(event) {
      var myRange = document.getElementById("myRange");
      var demo = document.getElementById("demo");

      demo.textContent = myRange.value;
    }
  }
});
