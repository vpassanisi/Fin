<script lang='ts'>
  export let value:string = ''
</script>

<select
  class="my-4 p-1 bg-zinc-800 border-b outline-none"
  bind:value={value}>
  <slot />
</select>