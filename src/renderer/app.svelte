<script lang="ts">
    import "./index.css";
    import { transactions, policies, categories } from 'renderer/store.js'
    import History from 'renderer/History.svelte'
    import Categories from 'renderer/Categories.svelte'
    import Policies from "renderer/Policies.svelte";
    import { onMount } from "svelte";
    import Breakdown from "renderer/Breakdown.svelte";
    import { policy, transaction } from "renderer/types.js";
    import { handleDrop } from "renderer/utils.js";

    onMount(() => {
        const data: transaction[] = window.electron.store.get('data')
        if (data) {
            transactions.set(data)
            data.forEach(d => categories.update(c => {
                if (d.category) c.add(d.category)
                return c
            }))
        }

        const policiesData: policy[] = window.electron.store.get('policies')
        if (policiesData) policies.set(policiesData)
    })
  
  </script>
  
  <div class="p-8 h-full w-full bg-slate-900 text-white">
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
        class="bg-green-500 h-32 w-32 rounded my-4"
        on:drop={handleDrop}
        on:dragover={(ev) => { ev.preventDefault() }}
        on:click={() => console.log()} />
    <Policies />
    <Breakdown />
    <Categories />
    <History />
  </div>