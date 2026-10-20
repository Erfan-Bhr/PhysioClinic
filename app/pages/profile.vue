<script setup lang="ts">
definePageMeta({
  layout: 'profile',
  middleware: 'auth',
})

useHead({
  title: 'پروفایل | فیزیوکلینیک',
})

/* حساب فعال — نام در App Bar از همین‌جا می‌آید */
const { current, logout } = useAccounts()
const firstName = computed(() => current.value?.fullName?.trim().split(' ')[0] ?? 'کاربر')
const initial = computed(() => current.value?.fullName?.trim().charAt(0) ?? '؟')

function handleLogout() {
  logout()
  return navigateTo({ path: '/login', query: { loggedout: '1' } })
}


/* ---------- ابزار ---------- */
const faDigits = '۰۱۲۳۴۵۶۷۸۹'
function fa(value: number | string) {
  return String(value).replace(/\d/g, (d) => faDigits[Number(d)])
}

/* ---------- تب‌های پایین + اسکرول‌اسپای ---------- */
const tabs = [
  { id: 'overview', label: 'خانه', icon: 'Home' },
  { id: 'plan', label: 'تمرین‌ها', icon: 'Dumbbell' },
  { id: 'appointments', label: 'نوبت‌ها', icon: 'Calendar' },
  { id: 'finance', label: 'مالی', icon: 'Receipt' },
  { id: 'profile', label: 'پرونده', icon: 'User' },
]

const activeTab = ref('profile')

function navigateToTab(id: string) {
  const section = document.getElementById(id)
  if (!section) return
  activeTab.value = id
  window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#${id}`)
  section.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

onMounted(() => {
  const sections = tabs
    .map((t) => document.getElementById(t.id))
    .filter((el): el is HTMLElement => Boolean(el))

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) activeTab.value = visible.target.id
    },
    { rootMargin: '-88px 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] },
  )

  sections.forEach((el) => observer.observe(el))
  if (!window.location.hash) {
    document.getElementById('profile')?.scrollIntoView({ behavior: 'auto', block: 'start' })
  }
  onBeforeUnmount(() => observer.disconnect())
})

/* ---------- نوبت بعدی ---------- */
const nextAppointment = {
  doctor: 'دکتر سارا محمدی',
  specialty: 'طب فیزیکی و توانبخشی',
  date: 'سه‌شنبه ۲۷ مرداد',
  time: '۱۰:۳۰ صبح',
  room: 'اتاق ۳',
  daysLeft: 2,
}

/* ---------- خلاصه وضعیت ---------- */
const summary = [
  { label: 'جلسات باقی‌مانده', value: fa(4), unit: 'جلسه', icon: 'Calendar' },
  { label: 'پیشرفت درمان', value: fa(68) + '٪', unit: 'تاکنون', icon: 'TrendingUp' },
  { label: 'مانده حساب', value: '۴۵۰', unit: 'هزار تومان', icon: 'Receipt' },
]

/* ---------- اقدام‌های سریع ---------- */
const NuxtLinkComponent = resolveComponent('NuxtLink')

const quickActions = [
  { label: 'رزرو نوبت', to: '/register', icon: 'CalendarPlus' },
  { label: 'برنامه تمرین', href: '#plan', icon: 'Dumbbell' },
  { label: 'گفتگو با پزشک', href: '#profile', icon: 'MessageCircle' },
  { label: 'صورت‌حساب', href: '#finance', icon: 'FileText' },
]

/* ---------- برنامه تمرینی امروز ---------- */
const exercises = reactive([
  { id: 1, name: 'کشش همسترینگ', detail: '۳ ست × ۱۵ تکرار', done: true },
  { id: 2, name: 'تقویت عضلات مرکزی', detail: '۳ ست × ۱۰ تکرار', done: true },
  { id: 3, name: 'تمرین تعادل روی یک پا', detail: '۲ ست × ۳۰ ثانیه', done: false },
  { id: 4, name: 'کشش عضله ساق', detail: '۲ ست × ۲۰ ثانیه', done: false },
  { id: 5, name: 'تمرین دامنه حرکتی زانو', detail: '۲ ست × ۱۲ تکرار', done: false },
])

