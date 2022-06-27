<template>
  <div class="border-b border-gray-300" />
  <footer class="flex gap-4 items-center justify-center">
    <div class="hidden flex-grow tablet:block">
      Показано {{ shown }} результатов из
      {{ total }}
    </div>
    <div class="flex-grow tablet:flex-grow-0 flex justify-between gap-2">
      <button
        v-if="page > 1"
        type="button"
        class="border text-sm border-gray-300 text-gray-700 py-2 px-3 bg-white rounded-md font-serif"
        @click="page -= 1"
      >
        Назад
      </button>
      <div class="flex-grow" />
      <button
        v-if="page < Math.ceil(total / 6)"
        type="button"
        class="border text-sm border-gray-300 text-gray-700 py-2 px-3 bg-white rounded-md font-serif"
        @click="page += 1"
      >
        Вперед
      </button>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import { computed } from "@vue/reactivity";

const props = defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  shown: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const page = computed({
  get: () => props.modelValue,
  set: (v: number) => emit("update:modelValue", v),
});
</script>
