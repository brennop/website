<script lang="ts">
import type { PageData } from '$lib/types';

export let data: PageData;

import Window from '$lib/components/window.svelte';
</script>

<Window previous="/">
	<div>
    {#each data.files as file}
      <a href={file.path}>{file.name}</a>
    {/each}
	</div>
</Window>

<slot />
