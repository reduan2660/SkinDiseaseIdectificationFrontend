<template>
  <vue-final-modal
    v-slot="{ params, close }"
    v-bind="$attrs"
    classes="modal-container"
    content-class="modal-content"
  >
    <div class="modal__content">
      <slot :params="params"></slot>
    </div>
    <div
      class="flex flex-col items-center bg-gradient-to-r from-cyan-500 to-blue-500 px-10 py-2 rounded mt-6 hover:shadow-lg transition-all duration-200 text-white"
    >
      <Button class="text-xl" @click="$emit('confirm', close)">Confirm</Button>
    </div>
  </vue-final-modal>
</template>

<script>
import Button from "./Button.vue";
export default {
  name: "CustomModal",
  inheritAttrs: false,
  emits: ["confirm", "cancel"],
};
</script>

<style scoped>
::v-deep(.modal-container) {
  display: flex;
  justify-content: center;
  align-items: center;
}
::v-deep(.modal-content) {
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: 90%;
  margin: 0 1rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  background: #fff;
}
.modal__title {
  margin: 0 2rem 0 0;
  font-size: 1.5rem;
  font-weight: 700;
}
.modal__content {
  flex-grow: 1;
  overflow-y: auto;
}
.modal__action {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  padding: 1rem 0 0;
}
.modal__close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}
</style>
