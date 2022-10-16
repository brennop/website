<script lang="ts">
  import type { PageData } from "$lib/types";

  export let data: PageData;

  $: src = new URL(`../../../../files/photos/${data.name}.jpg`, import.meta.url).href

  import Window from "$lib/components/window.svelte";
</script>

<Window previous={`/${data.folder}`}>
  <img src={src} class="max-h-[512px]"/>
</Window>
