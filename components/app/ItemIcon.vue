<script setup lang="ts">
import type { GearType } from '~~/composables/store/gearset'
import type { Gear } from '~~/data/gears'
import { gearCategoryIcon } from '~~/data/gears'

const props = defineProps<{
  iconID: string
  isHQ?: boolean
  gearSlot?: GearType
}>()
const iconStyle = computed(() => {
  return {
    backgroundImage: `url(${props.gearSlot ? gearCategoryIcon[props.gearSlot] : ''}), url(/image/ui/item_slot.png)`,
    backgroundSize: '70%, contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundBlendMode: 'color-burn',
  }
})
const iconURL = computed(() => {
  let base = '/image/item'
  if (props.isHQ)
    base += '/hq'

  return `${base}/${props.iconID.padStart(6, '0')}.png`
})
</script>

<template>
  <div w-12 h-12 :style="iconStyle">
    <div v-if="iconID" w-12 h-12 relative>
      <img w-12 h-12 bg-center bg-no-repeat src="/image/ui/item_icon_frame.png" :style="`background-image: url(${iconURL})`" alt="">
    </div>
  </div>
</template>
