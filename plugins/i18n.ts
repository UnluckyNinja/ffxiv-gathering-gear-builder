import en_US from '~~/locales/en_US'
import zh_CN from '~~/locales/zh_CN'

const langs = {
  'en-US': en_US,
  'zh-CN': zh_CN,
}

export default defineNuxtPlugin(() => {
  const locale = useLocale()
  const lang = computed(() => {
    const loc = locale.value
    if (loc in langs)
      return langs[loc as keyof typeof langs]

    return langs['en-US']
  })
  const t = new Proxy(langs['en-US'], {
    get(target, property) {
      if (property in lang.value)
        return lang.value[property as keyof typeof lang.value]
      return '$TEXT NOT FOUND$'
    },
  })

  return {
    provide: {
      t,
      tt: (locale: keyof typeof langs) => locale ? langs[locale] : t,
    },
  }
})
