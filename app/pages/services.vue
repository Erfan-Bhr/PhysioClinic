<script setup lang="ts">
useHead({ title: 'خدمات فیزیوتراپی | فیزیوکلینیک' })

const services = [
  { title: 'فیزیوتراپی ارتوپدی', desc: 'ارزیابی و درمان کمردرد، گردن‌درد، آرتروز و آسیب‌های عضلانی‌اسکلتی.', icon: 'Activity' },
  { title: 'توانبخشی پس از جراحی', desc: 'بازگشت تدریجی و ایمن عملکرد پس از جراحی‌های ارتوپدی.', icon: 'Heart' },
  { title: 'درمان درد مزمن', desc: 'برنامه‌ای چندوجهی برای مدیریت دردهای طولانی‌مدت و مقاوم به درمان.', icon: 'Heart' },
  { title: 'ورزش‌درمانی', desc: 'تمرین‌های اختصاصی و پیشرونده متناسب با شرایط و توان شما.', icon: 'Dumbbell' },
  { title: 'منوال تراپی', desc: 'تکنیک‌های دستی برای بهبود حرکت مفاصل و بافت نرم.', icon: 'Hand' },
  { title: 'الکتروتراپی و لیزر', desc: 'استفاده از تجهیزات تخصصی برای کاهش درد و کمک به بهبود بافت.', icon: 'Zap' },
  { title: 'سوزن خشک', desc: 'کمک به کاهش نقاط ماشه‌ای و اسپاسم‌های مقاوم عضلانی.', icon: 'Syringe' },
  { title: 'توانبخشی عصبی', desc: 'بازتوانی حرکتی پس از سکته و آسیب‌های عصبی.', icon: 'Brain' },
]
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
    <header class="mx-auto max-w-2xl text-center">
      <p class="text-xs font-bold text-primary-700 dark:text-primary-400">خدمات تخصصی</p>
      <h1 class="mt-2 text-3xl font-extrabold text-gray-900 dark:text-gray-50">خدمات فیزیوتراپی و توانبخشی</h1>
      <p class="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-400">برای هر شرایط، مسیر درمان متناسب با نیاز و هدف حرکتی شما طراحی می‌کنیم.</p>
    </header>
    <div class="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <article v-for="service in services" :key="service.title" class="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <span class="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300"><LucideIcon :name="service.icon" class="h-6 w-6" /></span>
        <h2 class="mt-4 font-bold text-gray-900 dark:text-gray-50">{{ service.title }}</h2>
        <p class="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">{{ service.desc }}</p>
      </article>
    </div>
    <div class="mt-9 text-center"><NuxtLink to="/register" class="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary-700 px-6 font-bold text-white hover:bg-primary-600 dark:bg-primary-500"><LucideIcon name="CalendarPlus" class="h-4 w-4" />رزرو نوبت</NuxtLink></div>
  </div>
</template>
