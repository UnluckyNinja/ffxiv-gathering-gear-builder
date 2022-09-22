<script setup lang='ts'>
import type { Food } from '~~/data/foods'

const props = defineProps<{
  food: Food
  isHQ?: boolean
}>()
</script>

<template>
  <div grid grid-cols-8 place-items-stretch class="children:(flex items-center justify-center)">
    <div col-span-1>
      {{ food.itemLevel }}
    </div>
    <div col-span-1>
      <AppItemIcon :iconID="food.icon" :isHQ="isHQ === true" />
    </div>
    <div col-span-3 text-sm>
      {{ $t.item[food.id] }}{{ isHQ ? '' : '' }}
    </div>
    <div col-span-1>
      {{ food.stats.gathering * 100 }}%
    </div>
    <div col-span-1>
      {{ food.stats.perception * 100 }}%
    </div>
    <div col-span-1>
      {{ food.stats.gp * 100 }}%
    </div>
  </div>
</template>

