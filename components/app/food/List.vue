<script setup lang='ts'>
import foods from '~~/data/foods'

const filteredFoods = computed(() => {
  return Object.values(foods).filter(food => food.id !== '0').sort((a, b) => b.itemLevel - a.itemLevel)
})

const { foodList } = useFoodList()

const onSelectFood = (id: keyof typeof foods, hq: boolean) => {
  /* @TODO multiselect
  const filtered = foodList.value.filter(food => food.id === id && food.hq === hq)
  if (filtered.length > 0)
    foodList.value.splice(foodList.value.indexOf(filtered[0]), 1)
  else
    foodList.value.push({ id, hq }) */
  if (foodList.value[0]?.id === id && foodList.value[0]?.hq === hq)
    foodList.value.splice(0) // single select, remove all
  else
    foodList.value = [{ id, hq }]
}
</script>

<template>
  <div flex flex-col>
    <div>
      <div my-1 grid grid-cols-8>
        <div>{{ $t.ui.foodlist.itemLevel }}</div>
        <div>{{ $t.ui.foodlist.icon }}</div>
        <div col-span-3>
          {{ $t.ui.foodlist.name }}
        </div>
        <div>{{ $t.ui.foodlist.gathering }}</div>
        <div>{{ $t.ui.foodlist.perception }}</div>
        <div>{{ $t.ui.foodlist.gp }}</div>
      </div>
    </div>
    <div overflow-overlay flex-1 class="custom-scrollbar">
      <template v-for="food, i in filteredFoods" :key="i">
        <AppFoodItem
          :food="food"
          :class="{
            'bg-green-7': foodList.some(item => item.id === food.id && item.hq === true),
          }"
          hover="bg-light/25 active:bg-dark/50" cursor-pointer isHQ
          @click="onSelectFood(food.id as any, true)"
        />
        <AppFoodItem
          :food="food"
          :class="{
            'bg-green-7': foodList.some(item => item.id === food.id && item.hq === false),
          }"
          hover="bg-light/25 active:bg-dark/50" cursor-pointer
          @click="onSelectFood(food.id as any, false)"
        />
      </template>
    </div>
  </div>
</template>

