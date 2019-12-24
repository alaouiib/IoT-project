<template>
  <div class="home">
    <buildingComponent />
  </div>
</template>

<script>
// @ is an alias to /src
import buildingComponent from "@/components/buildingComponent.vue";

export default {
  name: "home",
  components: {
    buildingComponent
  }
};
</script>
