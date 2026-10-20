<script setup lang="ts">
const { isDark, toggleTheme } = useTheme()

const label = computed(() => (isDark.value ? 'فعال‌سازی حالت روز' : 'فعال‌سازی حالت شب'))
</script>

<template>
  <button
    type="button"
    class="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-600/30 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
    :aria-label="label"
    :title="label"
    @click="toggleTheme"
  >
    <LucideIcon v-if="isDark" name="Sun" class="h-5 w-5" />
    <LucideIcon v-else name="Moon" class="h-5 w-5" />
  </button>
</template>