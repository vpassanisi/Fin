import { get } from "svelte/store";
import { categories, policies, transactions } from "./store.js";
import { policy, transaction } from "./types.js";

export const monthMap: Record<string, string> = {
  "01": "January",
  "02": "February",
  "03": "March",
  "04": "April",
  "05": "May",
  "06": "June",
  "07": "July",
  "08": "August",
  "09": "September",
  "10": "October",
  "11": "November",
  "12": "December",
};

export async function handleDrop(e: DragEvent) {
  e.preventDefault();

  const file = e.dataTransfer?.items[0];
  if (file === undefined || file.kind !== "file") return console.log("no file");

  const data = (await file.getAsFile()?.text())?.replaceAll('"', "");
  if (data === undefined) return console.log("failed to read file");

  const dataArr = data.split("\n").filter((val) => !!val);

  const arr = dataArr.reduce<transaction[]>((prev, cur) => {
    const [date, amount, x, y, description] = cur.split(",");
    if (!date || !amount || !description) {
      console.error("failed to parse transaction");
      return prev;
    }

    const category = get(policies).reduce((prev, cur) => {
      if (prev) return prev;
      if (description.includes(cur.matches)) prev = cur.result;
      return prev;
    }, null as string | null);

    if (category) categories.update((c) => c.add(category));

    prev.push({
      id: crypto.randomUUID(),
      date,
      amount,
      description,
      category,
    });
    return prev;
  }, []);

  transactions.set(arr);
  window.electron.store.set("data", arr);
}
