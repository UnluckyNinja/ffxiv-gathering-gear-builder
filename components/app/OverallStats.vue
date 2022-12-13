<script setup lang="ts">
const stats = reactive(useGearsetStats())
const food = reactive(useFood())
const foodStat = reactive(useFoodStats(food, {
  gathering: computed(() => stats.totalGathering),
  perception: computed(() => stats.totalPerception),
  gp: computed(() => stats.totalGP + 400),
}))

const { foodList } = useFoodList()
watch(foodList, (newVal) => {
  food.id = newVal[0]?.id ?? '0'
  food.hq = newVal[0]?.hq ?? false
}, { deep: true, immediate: true })
</script>

<template>
  <div>
    <div mt-4 m-2 text-2xl text-left>
      {{ $t.ui.totalstats }}
    </div>
    <div m-1 py-2 px-4 border-2 rounded grid grid-cols-15 place-items-stretch items-center text-xl>
      <div col-span-3 border-b-2 border-dotted>
        {{ $t.ui.overall.total }}
      </div>
      <div col-span-1 />
      <div col-span-3 border-b-2 border-dotted>
        {{ $t.ui.overall.gear }}
      </div>
      <div col-span-1 />
      <div col-span-3 border-b-2 border-dotted>
        {{ $t.ui.overall.materia }}
      </div>
      <div col-span-1 />
      <div col-span-3 border-b-2 border-dotted>
        {{ $t.ui.overall.food }}
      </div>
      <div text-yellow font-bold>
        {{ stats.totalGathering + foodStat.gathering }}
      </div>
      <div text-purple font-bold>
        {{ stats.totalPerception + foodStat.perception }}
      </div>
      <div text-blue font-bold>
        {{ stats.totalGP + foodStat.gp + 400 }}
      </div>
      <div>=</div>
      <div text-yellow font-bold>
        {{ stats.totalGathering - stats.totalMateriaGathering }}
      </div>
      <div text-purple font-bold>
        {{ stats.totalPerception - stats.totalMateriaPerception }}
      </div>
      <div text-blue font-bold>
        {{ stats.totalGP - stats.totalMateriaGP }}
      </div>
      <div>+</div>
      <div text-yellow font-bold>
        {{ stats.totalMateriaGathering }}
      </div>
      <div text-purple font-bold>
        {{ stats.totalMateriaPerception }}
      </div>
      <div text-blue font-bold>
        {{ stats.totalMateriaGP }}
      </div>
      <div>+</div>
      <div text-yellow font-bold>
        {{ foodStat.gathering }}
      </div>
      <div text-purple font-bold>
        {{ foodStat.perception }}
      </div>
      <div text-blue font-bold>
        {{ foodStat.gp }}
      </div>
      <div col-span-3 grid grid-cols-3 text-base>
        <div>{{ $t.ui.stat.gathering }}</div>
        <div>{{ $t.ui.stat.perception }}</div>
        <div
          underline underline-dotted cursor-help :title="$t.ui.statsGPHint"
          style="text-underline-position: under;"
        >
          {{ $t.ui.stat.gp }}(?)
        </div>
      </div>
      <div col-span-1 />
      <div col-span-3 grid grid-cols-3 text-base>
        <div>{{ $t.ui.stat.gathering }}</div>
        <div>{{ $t.ui.stat.perception }}</div>
        <div>{{ $t.ui.stat.gp }}</div>
      </div>
      <div col-span-1 />
      <div col-span-3 grid grid-cols-3 text-base>
        <div>{{ $t.ui.stat.gathering }}</div>
        <div>{{ $t.ui.stat.perception }}</div>
        <div>{{ $t.ui.stat.gp }}</div>
      </div>
      <div col-span-1 />
      <div col-span-3 grid grid-cols-3 text-base>
        <div>{{ $t.ui.stat.gathering }}</div>
        <div>{{ $t.ui.stat.perception }}</div>
        <div>{{ $t.ui.stat.gp }}</div>
      </div>
    </div>
  </div>
</template>
