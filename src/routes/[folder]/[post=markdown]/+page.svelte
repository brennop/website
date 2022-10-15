<script lang="ts">
import type { PageData } from '$lib/types';

export let data: PageData;

import Window from '$lib/components/window.svelte';
</script>

<Window previous={`/${data.folder}`}>
  <div class="w-screen max-w-2xl h-full sm:h-5/6">
    {data.file}
  </div>
</Window>
