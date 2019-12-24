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

      <div class="container">
        <div class="card" v-for="(light, i) in lights" :key="i">
          <header class="card-header">
            <p class="card-header-title">Hue number: {{ light.id }}</p>
            <!-- <a href="#" class="card-header-icon" aria-label="more options">
              <span class="icon">
                <i class="fas fa-angle-down" aria-hidden="true"></i>
              </span>
            </a> -->
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
              >switch light</a
            >
            <a class="card-footer-item">Bri | Sat</a>
            <!-- <a class="card-footer-item" @click="switchLight(light.id, 'OFF')"
              >OFF</a
            > -->
          </footer>
        </div>
        <div 
          @click="isMessageActive = !isMessageActive"
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
        <b-message
          title="Add light"
          :active.sync="isMessageActive"
          aria-close-label="Close message"
          class="card"
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
              placeholder="color (0-10000)"
              v-model="color"
            ></b-input>
          </b-field>
          <b-field label="level" label-position="on-border">
            <b-input
              type="number"
              placeholder="level"
              v-model="level"
            ></b-input>
          </b-field>
          <b-field>
            <b-button @click="addLight" type="submit">Add</b-button>
          </b-field>
        </b-message>
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
      API_URL: "https://alyhdr.cleverapps.io/api",
      isMessageActive: false,
      lightId: "",
      status: "",
      level: "",
      color: "",
      roomId: "",
      isEmptyMessageActive: false,
      isAddBoxHidden: false
    };
  },
  methods: {
    async switchLight(index, action, DomIndex) {
      console.log(index, action, DomIndex);
      // TODO: to change
      let res = await fetch(`${this.API_URL}/lights/${index}/switch`, {
        method: "PUT",
        body: JSON.stringify({ id: index }),
        headers: { "Content-Type": "application/json" },
        mode: "cors"
      });
      let light = await res.json();
      this.lights[DomIndex].status = light.status;
      console.table(light);
    },
    async addLight() {
      console.log("add light !");
      this.isEmptyMessageActive = true;
      this.isMessageActive = false;
      // this.AddBoxHidden = true;
    }
  },

  async created() {
    let roomId = this.$route.params.id;
    console.log(roomId);
    this.roomId = roomId;
    try {
      let res = await fetch(`${this.API_URL}/rooms/${roomId}`);
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
    } catch (error) {
      console.log(error);
    }
  }
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
</style>
