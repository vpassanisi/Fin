<script lang="ts">
    import { months, monthFilter, filteredTransactions, categories } from './store'
</script>
  
  <div class="flex flex-col overflow-x-scroll">
    <div>
      <select
        class="bg-zinc-800 rounded border-solid border-zinc-700 border-2 outline-none"
        bind:value={$monthFilter}>
        {#each $months as month}
        <option value={month}>
          {month.name}
        </option>
        {/each}
      </select>
      <button
        class="bg-red-500 px-2 rounded"
        on:click={() => monthFilter.set(null)}>
        clear
      </button>
    </div>
    {#each $filteredTransactions as transaction, i }
      <div
        class="flex"
        class:bg-slate-800={i % 2 === 0}>
          <div class="flex-grow-0 flex-shrink-0 basis-28 p-2">{transaction.date}</div>
          <div class="flex-grow-0 flex-shrink-0 basis-20 p-2">{transaction.amount}</div>
          <select
            class="bg-inherit outline-none p-2 flex-grow-0 flex-shrink-0 basis-28"
            bind:value={transaction.category}>
            {#each $categories as category}
              <option value={category}>
                {category.name}
              </option>
            {/each}
          </select>
          <div class="flex-grow-0 flex-shrink-0 p-2 text-nowrap">{transaction.description}</div> 
      </div>
    {/each}
  </div>