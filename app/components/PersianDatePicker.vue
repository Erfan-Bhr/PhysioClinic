<script setup lang="ts">
const props = defineProps<{ modelValue: string; id?: string }>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const months = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند']
const weekdays = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج']
const isOpen = ref(false)
const pickerButton = ref<HTMLButtonElement | null>(null)
const pickerPosition = ref({ top: 0, left: 0, width: 320 })

function togglePicker() {
  if (isOpen.value) {
    isOpen.value = false
    return
  }

  const rect = pickerButton.value?.getBoundingClientRect()
  if (!rect) return

  const width = Math.min(320, window.innerWidth - 16)
  const left = Math.max(8, Math.min(rect.right - width, window.innerWidth - width - 8))
  const estimatedHeight = 340
  const top = window.innerHeight - rect.bottom < estimatedHeight && rect.top > estimatedHeight
    ? rect.top - estimatedHeight - 8
    : rect.bottom + 8

  pickerPosition.value = { top, left, width }
  isOpen.value = true
}
const today = isoToJalali(localIso(new Date()))
const parsedInitial = parseJalali(props.modelValue)
const initial = parsedInitial.year ? parsedInitial : today
const latestYear = Math.max(initial.year, today.year)
const viewYear = ref(initial.year)
const viewMonth = ref(initial.month)
const persianDigits = '۰۱۲۳۴۵۶۷۸۹'
const latinDigits = '0123456789'

function toLatin(value: string) {
  return value.replace(/[۰-۹]/g, (digit) => String(persianDigits.indexOf(digit)))
}

function toPersian(value: number | string) {
  return String(value).replace(/\d/g, (digit) => persianDigits[Number(digit)])
}

function parseJalali(value: string) {
  const normalized = toLatin(value.trim())
  const match = normalized.match(/^(\d{3,4})[/-](\d{1,2})[/-](\d{1,2})$/)
  if (!match) {
    const iso = normalized.match(/^(\d{4})-(\d{2})-(\d{2})$/)
    return iso ? isoToJalali(normalized) : { year: 0, month: 0, day: 0 }
  }
  const [, year, month, day] = match
  return { year: Number(year), month: Number(month), day: Number(day) }
}

function jalaliToIso(year: number, month: number, day: number) {
  const jy = year + 1595
  let days = -355668 + 365 * jy + Math.floor(jy / 33) * 8 + Math.floor((jy % 33 + 3) / 4)
    + day + (month < 7 ? (month - 1) * 31 : (month - 7) * 30 + 186)
  let gy = 400 * Math.floor(days / 146097)
  days %= 146097
  if (days > 36524) {
    gy += 100 * Math.floor(--days / 36524)
    days %= 36524
    if (days >= 365) days++
  }
  gy += 4 * Math.floor(days / 1461)
  days %= 1461
  if (days > 365) {
    gy += Math.floor((days - 1) / 365)
    days = (days - 1) % 365
  }
  let gd = days + 1
  const leap = gy % 4 === 0 && (gy % 100 !== 0 || gy % 400 === 0)
  const monthDays = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  let gm = 0
  while (gm < monthDays.length && gd > monthDays[gm]) gd -= monthDays[gm++]
  return `${gy}-${String(gm + 1).padStart(2, '0')}-${String(gd).padStart(2, '0')}`
}

function localIso(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

function isoToJalali(value: string) {
  const [year, month, day] = value.split('-').map(Number)
  let gy = year - 1600
  const gm = month - 1
  const gd = day - 1
  const leap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)
  const monthDays = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  let days = 365 * gy + Math.floor((gy + 3) / 4) - Math.floor((gy + 99) / 100) + Math.floor((gy + 399) / 400)
  for (let index = 0; index < gm; index++) days += monthDays[index]
  days += gd
  let jalaliDays = days - 79
  const cycles = Math.floor(jalaliDays / 12053)
  jalaliDays %= 12053
  let jy = 979 + 33 * cycles + 4 * Math.floor(jalaliDays / 1461)
  jalaliDays %= 1461
  if (jalaliDays >= 366) {
    jy += Math.floor((jalaliDays - 1) / 365)
    jalaliDays = (jalaliDays - 1) % 365
  }
  const jalaliMonthDays = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29]
  let jm = 0
  while (jm < 11 && jalaliDays >= jalaliMonthDays[jm]) jalaliDays -= jalaliMonthDays[jm++]
  return { year: jy, month: jm + 1, day: jalaliDays + 1 }
}

