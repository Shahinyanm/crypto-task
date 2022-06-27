<template>
  <li class="w-full tablet:w-1/2 laptop:w-1/3 p-2">
    <div
      class="border border-gray-300 bg-white p-3 rounded-md flex items-start overflow-hidden relative"
    >
      <div class="flex-grow relative z-20">
        <h3 class="font-serif">
          {{ ticker.from }}
        </h3>
        <h2 class="text-4xl">{{ ticker.price }}$</h2>
      </div>
      <div class="relative z-20">
        <button type="button" class="text-gray-500" @click="$emit('remove')">
          <i class="fas fa-trash" />
        </button>
      </div>
      <div
        v-if="history"
        class="absolute bottom-2 right-2 left-24 top-6 flex items-end justify-end gap-1"
      >
        <div
          v-for="item in history.items"
          :key="item.timestamp"
          class="w-1/12 bg-yellow-300"
          :style="`height: ${
            ((item.value - history.min) / (history.max - history.min)) * 100 + 1
          }%`"
        />
      </div>
    </div>
  </li>
</template>

<script lang="ts" setup>
import type { Ticker } from "@/lib/crypto-compare";
import type { TickerHistory } from "@/lib/store/ticker";
import type { PropType } from "vue";

defineProps({
  ticker: {
    type: Object as PropType<Ticker>,
    required: true,
  },
  history: {
    type: Object as PropType<TickerHistory>,
  },
});

defineEmits(["remove"]);
</script>
