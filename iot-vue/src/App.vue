<template>
  <div id="app">
    <nav class="navbar is-light "  role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item">
          <img
            style="margin-left:-1px;margin-right:3px;"
            src="https://img.icons8.com/color/48/000000/arduino.png"
          />
          Smart<b>HUB</b>
        </router-link>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<style></style>
