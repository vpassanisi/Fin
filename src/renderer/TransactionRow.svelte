<script lang="ts">
  import { categories, transactions } from "./store.js";
    import { transaction } from "./types.js";
    import XmarkIcon from './xmark-solid.svelte'

  export let data: transaction;
  export let index: number;

  function handleCategoryChange() {
    transactions.set($transactions)
    window.electron.store.set("data", $transactions);
  }
</script>

<div class="flex" class:bg-slate-800={index % 2 === 0}>
    <div class="flex-none text-center w-28 p-2">{data.date}</div>
    <div class="flex-none text-center w-24 p-2">{data.amount}</div>
    <div class="flex w-36 flex-none">
      <select
        class="bg-inherit outline-none p-2 w-full"
        bind:value={data.category}
        on:change={() => handleCategoryChange()}>
        {#each $categories as category}
          <option value={category}>
            {category}
          </option>
        {/each}
      </select>
      <!-- svelte-ignore a11y-missing-attribute -->
      <button
        class="w-6 m-2 px-1 rounded bg-red-500"
        on:click={() => data.category = null}
        on:click={() => handleCategoryChange()}>
        <XmarkIcon />
      </button>
    </div>
    <div class="w-full p-2 text-nowrap overflow-scroll">{data.description}</div>
</div>
