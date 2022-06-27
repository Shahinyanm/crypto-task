<template>
  <dashboard-container>
    <dashboard-ticker-add-form
      v-model="tickerToAdd"
      :processing="processing"
      @submit="addTicker"
    />
    <dashboard-ticker-search v-model="query" />
    <dashboard-ticker-list>
      <dashboard-ticker-list-item
        v-for="ticker in paginated"
        :key="ticker.from"
        :ticker="ticker"
        :history="tickers.histories[ticker.from]"
        @remove="removeTicker(ticker.from)"
      />
    </dashboard-ticker-list>
    <dashboard-ticker-pagination
      v-model="page"
      :total="searched.length"
      :shown="paginated.length"
    />
  </dashboard-container>
</template>

<script lang="ts" setup>
import { useTickerStore } from "@/lib/store/ticker";
import { computed, ref, watch } from "vue";
import DashboardContainer from "../components/DashboardContainer.vue";
import DashboardTickerAddForm from "../components/DashboardTickerAddForm.vue";
import DashboardTickerList from "../components/DashboardTickerList.vue";
import DashboardTickerListItem from "../components/DashboardTickerListItem.vue";
import DashboardTickerPagination from "../components/DashboardTickerPagination.vue";
import DashboardTickerSearch from "../components/DashboardTickerSearch.vue";

const tickers = useTickerStore();
const page = ref(1);
const query = ref("");
const tickerToAdd = ref("");
const processing = ref(false);

const searched = computed(() =>
  query.value
    ? tickers.tickers.filter(({ from }) => from.includes(query.value))
    : tickers.tickers
);

const paginated = computed(() =>
  searched.value.slice(6 * (page.value - 1), 6 * (page.value - 1) + 6)
);

watch(query, () => {
  page.value = "1";
});

const addTicker = async () => {
  if (!tickerToAdd.value) {
    return;
  }

  try {
    processing.value = true;
    await tickers.add(tickerToAdd.value);
  } catch (err) {
    console.error(err);
  } finally {
    tickerToAdd.value = "";
    processing.value = false;
  }
};

const removeTicker = async (source: string) => {
  await tickers.remove(source);
};
</script>
