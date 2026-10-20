<script setup lang="ts">
useHead({ title: 'تیم درمان | فیزیوکلینیک' })
const team = [
  { name: 'دکتر سارا محمدی', role: 'متخصص طب فیزیکی و توانبخشی', initial: 'س' },
  { name: 'دکتر امیر رضایی', role: 'فیزیوتراپیست، گرایش ارتوپدی', initial: 'ا' },
  { name: 'دکتر نگار کریمی', role: 'متخصص توانبخشی عصبی', initial: 'ن' },
  { name: 'دکتر حسین نوری', role: 'فیزیوتراپیست ورزشی', initial: 'ح' },
]
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
    <header class="mx-auto max-w-2xl text-center"><p class="text-xs font-bold text-primary-700 dark:text-primary-400">متخصصان کلینیک</p><h1 class="mt-2 text-3xl font-extrabold text-gray-900 dark:text-gray-50">تیم درمان فیزیوکلینیک</h1><p class="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-400">تیمی از متخصصان و درمانگران با تجربه در مسیر بازیابی حرکت همراه شما هستند.</p></header>
    <div class="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <article v-for="member in team" :key="member.name" class="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <span class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-2xl font-bold text-primary-800 dark:bg-primary-900/50 dark:text-primary-300">{{ member.initial }}</span>
        <h2 class="mt-4 font-bold text-gray-900 dark:text-gray-50">{{ member.name }}</h2><p class="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">{{ member.role }}</p>
      </article>
    </div>
    <p class="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">برای انتخاب خدمت و هماهنگی با تیم پذیرش، <NuxtLink to="/register" class="font-semibold text-primary-700 dark:text-primary-400">نوبت خود را ثبت کنید</NuxtLink>.</p>
  </div>
</template>