const doneCount = computed(() => exercises.filter((e) => e.done).length)
const planProgress = computed(() => Math.round((doneCount.value / exercises.length) * 100))
const allDone = computed(() => doneCount.value === exercises.length)

/* ---------- نمودار روند درد ---------- */
const painData = [8, 7, 5.5, 4.5, 3, 2.5]

const chart = computed(() => {
  const w = 300
  const h = 110
  const padX = 14
  const padY = 16
  const max = 10
  const step = (w - padX * 2) / (painData.length - 1)

  const points = painData.map((v, i) => ({
    x: padX + i * step,
    y: padY + (1 - v / max) * (h - padY * 2),
    v,
  }))

  const line = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ')
  const area = `${line} L${points[points.length - 1].x.toFixed(1)} ${h - padY} L${points[0].x.toFixed(1)} ${h - padY} Z`

  return { w, h, points, line, area }
})

/* ---------- نوبت‌ها ---------- */
const apptTab = ref<'upcoming' | 'past'>('upcoming')

const upcoming = [
  { doctor: 'دکتر سارا محمدی', specialty: 'طب فیزیکی و توانبخشی', date: '۲۷ مرداد ۱۴۰۴', time: '۱۰:۳۰', status: 'confirmed' as const },
  { doctor: 'دکتر امیر رضایی', specialty: 'فیزیوتراپی ارتوپدی', date: '۳۱ مرداد ۱۴۰۴', time: '۱۶:۰۰', status: 'pending' as const },
]

const past = [
  { doctor: 'دکتر سارا محمدی', specialty: 'طب فیزیکی و توانبخشی', date: '۲۰ مرداد ۱۴۰۴', time: '۱۰:۳۰', status: 'done' as const },
  { doctor: 'دکتر نگار کریمی', specialty: 'توانبخشی عصبی', date: '۱۳ مرداد ۱۴۰۴', time: '۰۹:۰۰', status: 'done' as const },
  { doctor: 'دکتر سارا محمدی', specialty: 'طب فیزیکی و توانبخشی', date: '۶ مرداد ۱۴۰۴', time: '۱۰:۳۰', status: 'canceled' as const },
]

