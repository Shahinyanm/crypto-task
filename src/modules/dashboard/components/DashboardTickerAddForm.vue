<template>
  <header class="p-4 bg-white rounded-md">
    <form @submit.prevent="$emit('submit')">
      <div
        class="max-w-xl w-full border border-gray-300 rounded-md px-3 py-1.5 flex flex-col gap-y-0.5 shadow-sm"
      >
        <label for="ticker" class="text-sm">Тикер</label>
        <input
          v-model="value"
          :disabled="processing"
          id="ticker"
          type="text"
          placeholder="Например DOGE"
          class="outline-none disabled:bg-white disabled:text-gray-500"
        />
      </div>
      <div class="mt-3">
        <button
          class="bg-indigo-600 text-white font-serif py-3 px-6 text-sm rounded-md disabled:bg-gray-500"
          :disabled="processing"
          type="submit"
        >
          Добавить
        </button>
      </div>
    </form>
  </header>
</template>

<script lang="ts" setup>
import { computed } from "@vue/reactivity";

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  processing: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue", "submit"]);

const value = computed({
  get: () => props.modelValue,
  set: (v: string) => emit("update:modelValue", v),
});
</script>
