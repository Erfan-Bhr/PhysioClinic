<script setup lang="ts">
definePageMeta({
  layout: 'auth',
})

useHead({
  title: 'ورود | کلینیک فیزیوتراپی',
})

const route = useRoute()
const { login } = useAccounts()
const { login: loginAdmin } = useAdminAuth()

const form = reactive({
  identifier: typeof route.query.identifier === 'string' ? route.query.identifier : '',
  password: '',
  remember: false,
})

const error = ref('')
const submitting = ref(false)

const notice = computed(() => {
  if (route.query.registered) return { text: 'ثبت‌نام شما با موفقیت انجام شد. حالا وارد شوید.', tone: 'success' as const }
  if (route.query.deleted) return { text: 'حساب کاربری شما حذف شد.', tone: 'info' as const }
  if (route.query.loggedout) return { text: 'از حساب خود خارج شدید.', tone: 'info' as const }
  return null
})

async function onSubmit() {
  if (submitting.value) return
  error.value = ''

  if (!form.identifier.trim() || !form.password) {
    error.value = 'شماره موبایل/ایمیل و رمز عبور را وارد کنید'
    return
  }

  submitting.value = true
  try {
    const result = login(form.identifier, form.password)

    if (!result.ok) {
      if (loginAdmin(form.identifier, form.password)) {
        await navigateTo('/admin')
        return
      }
      error.value = result.error || 'ورود ناموفق بود'
      return
    }

    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/profile'
    await navigateTo(redirect)
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="grid gap-6 lg:grid-cols-2 lg:items-center lg:gap-8">
    <!-- Mobile-first: form first on mobile, image/info on desktop -->
    <section class="order-1 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm dark:shadow-black/30 sm:p-8 lg:order-2 lg:p-10">
      <div class="mb-6">
        <h1 class="text-xl font-bold text-gray-900 dark:text-gray-50 sm:text-2xl">ورود به حساب کاربری</h1>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400 sm:text-base">
          هنوز حساب کاربری ندارید؟
          <NuxtLink to="/register" class="font-medium text-primary-700 dark:text-primary-400 hover:text-primary-600">ثبت‌نام کنید</NuxtLink>
        </p>
      </div>

      <!-- پیام‌های وضعیت -->
      <div
        v-if="notice"
        class="mb-5 flex items-start gap-2 rounded-xl px-4 py-3 text-sm font-medium"
        :class="notice.tone === 'success' ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300' : 'bg-primary-50 dark:bg-primary-900/40 text-primary-800 dark:text-primary-300'"
      >
        <LucideIcon :name="notice.tone === 'success' ? 'Check' : 'AlertCircle'" class="mt-0.5 h-5 w-5 flex-shrink-0" />
        {{ notice.text }}
      </div>

      <!-- خطای ورود -->
      <div v-if="error" class="mb-5 flex items-start gap-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 px-4 py-3 text-sm font-medium text-rose-700 dark:text-rose-300" role="alert">
        <LucideIcon name="AlertCircle" class="mt-0.5 h-5 w-5 flex-shrink-0" />
        {{ error }}
      </div>

      <form class="space-y-5" novalidate @submit.prevent="onSubmit">
        <div class="space-y-2">
          <label for="identifier" class="block text-sm font-medium text-gray-700 dark:text-gray-300">شماره موبایل یا ایمیل</label>
          <input
            id="identifier"
            v-model.trim="form.identifier"
            name="username"
            type="text"
            autocomplete="username"
            autocapitalize="off"
            autocorrect="off"
            spellcheck="false"
            enterkeyhint="next"
            dir="auto"
            placeholder="مثال: 09123456789 یا name@example.com"
            class="block w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-base text-gray-900 dark:text-gray-50 placeholder:text-gray-400 transition focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600/20"
          />
        </div>

        <div class="space-y-2">
          <div class="flex items-center justify-between gap-3">
            <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">رمز عبور</label>
            <a href="#" class="text-sm font-medium text-primary-700 dark:text-primary-400 hover:text-primary-600">فراموشی رمز عبور؟</a>
          </div>
          <PasswordField
            id="password"
            v-model="form.password"
            name="password"
            autocomplete="current-password"
            enterkeyhint="go"
            dir="ltr"
            placeholder="رمز عبور خود را وارد کنید"
            class="block w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-right text-base text-gray-900 dark:text-gray-50 placeholder:text-gray-400 transition focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600/20"
          />
        </div>

        <label class="flex min-h-11 cursor-pointer items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
          <input
            v-model="form.remember"
            type="checkbox"
            class="h-5 w-5 rounded border-gray-300 dark:border-gray-700 text-primary-700 dark:text-primary-400 focus:ring-primary-600"
          />
          مرا به خاطر بسپار
        </label>

        <button
          type="submit"
          :disabled="submitting"
          class="min-h-12 w-full rounded-lg bg-primary-700 px-4 py-3.5 text-base font-semibold text-white transition hover:bg-primary-600 dark:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-600/30 disabled:opacity-60"
        >
          {{ submitting ? 'در حال ورود…' : 'ورود' }}
        </button>
      </form>
    </section>

    <section class="order-2 flex flex-col justify-center rounded-2xl bg-primary-800 p-5 text-white sm:p-8 lg:order-1 lg:p-10">
      <div class="mb-6">
        <span class="inline-flex items-center rounded-full bg-primary-700 px-3 py-1 text-xs font-medium">دسترسی امن و حرفه‌ای</span>
        <h2 class="mt-4 text-xl font-bold sm:text-2xl lg:text-3xl">پلتفرم مدیریت بیماران فیزیوتراپی</h2>
        <p class="mt-3 text-sm text-primary-100 sm:text-base">
          با ورود به سامانه، می‌توانید نوبت‌ها، برنامه تمرینی، پیشرفت درمان و پرداخت‌های خود را به‌راحتی مدیریت کنید.
        </p>
      </div>

      <div class="space-y-3">
        <div class="flex items-start gap-3">
          <div class="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-primary-300"></div>
          <span class="text-sm text-primary-50 sm:text-base">رزرو آنلاین نوبت با انتخاب پزشک و زمان دلخواه</span>
        </div>
        <div class="flex items-start gap-3">
          <div class="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-primary-300"></div>
          <span class="text-sm text-primary-50 sm:text-base">دسترسی به برنامه‌های تمرینی اختصاصی</span>
        </div>
        <div class="flex items-start gap-3">
          <div class="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-primary-300"></div>
          <span class="text-sm text-primary-50 sm:text-base">پیگیری پیشرفت درمان و گزارش‌های دوره‌ای</span>
        </div>
        <div class="flex items-start gap-3">
          <div class="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-primary-300"></div>
          <span class="text-sm text-primary-50 sm:text-base">مشاهده صورت‌حساب و پرداخت آنلاین</span>
        </div>
      </div>

      <div class="mt-8 rounded-xl bg-primary-700/50 p-4">
        <p class="text-sm text-primary-100">
          در صورت بروز هرگونه مشکل در ورود، با پشتیبانی کلینیک تماس بگیرید.
        </p>
      </div>
    </section>
  </div>
</template>
