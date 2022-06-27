import { useLocalStorage } from "@vueuse/core";
import { isNumber } from "lodash";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { CryptoCompareConnection, type Ticker } from "../crypto-compare";

export interface TickerHistoryItem {
  timestamp: number;
  value: number;
}

export interface TickerHistory extends Ticker {
  max: number;
  min: number;
  items: TickerHistoryItem[];
}

export const useTickerStore = defineStore("ticker", () => {
  const connection = new CryptoCompareConnection(
    import.meta.env.VITE_CRYPTO_COMPARE_API_KEY
  );

  const tickers = useLocalStorage<Ticker[]>("tickers", []);
  const histories = ref<Record<string, TickerHistory>>({});

  const map = computed(() =>
    tickers.value.reduce((agg, cur, i) => {
      agg[cur.from] = i;

      return agg;
    }, {} as Record<string, number>)
  );

  const setTicker = (ticker: Ticker) => {
    const index = map.value[ticker.from];

    if (isNumber(index)) {
      tickers.value[map.value[ticker.from]] = ticker;
    } else {
      tickers.value.unshift(ticker);
    }

    const history = histories.value[ticker.from];

    if (history) {
      histories.value[ticker.from].max = Math.max(history.max, ticker.price);
      histories.value[ticker.from].min = Math.min(history.min, ticker.price);

      if (history.items[history.items.length - 1] === ticker.price) {
        return;
      }

      history.items =
        history.items.length > 6
          ? [
              ...history.items.splice(1),
              { timestamp: Date.now(), value: ticker.price },
            ]
          : [...history.items, { timestamp: Date.now(), value: ticker.price }];
    } else {
      histories.value[ticker.from] = {
        max: ticker.price,
        min: ticker.price,
        items: [{ timestamp: Date.now(), value: ticker.price }],
      };
    }
  };

  connection.subscribe(
    ...tickers.value.map((ticker, i) => ({
      from: ticker.from,
      to: "USD",
      success: setTicker,
    }))
  );

  const add = (source: string) => {
    if (isNumber(map.value[source])) {
      return Promise.reject("Already subscribed!");
    }

    return new Promise(
      async (res, rej) =>
        await connection.subscribe({
          from: source,
          to: "USD",
          success: (t) => {
            setTicker(t);
            res(t);
          },
          error: (err) => {
            rej(err);
          },
        })
    );
  };

  const remove = async (source: string) => {
    await connection.unsubscribe({
      from: source,
      to: "USD",
    });

    tickers.value = tickers.value.filter(({ from }) => from !== source);
  };

  return {
    add,
    remove,
    tickers,
    histories,
  };
});
