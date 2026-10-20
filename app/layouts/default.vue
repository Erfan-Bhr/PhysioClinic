<script setup lang="ts">
const route = useRoute()
const menuOpen = useState<boolean>('mobile-menu-open', () => false)
const { logout: logoutAdminAccount } = useAdminAuth()
const { isLoggedIn, current } = useAccounts()
const contentPagePaths = ['/services', '/process', '/team', '/faq', '/contact']
const headerUserInitial = computed(() => current.value?.fullName?.trim().charAt(0) || '؟')
const headerUserName = computed(() => current.value?.fullName?.trim() || '')

const navLinks = [
  { to: '/services', label: 'خدمات' },
  { to: '/process', label: 'روند درمان' },
  { to: '/team', label: 'تیم درمان' },
  { to: '/faq', label: 'سوالات متداول' },
  { to: '/contact', label: 'تماس با ما' },
]

const phone = '۰۲۱-۹۱۰۰۱۲۳۴'
const phoneHref = '+982191001234'

function closeMenu() {
  menuOpen.value = false
}

function exitAdminPanel() {
  logoutAdminAccount()
  navigateTo('/login?loggedout=1')
}

watch(menuOpen, (open) => {
  if (!import.meta.client) return
  document.documentElement.style.overflow = open ? 'hidden' : ''
})

watch(() => route.fullPath, closeMenu)

