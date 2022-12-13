<script setup lang="ts">
import { atou, utoa } from '~~/utils'

let sharedData: { gearset?: any; foodList?: any } = {}
const route = useRoute()
if (route.query.build) {
  const serialized = atou(decodeURIComponent(route.query.build as string))
  sharedData = JSON.parse(serialized)
}

const loading = ref(true)
onMounted(() => {
  const localGearset = useLocalStorage<any>('gearset', null)
  const localFood = useLocalStorage<any>('food', null)

  const store = useGearsetStore()
  const { foodList } = useFoodList()

  if (sharedData.gearset)
    store.gearset = sharedData.gearset
  else if (localGearset.value)
    store.gearset = JSON.parse(localGearset.value)

  if (sharedData.foodList)
    foodList.value = sharedData.foodList
  else if (localFood.value)
    foodList.value = JSON.parse(localFood.value)

  watch(() => store.gearset, (newVal) => {
    // when using useCookie, the ref root value has to be different object to update in-browser cookie
    localGearset.value = JSON.stringify(newVal)
    sharedData.gearset = newVal
    const json = JSON.stringify(sharedData)
    const serialized = encodeURIComponent(utoa(json))
    history.replaceState({}, '', `?build=${serialized}`)
  }, { deep: true })

  watch(foodList, (newVal) => {
    localFood.value = JSON.stringify(newVal)
    sharedData.foodList = newVal
    const json = JSON.stringify(sharedData)
    const serialized = encodeURIComponent(utoa(json))
    history.replaceState({}, '', `?build=${serialized}`)
  }, { deep: true })
  loading.value = false
})
</script>

<template>
  <main max-w-6xl mx-auto relative>
    <Transition name="fade">
      <div v-if="loading" absolute inset-0 flex items-center justify-center text-5xl z-100 bg-dark>
        <span animate-pulse>Loading...</span>
      </div>
    </Transition>
    <div grid grid-cols-15 place-content-stretch justify-center>
      <div col-span-11 m-1 grid grid-rows-6 grid-cols-2 grid-flow-col children:col-span-1>
        <AppGearSlot gear-slot="mainhand" />
        <AppGearSlot gear-slot="head" />
        <AppGearSlot gear-slot="body" />
        <AppGearSlot gear-slot="hands" />
        <AppGearSlot gear-slot="legs" />
        <AppGearSlot gear-slot="feet" />
        <AppGearSlot gear-slot="offhand" />
        <AppGearSlot gear-slot="ears" />
        <AppGearSlot gear-slot="neck" />
        <AppGearSlot gear-slot="wrist" />
        <AppGearSlot gear-slot="finger1" />
        <AppGearSlot gear-slot="finger2" />
      </div>
      <div col-span-4 h-142 my-auto m-1 overflow-hidden>
        <AppFoodList rounded overflow-hidden border-2 max-h-full />
      </div>
    </div>
    <div>
      <AppOverallStats />
    </div>
    <!-- <div border-2>
      categories
    </div>
    <div border-2>
      items
    </div> -->
  </main>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
