<script lang="ts">
  import type { PageData } from "$lib/types";

  export let data: PageData;

  import Window from "$lib/components/window.svelte";
</script>

<Window previous={`/${data.folder}`} additionalClasses="h-full sm:h-5/6">
  <div class="w-screen max-w-2xl overflow-auto">
    <div class="p-4">
      <h1 class="text-2xl font-bold">{data.data.title}</h1>
      <p class="text-sm text-gray-700">{data.data.date}</p>
    </div>
    <section
      class="prose p-6 prose-h1:text-xl prose-h2:text-lg prose-p:text-justify"
    >
      {@html data.html}
    </section>
  </div>
</Window>
