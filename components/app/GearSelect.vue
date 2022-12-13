<script setup lang='ts'>
import type { GearType } from '~~/composables/store/gearset'
import gears from '~~/data/gears'

const props = defineProps<{
  type: GearType
}>()

const emits = defineEmits<{
  (event: 'gearSelected', info: { itemID: string; isHQ: boolean }): void
}>()

const sortedGears = computed(() => {
  const items = Object.values(gears).filter(gear => gear.slot === props.type)
  return items.sort((a, b) => b.itemLevel - a.itemLevel)
})

const selectGear = (itemID: string, isHQ: boolean) => {
  emits('gearSelected', { itemID, isHQ })
}
</script>

<template>
  <Panel text-sm w-xl>
    <!-- HEAD -->
    <div leading-8 shadow grid grid-cols-11 even:children="bg-gray/10">
      <div>{{ $t.ui.gearselect.icon }}</div>
      <div>{{ $t.ui.gearselect.level }}</div>
      <div>{{ $t.ui.gearselect.itemLevel }}</div>
      <div col-span-3>
        {{ $t.ui.gearselect.name }}
      </div>
      <div col-span-1>
        {{ $t.ui.gearselect.sockets }}
      </div>
      <div col-span-1>
        {{ $t.ui.gearselect.amm }}
      </div>
      <div>{{ $t.ui.gearselect.gathering }}</div>
      <div>{{ $t.ui.gearselect.perception }}</div>
      <div>{{ $t.ui.gearselect.gp }}</div>
    </div>
    <!-- body -->
    <div max-h-xs overflow-y-overlay class="custom-scrollbar">
      <template v-for="gear, i in sortedGears" :key="i">
        <AppGearSelectItem v-if="gear.canBeHQ" even:children="bg-gray/10" hover="bg-dark/50 cursor-pointer" :gear="gear" isHQ @click="selectGear(gear.id, true)" />
        <AppGearSelectItem even:children="bg-gray/10" hover="bg-dark/50 cursor-pointer" :gear="gear" @click="selectGear(gear.id, false)" />
      </template>
    </div>
  </Panel>
</template>

<style>
</style>
