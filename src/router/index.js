import LoginView from "@/views/authenticate/LoginView.vue";
import RegisterView from "@/views/authenticate/RegisterView.vue";
import HomeView from "@/views/home/HomeView.vue";
import AuthenticatesLayout from "../../layouts/AuthenticatesLayout.vue";

import DetailFoodView from "@/views/detail/DetailFoodView.vue";
import { createRouter, createWebHistory } from "vue-router";
import DetailFoodReceipeView from "@/views/detail/DetailFoodReceipeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path : '/',
      name : 'home',
      component : HomeView,
    },
    {
      path : '/auth',
      component : AuthenticatesLayout,
      children : [
        {
          path : 'login',
          name : "login",
          component : LoginView,
        },
        {
          path : 'register',
          name : "register",
          component : RegisterView
        }
      ]
    },
    {
      path : '/food/detail',
      name : "food",
      children : [
        {
          path : ':food',
          name : "detail-food",
          component : DetailFoodView
        },
        {
          path : ':food/receipe/:id',
          name : "food-receipe",
          component : DetailFoodReceipeView
        }
      ]
    }
   
  ],
});

export default router;
