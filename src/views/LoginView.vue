<template>
  <div class="font-body w-full flex items-center justify-center mt-40">
    <!-- Card -->
    <div class="shadow-xl p-10 rounded-md flex flex-col items-center">
      <div class="text-xl font-bold">You’re not logged in</div>

      <div class="flex flex-col items-center justify-center mt-10">
        <div class="mt-4">
          <input
            class="text-lg shadow appearance-none border rounded w-full py-4 px-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Phone"
            v-model="phone"
          />
        </div>

        <div class="mt-6">
          <input
            class="text-lg shadow appearance-none border rounded w-full py-4 px-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            placeholder="Password"
            v-model="password"
          />
        </div>

        <Button @click="login"> Login </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from "../components/Button.vue";
import { ref, reactive, onMounted } from "vue";
import api from "../api";
import { useUserStore } from "../stores/user";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const { userInf, ulogin, token } = useUserStore();

const phone = ref("");
const password = ref("");

onMounted(() => {
  if (userInf.isLoggedIn) router.push("/");
});

function login() {
  console.log(phone.value, password.value);
  if (phone.value.length !== 0 && password.value.length !== 0) {
    console.log("there");
    api
      .post("/auth/login/", {
        phone: phone.value,
        password: password.value,
      })
      .then((res) => {
        ulogin(res.data);
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
</script>
