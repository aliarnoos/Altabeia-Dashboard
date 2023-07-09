import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import { useTokenStore } from "@/stores/token";
import Contacts from "@/components/contacts/Contacts.vue";
import RegistrationFee from "@/components/registration/RegistrationFee.vue";
import SocialMedia from "@/components/social-media/SocialMedia.vue";
import Jobs from "@/components/jobs/Jobs.vue";
import Teachers from "@/components/teachers/Teachers.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/",
      name: "home",
      component: HomeView,
      children: [
        { path: "contacts", component: Contacts },
        { path: "social-media", component: SocialMedia },
        { path: "registration", component: RegistrationFee },
        { path: "jobs", component: Jobs },
        { path: "teachers", component: Teachers },
      ],
    },
  ],
});

router.beforeEach(async (to, from) => {
  const tokenStore = useTokenStore();
  const tokenValidation = tokenStore.validateToken();
  if (!tokenValidation && to.name !== "login") {
    // redirect the user to the login page
    return { name: "login" };
  }
});

export default router;
