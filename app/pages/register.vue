<script setup lang="ts">
import { validateAccountBasics } from '~/composables/useAccounts'

definePageMeta({
  layout: 'auth',
})

useHead({
  title: 'ثبت‌نام | کلینیک فیزیوتراپی',
})

const { createAccount } = useAccounts()

const form = reactive({
  fullName: '',
  phone: '',
  email: '',
  password: '',
  confirmPassword: '',
  gender: '',
  birthDate: '',
  terms: false,
})

const errors = reactive<Record<string, string>>({})
const submitting = ref(false)

function clearErrors() {
  for (const key of Object.keys(errors)) delete errors[key]
}

async function onSubmit() {
  if (submitting.value) return
  clearErrors()

  const found = validateAccountBasics(form)

  if (!form.password || form.password.length < 8) {
    found.password = 'رمز عبور باید حداقل ۸ کاراکتر باشد'
  }
  if (form.confirmPassword !== form.password) {
    found.confirmPassword = 'تکرار رمز عبور مطابقت ندارد'
  }
  if (!form.terms) {
    found.terms = 'برای ادامه باید قوانین و حریم خصوصی را بپذیرید'
  }

  if (Object.keys(found).length) {
    Object.assign(errors, found)
    return
  }

  submitting.value = true
  try {
    const result = createAccount(
      {
        fullName: form.fullName.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        gender: form.gender as '' | 'female' | 'male',
        birthDate: form.birthDate.trim(),
        address: '',
        insurance: '',
        medicalNote: '',
        password: form.password,
      },
      false, // بعد از ثبت‌نام، کاربر خودش وارد شود
    )

    if (!result.ok) {
      errors.form = result.error || 'ثبت‌نام ناموفق بود'
      return
    }

    await navigateTo({ path: '/login', query: { registered: '1', identifier: form.phone.trim() } })
  } finally {
    submitting.value = false
  }
}

const fieldBase = 'block w-full rounded-lg border bg-white dark:bg-gray-900 px-4 py-3 text-base text-gray-900 dark:text-gray-50 placeholder:text-gray-400 transition focus:outline-none focus:ring-2'
const fieldOk = 'border-gray-300 dark:border-gray-700 focus:border-primary-600 focus:ring-primary-600/20'
const fieldErr = 'border-rose-400 dark:border-rose-800 focus:border-rose-500 focus:ring-rose-500/20'
</script>