const statusMap = {
  confirmed: { label: 'تأییدشده', class: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300' },
  pending: { label: 'در انتظار تأیید', class: 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300' },
  done: { label: 'انجام‌شده', class: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400' },
  canceled: { label: 'لغو‌شده', class: 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400' },
}

/* ---------- مالی ---------- */
const payments = [
  { title: 'جلسه فیزیوتراپی', date: '۲۰ مرداد ۱۴۰۴', amount: '۳۵۰٬۰۰۰', status: 'paid' as const },
  { title: 'بسته ۱۰ جلسه‌ای توانبخشی', date: '۲ مرداد ۱۴۰۴', amount: '۲٬۸۰۰٬۰۰۰', status: 'paid' as const },
  { title: 'ویزیت و ارزیابی اولیه', date: '۳۰ تیر ۱۴۰۴', amount: '۴۵۰٬۰۰۰', status: 'unpaid' as const },
]

/* ---------- پیام‌ها ---------- */
const messages = [
  { from: 'دکتر سارا محمدی', role: 'پزشک معالج', text: 'تمرین‌های این هفته را کمی سنگین‌تر کردم؛ لطفاً بعد از هر جلسه وضعیت درد را ثبت کنید.', time: '۲ ساعت پیش', unread: true },
  { from: 'پذیرش کلینیک', role: 'پشتیبانی', text: 'یادآوری: نوبت شما سه‌شنبه ساعت ۱۰:۳۰ ثبت شده است.', time: 'دیروز', unread: true },
  { from: 'دکتر امیر رضایی', role: 'فیزیوتراپیست', text: 'نتایج ارزیابی زانو خوب بود. جلسه بعد تمرین تعادل اضافه می‌شود.', time: '۴ روز پیش', unread: false },
]

const unreadCount = computed(() => messages.filter((m) => m.unread).length)
</script>

<template>
  <div>
    <!-- ================= APP BAR ================= -->
    <header class="sticky top-0 z-40 border-b border-gray-200/80 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md">
      <div class="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3">
        <div class="flex min-w-0 items-center gap-3">
          <span class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-600 to-primary-800 text-sm font-bold text-white">
            {{ initial }}
          </span>
          <div class="min-w-0">
            <p class="truncate text-sm font-bold text-gray-900 dark:text-gray-50">سلام، {{ firstName }}</p>
            <p class="truncate text-xs text-gray-500 dark:text-gray-400">چهارشنبه ۲۵ مرداد ۱۴۰۴</p>
          </div>
        </div>

        <div class="flex flex-shrink-0 items-center gap-2">
          <ThemeToggle />
          <a
            href="#profile"
            class="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 transition hover:bg-gray-50 dark:hover:bg-gray-800"
            :aria-label="`پیام‌ها، ${fa(unreadCount)} پیام خوانده‌نشده`"
          >
            <LucideIcon name="Bell" class="h-5 w-5" />
            <span v-if="unreadCount" class="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">
              {{ fa(unreadCount) }}
            </span>
          </a>

          <NuxtLink
            to="/"
            class="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 transition hover:bg-gray-50 dark:hover:bg-gray-800"
            aria-label="بازگشت به خانه"
          >
            <LucideIcon name="Home" class="h-5 w-5" />
          </NuxtLink>
        </div>
      </div>
    </header>

    <main class="mx-auto max-w-3xl px-4 pb-28 pt-5 lg:pb-10">
      <!-- ================= OVERVIEW ================= -->
      <section id="overview" class="space-y-4">
        <h1 class="sr-only">نمای کلی پروفایل</h1>

        <!-- نوبت بعدی -->  
        <article class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-700 to-primary-900 p-5 text-white shadow-lg shadow-primary-900/15">
          <div class="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl"></div>

          <div class="relative">
            <div class="flex items-center justify-between gap-3">
              <span class="text-xs font-medium text-primary-100">نوبت بعدی شما</span>
              <span class="rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold text-white">
                {{ fa(nextAppointment.daysLeft) }} روز دیگر
              </span>
            </div>

            <p class="mt-3 text-lg font-bold">{{ nextAppointment.doctor }}</p>
            <p class="mt-1 text-sm text-primary-100">{{ nextAppointment.specialty }}</p>

            <div class="mt-4 grid grid-cols-2 gap-2">
              <div class="flex items-center gap-2 rounded-2xl bg-white/10 px-3 py-2.5">
                <LucideIcon name="Calendar" class="h-4 w-4 flex-shrink-0 text-primary-200" />
                <span class="text-xs font-medium">{{ nextAppointment.date }}</span>
              </div>
              <div class="flex items-center gap-2 rounded-2xl bg-white/10 px-3 py-2.5">
                <LucideIcon name="Clock" class="h-4 w-4 flex-shrink-0 text-primary-200" />
                <span class="text-xs font-medium">{{ nextAppointment.time }}</span>
              </div>
            </div>

            <div class="mt-4 flex gap-2">
              <a
                href="#appointments"
                class="inline-flex min-h-11 flex-1 items-center justify-center rounded-xl bg-white dark:bg-gray-900 text-sm font-bold text-primary-800 dark:text-primary-300 transition hover:bg-primary-50"
              >
                جزئیات نوبت
              </a>
              <a
                href="#profile"
                class="inline-flex min-h-11 flex-1 items-center justify-center rounded-xl border border-white/25 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                لغو / جابجایی
              </a>
            </div>
          </div>
        </article>

        <!-- خلاصه وضعیت -->
        <div class="grid grid-cols-3 gap-2 sm:gap-3">
          <div v-for="item in summary" :key="item.label" class="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-3 shadow-sm dark:shadow-black/30">
            <span class="flex h-8 w-8 items-center justify-center rounded-xl bg-primary-50 dark:bg-primary-900/40 text-primary-700 dark:text-primary-400">
              <LucideIcon :name="item.icon" class="h-4 w-4" />
            </span>
            <p class="mt-2.5 text-lg font-extrabold leading-6 text-gray-900 dark:text-gray-50">{{ item.value }}</p>
            <p class="text-[11px] leading-4 text-gray-500 dark:text-gray-400">{{ item.unit }}</p>
            <p class="mt-1 text-[11px] font-medium leading-4 text-gray-700 dark:text-gray-300">{{ item.label }}</p>
          </div>
        </div>

        <!-- اقدام‌های سریع -->
        <div>
          <h2 class="mb-2 text-sm font-bold text-gray-900 dark:text-gray-50">دسترسی سریع</h2>
          <div class="grid grid-cols-4 gap-2 sm:gap-3">
            <component
              :is="action.to ? NuxtLinkComponent : 'a'"
              v-for="action in quickActions"
              :key="action.label"
              :to="action.to"
              :href="action.href"
              class="flex flex-col items-center gap-2 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 px-1.5 py-3 text-center shadow-sm dark:shadow-black/30 transition hover:border-primary-200 hover:bg-primary-50/40"
            >
              <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 dark:bg-primary-900/40 text-primary-700 dark:text-primary-400">
                <LucideIcon :name="action.icon" class="h-5 w-5" />
              </span>
              <span class="text-[11px] font-medium leading-4 text-gray-700 dark:text-gray-300">{{ action.label }}</span>
            </component>
          </div>
        </div>
      </section>

      <!-- ================= PLAN ================= -->
      <section id="plan" class="mt-8">
        <div class="rounded-3xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-sm dark:shadow-black/30">
          <div class="flex items-center justify-between gap-3">
            <div>
              <h2 class="text-base font-bold text-gray-900 dark:text-gray-50">برنامه تمرینی امروز</h2>
              <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {{ fa(doneCount) }} از {{ fa(exercises.length) }} تمرین انجام شد
              </p>
            </div>

            <div class="relative h-16 w-16 flex-shrink-0">
              <svg class="h-16 w-16 -rotate-90" viewBox="0 0 36 36" aria-hidden="true">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="currentColor" class="text-gray-200 dark:text-gray-700" stroke-width="3.5" />
                <circle
                  cx="18"
                  cy="18"
                  r="15.9"
                  fill="none"
                  stroke="currentColor"
                  class="text-primary-600 dark:text-primary-400 transition-all duration-500"
                  stroke-width="3.5"
                  stroke-linecap="round"
                  :stroke-dasharray="`${planProgress} ${100 - planProgress}`"
                />
              </svg>
              <span class="absolute inset-0 flex items-center justify-center text-xs font-extrabold text-primary-800 dark:text-primary-300">
                {{ fa(planProgress) }}٪
              </span>
            </div>
          </div>

          <div v-if="allDone" class="mt-4 flex items-center gap-2 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 px-3 py-3 text-sm font-medium text-emerald-700 dark:text-emerald-300">
            <LucideIcon name="Check" class="h-5 w-5 flex-shrink-0" />
            تبریک! تمرین‌های امروز را کامل کردی.
          </div>

          <ul class="mt-4 space-y-2">
            <li v-for="exercise in exercises" :key="exercise.id">
              <label
                class="flex min-h-14 cursor-pointer items-center gap-3 rounded-2xl border px-3 py-2.5 transition"
                :class="exercise.done ? 'border-primary-200 dark:border-primary-800 bg-primary-50/50 dark:bg-primary-950/40' : 'border-gray-200 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-950/60'"
              >
                <input v-model="exercise.done" type="checkbox" class="peer sr-only" />
                <span
                  class="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg border-2 transition"
                  :class="exercise.done ? 'border-primary-600 bg-primary-600 dark:border-primary-500 dark:bg-primary-500 text-white' : 'border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-transparent'"
                >
                  <LucideIcon name="Check" class="h-3.5 w-3.5" />
                </span>
                <span class="min-w-0 flex-1">
                  <span
                    class="block text-sm font-semibold transition"
                    :class="exercise.done ? 'text-gray-400 dark:text-gray-500 line-through' : 'text-gray-900 dark:text-gray-50'"
                  >
                    {{ exercise.name }}
                  </span>
                  <span class="block text-xs text-gray-500 dark:text-gray-400">{{ exercise.detail }}</span>
                </span>
              </label>
            </li>
          </ul>
        </div>
      </section>

      <!-- ================= PROGRESS ================= -->
      <section id="progress" class="mt-8">
        <div class="rounded-3xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-sm dark:shadow-black/30">
          <div class="flex items-start justify-between gap-3">
            <div>
              <h2 class="text-base font-bold text-gray-900 dark:text-gray-50">روند کاهش درد</h2>
              <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">بر اساس ثبت شدت درد در ۶ جلسه اخیر</p>
            </div>
            <span class="rounded-full bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-300">۶۹٪ بهبود</span>
          </div>

          <svg class="mt-4 h-auto w-full" :viewBox="`0 0 ${chart.w} ${chart.h}`" fill="none" role="img" aria-label="نمودار کاهش شدت درد از ۸ به ۲٫۵ در ۶ جلسه">
            <defs>
              <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#14b8a6" stop-opacity="0.35" />
                <stop offset="100%" stop-color="#14b8a6" stop-opacity="0" />
              </linearGradient>
            </defs>

            <line v-for="n in 3" :key="n" :x1="0" :x2="chart.w" :y1="chart.h - 16 - ((n - 1) * (chart.h - 32)) / 2" :y2="chart.h - 16 - ((n - 1) * (chart.h - 32)) / 2" stroke="#f1f5f9" stroke-width="1" />

            <path :d="chart.area" fill="url(#areaFill)" />
            <path :d="chart.line" stroke="#0f766e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />

            <circle v-for="(point, i) in chart.points" :key="i" :cx="point.x" :cy="point.y" r="3.5" fill="#fff" stroke="#0f766e" stroke-width="2.5" />
          </svg>

          <div class="mt-1 flex justify-between px-1 text-[10px] text-gray-400 dark:text-gray-500">
            <span v-for="(point, i) in chart.points" :key="`l${i}`">جلسه {{ fa(i + 1) }}</span>
          </div>

          <div class="mt-3 grid grid-cols-3 gap-2 border-t border-gray-100 dark:border-gray-800 pt-3">
            <div class="text-center">
              <p class="text-xs text-gray-500 dark:text-gray-400">شروع درمان</p>
              <p class="mt-1 text-sm font-bold text-gray-900 dark:text-gray-50">{{ fa(8) }} از ۱۰</p>
            </div>
            <div class="text-center">
              <p class="text-xs text-gray-500 dark:text-gray-400">جلسه اخیر</p>
              <p class="mt-1 text-sm font-bold text-primary-700 dark:text-primary-400">{{ fa('۲٫۵') }} از ۱۰</p>
            </div>
            <div class="text-center">
              <p class="text-xs text-gray-500 dark:text-gray-400">دامنه حرکت</p>
              <p class="mt-1 text-sm font-bold text-gray-900 dark:text-gray-50">+{{ fa(25) }}٪</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ================= APPOINTMENTS ================= -->
      <section id="appointments" class="mt-8">
        <div class="flex items-center justify-between gap-3">
          <h2 class="text-base font-bold text-gray-900 dark:text-gray-50">نوبت‌های من</h2>
          <NuxtLink to="/register" class="inline-flex items-center gap-1 text-xs font-semibold text-primary-700 dark:text-primary-400 hover:text-primary-600"><LucideIcon name="CalendarPlus" class="h-3.5 w-3.5" />رزرو نوبت جدید</NuxtLink>
        </div>

        <!-- سگمنت‌کنترل -->
        <div class="mt-3 flex rounded-xl bg-gray-100 dark:bg-gray-800 p-1">
          <button
            type="button"
            class="min-h-9 flex-1 rounded-lg text-sm font-semibold transition"
            :class="apptTab === 'upcoming' ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-50 shadow-sm dark:shadow-black/30' : 'text-gray-500 dark:text-gray-400'"
            @click="apptTab = 'upcoming'"
          >
            آینده
          </button>
          <button
            type="button"
            class="min-h-9 flex-1 rounded-lg text-sm font-semibold transition"
            :class="apptTab === 'past' ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-50 shadow-sm dark:shadow-black/30' : 'text-gray-500 dark:text-gray-400'"
            @click="apptTab = 'past'"
          >
            گذشته
          </button>
        </div>

        <ul class="mt-3 space-y-2">
          <li
            v-for="appt in apptTab === 'upcoming' ? upcoming : past"
            :key="appt.doctor + appt.date"
            class="flex items-start gap-3 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-sm dark:shadow-black/30"
          >
            <span class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary-50 dark:bg-primary-900/40 text-sm font-bold text-primary-800 dark:text-primary-300">
              {{ appt.doctor.replace('دکتر ', '').charAt(0) }}
            </span>
            <div class="min-w-0 flex-1">
              <div class="flex items-start justify-between gap-2">
                <p class="truncate text-sm font-bold text-gray-900 dark:text-gray-50">{{ appt.doctor }}</p>
                <span class="flex-shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold" :class="statusMap[appt.status].class">
                  {{ statusMap[appt.status].label }}
                </span>
              </div>
              <p class="mt-1 truncate text-xs text-gray-500 dark:text-gray-400">{{ appt.specialty }}</p>
              <div class="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-600 dark:text-gray-400">
                <span class="flex items-center gap-1.5">
                  <LucideIcon name="Calendar" class="h-3.5 w-3.5 text-gray-400 dark:text-gray-500" />
                  {{ appt.date }}
                </span>
                <span class="flex items-center gap-1.5">
                  <LucideIcon name="Clock" class="h-3.5 w-3.5 text-gray-400 dark:text-gray-500" />
                  {{ appt.time }}
                </span>
              </div>
            </div>
          </li>
        </ul>
      </section>

      <!-- ================= FINANCE ================= -->
      <section id="finance" class="mt-8">
        <h2 class="text-base font-bold text-gray-900 dark:text-gray-50">وضعیت مالی</h2>

        <div class="mt-3 rounded-3xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-sm dark:shadow-black/30">
          <div class="flex items-center justify-between gap-3">
            <div>
              <p class="text-xs text-gray-500 dark:text-gray-400">مانده قابل پرداخت</p>
              <p class="mt-1 text-xl font-extrabold text-gray-900 dark:text-gray-50">{{ fa('۴۵۰') }} <span class="text-sm font-medium text-gray-500 dark:text-gray-400">هزار تومان</span></p>
            </div>
            <button
              type="button"
              class="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary-700 px-4 text-sm font-bold text-white transition hover:bg-primary-600 dark:bg-primary-500"
            >
              پرداخت آنلاین
            </button>
          </div>
        </div>

        <ul class="mt-3 space-y-2">
          <li
            v-for="payment in payments"
            :key="payment.title + payment.date"
            class="flex items-center gap-3 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-3.5 shadow-sm dark:shadow-black/30"
          >
            <span
              class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl"
              :class="payment.status === 'paid' ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600' : 'bg-amber-50 dark:bg-amber-950/40 text-amber-600'"
            >
              <LucideIcon :name="payment.status === 'paid' ? 'm5 13 4 4L19 7' : 'M12 8v5M12 16.5h.01M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z'" class="h-5 w-5" />
            </span>
            <div class="min-w-0 flex-1">
              <p class="truncate text-sm font-semibold text-gray-900 dark:text-gray-50">{{ payment.title }}</p>
              <p class="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{{ payment.date }}</p>
            </div>
            <div class="flex-shrink-0 text-left">
              <p class="text-sm font-bold text-gray-900 dark:text-gray-50">{{ payment.amount }}</p>
              <p class="text-[11px]" :class="payment.status === 'paid' ? 'text-emerald-600' : 'text-amber-600'">
                {{ payment.status === 'paid' ? 'پرداخت شده' : 'در انتظار پرداخت' }}
              </p>
            </div>
          </li>
        </ul>
      </section>

      <!-- ================= ACCOUNT ================= -->
      <section id="profile" class="mt-8">
        <h2 class="text-base font-bold text-gray-900 dark:text-gray-50">حساب کاربری</h2>
        <p class="mt-1 text-xs leading-6 text-gray-500 dark:text-gray-400">اطلاعات حساب خود را ویرایش کنید یا در صورت نیاز آن را حذف کنید.</p>

        <div class="mt-3">
          <AccountPanel />
        </div>

        <!-- پیام‌ها -->
        <h3 class="mt-6 text-sm font-bold text-gray-900 dark:text-gray-50">آخرین پیام‌های کلینیک</h3>
        <ul class="mt-3 space-y-2">
          <li v-for="message in messages" :key="message.from + message.time" class="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-sm dark:shadow-black/30">
            <div class="flex items-start justify-between gap-2">
              <div class="flex min-w-0 items-center gap-2">
                <span class="truncate text-sm font-bold text-gray-900 dark:text-gray-50">{{ message.from }}</span>
                <span class="flex-shrink-0 rounded-full bg-gray-100 dark:bg-gray-800 px-2 py-0.5 text-[10px] font-medium text-gray-600 dark:text-gray-400">{{ message.role }}</span>
              </div>
              <span class="flex flex-shrink-0 items-center gap-1.5">
                <span v-if="message.unread" class="h-2 w-2 rounded-full bg-primary-600"></span>
                <span class="text-[11px] text-gray-400 dark:text-gray-500">{{ message.time }}</span>
              </span>
            </div>
            <p class="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">{{ message.text }}</p>
          </li>
        </ul>

        <button
          type="button"
          class="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-rose-200 bg-white px-4 text-sm font-medium text-rose-600 transition hover:bg-rose-50 dark:border-rose-900/60 dark:bg-gray-900 dark:text-rose-400 dark:hover:bg-rose-950/40 lg:mb-20"
          @click="handleLogout"
        >
          <LucideIcon name="LogOut" class="h-4 w-4" />
          خروج از حساب کاربری
        </button>
      </section>
    </main>

    <!-- ================= BOTTOM TAB BAR ================= -->
    <nav
      class="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md sm:inset-x-auto sm:bottom-4 sm:right-1/2 sm:translate-x-1/2 sm:rounded-2xl sm:border sm:shadow-xl"
      aria-label="ناوبری پروفایل"
    >
      <ul class="mx-auto flex max-w-3xl items-stretch justify-between px-1 sm:gap-1 sm:px-2">
        <li v-for="tab in tabs" :key="tab.id" class="flex-1 sm:flex-none">
          <a
            :href="`#${tab.id}`"
            class="rtl-icon-leading relative flex min-h-16 flex-col items-center justify-center gap-1 rounded-xl px-1 pb-2 transition sm:min-h-14 sm:px-3"
            :class="activeTab === tab.id ? 'text-primary-700 dark:text-primary-400' : 'text-gray-400 dark:text-gray-500'"
            :aria-current="activeTab === tab.id ? 'true' : undefined"
            @click.prevent="navigateToTab(tab.id)"
          >
            <LucideIcon :name="tab.icon" class="h-5 w-5" />
            <span class="text-[10px] font-semibold sm:text-[11px]">{{ tab.label }}</span>
            <span
              aria-hidden="true"
              class="absolute bottom-1 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full transition-colors"
              :class="activeTab === tab.id ? 'bg-primary-600' : 'bg-transparent'"
            ></span>
          </a>
        </li>
      </ul>
    </nav>

  </div>
</template>
