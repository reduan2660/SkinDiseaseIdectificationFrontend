<template>
  <div class="font-body w-full flex items-center justify-center mt-40">
    <!-- Card -->
    <div class="shadow-xl p-10 rounded-md flex flex-col items-center">
      <div class="text-xl font-bold">Register</div>

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

        <div class="mt-6">
          <input
            class="text-lg shadow appearance-none border rounded w-full py-4 px-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            placeholder="Repeat Password"
            v-model="rpassword"
          />
        </div>

        <Button @click="register">
          <span v-if="!loading"> Sign Up </span>
          <PulseLoader :loading="loading" :color="`#ffffff`"
        /></Button>

        <div class="text-md mt-4">
          Already have an account?
          <span
            class="text-blue-400 cursor-pointer"
            @click="router.push('/login')"
            >Login Here</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import { useToast } from "vue-toastification";
import "vue-toastification/dist/index.css";
import Button from "../components/Button.vue";
import { ref, reactive, onMounted } from "vue";
import api from "../api";
import { useUserStore } from "../stores/user";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const { userInf, ulogin, token } = useUserStore();
const loading = ref(false);

const toast = useToast();

const phone = ref("");
const password = ref("");
const rpassword = ref("");

onMounted(() => {
  if (userInf.isLoggedIn) router.push("/");
});

function register() {
  if (phone.value.length !== 0 && password.value.length !== 0) {
    if (rpassword.value != password.value) {
      toast("Password must Macth");
    } else {
      // Registration

      loading.value = true;
      api
        .post("/auth/register/", {
          phone: phone.value,
          password: password.value,
        })
        .then((res) => {
          toast("Successfully Registered");
          router.push("/login");
          loading.value = false;
        })
        .catch((err) => {
          for (let item in err.response.data) {
            toast(err.response.data[item][0]);
          }
          console.log(err);
          loading.value = false;
        });
    }
  } else {
    toast("Enter a valid phone & password");
  }
}
</script>
