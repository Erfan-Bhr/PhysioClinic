<script setup lang="ts">
useHead({ title: 'سوالات متداول | فیزیوکلینیک' })
const faqs = [
  { q: 'آیا برای فیزیوتراپی نیاز به ارجاع پزشک دارم؟', a: 'برای شروع درمان ارجاع پزشک الزامی نیست؛ اما اگر بیمه شما برای پرداخت هزینه به نسخه نیاز دارد، ارجاع را همراه داشته باشید.' },
  { q: 'هر جلسه چقدر طول می‌کشد و چند جلسه لازم است؟', a: 'هر جلسه معمولاً بین ۳۰ تا ۶۰ دقیقه طول می‌کشد. تعداد جلسات پس از ارزیابی و با توجه به شرایط شما مشخص می‌شود.' },
  { q: 'آیا بیمه هزینه‌ها را پوشش می‌دهد؟', a: 'با اکثر بیمه‌های پایه و تکمیلی همکاری داریم. برای اطلاع از پوشش بیمه خود با پذیرش تماس بگیرید.' },
  { q: 'درمان فیزیوتراپی دردناک است؟', a: 'شدت درمان بر اساس شرایط و میزان تحمل شما تنظیم می‌شود. اگر هنگام درمان ناراحتی داشتید، درمانگر را مطلع کنید.' },
  { q: 'برای جلسه اول چه چیزی همراه بیاورم؟', a: 'کارت ملی، کارت بیمه، گزارش‌ها و تصاویر پزشکی قبلی و لباس راحت ورزشی را همراه داشته باشید.' },
]
</script>

<template>
  <div class="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
    <header class="text-center"><p class="text-xs font-bold text-primary-700 dark:text-primary-400">راهنمای مراجعه</p><h1 class="mt-2 text-3xl font-extrabold text-gray-900 dark:text-gray-50">سوالات متداول</h1><p class="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-400">پاسخ پرسش‌های رایج درباره‌ی جلسات و خدمات کلینیک.</p></header>
    <div class="mt-8 space-y-3">
      <details v-for="faq in faqs" :key="faq.q" class="group rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <summary class="flex cursor-pointer list-none items-center justify-between gap-3 rounded-2xl px-4 py-4 font-semibold text-gray-900 transition-colors hover:bg-gray-50 dark:text-gray-50 dark:hover:bg-gray-800 [&::-webkit-details-marker]:hidden"><span>{{ faq.q }}</span><LucideIcon name="ChevronDown" class="h-4 w-4 flex-shrink-0 text-gray-500 transition-transform duration-200 group-open:rotate-180" /></summary>
        <p class="px-4 pb-4 text-sm leading-7 text-gray-600 dark:text-gray-400">{{ faq.a }}</p>
      </details>
    </div>
  </div>
</template>
