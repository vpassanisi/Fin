import { writable, derived } from "svelte/store";
import { monthMap } from "./utils.js";
import type { category, policy, transaction } from "./types.js";

export const transactions = writable<transaction[]>([]);

export const monthFilter = writable<string>("");

export const months = derived(transactions, (val) => {
  return val.reduce((prev, cur, i) => {
    const [month, day, year] = cur.date.split("/");
    if (!month || !year) return prev;

    const dateCode = `${monthMap[month]} ${year}`;

    if (i === 0) monthFilter.set(dateCode);

    prev.add(dateCode);
    return prev;
  }, new Set());
});

export const categories = writable<Set<string>>(new Set());

export const categoryFilter = writable('All');

export const policies = writable<policy[]>([]);

export const filteredTransactions = derived(
  [transactions, monthFilter, categoryFilter],
  (dep) => {
    const [transactions, monthFilter, categoryFilter] = dep;

    return transactions.reduce<transaction[]>((prev, cur) => {
      const [month, day, year] = cur.date.split("/");
      if (!month || !year) return prev;
      if (monthFilter !== `${monthMap[month]} ${year}`) return prev
      if (categoryFilter !== 'All' && categoryFilter !== cur.category) return prev

      prev.push(cur);
      return prev;
    }, []);
  },
  []
);

export const categoryMap = derived(
  filteredTransactions,
  (val) => {
    return val.reduce<category[]>((prev, cur) => {
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
