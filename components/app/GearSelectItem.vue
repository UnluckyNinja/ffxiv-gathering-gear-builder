<script setup lang='ts'>
import type { Gear } from '~~/data/gears'

const props = defineProps<{
  gear: Gear
  isHQ?: boolean
}>()

const gear = computed(() => {
  return props.gear
})
</script>

<template>
  <div grid grid-cols-11 place-items-stretch class="children:(flex items-center justify-center)">
    <div>
      <AppItemIcon :iconID="gear.icon" :isHQ="isHQ === true" />
    </div>
    <div>{{ gear.equipLevel }}</div>
    <div>{{ gear.itemLevel }}</div>
    <div col-span-3>
      {{ $t.item[gear.id] }}{{ isHQ ? '' : '' }}
    </div>
    <div col-span-1 text-xl>
      {{ '○'.repeat(gear.socketCount) }}
    </div>
    <div col-span-1 :class="[gear.canOvermeld ? 'text-green' : 'text-red']">
      {{ gear.canOvermeld ? '✓' : '×' }}
    </div>
    <div>{{ isHQ ? gear.statsHQ.gathering : gear.stats.gathering }}</div>
    <div>{{ isHQ ? gear.statsHQ.perception : gear.stats.perception }}</div>
    <div>{{ isHQ ? gear.statsHQ.gp : gear.stats.gp }}</div>
  </div>
</template>
