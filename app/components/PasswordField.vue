<script setup lang="ts">
import { Eye, EyeOff } from 'lucide-vue-next'

defineOptions({ inheritAttrs: false })

const model = defineModel<string>({ default: '' })
const props = withDefaults(defineProps<{ showToggle?: boolean }>(), { showToggle: true })
const attrs = useAttrs()
const visible = ref(false)
</script>

<template>
  <div class="relative">
    <input
      v-bind="attrs"
      v-model="model"
      :type="props.showToggle && visible ? 'text' : 'password'"
      :class="[attrs.class, props.showToggle ? 'pl-12' : '']"
    />
    <button
      v-if="props.showToggle"
      type="button"
      class="absolute left-2 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-600/30 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
      :aria-label="visible ? 'پنهان کردن رمز عبور' : 'نمایش رمز عبور'"
      :aria-pressed="visible"
      @click="visible = !visible"
    >
      <component :is="visible ? EyeOff : Eye" class="h-4 w-4" aria-hidden="true" />
    </button>
  </div>
</template>
