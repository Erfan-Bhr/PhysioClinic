<script setup lang="ts">
withDefaults(defineProps<{
  name: string
  username: string
  image?: string
}>(), {
  image: '/images/admin-avatar.svg',
})
</script>

<template>
  <section dir="rtl" class="flex min-w-0 items-center gap-3 rounded-xl bg-gray-50 p-3 dark:bg-gray-950/70">
    <img :src="image" :alt="`تصویر ${name}`" class="h-11 w-11 flex-shrink-0 rounded-full object-cover ring-2 ring-white dark:ring-gray-800" />
    <div class="flex min-w-0 flex-1 flex-col items-start text-right">
      <p class="truncate text-sm font-bold text-gray-900 dark:text-gray-100">{{ name }}</p>
      <p class="mt-0.5 truncate text-right text-xs text-gray-500 dark:text-gray-400" dir="ltr">@{{ username }}</p>
    </div>
  </section>
</template>
