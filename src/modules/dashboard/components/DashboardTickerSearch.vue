<template>
  <div>
    <div
      class="bg-white flex max-w-[24rem] border border-gray-300 rounded-md shadow-sm gap-x-0.5"
    >
      <div class="p-2 flex justify-center items-center">
        <i class="fas fa-search text-gray-400" />
      </div>
      <input
        v-model="value"
        type="text"
        class="outline-none"
        placeholder="Найти тикер"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "@vue/reactivity";

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const value = computed({
  get: () => props.modelValue,
  set: (v: string) => emit("update:modelValue", v),
});
</script>
