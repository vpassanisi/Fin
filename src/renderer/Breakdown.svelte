<script lang="ts">
  import { categoryMap } from "./store";
  import { transaction } from "./types";

  function total(trans: transaction[]) {
    return trans.reduce((prev, cur) => {
      return prev + +cur.amount
    },0)
  }
</script>

{#each $categoryMap as category}
  <div>{category.name}: {total(category.transactions)}</div>
{/each}