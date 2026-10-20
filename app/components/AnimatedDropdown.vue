<script setup lang="ts">
type DropdownOption = string | { label: string; value: string; disabled?: boolean }

const props = withDefaults(defineProps<{
  modelValue: string
  options: DropdownOption[]
  placeholder?: string
  ariaLabel: string
}>(), {
  placeholder: 'انتخاب کنید',
})

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
const isOpen = ref(false)
const root = ref<HTMLElement | null>(null)

const normalizedOptions = computed(() => props.options.map((option) =>
  typeof option === 'string' ? { label: option, value: option, disabled: false } : { disabled: false, ...option },
))
const selectedLabel = computed(() => normalizedOptions.value.find((option) => option.value === props.modelValue)?.label)

function selectOption(value: string) {
  emit('update:modelValue', value)
  isOpen.value = false
}

function onDocumentClick(event: MouseEvent) {
  if (!root.value?.contains(event.target as Node)) isOpen.value = false
}

onMounted(() => document.addEventListener('click', onDocumentClick))
onBeforeUnmount(() => document.removeEventListener('click', onDocumentClick))
</script>

<template>
  <div ref="root" class="relative min-w-0">
    <button
      type="button"
      role="combobox"
      :aria-label="ariaLabel"
      :aria-expanded="isOpen"
      aria-haspopup="listbox"
      class="rtl-icon-leading flex min-h-11 w-full items-center justify-between gap-3 rounded-xl border border-gray-200 bg-gray-50 px-3 text-right text-sm text-gray-800 shadow-sm outline-none transition hover:border-primary-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
      @click="isOpen = !isOpen"
      @keydown.esc="isOpen = false"
    >
      <span class="min-w-0 truncate" :class="selectedLabel ? '' : 'text-gray-400 dark:text-gray-500'">{{ selectedLabel || placeholder }}</span>
      <LucideIcon name="ChevronDown" class="h-4 w-4 flex-shrink-0 text-gray-500 transition-transform duration-200" :class="isOpen ? 'rotate-180' : ''" />
    </button>

    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="translate-y-1 scale-[0.98] opacity-0"
      leave-active-class="transition duration-100 ease-in"
      leave-to-class="translate-y-1 scale-[0.98] opacity-0"
    >
      <ul
        v-if="isOpen"
        role="listbox"
        :aria-label="ariaLabel"
        class="absolute inset-x-0 top-full z-[80] mt-1 max-h-60 overflow-y-auto rounded-xl border border-gray-200 bg-white p-1 shadow-xl shadow-gray-900/10 dark:border-gray-700 dark:bg-gray-900"
      >
        <li v-for="option in normalizedOptions" :key="option.value" role="presentation">
          <button
            type="button"
            role="option"
            :aria-selected="option.value === modelValue"
            class="rtl-icon-leading flex min-h-10 w-full items-center justify-between rounded-lg px-3 text-right text-sm transition hover:bg-primary-50 hover:text-primary-800 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-primary-900/40 dark:hover:text-primary-200"
            :class="option.value === modelValue ? 'bg-primary-50 font-semibold text-primary-800 dark:bg-primary-900/40 dark:text-primary-200' : 'text-gray-700 dark:text-gray-200'"
            :disabled="option.disabled"
            @click="selectOption(option.value)"
          >
            <span>{{ option.label }}</span>
            <LucideIcon v-if="option.value === modelValue" name="Check" class="h-4 w-4 flex-shrink-0" />
          </button>
        </li>
      </ul>
    </Transition>
  </div>
</template>
