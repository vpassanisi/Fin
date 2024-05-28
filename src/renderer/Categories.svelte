<script lang="ts">
    import { categories, transactions } from './store.js'
    import Input from 'renderer/components/Input.svelte'

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
            trans.forEach((cur, i , arr) => {
                if (cur.category === name) arr[i]!.category = null
            })
            return trans
        })
    }
</script>

<div class="py-4">
    <Input bind:value={newCategory} />
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