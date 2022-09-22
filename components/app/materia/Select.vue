<script setup lang="ts">
import materias from '~~/data/materias'
import type { Materia } from '~~/data/materias'

const props = defineProps<{
  itemLevel: number
  ammHint?: number // amm sockets order, start at 0
}>()

const emits = defineEmits<{
  (event: 'materiaSelected', materia: Materia | undefined): void
}>()

const borderClasses = {
  socket: 'border-green',
  amm: 'border-red',
  none: 'border-gray/10',
}

const textClasses = {
  gathering: 'text-yellow',
  perception: 'text-purple',
  gp: 'text-blue',
}

const can6810 = computed(() => (props.ammHint ?? 0) <= 0)
const gathering = Object.values(materias.gathering).sort((a, b) => b.tier - a.tier)
const perception = Object.values(materias.perception).sort((a, b) => b.tier - a.tier)
const gp = Object.values(materias.gp).sort((a, b) => b.tier - a.tier)

const minItemLevel = {
  1: 15,
  2: 30,
  3: 45,
  4: 55,
  5: 160,
  6: 290,
  7: 430,
  8: 430,
  9: 560,
  10: 560,
}

function canMateria(item: Materia) {
  if (minItemLevel[item.tier] > props.itemLevel)
    return false
  if (!can6810.value && [6, 8, 10].includes(item.tier))
    return false
  return true
}

function onSelect(item: Materia) {
  if (!canMateria(item))
    return

  emits('materiaSelected', item)
}
</script>

<template>
  <Panel select-none w-md h-40 grid grid-rows-4>
    <div grid grid-cols-12 even:children="bg-gray/10">
      <div col-span-2 flex items-center justify-center>
        {{ $t.ui.stat.gathering }}
      </div>
      <div v-for="item, i in gathering" :key="i" :class="textClasses[item.type]" @click="onSelect(item)">
        <div
          w-full h-full flex items-center justify-center
          :class="[canMateria(item) ? 'hover:bg-light/20 cursor-pointer' : 'text-gray/50']"
        >
          +{{ item.value }}
        </div>
      </div>
    </div>
    <div grid grid-cols-12 even:children="bg-gray/10">
      <div col-span-2 flex items-center justify-center>
        {{ $t.ui.stat.perception }}
      </div>
      <div v-for="item, i in perception" :key="i" :class="textClasses[item.type]" @click="onSelect(item)">
        <div
          w-full h-full flex items-center justify-center
          :class="[canMateria(item) ? 'hover:bg-light/20 cursor-pointer' : 'text-gray/50']"
        >
          +{{ item.value }}
        </div>
      </div>
    </div>
    <div grid grid-cols-12 even:children="bg-gray/10">
      <div col-span-2 flex items-center justify-center>
        {{ $t.ui.stat.gp }}
      </div>
      <div v-for="item, i in gp" :key="i" :class="textClasses[item.type]" @click="onSelect(item)">
        <div
          w-full h-full flex items-center justify-center
          :class="[canMateria(item) ? 'hover:bg-light/20 cursor-pointer' : 'text-gray/50']"
        >
          +{{ item.value }}
        </div>
      </div>
    </div>
    <div
      flex items-center justify-center hover="bg-light/20 cursor-pointer"
      @click="emits('materiaSelected', undefined)"
    >
      {{ $t.ui.materia.remove }}
    </div>
  </Panel>
</template>

