<template>
  <div class="w-full flex flex-col items-center mt-20">
    <div>
      <input
        type="file"
        accept="image/*"
        @change="previewImage"
        class="form-control-file shadow-lg px-6 py-2 rounded"
        id="my-file"
      />
    </div>

    <div class="border p-2 mt-3">
      <template v-if="preview">
        <div
          class="w-96 h-96 imgcenter"
          v-bind:style="{
            'background-image': 'url(' + preview + ') ',
          }"
        ></div>
        <!-- <img :src="preview" class="img-fluid" /> -->
      </template>
    </div>

    <Button v-if="preview" @click="predict"
      >{{ uploadLabel }}
      <span><PulseLoader :loading="loading" :color="`#ffffff`" /></span
    ></Button>

    <div>
      <Modal v-model="show" @confirm="confirm">
        <div class="text-lg font-bold font-body">Detected: {{ result }}</div>
        <div class="text-lg font-bold font-body">
          Treatment: {{ treatment }}
        </div>
      </Modal>
    </div>
  </div>
</template>

<script setup>
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import Button from "../components/Button.vue";
import Modal from "../components/Modal.vue";
import { ref, reactive, onMounted } from "vue";
import api from "../api";
import { useUserStore } from "../stores/user";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const { userInf, ulogin, token } = useUserStore();

const preview = ref(null);
const image = ref(null);
const uploadLabel = ref("Upload");
const result = ref("");
const treatment = ref("");
const show = ref(false);
const loading = ref(false);

function previewImage(event) {
  let input = event.target;
  if (input.files) {
    let reader = new FileReader();
    reader.onload = (e) => {
      preview.value = e.target.result;
    };
    image.value = input.files[0];

    reader.readAsDataURL(input.files[0]);
  }
}

function confirm() {
  show.value = false;
}
onMounted(() => {
  // if (userInf.isLoggedIn) router.push("/login");
});

function predict() {
  loading.value = true;
  uploadLabel.value = "Uploading";
  result.value = "";
  let dataToPost = new FormData();
  dataToPost.append("image", image.value);
  api
    .post("/predict/", dataToPost, {
      headers: {
        Authorization: `Bearer ${token.access}`,
      },
    })
    .then((res) => {
      // console.log(res.data);
      uploadLabel.value = "Upload";
      result.value = res.data.disease;
      treatment.value = res.data.treatment;
      show.value = true;
      loading.value = false;
    })
    .catch((err) => {
      console.log(err);
      loading.value = false;
    });
}
</script>

<style scoped>
.imgcenter {
  background-position: center;
  background-size: cover;
}
</style>
