import Vue from "vue";
import VueRouter from "vue-router";
import Question from "@/views/question";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Question
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
