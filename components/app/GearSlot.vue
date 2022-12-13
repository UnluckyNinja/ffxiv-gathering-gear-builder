<script setup lang="ts">
import type { GearSlotType } from '~~/composables/store/gearset'
import { typeSlotToGear } from '~~/composables/store/gearset'
import gears from '~~/data/gears'
import type { Gear } from '~~/data/gears'
import type { Materia } from '~~/data/materias'

const props = defineProps<{
  gearSlot: GearSlotType
}>()

const store = useGearsetStore()

const currentSlot = computed(() => {
  return store.gearset[props.gearSlot]
})
const currentGear = computed(() => {
  return gears[currentSlot.value.id]
})

const isEmpty = computed(() => currentSlot.value.id === '0')

const stats = reactive(useGearStats(
  computed(() => currentSlot.value.id),
  computed(() => currentSlot.value.hq),
  computed(() => currentSlot.value.materias),
))

const container = ref(null)
const gearSelectEle = ref(null)
const socketSelectEle = ref(null)

const activeSocket = ref(0)
const showGearSelect = reactive({
  value: false,
  bottom: true,
})

onMounted(() => {
  const { top, bottom } = useElementBounding(container)
  watchEffect(() => {
    showGearSelect.bottom = document.body.clientHeight - bottom.value > top.value
  })
})

const showMateriaSelect = ref(false)

onClickOutside(gearSelectEle, () => showGearSelect.value = false)
onClickOutside(socketSelectEle, () => showMateriaSelect.value = false)

const socketTypes = computed(() => {
  return currentSlot.value.materias.map((materia, i) => {
    if (i < currentGear.value.socketCount)
      return 'socket'

    else if (currentGear.value.canOvermeld)
      return 'amm'

    else
      return 'none'
  })
})

const onSelectGear = (event: any) => {
  currentSlot.value.id = event.itemID
  currentSlot.value.hq = event.isHQ
  currentSlot.value.materias = [null, null, null, null, null]
  showGearSelect.value = false
}

const onSelectMateria = (event: any) => {
  currentSlot.value.materias[activeSocket.value] = event
  if (activeSocket.value < 4)
    activeSocket.value++
  else
    showMateriaSelect.value = false
}

const onDelete = () => {
  currentSlot.value.id = '0'
  currentSlot.value.hq = false
  currentSlot.value.materias = [null, null, null, null, null]
}

function onNameClick(name: string) {
  if (navigator.clipboard)
    navigator.clipboard.writeText(name)
}
</script>

<template>
  <div
    ref="container"
    class="group m-1 border-2 p-1 rounded grid grid-cols-6 place-items-stretch relative h-min"
    :class="showGearSelect.value ? 'border-yellow-2' : ''"
  >
    <!-- headers -->
    <div class="relative col-span-6 grid grid-cols-6 place-items-stretch items-center">
      <!-- Item Level -->
      <div class="col-span-1">
        {{ isEmpty ? '' : currentGear.itemLevel }}
      </div>
      <!-- Name -->
      <div
        relative col-span-3 truncate
        :title="$t.item[currentSlot.id]" @click="onNameClick($t.item[currentSlot.id])"
      >
        {{ isEmpty ? $t.ui.gearslot.empty : `${$t.item[currentSlot.id]}${currentSlot.hq ? '' : ''}` }}
        <!-- Show copy button when hovering -->
        <div
          v-if="!isEmpty"
          absolute transition-opacity flex cursor-pointer justify-center opacity-0 inset-0 bg-dark:50 active="bg-dark/90" hover:visible hover:opacity-100
        >
          <div i-carbon-copy /> Copy
        </div>
      </div>
      <!-- Stats title -->
      <div col-span-2 grid grid-cols-3 text-sm whitespace-nowrap>
        <div>{{ $t.ui.stat.gathering }}</div>
        <div>{{ $t.ui.stat.perception }}</div>
        <div>{{ $t.ui.stat.gp }}</div>
      </div>
      <!-- Clear button -->
      <button
        v-show="!isEmpty || currentSlot.materias.filter(it => it).length > 0"
        aria-label="Clear"
        class="absolute right-0 top-0 invisible group-hover:visible"
        @click="onDelete"
      >
        <Panel p-1>
          <div i-carbon-close-filled text-red />
        </Panel>
      </button>
    </div>
    <!-- Gear Icon -->
    <div col-span-1 filter grid place-items-center hover:brightness-125 cursor-pointer @click="showGearSelect.value = true">
      <AppItemIcon :iconID="currentGear.icon" :gear-slot="typeSlotToGear[currentSlot.type]" :isHQ="currentSlot.hq" />
    </div>
    <AppGearSelect
      v-show="showGearSelect.value"
      ref="gearSelectEle" :type="typeSlotToGear[currentSlot.type]"
      absolute my-1 px-2 py-1 left--1 border-2 border-yellow-2 shadow-lg z-10
      :class="showGearSelect.bottom ? 'top-full' : 'bottom-full'"
      @gear-selected="onSelectGear"
    />
    <!-- Sockets -->
    <div col-span-3 grid grid-cols-5>
      <div
        v-for="i in 5" :key="i"
        :class="[showMateriaSelect && i - 1 === activeSocket ? 'bg-dark/50' : '']"
        cursor-pointer class="hover:bg-light/15 hover:active:bg-dark/75"
        @click="activeSocket = i - 1; showMateriaSelect = true"
      >
        <AppMateriaSocket
          :type="socketTypes[i - 1]"
          :materia="currentSlot.materias[i - 1]"
        />
      </div>
    </div>
    <AppMateriaSelect
      v-show="showMateriaSelect"
      ref="socketSelectEle"
      :ammHint="activeSocket - currentGear.socketCount"
      :itemLevel="currentGear.itemLevel"
      absolute mt-1 top-full left--1 border shadow z-10
      @materia-selected="onSelectMateria"
    />
    <!-- Stats -->
    <div col-span-2 grid grid-cols-3 text-sm>
      <div col-span-1 m-1 grid grid-rows-11 :class="[stats.gathering > 0 && stats.gathering >= stats.maxGathering ? 'text-red' : '']">
        <div row-span-5>
          {{ stats.gathering }}
        </div>
        <div h-px border-b-px />
        <div row-span-5>
          {{ stats.maxGathering }}
        </div>
      </div>
      <div col-span-1 m-1 grid grid-rows-11 :class="[stats.perception > 0 && stats.perception >= stats.maxPerception ? 'text-red' : '']">
        <div row-span-5>
          {{ stats.perception }}
        </div>
        <div h-px border-b-px />
        <div row-span-5>
          {{ stats.maxPerception }}
        </div>
      </div>
      <div col-span-1 m-1 grid grid-rows-11 :class="[stats.gp > 0 && stats.gp >= stats.maxGP ? 'text-red' : '']">
        <div row-span-5>
          {{ stats.gp }}
        </div>
        <div h-px border-b-px />
        <div row-span-5>
          {{ stats.maxGP }}
        </div>
      </div>
    </div>
  </div>
</template>
