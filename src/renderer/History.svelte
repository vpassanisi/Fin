<script lang="ts">
  import { months, monthFilter, filteredTransactions, categoryFilter, categories } from 'renderer/store.js'
  import TransactionRow from 'renderer/TransactionRow.svelte';
  import Select from 'renderer/components/Select.svelte'
</script>
  
<div>
  <div>
    <Select bind:value={$monthFilter}>
      {#each $months as month}
        <option value={month}>{month}</option>
      {/each}
    </Select>
    <Select bind:value={$categoryFilter}>
      <option value="All">All</option>
      {#each $categories as category }
        <option value={category}>{category}</option>
      {/each}
    </Select>
  </div>
  <div class="w-full overflow-x-scroll">
    <div class="flex border-b">
      <div class="w-28 text-center p-2 flex-none">Date</div>
      <div class="w-24 text-center p-2 flex-none">Amount</div>
      <div class="w-36 text-center p-2 flex-none">Category</div>
      <div class="text-center p-2 flex-none">Description</div>
    </div>
    {#each $filteredTransactions as transaction, i }
    <TransactionRow data={transaction} index={i} />
    {/each}
  </div>
</div>