<template>
  <div class="grid gap-6 lg:grid-cols-2 lg:items-center lg:gap-8">
    <!-- Form section -->
    <section class="order-1 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm dark:shadow-black/30 sm:p-8 lg:order-2 lg:p-10">
      <div class="mb-6">
        <h1 class="text-xl font-bold text-gray-900 dark:text-gray-50 sm:text-2xl">ثبت‌نام در کلینیک فیزیوتراپی</h1>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400 sm:text-base">
          قبلاً حساب کاربری دارید؟
          <NuxtLink to="/login" class="font-medium text-primary-700 dark:text-primary-400 hover:text-primary-600">وارد شوید</NuxtLink>
        </p>
      </div>

      <div v-if="errors.form" class="mb-5 flex items-start gap-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 px-4 py-3 text-sm font-medium text-rose-700 dark:text-rose-300" role="alert">
        <LucideIcon name="AlertCircle" class="mt-0.5 h-5 w-5 flex-shrink-0" />
        {{ errors.form }}
      </div>

      <form class="space-y-5" novalidate @submit.prevent="onSubmit">
        <div class="space-y-2">
          <label for="fullName" class="block text-sm font-medium text-gray-700 dark:text-gray-300">نام و نام خانوادگی</label>
          <input
            id="fullName"
            v-model="form.fullName"
            type="text"
            autocomplete="name"
            dir="auto"
            placeholder="مثال: عرفان بهاری"
            :class="[fieldBase, errors.fullName ? fieldErr : fieldOk]"
          />
          <p v-if="errors.fullName" class="text-xs text-rose-600 dark:text-rose-400">{{ errors.fullName }}</p>
        </div>

        <div class="space-y-2">
          <label for="phone" class="block text-sm font-medium text-gray-700 dark:text-gray-300">شماره موبایل</label>
          <input
            id="phone"
            v-model="form.phone"
            type="tel"
            inputmode="numeric"
            autocomplete="tel"
            dir="ltr"
            placeholder="09123456789"
            class="text-right"
            :class="[fieldBase, errors.phone ? fieldErr : fieldOk]"
          />
          <p v-if="errors.phone" class="text-xs text-rose-600 dark:text-rose-400">{{ errors.phone }}</p>
        </div>

        <div class="space-y-2">
          <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">ایمیل (اختیاری)</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            autocomplete="email"
            dir="ltr"
            placeholder="name@example.com"
            class="text-right"
            :class="[fieldBase, errors.email ? fieldErr : fieldOk]"
          />
          <p v-if="errors.email" class="text-xs text-rose-600 dark:text-rose-400">{{ errors.email }}</p>
        </div>

        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div class="space-y-2">
            <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">رمز عبور</label>
            <PasswordField
              id="password"
              v-model="form.password"
              autocomplete="new-password"
              dir="ltr"
              placeholder="حداقل ۸ کاراکتر"
              class="text-right"
              :class="[fieldBase, errors.password ? fieldErr : fieldOk]"
            />
            <p v-if="errors.password" class="text-xs text-rose-600 dark:text-rose-400">{{ errors.password }}</p>
          </div>
          <div class="space-y-2">
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300">تکرار رمز عبور</label>
            <PasswordField
              id="confirmPassword"
              v-model="form.confirmPassword"
              :show-toggle="false"
              autocomplete="new-password"
              dir="ltr"
              placeholder="رمز عبور را تکرار کنید"
              class="text-right"
              :class="[fieldBase, errors.confirmPassword ? fieldErr : fieldOk]"
            />
            <p v-if="errors.confirmPassword" class="text-xs text-rose-600 dark:text-rose-400">{{ errors.confirmPassword }}</p>
          </div>
        </div>

        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div class="space-y-2">
            <label for="gender" class="block text-sm font-medium text-gray-700 dark:text-gray-300">جنسیت (اختیاری)</label>
            <select id="gender" v-model="form.gender" :class="[fieldBase, fieldOk]">
              <option value="">انتخاب کنید</option>
              <option value="female">زن</option>
              <option value="male">مرد</option>
            </select>
          </div>
          <div class="space-y-2">
            <label for="birthDate" class="block text-sm font-medium text-gray-700 dark:text-gray-300">تاریخ تولد (اختیاری)</label>
            <input id="birthDate" v-model="form.birthDate" type="text" dir="ltr" placeholder="۱۳۷۰/۰۱/۰۱" class="text-right" :class="[fieldBase, fieldOk]" />
          </div>
        </div>

        <div>
          <label class="flex min-h-11 cursor-pointer items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
            <input v-model="form.terms" type="checkbox" class="mt-0.5 h-5 w-5 flex-shrink-0 rounded border-gray-300 dark:border-gray-700 text-primary-700 dark:text-primary-400 focus:ring-primary-600" />
            <span class="leading-6">
              با
              <a href="#" class="font-medium text-primary-700 dark:text-primary-400 hover:text-primary-600">قوانین و مقررات</a>
              و
              <a href="#" class="font-medium text-primary-700 dark:text-primary-400 hover:text-primary-600">حفظ حریم خصوصی</a>
              موافقم
            </span>
          </label>
          <p v-if="errors.terms" class="mt-1 text-xs text-rose-600 dark:text-rose-400">{{ errors.terms }}</p>
        </div>

        <button
          type="submit"
          :disabled="submitting"
          class="min-h-12 w-full rounded-lg bg-primary-700 px-4 py-3.5 text-base font-semibold text-white transition hover:bg-primary-600 dark:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-600/30 disabled:opacity-60"
        >
          {{ submitting ? 'در حال ثبت‌نام…' : 'ثبت‌نام' }}
        </button>

        <p class="text-center text-xs leading-6 text-gray-500 dark:text-gray-400">
          پس از ثبت‌نام، می‌توانید با شماره موبایل و رمز عبور خود وارد پنل کاربری شوید.
        </p>
      </form>
    </section>

    <!-- Info section -->
    <section class="order-2 flex flex-col justify-center rounded-2xl bg-primary-800 p-5 text-white sm:p-8 lg:order-1 lg:p-10">
      <div class="mb-6">
        <span class="inline-flex items-center rounded-full bg-primary-700 px-3 py-1 text-xs font-medium">شروع درمان با ما</span>
        <h2 class="mt-4 text-xl font-bold sm:text-2xl lg:text-3xl">عضویت در سامانه کلینیک فیزیوتراپی</h2>
        <p class="mt-3 text-sm text-primary-100 sm:text-base">
          با ثبت‌نام، به تمام امکانات سامانه دسترسی پیدا کنید و روند درمان خود را هوشمندانه پیگیری کنید.
        </p>
      </div>

      <div class="space-y-3">
        <div class="flex items-start gap-3">
          <div class="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-primary-300"></div>
          <span class="text-sm text-primary-50 sm:text-base">ثبت سریع و آسان اطلاعات</span>
        </div>
        <div class="flex items-start gap-3">
          <div class="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-primary-300"></div>
          <span class="text-sm text-primary-50 sm:text-base">رزرو نوبت در اولین فرصت ممکن</span>
        </div>
        <div class="flex items-start gap-3">
          <div class="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-primary-300"></div>
          <span class="text-sm text-primary-50 sm:text-base">دریافت برنامه تمرینی شخصی‌سازی شده</span>
        </div>
        <div class="flex items-start gap-3">
          <div class="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-primary-300"></div>
          <span class="text-sm text-primary-50 sm:text-base">ارتباط مستقیم با پزشک معالج</span>
        </div>
      </div>

      <div class="mt-8 rounded-xl bg-primary-700/50 p-4">
        <p class="text-sm text-primary-100">
          اطلاعات شما با بالاترین سطح امنیت نگهداری خواهد شد.
        </p>
      </div>
    </section>
  </div>
</template>
