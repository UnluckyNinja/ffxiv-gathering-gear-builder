<script setup lang="ts">
const locale = useLocale()

function toggle() {
  locale.value = locale.value === 'en-US' ? 'zh-CN' : 'en-US'
}
</script>

<template>
  <button class="!outline-none" w-16 grid grid-cols-2 @click="toggle">
    <div inline-block class="i-carbon-language" />
    <span text-lg>
      {{ locale === 'en-US' ? 'EN' : '中' }}
    </span>
  </button>
</template>

