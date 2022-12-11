<script setup lang="ts">
const { $t } = useNuxtApp()
useHead({
  title: $t.app.title,
  link: [
    {
      rel: 'icon', type: 'image/png', href: '/nuxt.png',
    },
  ],
})

const cookieLocale = useCookie<string>('locale')
const locale = useLocale()
if (cookieLocale?.value)
  locale.value = cookieLocale.value

watch(locale, (newVal) => {
  cookieLocale.value = newVal
})

const color = useColorMode()
color.preference = 'dark'
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
@font-face {
    font-family: "FFXIV_Lodestone_SSF";
    src: url("/font/FFXIV_Lodestone_SSF.woff");
    src: url("/font/FFXIV_Lodestone_SSF.woff") format("woff");
    font-weight: 400;
    font-style: normal
}

html, body , #__nuxt{
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: overlay;
}

html.dark {
  background: rgb(49,49,49);
  color: white;
}
html {
  background: rgb(49,49,49);
  color: white;
  font-family: -apple-system, "Noto Sans", "Helvetica Neue", Helvetica, "Nimbus Sans L", Arial, "Liberation Sans", "PingFang SC", "Hiragino Sans GB", "Noto Sans CJK SC", "Source Han Sans SC", "Source Han Sans CN", "Microsoft YaHei", "Wenquanyi Micro Hei", "WenQuanYi Zen Hei", "ST Heiti", SimHei, "WenQuanYi Zen Hei Sharp", sans-serif, "FFXIV_Lodestone_SSF";
}

* {
  border-color: #AAA;
}

.custom-scrollbar::-webkit-scrollbar{
  width: 8px;
}
.custom-scrollbar::-webkit-scrollbar-thumb{
  width: 8px;
  background-color: #888888;
  border-radius: 9999px;
  box-shadow: inset 0px 0px 0px 1px rgba(0,0,0,0.5);
}
</style>
