<template>
  <Loading v-if="loading" />
  <header
    class="font-body w-screen flex flex-row justify-between items-center px-20 pt-2"
  >
    <div class="font-black text-2xl">Predict Skin Disease</div>

    <Button>Settings</Button>
  </header>
  <RouterView />
</template>

<script setup>
import Loading from "./components/Loading.vue";
import Button from "./components/Button.vue";
import api from "./api";
import { computed, onBeforeMount, onMounted, ref } from "vue";
import { useUserStore } from "./stores/user";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const { ulogin, token, LoggedIn, userInf } = useUserStore();
const loading = ref(true);
const loggedIn = ref(false);

onBeforeMount(() => {
  if (localStorage.getItem("refresh")) {
    refreshToken();
  }
});

function refreshToken() {
  api
    .post("/auth/refresh/", {
      refresh: localStorage.getItem("refresh"),
    })
    .then((res) => {
      loading.value = false;

      let token = {
        access: res.data.access,
        refresh: localStorage.getItem("refresh"),
      };

      ulogin(token);

      loggedIn.value = LoggedIn();

      router.push({ name: "home" });
    })
    .catch((err) => {
      loading.value = false;
      console.log(err);
    });
}

function log() {
  console.log(userInf, loggedIn.value);
}
</script>
