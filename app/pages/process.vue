<script setup lang="ts">
useHead({ title: 'روند درمان | فیزیوکلینیک' })
const steps = [
  { title: 'رزرو نوبت', desc: 'زمان مناسب و خدمت مورد نیازتان را انتخاب کنید.' },
  { title: 'ارزیابی و تشخیص', desc: 'در جلسه اول، وضعیت حرکتی و سابقه درمانی شما بررسی می‌شود.' },
  { title: 'برنامه درمانی اختصاصی', desc: 'بر اساس ارزیابی، ترکیبی از تمرین‌درمانی و روش‌های مناسب پیشنهاد می‌شود.' },
  { title: 'پیگیری پیشرفت', desc: 'نتیجه درمان به‌صورت مرحله‌ای بررسی و برنامه در صورت نیاز به‌روزرسانی می‌شود.' },
]
</script>

<template>
  <div class="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:py-16">
    <header class="text-center"><p class="text-xs font-bold text-primary-700 dark:text-primary-400">از شروع تا بهبود</p><h1 class="mt-2 text-3xl font-extrabold text-gray-900 dark:text-gray-50">روند درمان شما</h1><p class="mx-auto mt-3 max-w-2xl text-sm leading-7 text-gray-600 dark:text-gray-400">در تمام مراحل درمان، از ارزیابی اولیه تا پیگیری تمرین‌ها، همراه شما هستیم.</p></header>
    <ol class="mt-10 space-y-4">
      <li v-for="(step, index) in steps" :key="step.title" class="flex gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <span class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-700 font-bold text-white dark:bg-primary-500">{{ index + 1 }}</span>
        <div><h2 class="font-bold text-gray-900 dark:text-gray-50">{{ step.title }}</h2><p class="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">{{ step.desc }}</p></div>
      </li>
    </ol>
    <div class="mt-8 text-center"><NuxtLink to="/register" class="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary-700 px-6 font-bold text-white hover:bg-primary-600 dark:bg-primary-500"><LucideIcon name="CalendarPlus" class="h-4 w-4" />شروع با رزرو نوبت</NuxtLink></div>
  </div>
</template>
