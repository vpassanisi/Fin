<script lang="ts">
    import { categories, transactions } from './store'
    import { saveTransactions } from './utils';

    let newCategory:string

    function add(name: string) {
        categories.update(cat => {
            cat.add(name)
            return cat
        })
        newCategory = ''
    }

    function remove(name: string) {
        categories.update(cat => {
            cat.delete(name)
            return cat
        })
        transactions.update(trans => {
            trans.forEach((cur, i, arr) => {
                if (cur.category === name) arr[i]!.category = null
            })
            return trans
        })
        saveTransactions($transactions)
    }
</script>

<div class="py-4">
    <input
        class="bg-zinc-800 rounded border-solid border-zinc-700 border-2 outline-none px-2"
        type="text"
        bind:value={newCategory}>
    <button
        class="bg-green-500 px-2 rounded"
        on:click={() => add(newCategory)}>
        add
    </button>
    {#each $categories as category }
        <div class="flex">
            <div class="mx-2">{category}</div>
            <button
                class="bg-red-500 px-2 rounded"
                on:click={() => remove(category)}>
                X
            </button>
        </div>
    {/each}
</div>