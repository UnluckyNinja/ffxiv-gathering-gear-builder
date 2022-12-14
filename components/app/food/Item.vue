<script setup lang='ts'>
import type { Food } from '~~/data/foods'

const props = withDefaults(defineProps<{
  food: Food
  isHQ?: boolean
}>(), {
  isHQ: false,
})

const stats = reactive(useGearsetStats())

const usefood = reactive(useFood(props.food.id as any, props.isHQ))
const foodStat = reactive(useFoodStats(usefood, {
  gathering: computed(() => stats.totalGathering),
  perception: computed(() => stats.totalPerception),
  gp: computed(() => stats.totalGP + 400),
}))

const max = computed(() => {
  if (props.isHQ) {
    return {
      gathering: props.food.maxHQ.gathering,
      perception: props.food.maxHQ.perception,
      gp: props.food.maxHQ.gp,
    }
  }
  else {
    return {
      gathering: props.food.max.gathering,
      perception: props.food.max.perception,
      gp: props.food.max.gp,
    }
  }
})
function determineColor(key: 'gathering' | 'perception' | 'gp') {
  if (foodStat[key] === 0)
    return ''

  const currentValue = props.isHQ ? props.food.maxHQ[key] : props.food.max[key]
  if (foodStat[key] === currentValue)
    return 'text-green'

  else
    return 'text-red'
}
const hintColor = computed(() => {
  return {
    gathering: determineColor('gathering'),
    perception: determineColor('perception'),
    gp: determineColor('gp'),
  }
})
</script>

<template>
  <div my-2 grid grid-cols-8 place-items-stretch class="children:(flex items-center justify-center)">
    <div col-span-1>
      {{ food.itemLevel }}
    </div>
    <div col-span-1>
      <AppItemIcon :iconID="food.icon" :isHQ="isHQ === true" />
    </div>
    <div col-span-3 text-sm>
      {{ $t.item[food.id] }}{{ isHQ ? '' : '' }}
    </div>
    <div
      v-for="key, i in (['gathering', 'perception', 'gp'] as const)"
      :key="i"
      col-span-1 flex flex-col divide-y cursor-help class="group"
      :title="`${food.stats[key] * 100}%`"
      :class="hintColor[key]"
    >
      <div group-hover="text-sm">
        {{ foodStat[key] }}
      </div>
      <div display-none group-hover="block text-sm">
        {{ max[key] }}
      </div>
    </div>
  </div>
</template>

