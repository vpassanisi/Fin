<script lang="ts">
  import { categoryMap, filteredTransactions } from "./store.js";
  import { transaction } from "./types.js";

  function total(trans: transaction[]) {
    return trans.reduce((prev, cur) => {
      return (parseFloat(prev) + parseFloat(cur.amount)).toFixed(2)
    },'0')
  }
</script>

{#each $categoryMap as category}
  <div>{category.name}: {total(category.transactions)}</div>
{/each}
<div class="border-b mb-4">
  All Categorized: {total($filteredTransactions.filter(t => t.category !== null))}
</div>
<div>
  All Uncategorized: {total($filteredTransactions.filter(t => t.category === null))}
</div>
<div>All Transactions: {total($filteredTransactions)}</div>