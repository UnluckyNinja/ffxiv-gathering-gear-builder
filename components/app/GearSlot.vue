<script setup lang="ts">
import type gears from '~~/data/gears'
import type { Gear } from '~~/data/gears'
import type { Materia } from '~~/data/materias'

const props = defineProps<{
  gearSlot: Gear['slot']
  modelValue: {
    id?: keyof typeof gears
    hq?: boolean
    materias?: (Materia | undefined)[]
  }
}>()

const emits = defineEmits<{
  (event: 'update:modelValue', value: typeof props.modelValue): void
}>()

const { slot, id, gear, equipableGears, materias } = useGearSlot(props.gearSlot, props.modelValue.id, props.modelValue.materias)
const stats = reactive(useGearStats(id, materias))
const slots = [1, 2, 3, 4, 5]

const activeSocket = ref(0)
const showGearSelect = ref(false)
const showMateriaSelect = ref(false)

const isHQ = ref(props.modelValue.hq)

const gearSelectEle = ref(null)
const socketSelectEle = ref(null)

onClickOutside(gearSelectEle, () => showGearSelect.value = false)
onClickOutside(socketSelectEle, () => showMateriaSelect.value = false)

function gearSocketType(_gear: typeof gear, socket: number) {
  if (socket < _gear.base.value.socketCount)
    return 'socket'

  if (_gear.base.value.canOvermeld)
    return 'amm'

  return 'none'
}

function getModelValue() {
  return {
    id: id.value,
    hq: isHQ.value,
    materias: unref(materias),
  }
}

const onSelectGear = (event: any) => {
  id.value = event.itemID
  isHQ.value = event.isHQ
  materias.value = [undefined, undefined, undefined, undefined, undefined]
  emits('update:modelValue', getModelValue())
  showGearSelect.value = false
}

const onSelectMateria = (event: any) => {
  materias.value[activeSocket.value] = event
  emits('update:modelValue', getModelValue())
  if (activeSocket.value < 4)
    activeSocket.value++
  else
    showMateriaSelect.value = false
}

const onDelete = () => {
  id.value = '0'
  materias.value = [undefined, undefined, undefined, undefined, undefined]
  emits('update:modelValue', getModelValue())
}

function onNameClick(name: string) {
  if (navigator.clipboard)
    navigator.clipboard.writeText(name)
}
</script>

<template>
  <div
    p-1 rounded grid grid-cols-6 place-items-stretch relative h-min class="group"
  >
    <div relative col-span-6 grid grid-cols-6 place-items-stretch items-center>
      <div col-span-1>
        {{ gear.base.value.itemLevel === 0 ? '' : gear.base.value.itemLevel }}
      </div>
      <div relative col-span-3 truncate :title="$t.item[id]" @click="onNameClick($t.item[id])">
        {{ id === '0' ? $t.ui.gearslot.empty : ` ${$t.item[id]}${isHQ ? '' : ''}` }}
        <div v-if="id !== '0'" absolute transition-opacity flex cursor-pointer justify-center opacity-0 inset-0 bg-dark:50 active="bg-dark/90" hover:visible hover:opacity-100>
          <div i-carbon-copy /> Copy
        </div>
      </div>
      <div col-span-2 grid grid-cols-3 text-sm whitespace-nowrap>
        <div>{{ $t.ui.stat.gathering }}</div>
        <div>{{ $t.ui.stat.perception }}</div>
        <div>{{ $t.ui.stat.gp }}</div>
      </div>
      <button v-show="id !== '0' || materias.filter(it => it).length > 0" aria-label="Clear" absolute right-0 top-0 invisible group-hover:visible @click="onDelete">
        <Panel p-1>
          <div i-carbon-close-filled text-red />
        </Panel>
      </button>
    </div>
    <!-- Gear Icon -->
    <div col-span-1 filter grid place-items-center hover:brightness-125 cursor-pointer @click="showGearSelect = true">
      <AppItemIcon :iconID="gear.base.value.icon" :gear-slot="slot" :isHQ="isHQ" />
    </div>
    <AppGearSelect
      v-show="showGearSelect"
      ref="gearSelectEle" :gears="equipableGears"
      absolute mt-1 top-full left--1 border shadow z-10
      @gear-selected="onSelectGear"
    />
    <!-- Sockets -->
    <div col-span-3 grid grid-cols-5>
      <div
        v-for="_, i in slots" :key="i" :materia="materias[i]"
        :class="[showMateriaSelect && i === activeSocket ? 'bg-dark/50' : '']"
        cursor-pointer class="hover:bg-light/15 hover:active:bg-dark/75"
        @click="activeSocket = i; showMateriaSelect = true"
      >
        <AppMateriaSocket
          :type="gearSocketType(gear, i)"
          :materia="materias[i]"
        />
      </div>
    </div>
    <AppMateriaSelect
      v-show="showMateriaSelect"
      ref="socketSelectEle"
      :ammHint="gear.base.value.canOvermeld ? activeSocket - gear.base.value.socketCount : -1"
      :itemLevel="gear.base.value.itemLevel"
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
