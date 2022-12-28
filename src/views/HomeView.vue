<template>Home</template>

<script setup>
import Button from "../components/Button.vue";
import { ref, reactive, onMounted } from "vue";
import api from "../api";
import { useUserStore } from "../stores/user";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const { userInf, ulogin, token } = useUserStore();

onMounted(() => {
  if (userInf.isLoggedIn) router.push("/login");
});
</script>
