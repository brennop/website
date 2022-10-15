<script lang="ts">
  import "../app.css";

  import type { PageData } from '$lib/types';

  import Icon from '$lib/components/icon.svelte';

  export let data: PageData;
</script>

<main class="h-screen w-screen flex flex-col font-serif overflow-hidden">
  <nav class="h-10 p-2 bg-white border-b-2 border-gray-900 flex justify-between">
    <div class="flex items-center">
      <img src="/desktop.gif" class="w-5 h-5 mr-2" />
      <div class="relative">
        <img src="/sparks.gif" class="absolute w-full h-full" />
        <span class="shadow-sky-300 text-shadow-lg text-sky-500/80 bg-clip-text bg-bottom bg-[url('/glitter.gif')]">
          brennim
        </span>
      </div>
    </div>
    <div class="flex items-center">
      <span>17:38</span>
    </div>
  </nav>

  <div class="relative bg-sky-400 flex-1 p-2 flex flex-col flex-wrap items-start">
    {#each data.files as file}
      <Icon path={file} name={file} />
    {/each}

    <slot />
  </div>
</main>
