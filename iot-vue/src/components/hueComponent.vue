<template>
  <div class="hueComponent">
    <section class="section">
      <b-message
        type="is-info"
        has-icon
        :class="{ AddBoxHidden: isEmptyMessageActive }"
      >
        There is no lights yet ! <br />
        Do you wanna
        <a @click="isMessageActive = !isMessageActive">add one</a> ?
      </b-message>

      <div class="backButton">
        <router-link to="/">
          <b-field>
            <b-button icon-left="fas fa-arrow-left">
              Back
            </b-button>
          </b-field>
        </router-link>
      </div>

      <div class="container" ref="element">
        <b-modal :active.sync="isCardModalActive" :width="640" scroll="keep">
          <div class="slidecontainer">
            <input
              type="range"
              min="0"
              max="65535"
              value="10000"
              class="slider"
              ref="myRangeColor"
              @mouseup="changeHue_Bri_Sat()"
            />
            <p style="color:white;">
              Color: <span style="color:red;" ref="demo"></span>
            </p>
            <input
              type="range"
              min="1"
              max="254"
              value="254"
              class="slider"
              ref="myRangeBri"
              @mouseup="changeHue_Bri_Sat()"
            />
            <p style="color:white;">
              Brightness: <span style="color:red;" ref="demo2"></span>
            </p>
            <button
              @click="changeHue_Bri_Sat_request"
              class="button  is-primary is-light is-rounded is-outlined  is-fullwidth "
            >
              Show
            </button>
          </div>
        </b-modal>
        <div
          @mouseover="mouseOver('on', $event)"
          @mouseleave="mouseOver('off', $event)"
          class="card"
          v-for="(light, i) in lights"
          :key="i"
        >
          <header class="card-header">
            <p class="card-header-title">Hue number: {{ light.id }}</p>
            <a
              style="visibility:hidden;"
              @click="removeLight(light.id, i)"
              class="card-header-icon"
              aria-label="more options"
            >
              <span class="icon">
                <i class="fas fa-window-close" aria-hidden="true"></i>
              </span>
            </a>
          </header>
          <div class="card-content">
            <div class="content">
              <div class="card-image">
                <figure class="image">
                  <img
                    v-if="light.status == 'ON'"
                    src="../assets/bulb_on.png"
                  />
                  <img
                    v-if="light.status == 'OFF'"
                    src="../assets/bulb_off.png"
                  />
                </figure>
              </div>
            </div>
          </div>
          <footer class="card-footer">
            <a class="card-footer-item" @click="switchLight(light.id, 'ON', i)"
              >ON</a
            >
            <a class="card-footer-item" @click="adjustBri_Sat(i)">Bri | Sat</a>
            <a class="card-footer-item" @click="switchLight(light.id, 'OFF', i)"
              >OFF</a
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
        <div>
          <b-message
            title="Add light"
            :active.sync="isMessageActive"
            aria-close-label="Close message"
            @close="isAddBoxHidden = false"
            :class="['card', { AddBoxHidden: !isAddBoxHidden }]"
          >
            <b-field label="Id" label-position="on-border">
              <b-input
                type="number"
                placeholder="ID of the light"
                v-model="lightId"
              ></b-input>
            </b-field>
            <b-field label="status" label-position="on-border">
              <b-input placeholder="ON or OFF" v-model="status"></b-input>
            </b-field>
            <b-field label="color" label-position="on-border">
              <b-input
                type="number"
                placeholder="color (0-65535)"
                v-model="color"
              ></b-input>
            </b-field>
            <b-field label="brightness" label-position="on-border">
              <b-input
                type="number"
                placeholder="brightness"
                v-model="brightness"
              ></b-input>
            </b-field>
            <b-field>
              <b-button @click="addLight" type="submit">Add</b-button>
            </b-field>
          </b-message>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lights: [],
      activeHue: 0,
      API_URL: "https://idrissi.cleverapps.io/api",
      isMessageActive: false,
      lightId: "",
      status: "",
      brightness: "",
      color: "",
      roomId: "",
      isEmptyMessageActive: false,
      isAddBoxHidden: false,
      ErrorMessage: "Please refresh the page, Something happened uncorrectly! ",
      isCardModalActive: false,
      selectedHueIndex: null
    };
  },
  methods: {
    async switchLight(index, action, DomIndex) {
      console.log(index, action, DomIndex);

      if (action === "ON") {
        try {
          let res = await fetch(`${this.API_URL}/lights/${index}/switchOn`, {
            method: "PUT",
            body: JSON.stringify({ id: index }),
            headers: { "Content-Type": "application/json" },
            mode: "cors"
          });
          if (res.status == 200 || res.status == 201) {
            let light = await res.json();
            this.lights[DomIndex].status = light.status;
            console.table(light);
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
      } else if (action === "OFF") {
        try {
          let res = await fetch(`${this.API_URL}/lights/${index}/switchOff`, {
            method: "PUT",
            body: JSON.stringify({ id: index }),
            headers: { "Content-Type": "application/json" },
            mode: "cors"
          });
          if (res.status == 200 || res.status == 201) {
            let light = await res.json();
            this.lights[DomIndex].status = light.status;
            console.table(light);
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
      }
    },
    async addLight() {
      console.log("add light !");
      this.isEmptyMessageActive = true;
      this.isMessageActive = false;
      try {
        const loadingComponent = this.$buefy.loading.open({
          container: this.$refs.element.$el
        });
        let res = await fetch(`${this.API_URL}/lights/`, {
          method: "POST",
          body: JSON.stringify({
            hue: this.color,
            id: this.lightId,
            brightness: this.brightness,
            roomId: this.roomId,
            status: this.status
          }),
          headers: { "Content-Type": "application/json" },
          mode: "cors"
        });
        loadingComponent.close();
        if (res.status == 200 || res.status == 201) {
          let addedLight = await res.json();

          // console.log(data);
          this.lights.push(addedLight);
          this.isAddBoxHidden = false;
          // this.AddBoxHidden = true;
          this.$buefy.snackbar.open({
            message: "Light added successfully !",
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
        console.error(error);
      }
    },
    async removeLight(lightId, i) {
      try {
        const loadingComponent = this.$buefy.loading.open({
          container: this.$refs.element.$el
        });
        let res = await fetch(`${this.API_URL}/lights/${lightId}`, {
          body: null,
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          mode: "cors",
          credentials: "omit"
        });
        loadingComponent.close();
        if (res.status == 200 || res.status == 201) {
          console.log("deleted succ !");
          this.lights.splice(i, 1);
          this.$buefy.snackbar.open({
            message: "Light deleted successfully !",
            type: "is-warning",
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
    async adjustBri_Sat(index) {
      this.isCardModalActive = true;
      this.selectedHueIndex = index;
      setTimeout(() => {
        this.$refs.demo.textContent = this.$refs.myRangeColor.value = this.lights[
          index
        ].hue;
        this.$refs.demo2.textContent = this.$refs.myRangeBri.value = this.lights[
          index
        ].brightness;
      }, 100);

      //   {
      // "brightness": 999,
      // "hue": 999,
      // "id":-2
      //  }
    },
    async changeHue_Bri_Sat() {
      let color = this.$refs.myRangeColor.value;
      this.$refs.demo.textContent = color;
      let bri = this.$refs.myRangeBri.value;
      this.$refs.demo2.textContent = bri;
    },
    async changeHue_Bri_Sat_request() {
      try {
        const loadingComponent = this.$buefy.loading.open({
          container: this.$refs.element.$el
        });
        let res = await fetch(`${this.API_URL}/lights`, {
          method: "POST",
          body: JSON.stringify({
            id: this.lights[this.selectedHueIndex].id,
            hue: Number.parseInt(this.$refs.myRangeColor.value),
            brightness: Number.parseInt(this.$refs.myRangeBri.value)
          }),
          headers: { "Content-Type": "application/json" },
          mode: "cors"
        });
        loadingComponent.close();
        if (res.status == 200 || res.status == 201) {
          let addedLight = await res.json();

          // console.log(data);
          this.lights[this.selectedHueIndex] = addedLight;
          // this.AddBoxHidden = true;
          this.$buefy.snackbar.open({
            message: "Light added successfully !",
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
        console.error(error);
      }
    },
    // handle mouse over cards ( to hide the remove icon )
    mouseOver(action, e) {
      if (action === "on") {
        e.currentTarget.firstChild.children[1].style = "visibility:visible;";
      } else if (action === "off") {
        e.currentTarget.firstChild.children[1].style = "visibility:hidden;";
      }
    }
  },

  async created() {
    let roomId = this.$route.params.id;
    console.log(roomId);
    this.roomId = roomId;
    try {
      let res = await fetch(`${this.API_URL}/rooms/${roomId}`);
      if (res.status == 200 || res.status == 201) {
        let data = await res.json();
        console.table(data);
        this.lights = data.lights;
        if (this.lights.length > 0) {
          this.isEmptyMessageActive = true;
          this.lights.forEach(light => {
            if (light.status == "ON") {
              light.isLightTrue = true;
            } else {
              light.isLightTrue = false;
            }
          });
        } else {
          console.log("empty lights");
          this.isEmptyMessageActive = false;
          this.isAddBoxHidden = true;
        }
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
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
  width: 130px;
  height: 250px;
}
.AddBox {
  width: 300px;
  height: 190px;
  margin: 20px;
  border: 1px dashed grey;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 120px;
}
.AddBox:hover {
  background: #f4f4f4;
}
marquee {
  margin-left: 100px;
  display: inline-block;
}
.backButton {
  margin-left: 25px;
}
.AddBoxHidden {
  display: none;
}
.slidecontainer {
  width: 80%;
  margin: 0 auto;
}

.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 25px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
}

.slider:hover {
  opacity: 1;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  background: #d64810fd;
  cursor: pointer;
  border-radius: 10px;
}

.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  background: #4caf50;
  cursor: pointer;
}
</style>
