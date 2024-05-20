import { writable, derived } from "svelte/store";
import { monthMap } from "./utils";
import type { transaction, month, category, transactionMapType } from "./types";

export const transactionsMap = writable<transactionMapType>({});

export const months = derived(transactionsMap, (val) => Object.keys(val));

export const monthFilter = writable<string>("");

export const categories = writable<Set<string>>(new Set());

export const categoryMap = derived(
  [transactionsMap, monthFilter],
  (val) => {
    const [transMap, selectedMonth] = val;

    const currentMonth = transMap[selectedMonth];
    if (!currentMonth) return [];

    return currentMonth.reduce<category[]>((prev, cur) => {
      const { category } = cur;
      if (!category) return prev;

      const exists = prev.find((val) => val.name === category);
      if (exists) exists.transactions.push(cur);
      else {
        prev.push({
          name: category,
          transactions: [cur],
        });
      }
      return prev;
    }, []);
  },
  []
);
