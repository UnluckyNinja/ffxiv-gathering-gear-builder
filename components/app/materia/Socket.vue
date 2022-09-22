<script setup lang="ts">
import type { Gear } from '~~/data/gears'
import type { Materia } from '~~/data/materias'

const props = defineProps<{
  type: 'socket' | 'amm' | 'none'
  materia: Materia | null
}>()

const borderStyles = {
  socket: 'border-green',
  amm: 'border-red',
  none: 'border-gray/10',
}

const textStyles = {
  gathering: 'text-yellow',
  perception: 'text-purple',
  gp: 'text-blue',
}

const socketClass = computed(() => {
  return borderStyles[props.type]
})
const labelClass = computed(() => {
  return props.materia ? textStyles[props.materia.type] : ''
})
</script>

<template>
  <div flex flex-col h-full items-center justify-around text-sm :class="[type === 'none' ? 'text-gray' : labelClass]">
    <div
      border-2 rounded-full w-6 h-6 m-auto
      row-span-2
      :class="[socketClass]"
    >
      {{ materia ? $t.ui.materia.tier[materia.tier] : '' }}
    </div>
    <div
      row-span-1
    >
      {{ materia ? `+${materia.value}` : '-' }}
    </div>
  </div>
</template>
