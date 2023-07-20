import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import { useTokenStore } from "@/stores/token";
import Contacts from "@/components/contacts/Contacts.vue";
import RegistrationFee from "@/components/registration/RegistrationFee.vue";
import SocialMedia from "@/components/social-media/SocialMedia.vue";
import Jobs from "@/components/jobs/Jobs.vue";
import Teachers from "@/components/teachers/Teachers.vue";
import Schools from "@/components/schools/Schools.vue";
import AddJob from "@/components/jobs/AddJob.vue";
import UpdateJob from "@/components/jobs/UpdateJob.vue";
import AddTeacher from "@/components/teachers/AddTeacher.vue";
import UpdateTeacher from "@/components/teachers/UpdateTeacher.vue";
import UpdateRegistration from "@/components/registration/UpdateRegistration.vue";
import UpdateSchool from "@/components/schools/UpdateSchool.vue";
import Profile from "../components/user/Profile.vue";
import Facilities from "../components/facilities/Facilities.vue";
import UpdateFacilities from "../components/facilities/UpdateFacilities.vue";
import Activities from "../components/activities/Activities.vue";
import AddActivities from "../components/activities/AddActivity.vue";
import UpdateActivity from "@/components/activities/UpdateActivity.vue";
import Banners from "../components/banners/Banners.vue";
import UpdateBanner from "@/components/banners/UpdateBanner.vue";
import ImagesSlider from "@/components/images-slider/ImagesSlider.vue";
import AddImage from "@/components/images-slider/AddImage.vue";
import UpdateImage from "@/components/images-slider/UpdateImage.vue"
import Article from "@/components/articles/Article.vue";

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
        { path: "admin/profile", component: Profile },

        { path: "contacts", component: Contacts },

        { path: "article/:id", component: Article },


        { path: "social-media", component: SocialMedia },

        { path: "registration", component: RegistrationFee },
        { path: "registration/:id", component: UpdateRegistration },

        { path: "jobs", component: Jobs },
        { path: "jobs/add", component: AddJob },
        { path: "jobs/:id", component: UpdateJob },

        { path: "teachers", component: Teachers },
        { path: "teachers/add", component: AddTeacher },
        { path: "teachers/:id", component: UpdateTeacher },

        { path: "schools", component: Schools },
        { path: "schools/:id", component: UpdateSchool },

        { path: "facilities", component: Facilities },
        { path: "facilities/:id", component: UpdateFacilities },

        { path: "activities", component: Activities },
        { path: "activities/add", component: AddActivities },
        { path: "activities/:id", component: UpdateActivity },

        { path: "banners", component: Banners },
        { path: "banners/:id", component: UpdateBanner },

        { path: "image-slider", component: ImagesSlider },
        { path: "image-slider/add", component: AddImage },
        { path: "image-slider/:id", component: UpdateImage },
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
