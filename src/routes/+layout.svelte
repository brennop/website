<script lang="ts">
  import "../app.css";

  import type { PageData } from "$lib/types";

  import Icon from "$lib/components/icon.svelte";

  export let data: PageData;
</script>

<main class="flex h-screen w-screen flex-col overflow-hidden font-serif">
  <nav
    class="flex h-10 justify-between border-b-2 border-gray-900 bg-white p-2"
  >
    <div class="flex items-center">
      <img src="/desktop.gif" class="mr-2 h-5 w-5" />
      <div class="relative">
        <img src="/sparks.gif" class="absolute h-full w-full" />
        <span
          class="text-shadow-lg bg-[url('/glitter.gif')] bg-clip-text bg-bottom text-sky-500/80 shadow-sky-300"
        >
          brennim
        </span>
      </div>
    </div>
    <div class="flex items-center">
      <span>17:38</span>
    </div>
  </nav>

  <div
    class="relative flex flex-1 flex-col flex-wrap items-start bg-sky-400 p-2"
  >
    {#each data.files as file (file.name)}
      <Icon {...file} />
    {/each}

    <slot />
  </div>
</main>
