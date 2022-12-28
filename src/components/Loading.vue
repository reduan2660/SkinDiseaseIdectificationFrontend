<template>
  <div
    class="z-50 bg-slate-100/75 fixed w-screen h-screen flex flex-col items-center justify-center"
  >
    <PulseLoader color="gray" />
  </div>
</template>

<script setup>
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
</script>
