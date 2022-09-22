<script setup lang="ts">
import type foods from '~~/data/foods'
import { atou, utoa } from '~~/utils'

let sharedData: { gearset?: any; foodList?: any } = {}
const route = useRoute()
const router = useRouter()
if (route.query.build) {
  const serialized = atou(decodeURIComponent(route.query.build as string))
  sharedData = JSON.parse(serialized)
}

const cookieDate = new Date()
cookieDate.setFullYear(cookieDate.getFullYear() + 1)
const clientSave = useCookie <any> ('gear-set-1', { maxAge: 3600 * 24 * 356 })

const { gearset } = useGearset('gear-set-1', clientSave.value)

const cookieFoods = useCookie<{ id: keyof typeof foods; hq: boolean }[]>('highlight-foods', { maxAge: 3600 * 24 * 365 })
const { foodList } = useFoodList(cookieFoods.value)

if (sharedData.gearset)
  gearset.value = sharedData.gearset
else
  // set default data
  sharedData.gearset = gearset.value

if (sharedData.foodList)
  foodList.value = sharedData.foodList
else
  // set default data
  sharedData.foodList = foodList.value

watch(gearset, (newVal) => {
  // when using useCookie, the ref root value has to be different object to update in-browser cookie
  clientSave.value = { ...newVal }
  sharedData.gearset = newVal
  const json = JSON.stringify(sharedData,
    (k, v) => { return v === undefined ? null : v })
  const serialized = encodeURIComponent(utoa(json))
  history.replaceState({}, '', `?build=${serialized}`)
}, { deep: true })

watch(foodList, (newVal) => {
  cookieFoods.value = [...newVal]
  sharedData.foodList = newVal
  const json = JSON.stringify(sharedData,
    (k, v) => { return v === undefined ? null : v })
  const serialized = encodeURIComponent(utoa(json))
  history.replaceState({}, '', `?build=${serialized}`)
}, { deep: true })
</script>

<template>
  <main max-w-6xl mx-auto relative>
    <div grid grid-cols-15 place-content-stretch justify-center>
      <div col-span-11 m-1 grid grid-rows-6 grid-cols-2 grid-flow-col children:col-span-1>
        <AppGearSlot v-model="gearset.mainhand" gear-slot="mainhand" m-1 border-2 />
        <AppGearSlot v-model="gearset.head" gear-slot="head" m-1 border-2 />
        <AppGearSlot v-model="gearset.body" gear-slot="body" m-1 border-2 />
        <AppGearSlot v-model="gearset.hands" gear-slot="hands" m-1 border-2 />
        <AppGearSlot v-model="gearset.legs" gear-slot="legs" m-1 border-2 />
        <AppGearSlot v-model="gearset.feet" gear-slot="feet" m-1 border-2 />
        <AppGearSlot v-model="gearset.offhand" gear-slot="offhand" m-1 border-2 />
        <AppGearSlot v-model="gearset.ears" gear-slot="ears" m-1 border-2 />
        <AppGearSlot v-model="gearset.neck" gear-slot="neck" m-1 border-2 />
        <AppGearSlot v-model="gearset.wrist" gear-slot="wrist" m-1 border-2 />
        <AppGearSlot v-model="gearset.finger1" gear-slot="finger" m-1 border-2 />
        <AppGearSlot v-model="gearset.finger2" gear-slot="finger" m-1 border-2 />
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
searilize
