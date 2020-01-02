import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import hueComponent from "@/components/hueComponent";
import addNewUserComponent from "@/components/addNewUserComponent";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/addNewUser",
    component: addNewUserComponent

  },
  {
    path: "/room/:id", // id is the roomID
    name: "hueComponent",
    component: hueComponent,
    beforeEnter: (to, from, next) => {
      let isLoggedIn = localStorage.getItem("isLoggedIn");
      if (isLoggedIn && isLoggedIn == "true") {
        next();
      } else {
        console.log("not logged in !");

        next("/");
      }
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
