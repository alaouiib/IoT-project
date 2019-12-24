<template>
  <div class="prompt">
    <section>
      <b-field label="Name">
        <b-input v-model="name"></b-input>
      </b-field>
      <!-- <buildingComponent :name="name"></buildingComponent> -->
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
// import buildingComponent from "./buildingComponent";
export default {
  name: "prompt",
  components: {
    // buildingComponent
  },
  data() {
    return {
      name: "hamid"
    };
  }
};
</script>
