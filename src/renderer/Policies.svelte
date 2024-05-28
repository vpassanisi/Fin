<script lang="ts">
import { policies } from 'renderer/store.js'
import { policy } from 'renderer/types.js';
import Input from 'renderer/components/Input.svelte'

let newPolicy: policy = {
  matches: '',
  result: ''
}

function addPolicy() {
  policies.update(p => {
    p.push({...newPolicy})
    return p
  })
  newPolicy.matches = ''
  newPolicy.result = ''

  window.electron.store.set('policies', $policies)
}

function deletePolicy(i: number) {
  policies.update(p => {
    p.splice(i, 1)
    return p
  })
  window.electron.store.set('policies', $policies)
}
</script>

<div class="mb-8">
  <div>Policies</div>
  <div class="flex mb-4">
    <Input bind:value={newPolicy.matches} />
    ->
    <Input bind:value={newPolicy.result} />
  </div>
  <button
    class="bg-green-500 px-2 rounded"
    on:click={addPolicy}>
    Add
  </button>
  {#each $policies as policy, i}
    <div class="mb-4">
      <div class="inline-block">{policy.matches}</div>
      ->
      <div class="inline-block">{policy.result}</div>
      <button
        class="inline bg-red-500 px-2 rounded"
        on:click={() => deletePolicy(i)}>
        X
      </button>
    </div>
  {/each}
</div>