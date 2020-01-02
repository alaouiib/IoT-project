<template>
  <div id="app">
    <nav
      class="navbar is-light "
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item">
          <img
            style="margin-left:-1px;margin-right:3px;"
            src="https://img.icons8.com/color/48/000000/arduino.png"
          />
          Smart<b>HUB</b>
        </router-link>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <a class="buttons">
            <router-link to="/addNewUser" class="button is-primary">
              <strong>Add homie</strong>
            </router-link>
            <a @click="disconnect" class="button is-light">
              Logout
            </a>
          </a>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  methods: {
    disconnect() {
      localStorage.clear();
      location.reload();
    }
  }
};
</script>
<style></style>
