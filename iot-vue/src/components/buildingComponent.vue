<template>
  <div class="buildingComponent">
    <b-modal
      class="videoModal"
      :active.sync="activateLogin"
      scroll="keep"
      :width="640"
      :can-cancel="false"
    >
      <b-message
        title="Authentication !"
        type="is-danger"
        has-icon
        :active="!isLoggedMessage"
        aria-close-label="Close message"
      >
        You Not are Logged in !
      </b-message>
      <video id="video" width="430px" height="350px" ref="videoRef"></video>

      <!-- <b-button @click="activateLogin = false">coucou</b-button> -->
    </b-modal>
    <section class="section">
      <b-message
        auto-close
        title="You are a logged in !"
        type="is-success"
        has-icon
        :active.sync="isLoggedMessage"
        aria-close-label="Close message"
      >
        You are Logged in !
      </b-message>
      <div class="container" ref="element">
        <div
          @mouseover="mouseOver('on', $event)"
          @mouseleave="mouseOver('off', $event)"
          class="card"
          v-for="(room, i) in rooms"
          :key="i"
        >
          <header class="card-header">
            <p class="card-header-title">{{ room.name }}</p>
            <a
              style="visibility:hidden;"
              @click="removeRoom(room.id, i)"
              class="card-header-icon"
              aria-label="delete"
            >
              <span class="icon">
                <i class="fas fa-window-close" aria-hidden="true"></i>
              </span>
            </a>
          </header>

          <div class="card-content">
            <div class="content">
              <!-- <code>n rooms:</code> {{ room.lights.length }} -->
              <div class="card-image">
                <figure class="image">
                  <svg
                    viewBox="0 0 24 24"
                    width="40"
                    height="40"
                    stroke="currentColor"
                    stroke-width="2"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="css-i6dzq1"
                  >
                    <path
                      d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                    ></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                </figure>
              </div>
            </div>
          </div>
          <footer class="card-footer">
            <a @click="redirect(room.id)" class="card-footer-item">
              <i class="fas fa-door-open"></i> Open the door</a
            >
          </footer>
        </div>
        <div
          @click="
            isMessageActive = !isMessageActive;
            isAddBoxHidden = true;
          "
          :class="['AddBox', { AddBoxHidden: isAddBoxHidden }]"
        >
          <svg
            viewBox="0 0 24 24"
            width="56"
            height="56"
            stroke="currentColor"
            stroke-width="2"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="css-i6dzq1"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="16"></line>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
        </div>

        <div :class="['card', { AddBoxHidden: !isAddBoxHidden }]">
          <b-message
            title="Add room"
            :active.sync="isMessageActive"
            aria-close-label="Close message"
            @close="isAddBoxHidden = false"
          >
            <b-field label="Room's Name" label-position="on-border">
              <b-input
                placeholder="Name of the room"
                v-model="roomName"
              ></b-input>
            </b-field>

            <b-field label="floor" label-position="on-border">
              <b-input
                placeholder="floor number"
                type="number"
                v-model="floor"
              ></b-input>
            </b-field>
            <b-field>
              <b-button @click="addRoom" type="submit">Add</b-button>
            </b-field>
          </b-message>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// import cbor from "cbor";
// import assert from "assert";

