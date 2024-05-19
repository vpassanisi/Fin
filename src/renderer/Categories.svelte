<script lang="ts">
    import { categories } from './store'

    let newCategory:string

    function add(name: string) {
        categories.update((value) => {
            value.push({name, transactions: []})
            newCategory = ''
            return value
        })
    }

    function remove(name: string) {
        categories.update(value => {
            const i = value.findIndex(val => val.name === name)
            if (i === -1) return value
            else value.splice(i, 1)
            return value
        })
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
            <div class="mx-2">{category.name}</div>
            <button
                class="bg-red-500 px-2 rounded"
                on:click={() => remove(category.name)}>
                X
            </button>
        </div>
    {/each}
</div>