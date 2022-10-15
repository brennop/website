<script lang="ts">
import type { PageData } from '$lib/types';

export let data: PageData;

import Window from '$lib/components/window.svelte';
</script>

<Window previous={`/${data.folder}`}>
  {data.file}
</Window>