// tensorflow.js layer library in order for the log in
import ml5 from "ml5";
export default {
  data() {
    return {
      rooms: {},
      API_URL: "https://idrissi.cleverapps.io/api",
      isActive: true,
      isMessageActive: false,
      roomName: "",
      roomId: "",
      floor: "",
      isAddBoxHidden: false,
      ErrorMessage: "Please refresh the page, Something happened uncorrectly! ",
      activateLogin: false,
      videoReady: false,
      user: "",
      isLoggedMessage: false,
      model: null
    };
  },
  methods: {
    // function to add a new room to the building
    async addRoom() {
      console.log(this.roomName, this.roomId);
      this.isMessageActive = false;
      this.isAddBoxHidden = false;
      let body = {
        floor: this.floor,
        lights: [],
        name: this.roomName,
        buildingId: 1
      };

      try {
        // start loading component
        const loadingComponent = this.$buefy.loading.open({
          container: this.$refs.element.$el
        });
        let resp = await fetch(`${this.API_URL}/rooms`, {
          method: "POST",
          body: JSON.stringify(body),
          headers: { "Content-Type": "application/json" },
          mode: "cors",
          credentials: "omit"
        });
        loadingComponent.close();
        if (resp.status == 200 || resp.status == 201) {
          let data = await resp.json();
          body.id = data.id;
          this.rooms.push(body);
          console.log(data);
          this.$buefy.snackbar.open({
            message: "Room Added successfully !",
            type: "is-success",
            position: "is-bottom-left",
            // actionText: 'Retry',
            duration: 4000
          });
        } else {
          throw Error;
        }
      } catch (error) {
        this.$buefy.toast.open({
          message: this.ErrorMessage,
          type: "is-danger"
        });
        console.log(error);
      }
    },
    async removeRoom(roomId, i) {
      try {
        // start loading component
        const loadingComponent = this.$buefy.loading.open({
          container: this.$refs.element.$el
        });
        // remove a room with id = roomId
        let res = await fetch(`${this.API_URL}/rooms/${roomId}`, {
          body: null,
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          mode: "cors",
          credentials: "omit"
        });
        // close loading component after getting back the result from the sereer
        loadingComponent.close();
    
        if (res.status == 200 || res.status == 201) {
          console.log("deleted succ !");
          this.rooms.splice(i, 1);
          this.$buefy.snackbar.open({
            message: "Room deleted successfully !",
            type: "is-warning",
            position: "is-bottom-left",
            // actionText: 'Retry',
            duration: 4000
          });
        } else {
          throw Error;
        }
      } catch (error) {
        // in case of error: display a Toast
        this.$buefy.toast.open({
          message: this.ErrorMessage,
          type: "is-danger"
        });
        console.log(error);
      }
    },
    // redirect (without reloading the page [specific case])
    async redirect(index) {
      this.$router.push("/room/" + index);
    },
    // mouse over the cards (in order to display the close button)
    mouseOver(action, e) {
      if (action === "on") {
        e.currentTarget.firstChild.children[1].style = "visibility:visible;";
      } else if (action === "off") {
        e.currentTarget.firstChild.children[1].style = "visibility:hidden;";
      }
    },
    // make a user guess (if it is "Abdelhamid" -> log in)
    guess(classifier) {
      classifier.classify(document.getElementById("video"), (err, results) => {
        if (err) console.log(err);
        if (results[0].confidence > 0.9) {
          this.user = results[0].label;
          if (this.user === "Abdelhamid") {
            this.activateLogin = false;
            localStorage.setItem("isLoggedIn", "true");
            this.isLoggedMessage = true;
          }
          console.log("result: ", this.user);
        }
        this.guess(classifier);
      });
    }
   
  },
  // fetch rooms on page creation ! ( before the page mounting )
  async created() {
    try {
      // send request to get rooms
      var res = await fetch(`${this.API_URL}/rooms`);
      if (res.status == 200 || res.status == 201) {
        var data = await res.json();
        this.rooms = data;
      } else {
        throw Error;
      }
    } catch (error) {
      this.$buefy.toast.open({
        message: this.ErrorMessage,
        type: "is-danger"
      });
      console.error(error);
    }
  },
  // code for user authentication 
  async mounted() {
    console.log("mounted");
    let isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn && isLoggedIn == "true") {
      console.log("logged in", isLoggedIn);
    } else {
      console.log("not logged in or no local key found", isLoggedIn);
      setTimeout(() => {
        this.activateLogin = true;
      }, 100);
    }

    setTimeout(() => {
      if (this.$refs.videoRef) {
        this.videoReady = true;
        console.log(this.$refs.videoRef);
      }
    }, 500);

    setTimeout(() => {
      if (this.videoReady && this.activateLogin) {
        navigator.mediaDevices
          .getUserMedia({ video: true })
          .then(stream => {
            video.srcObject = stream;
            video.play();
          })
          .then(() => {
            const URL =
              "https://teachablemachine.withgoogle.com/models/XLqbjQq-/model.json";
            //   "https://teachablemachine.withgoogle.com/models/of9bynZQ/model.json";
            const classifier = ml5.imageClassifier(URL, video, () => {
              console.log("model loaded !");
              this.model = classifier;
            });
            // console.log(classifier);
            if (this.activateLogin) {
              this.guess(classifier);
            } else {
              console.log("Logged in !");
            }
          });
      } else {
        console.log("video not ready !");
      }
    }, 2000);
  }

  // async mounted() {
  //   var encoded = cbor.encode(JSON.stringify({"id":-1,"status":"ON"}));
  //   console.log(encoded);

  //   var myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");

  //   var payload = encoded;

  //   var requestOptions = {
  //     method: "PUT",
  //     headers: myHeaders,
  //     body: payload,
  //     redirect: "follow"
  //   };

  //   fetch("http://localhost:8080/api/lights/-1/switch", requestOptions)
  //     .then(response => response.json())
  //     .then(result => console.log(result))
  //     .catch(error => console.log("error", error));

  //   cbor.decodeFirst(encoded, function(error, obj) {
  //     // error != null if there was an error
  //     // obj is the unpacked object
  //    // assert.ok(obj === {"id":-1,"level":8,"status":"ON","roomId":-10});
  //     console.log(obj);
  //   });
  // }
};
</script>
<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
}
.card {
  width: 320px;
  margin: 10px;
}
figure.img {
  display: flex;
  justify-content: center;
  align-items: center;
}
figure.image img {
  width: 125px;
}
.AddBox {
  width: 300px;
  height: 166px;
  margin: 20px;
  border: 1px dashed grey;
  display: flex;
  justify-content: center;
  align-items: center;
}
.AddBox:hover {
  background: #f4f4f4;
}
.AddBoxHidden {
  display: none;
}

video {
  margin-left: 100px;
  border: dashed 2px #f4f4f4;
}
</style>
