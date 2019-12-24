<template>
  <div class="buildingComponent">
    <!-- <div class="modal">
  <div class="modal-background"></div>
  <div class="modal-content">
    
  </div>
  <button class="modal-close is-large" aria-label="close"></button>
</div> -->
    <section class="section">
      <div class="container" ref="element">
        <div class="card" v-for="(room, i) in rooms" :key="i">
          <header class="card-header">
            <p class="card-header-title">{{ room.name }}</p>
            <a
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
              <b-input placeholder="floor number" type='number' v-model="floor"></b-input>
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
export default {
  data() {
    return {
      rooms: {},
      API_URL: "https://alyhdr.cleverapps.io/api",
      isActive: true,
      isMessageActive: false,
      roomName: "",
      roomId: "",
      floor: "",
      isAddBoxHidden: false
    };
  },
  methods: {
    async addRoom() {
      console.log(this.roomName, this.roomId);
      this.isMessageActive = false;
      this.isAddBoxHidden = false;
      let body = {
        floor: this.floor,
        lights: [
          // {
          //   color: 23123,
          //   id: 1,
          //   level: 3,
          //   roomId: 1,
          //   status: "ON"
          // }
        ],
        name: this.roomName
      };

      try {
        let resp = await fetch(`${this.API_URL}/rooms`, {
          method: "POST",
          body: JSON.stringify(body),
          headers: { "Content-Type": "application/json" },
          mode: "cors",
          credentials: "omit"
        });
        let data = await resp.json();
        body.id = data.id;
        this.rooms.push(body);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
    async removeRoom(roomId, i) {
      try {
        const loadingComponent = this.$buefy.loading.open({
          container: this.$refs.element.$el
        });
        await fetch(`${this.API_URL}/rooms/${roomId}`, {
          body: null,
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          mode: "cors",
          credentials: "omit"
        });
        loadingComponent.close();
        console.log("deleted succ !");
      } catch (error) {
        console.log(error);
      }
      this.rooms.splice(i, 1);
    },
    async redirect(index) {
      this.$router.push("/room/" + index);
    }
  },
  async created() {
    var res = await fetch(`${this.API_URL}/rooms`);
    var data = await res.json();
    console.table(data);
    this.rooms = data;
    // this.rooms.forEach(room => {

    // });
  }
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
</style>