onBeforeUnmount(() => {
  if (import.meta.client) document.documentElement.style.overflow = ''
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950 pb-[4.75rem] text-gray-900 dark:text-gray-50 antialiased lg:pb-0">
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:fixed focus:right-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-primary-700 focus:px-4 focus:py-2 focus:text-white"
    >
      پرش به محتوای اصلی
    </a>

    <!-- نوار بالا: فقط در موبایل -->
    <div class="bg-primary-900 text-primary-50 lg:hidden">
      <div class="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-2 text-xs">
        <span class="flex items-center gap-1.5">
          <LucideIcon name="Phone" class="h-3.5 w-3.5" />
          <a :href="`tel:${phoneHref}`" class="hover:underline">{{ phone }}</a>
        </span>
        <span class="text-primary-100/80">شنبه تا پنجشنبه، ۸ الی ۲۰</span>
      </div>
    </div>

    <!-- هدر اصلی -->
    <header class="sticky top-0 z-40 border-b border-gray-200/80 bg-white/90 dark:border-gray-800/80 dark:bg-gray-900/90 backdrop-blur-md">
      <div class="flex h-16 items-center justify-between gap-3" :class="route.path === '/admin' ? 'w-full px-4 sm:px-6 lg:px-8' : 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'">
        <div class="flex min-w-0 items-center gap-1.5">
        <button
          v-if="route.path !== '/admin'"
          type="button"
          class="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-700 transition hover:bg-gray-50 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-800 lg:hidden"
          aria-label="باز کردن منو"
          :aria-expanded="menuOpen"
          @click="menuOpen = true"
        >
          <LucideIcon name="Menu" class="h-5 w-5" />
        </button>
        <div v-if="route.path === '/admin'" id="admin-mobile-menu-slot" class="contents lg:hidden"></div>
        <NuxtLink to="/" class="flex min-w-0 items-center gap-2.5">
          <span class="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-primary-700 text-white">
            <LucideIcon name="Activity" class="h-5 w-5" />
          </span>
          <span class="flex min-w-0 flex-col leading-tight">
            <span class="truncate text-sm font-extrabold text-gray-900 dark:text-gray-50">فیزیوکلینیک</span>
            <span class="hidden truncate text-[10px] text-gray-500 dark:text-gray-400 sm:block">مرکز تخصصی فیزیوتراپی و توانبخشی</span>
          </span>
        </NuxtLink>
        </div>

        <nav v-if="route.path !== '/admin'" class="hidden items-center gap-1 lg:flex" aria-label="منوی اصلی">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="rounded-lg px-3 py-2 text-sm font-medium transition"
            :class="route.path === link.to ? 'bg-primary-50 text-primary-800 shadow-sm dark:bg-primary-900/50 dark:text-primary-200' : 'text-gray-600 hover:bg-gray-100 hover:text-primary-700 dark:text-gray-400 dark:hover:bg-gray-800'"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>

        <div class="flex flex-shrink-0 items-center gap-2">
          <button
            v-if="route.path === '/admin'"
            type="button"
            class="inline-flex min-h-10 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-rose-600 transition hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/40"
            @click="exitAdminPanel"
          >
            <LucideIcon name="LogOut" class="h-4 w-4" />
          </button>
          <NuxtLink
            v-else-if="isLoggedIn"
            to="/profile"
            class="inline-flex min-w-0 items-center gap-2 rounded-lg px-1.5 py-1.5 text-gray-700 transition hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 sm:px-2"
          >
            <span class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-600 to-primary-800 text-sm font-bold text-white">{{ headerUserInitial }}</span>
            <span class="max-w-24 truncate text-xs font-semibold sm:max-w-40 sm:text-sm">{{ headerUserName }}</span>
          </NuxtLink>
          <NuxtLink
            v-else
            to="/login"
            class="inline-flex min-h-10 items-center rounded-lg px-2 text-xs font-medium text-gray-700 transition hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 sm:px-3 sm:text-sm"
          >
            ورود/ثبت‌نام
          </NuxtLink>
          <ThemeToggle />
          <NuxtLink
            v-if="contentPagePaths.includes(route.path)"
            to="/"
            aria-label="رفتن به صفحه خانه"
            title="خانه"
            class="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-600/30 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            <LucideIcon name="Home" class="h-5 w-5" />
          </NuxtLink>
        </div>
      </div>
    </header>

    <!-- منوی کشویی موبایل -->
    <div
      v-if="route.path !== '/admin'"
      class="fixed inset-0 z-50 transition-[visibility] duration-300 lg:hidden"
      :class="menuOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none'"
      :aria-hidden="!menuOpen"
      :inert="!menuOpen"
    >
      <div class="absolute inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity duration-300 ease-in-out" :class="menuOpen ? 'opacity-100' : 'opacity-0'" @click="closeMenu"></div>

        <div class="absolute inset-y-0 right-0 flex w-[86%] max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out motion-reduce:transition-none dark:bg-gray-900" :class="menuOpen ? 'translate-x-0' : 'translate-x-full'">
          <div class="flex h-16 items-center justify-between border-b border-gray-200 dark:border-gray-800 px-4">
            <span class="text-sm font-extrabold text-gray-900 dark:text-gray-50">منو</span>
            <button
              type="button"
              class="inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray-500 dark:text-gray-400 transition hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="بستن منو"
              @click="closeMenu"
            >
              <LucideIcon name="X" class="h-5 w-5" />
            </button>
          </div>

          <nav class="flex-1 overflow-y-auto px-3 py-3" aria-label="منوی موبایل">
            <NuxtLink
              v-for="link in navLinks"
              :key="link.to"
              :to="link.to"
              class="flex min-h-12 items-center rounded-xl px-3 text-base font-medium transition"
              :class="route.path === link.to ? 'bg-primary-50 text-primary-800 shadow-sm dark:bg-primary-900/50 dark:text-primary-200' : 'text-gray-700 hover:bg-gray-50 hover:text-primary-700 dark:text-gray-300 dark:hover:bg-gray-800'"
              @click="closeMenu"
            >
              {{ link.label }}
            </NuxtLink>
          </nav>

          <div class="space-y-2 border-t border-gray-200 dark:border-gray-800 p-4">
            <NuxtLink
              v-if="isLoggedIn"
              to="/profile"
              class="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-primary-200 dark:border-primary-800 bg-primary-50 dark:bg-primary-900/40 text-base font-semibold text-primary-800 dark:text-primary-300 transition hover:bg-primary-100"
              @click="closeMenu"
            >
              <LucideIcon name="Home" class="h-4 w-4" />
              ورود به پروفایل من
            </NuxtLink>
            <NuxtLink
              v-else
              to="/login"
              class="flex min-h-12 w-full items-center justify-center rounded-xl border border-gray-300 dark:border-gray-700 text-base font-medium text-gray-700 dark:text-gray-300 transition hover:bg-gray-50 dark:hover:bg-gray-800"
              @click="closeMenu"
            >
              ورود به حساب کاربری
            </NuxtLink>
            <a
              :href="`tel:${phoneHref}`"
              class="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-primary-200 dark:border-primary-800 bg-primary-50 dark:bg-primary-900/40 text-base font-medium text-primary-800 dark:text-primary-300"
            >
              <LucideIcon name="Phone" class="h-4 w-4" />
              تماس فوری با کلینیک
            </a>
          </div>
        </div>
    </div>

    <main id="main">
      <slot />
    </main>

    <!-- فوتر -->
    <footer v-if="route.path !== '/admin'" class="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div class="grid gap-8 lg:grid-cols-4">
          <div class="lg:col-span-1">
            <div class="flex items-center gap-2.5">
              <span class="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-700 text-white">
                <LucideIcon name="Activity" class="h-5 w-5" />
              </span>
              <span class="text-sm font-extrabold text-gray-900 dark:text-gray-50">فیزیوکلینیک</span>
            </div>
            <p class="mt-4 text-sm leading-7 text-gray-600 dark:text-gray-400">
              مرکز تخصصی فیزیوتراپی و توانبخشی با بهره‌مندی از کادر درمانی مجرب و تجهیزات به‌روز، همراه شما در بازیابی حرکت و کیفیت زندگی است.
            </p>
          </div>

          <div>
            <h3 class="text-sm font-bold text-gray-900 dark:text-gray-50">دسترسی سریع</h3>
            <ul class="mt-4 space-y-2.5 text-sm">
              <li v-for="link in navLinks" :key="link.to">
                <NuxtLink :to="link.to" class="text-gray-600 dark:text-gray-400 transition hover:text-primary-700">{{ link.label }}</NuxtLink>
              </li>
              <li><NuxtLink to="/register" class="text-gray-600 dark:text-gray-400 transition hover:text-primary-700">ثبت‌نام و رزرو نوبت</NuxtLink></li>
            </ul>
          </div>

          <div>
            <h3 class="text-sm font-bold text-gray-900 dark:text-gray-50">ساعات کاری</h3>
            <ul class="mt-4 space-y-2.5 text-sm text-gray-600 dark:text-gray-400">
              <li class="flex items-center justify-between gap-3"><span>شنبه تا چهارشنبه</span><span class="font-medium text-gray-900 dark:text-gray-50">۸ الی ۲۰</span></li>
              <li class="flex items-center justify-between gap-3"><span>پنجشنبه</span><span class="font-medium text-gray-900 dark:text-gray-50">۸ الی ۱۴</span></li>
              <li class="flex items-center justify-between gap-3"><span>جمعه</span><span class="text-gray-400 dark:text-gray-500">تعطیل</span></li>
            </ul>
          </div>

          <div>
            <h3 class="text-sm font-bold text-gray-900 dark:text-gray-50">تماس با ما</h3>
            <ul class="mt-4 space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <a :href="`tel:${phoneHref}`" class="font-medium text-gray-900 dark:text-gray-50 transition hover:text-primary-700" dir="ltr">{{ phone }}</a>
              </li>
              <li class="leading-7">تهران، خیابان ولیعصر، بالاتر از میدان ونک، پلاک ۱۲۴، طبقه دوم</li>
              <li><a href="mailto:info@physioclinic.ir" class="transition hover:text-primary-700" dir="ltr">info@physioclinic.ir</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div class="border-t border-gray-200 dark:border-gray-800">
        <div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-gray-500 dark:text-gray-400 sm:flex-row sm:px-6 lg:px-8">
          <p>تمامی حقوق محفوظ است © ۱۴۰۴ فیزیوکلینیک</p>
          <p>دارای مجوز رسمی از وزارت بهداشت، درمان و آموزش پزشکی</p>
        </div>
      </div>
    </footer>

    <!-- نوار اقدام چسبان: فقط در موبایل -->
    <div v-if="!route.path.startsWith('/admin')" class="fixed inset-x-0 bottom-0 z-30 border-t border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md lg:hidden">
      <div class="mx-auto flex max-w-7xl items-center gap-2 px-4 py-2.5" style="padding-bottom: calc(0.625rem + env(safe-area-inset-bottom));">
        <a
          :href="`tel:${phoneHref}`"
          class="inline-flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm font-semibold text-gray-700 dark:text-gray-300 transition hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          <LucideIcon name="Phone" class="h-4 w-4 text-primary-700 dark:text-primary-400" />
          تماس
        </a>
        <NuxtLink
          to="/register"
          class="inline-flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-xl bg-primary-700 text-sm font-bold text-white transition hover:bg-primary-600 dark:bg-primary-500"
        >
          <LucideIcon name="CalendarPlus" class="h-4 w-4" />
          رزرو نوبت
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
