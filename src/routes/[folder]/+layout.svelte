<script lang="ts">
import type { PageData } from '$lib/types';

import Window from '$lib/components/window.svelte';
import Icon from '$lib/components/icon.svelte';

export let data: PageData;
</script>

<Window previous="/" additionalClasses="w-screen max-w-2xl h-full sm:h-96">
	<ul class="grid sm:grid-cols-5 grid-cols-3 place-items-center gap-4 p-2">
    {#each data.files as file (file.name)}
      <Icon {...file} />
    {/each}
	</ul>
</Window>

<slot />
