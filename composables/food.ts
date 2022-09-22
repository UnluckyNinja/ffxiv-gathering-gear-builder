import type { MaybeRef } from '@vueuse/core'
import foods from '~~/data/foods'

export function useFood(id?: MaybeRef<keyof typeof foods>, hq?: MaybeRef<boolean>) {
  // leverage type inference
  const _id = ref(id ?? '0')
  const _hq = ref(hq ?? false)
  const base = computed(() => {
    return foods[_id.value]
  })
  return {
    id: _id,
    base,
    hq: _hq,
  }
}

export function useFoodList(initialValue?: MaybeRef<{ id: keyof typeof foods; hq: boolean }[]>) {
  const foodList = useState('highlight-foods', () => {
    return unref(initialValue) ?? []
  })

  return {
    foodList,
  }
}
