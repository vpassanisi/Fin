<script lang="ts">
    import { months, monthFilter, categories, transactionsMap } from './store'
    import { saveTransactions } from './utils';

    function handldeCategoryChange() {
      saveTransactions($transactionsMap)
      transactionsMap.set($transactionsMap)
    }
</script>
  
  <div class="flex flex-col overflow-x-scroll">
    <div>
      <select
        class="my-4 bg-zinc-800 rounded border-solid border-zinc-700 border-2 outline-none"
        bind:value={$monthFilter}>
        {#each $months as month}
        <option value={month}>
          {month}
        </option>
        {/each}
      </select>
    </div>
    {#each $transactionsMap[$monthFilter] ?? [] as transaction, i }
      <div
        class="flex"
        class:bg-slate-800={i % 2 === 0}>
          <div class="flex-grow-0 flex-shrink-0 basis-28 p-2">{transaction.date}</div>
          <div class="flex-grow-0 flex-shrink-0 basis-20 p-2">{transaction.amount}</div>
          <select
            class="bg-inherit outline-none p-2 flex-grow-0 flex-shrink-0 basis-28"
            bind:value={transaction.category}
            on:change={() => handldeCategoryChange()}>
            {#each $categories as category}
              <option value={category}>
                {category}
              </option>
            {/each}
          </select>
          <div class="flex-grow-0 flex-shrink-0 p-2 text-nowrap">{transaction.description}</div> 
      </div>
    {/each}
  </div>