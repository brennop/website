<script lang="ts">
  import { draggable } from "$lib/actions/draggable";

  export let previous;

  let handle: HTMLElement;
</script>

<div
  class="absolute left-0 top-0 flex resize flex-col border-2 border-black bg-white shadow-xl md:top-8 md:left-32"
  use:draggable={{ handle }}
>
  <div
    class="flex items-center justify-end border-b-2 border-black bg-black
    p-1"
    bind:this={handle}
  >
    <a
      href={previous}
      class="grid h-4 w-4 cursor-pointer place-items-center bg-white leading-none text-black"
    >
      <span>×</span></a
    >
  </div>
  <div class="content">
    <slot />
  </div>
</div>
