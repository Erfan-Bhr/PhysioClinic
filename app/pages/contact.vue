<script setup lang="ts">
useHead({ title: 'تماس با ما | فیزیوکلینیک' })
const phone = '۰۲۱-۹۱۰۰۱۲۳۴'
const phoneHref = '+982191001234'
const address = 'تهران، خیابان ولیعصر، بالاتر از میدان ونک، پلاک ۱۲۴، طبقه دوم'
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
    <header class="mx-auto max-w-2xl text-center"><p class="text-xs font-bold text-primary-700 dark:text-primary-400">در ارتباط باشید</p><h1 class="mt-2 text-3xl font-extrabold text-gray-900 dark:text-gray-50">تماس با فیزیوکلینیک</h1><p class="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-400">برای پرسش و هماهنگی نوبت با ما تماس بگیرید یا به کلینیک مراجعه کنید.</p></header>
    <div class="mt-9 grid gap-5 lg:grid-cols-2">
      <div class="space-y-4">
        <div class="rounded-2xl border border-gray-100 bg-white p-5 dark:border-gray-800 dark:bg-gray-900"><h2 class="font-bold text-gray-900 dark:text-gray-50">نشانی</h2><p class="mt-2 text-sm leading-7 text-gray-600 dark:text-gray-400">{{ address }}</p></div>
        <div class="rounded-2xl border border-gray-100 bg-white p-5 dark:border-gray-800 dark:bg-gray-900"><h2 class="font-bold text-gray-900 dark:text-gray-50">تلفن و ساعات کاری</h2><a :href="`tel:${phoneHref}`" dir="ltr" class="mt-2 inline-flex text-sm font-semibold text-primary-700 dark:text-primary-400">{{ phone }}</a><p class="mt-2 text-sm text-gray-600 dark:text-gray-400">شنبه تا پنجشنبه، ۸ الی ۲۰</p></div>
        <div class="flex justify-center">
          <NuxtLink to="/register" class="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary-700 px-6 font-bold text-white hover:bg-primary-600 dark:bg-primary-500"><LucideIcon name="CalendarPlus" class="h-4 w-4" />رزرو نوبت</NuxtLink>
        </div>
      </div>
      <div class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <ClinicMap />
        <div class="flex flex-col gap-2 border-t border-gray-100 p-4 dark:border-gray-800 sm:flex-row sm:items-center sm:justify-between">
          <p class="text-sm text-gray-600 dark:text-gray-400">نزدیک‌ترین ایستگاه مترو: ونک، ۷ دقیقه پیاده</p>
          <a
            href="https://www.openstreetmap.org/?mlat=35.75756&amp;mlon=51.40996#map=17/35.75756/51.40996"
            target="_blank"
            rel="noopener"
            class="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary-700 px-4 text-sm font-semibold text-white transition hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600/40 focus:ring-offset-2 dark:bg-primary-500 dark:text-gray-950 dark:hover:bg-primary-400 dark:focus:ring-offset-gray-900"
          >
            <LucideIcon name="Navigation" class="h-4 w-4" />
            مسیریابی
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
