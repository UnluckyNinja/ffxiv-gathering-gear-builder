import type { MaybeComputedRef } from '@vueuse/core'
import { acceptHMRUpdate, defineStore } from 'pinia'
import type { Ref } from 'vue'
import type gears from '~~/data/gears'

export type GearSlotType =
  'mainhand'
  | 'head'
  | 'body'
  | 'hands'
  | 'legs'
  | 'feet'
  | 'offhand'
  | 'ears'
  | 'neck'
  | 'wrist'
  | 'finger1'
  | 'finger2'

export type GearType =
  'mainhand'
  | 'head'
  | 'body'
  | 'hands'
  | 'legs'
  | 'feet'
  | 'offhand'
  | 'ears'
  | 'neck'
  | 'wrist'
  | 'finger'

export const typeSlotToGear = {
  mainhand: 'mainhand',
  head: 'head',
  body: 'body',
  hands: 'hands',
  legs: 'legs',
  feet: 'feet',
  offhand: 'offhand',
  ears: 'ears',
  neck: 'neck',
  wrist: 'wrist',
  finger1: 'finger',
  finger2: 'finger',
} as const

export interface GearSlot {
  id: keyof typeof gears
  hq: boolean
  type: GearSlotType
  materias: any[]
}

export const useGearsetStore = defineStore('gearset-in-use', () => {
  return {
    gearset: ref(useGearset()),
  }
})

function useGearset() {
  const types: GearSlotType[] = [
    'mainhand',
    'head',
    'body',
    'hands',
    'legs',
    'feet',
    'offhand',
    'ears',
    'neck',
    'wrist',
    'finger1',
    'finger2',
  ]
  const gearset: any = {}
  for (const t of types)
    gearset[t] = ref(useGearSlot(t))
  return gearset as Record<GearSlotType, Ref<GearSlot>>
}

function useGearSlot(type: MaybeComputedRef<GearSlotType>) {
  return {
    id: ref('0'),
    type: ref(type),
    hq: ref(false),
    materias: ref([null, null, null, null, null]),
  }
}

export function deserializeGearset() {

}

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