const selectedDate = computed(() => parseJalali(props.modelValue))
const years = computed(() => Array.from({ length: Math.max(1, latestYear - 1299) }, (_, index) => latestYear - index))
const calendarDays = computed(() => {
  const firstIso = jalaliToIso(viewYear.value, viewMonth.value, 1)
  const firstDate = new Date(`${firstIso}T12:00:00`)
  const start = new Date(firstDate)
  start.setDate(start.getDate() - ((firstDate.getDay() + 1) % 7))

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(start)
    date.setDate(start.getDate() + index)
    const jalali = isoToJalali(localIso(date))
    return {
      day: jalali.day,
      label: toPersian(jalali.day),
      inMonth: jalali.year === viewYear.value && jalali.month === viewMonth.value,
      selected: jalali.year === selectedDate.value.year && jalali.month === selectedDate.value.month && jalali.day === selectedDate.value.day,
      value: `${toPersian(jalali.year)}/${toPersian(String(jalali.month).padStart(2, '0'))}/${toPersian(String(jalali.day).padStart(2, '0'))}`,
    }
  })
})

watch(() => props.modelValue, (value) => {
  const date = parseJalali(value)
  if (date.year && date.month) {
    viewYear.value = date.year
    viewMonth.value = date.month
  }
})

function selectDay(value: string) {
  emit('update:modelValue', value)
  isOpen.value = false
}
</script>

<template>
  <div class="relative">
    <button
      :id="id"
      ref="pickerButton"
      type="button"
      class="flex min-h-12 w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-3 text-right text-base text-gray-900 transition hover:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-600/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-50"
      :aria-expanded="isOpen"
      aria-haspopup="dialog"
      @click="togglePicker"
    >
      <span :class="modelValue ? 'text-gray-900 dark:text-gray-50' : 'text-gray-400'">{{ modelValue || 'انتخاب تاریخ' }}</span>
      <LucideIcon name="CalendarDays" class="h-5 w-5 text-primary-700 dark:text-primary-400" />
    </button>

    <Teleport to="body">
    <div v-if="isOpen" role="dialog" aria-label="انتخاب تاریخ شمسی" class="fixed z-[70] rounded-2xl border border-gray-200 bg-white p-3 shadow-xl dark:border-gray-700 dark:bg-gray-900" :style="{ top: `${pickerPosition.top}px`, left: `${pickerPosition.left}px`, width: `${pickerPosition.width}px` }">
      <div class="mb-3 grid grid-cols-2 gap-2">
        <select v-model.number="viewMonth" aria-label="ماه" class="rounded-lg border border-gray-200 bg-gray-50 px-2 py-2 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100">
          <option v-for="(month, index) in months" :key="month" :value="index + 1">{{ month }}</option>
        </select>
        <select v-model.number="viewYear" aria-label="سال" class="rounded-lg border border-gray-200 bg-gray-50 px-2 py-2 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100">
          <option v-for="year in years" :key="year" :value="year">{{ toPersian(year) }}</option>
        </select>
      </div>

      <div class="grid grid-cols-7 text-center text-xs font-semibold text-gray-500 dark:text-gray-400">
        <span v-for="weekday in weekdays" :key="weekday" class="py-2">{{ weekday }}</span>
      </div>
      <div class="grid grid-cols-7 gap-1 text-center text-sm">
        <button
          v-for="(day, index) in calendarDays"
          :key="index"
          type="button"
          class="h-9 rounded-lg transition hover:bg-primary-50 dark:hover:bg-gray-800"
          :class="[
            day.inMonth ? 'text-gray-800 dark:text-gray-100' : 'text-gray-300 dark:text-gray-600',
            day.selected ? 'bg-primary-700 font-bold text-white hover:bg-primary-700 dark:bg-primary-500 dark:text-gray-950 dark:hover:bg-primary-500' : '',
          ]"
          :disabled="!day.inMonth"
          @click="selectDay(day.value)"
        >
          {{ day.label }}
        </button>
      </div>
    </div>
    </Teleport>
  </div>
</template>