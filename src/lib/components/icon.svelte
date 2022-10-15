<script lang="ts">
  export let path: string;
  export let name: string;

  // TODO: remove from here
  function getEmoji(file: string) {
    const [_, extension] = file.split(".");

    switch (extension) {
      case "md":
        return "📝";
      case "exe":
        return "💻";
      case "txt":
        return "📄";
      case "jpg":
        return "🖼️";
      default:
        return "📁";
    }
  }

  const emoji = getEmoji(name);

  // TODO add first like
  /* {first && ( */
  /*   <span class="absolute top-0 right-0 animate-pulse">🆕</span> */
  /* )} */
</script>

<li>
  <a
    href={path}
    class="relative p-2 flex flex-col items-center w-20 select-none cursor-pointer"
  >
    <div class="text-3xl">{emoji}</div>
    <span class="text-sm bg-white">{name}</span>
  </a>
</li>
