<script setup lang="ts">
const slots = [1, 2, 3, 4, 5];
const stats = {
  ga: ' 123\n/123',
  pe: ' 123\n/123',
  gp: ' 123\n/123',
};
</script>

<template>
  <div p-1 rounded flex="~ row" items-center>
    <div mx-2>590</div>
    <div mx-1 v-for="i in slots" w-6 h-6 flex-none border-2 rounded-full></div>
    <div flex="~ row" text-sm>
      <div m-1 whitespace-pre>{{ stats.ga }}</div>
      <div m-1 whitespace-pre>{{ stats.pe }}</div>
      <div m-1 whitespace-pre>{{ stats.gp }}</div>
    </div>
  </div>
</template>
