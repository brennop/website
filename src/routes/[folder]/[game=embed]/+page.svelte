<script lang="ts">
  import type { PageData } from "$lib/types";

  export let data: PageData;

  import Window from "$lib/components/window.svelte";
</script>

<Window previous={`/${data.folder}`}>
  <iframe
    width={data.width}
    height={data.height}
    src={data.url}
    frameBorder="0"
    allowFullScreen
  />
</Window>
