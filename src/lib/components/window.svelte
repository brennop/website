<script lang="ts">
import { draggable } from "$lib/actions/draggable";

export let previous;

let handle: HTMLElement;

</script>

<div class="window"
  use:draggable={{ handle }}
>
  <div class="header" bind:this={handle}>
    <a href={previous} class="close"><span>×</span></a>
  </div>
  <div class="content">
    <slot></slot>
  </div>
</div>

<style>
.window {
  position: absolute;
  width: 600px;
  height: 400px;

  border: 2px solid #000;
}

.header {
  height: 24px;
  padding: 0 4px;
  background: #000;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.close {
  width: 16px;
  height: 16px;
  padding: 0;
  background: #fff;
  color: #000;
  border: none;
  cursor: pointer;
  display: grid;
  place-items: center;
}

.close span {
  line-height: 0;
}
</style>
