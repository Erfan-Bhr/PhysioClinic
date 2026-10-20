<script setup lang="ts">
import { toLatinDigits, validateAccountBasics } from '~/composables/useAccounts'

const { current, updateAccount, deleteAccount, logout } = useAccounts()

type Tab = 'info' | 'delete'
const tab = ref<Tab>('info')
const editing = ref(false)
const toast = ref('')

const panelTabs: { key: Tab; label: string }[] = [
  { key: 'info', label: 'اطلاعات من' },
  { key: 'delete', label: 'حذف حساب' },
]

function notify(message: string) {
  toast.value = message
  if (!import.meta.client) return
  window.setTimeout(() => {
    if (toast.value === message) toast.value = ''
  }, 2600)
}

function clearErrors(target: Record<string, string>) {
  for (const key of Object.keys(target)) delete target[key]
}

/* ---------- تب ۱: اطلاعات من + ویرایش ---------- */
const editForm = reactive({
  fullName: '',
  phone: '',
  email: '',
  gender: '',
  birthDate: '',
  address: '',
  insurance: '',
  medicalNote: '',
})
const newPassword = ref('')
const editErrors = reactive<Record<string, string>>({})

function startEditing() {
  const account = current.value
  if (!account) return
  Object.assign(editForm, {
    fullName: account.fullName,
    phone: account.phone,
    email: account.email,
    gender: account.gender,
    birthDate: account.birthDate,
    address: account.address,
    insurance: account.insurance,
    medicalNote: account.medicalNote,
  })
  newPassword.value = ''
  clearErrors(editErrors)
  editing.value = true
}

function saveProfile() {
  clearErrors(editErrors)
  const errors = validateAccountBasics(editForm)

  if (newPassword.value && newPassword.value.length < 8) {
    errors.password = 'رمز عبور جدید باید حداقل ۸ کاراکتر باشد'
  }
  if (errors.password && !newPassword.value) delete errors.password

  if (Object.keys(errors).length) {
    Object.assign(editErrors, errors)
    return
  }
  if (!current.value) return

  const patch: Record<string, unknown> = {
    fullName: editForm.fullName.trim(),
    phone: editForm.phone.trim(),
    email: editForm.email.trim(),
    gender: (editForm.gender as 'female' | 'male' | '') || '',
    birthDate: editForm.birthDate.trim(),
    address: editForm.address.trim(),
    insurance: editForm.insurance.trim(),
    medicalNote: editForm.medicalNote.trim(),
  }
  if (newPassword.value) patch.password = newPassword.value

  const ok = updateAccount(current.value.id, patch)

  if (!ok) {
    Object.assign(editErrors, { form: 'خطا در ذخیره اطلاعات' })
    return
  }
  newPassword.value = ''
  editing.value = false
  notify('اطلاعات پروفایل با موفقیت ذخیره شد')
}

/* ---------- تب ۲: حذف حساب ---------- */
const confirmed = ref(false)
const confirmText = ref('')

const canDelete = computed(() => {
  const username = confirmText.value.trim()
  if (!confirmed.value || !current.value || !username) return false

  const phone = (value: string) => toLatinDigits(value).replace(/[\s-]/g, '')
  return phone(username) === phone(current.value.phone)
    || (!!current.value.email && username.toLowerCase() === current.value.email.toLowerCase())
})

async function submitDelete() {
  if (!current.value) return
  const name = current.value.fullName

  deleteAccount(current.value.id)
  confirmed.value = false
  confirmText.value = ''
  editing.value = false

  logout()
  await navigateTo({ path: '/login', query: { deleted: '1' } })
}

const fieldBase = 'block w-full rounded-lg border bg-white dark:bg-gray-900 px-4 py-3 text-base text-gray-900 dark:text-gray-50 placeholder:text-gray-400 transition focus:outline-none focus:ring-2'
const fieldOk = 'border-gray-300 dark:border-gray-700 focus:border-primary-600 focus:ring-primary-600/20'
const fieldErr = 'border-rose-400 dark:border-rose-800 focus:border-rose-500 focus:ring-rose-500/20'
</script>

<template>
  <div>
    <!-- پیام وضعیت -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="-translate-y-1 opacity-0"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="opacity-0"
    >
      <div v-if="toast" class="mb-3 flex items-center gap-2 rounded-2xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/40 px-4 py-3 text-sm font-medium text-emerald-700 dark:text-emerald-300">
        <LucideIcon name="Check" class="h-5 w-5 flex-shrink-0" />
        {{ toast }}
      </div>
    </transition>

    <div class="rounded-3xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-sm dark:shadow-black/30">
      <!-- سگمنت‌کنترل تب‌ها -->
      <div class="flex rounded-xl bg-gray-100 dark:bg-gray-800 p-1" role="tablist" aria-label="مدیریت حساب کاربری">
        <button
          v-for="item in panelTabs"
          :key="item.key"
          type="button"
          role="tab"
          class="min-h-9 flex-1 rounded-lg px-1 text-xs font-semibold transition sm:text-sm"
          :class="tab === item.key ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-50 shadow-sm dark:shadow-black/30' : item.key === 'delete' ? 'text-rose-500' : 'text-gray-500 dark:text-gray-400'"
          :aria-selected="tab === item.key"
          @click="tab = item.key"
        >
          {{ item.label }}
        </button>
      </div>

      <!-- ============ حالت خالی ============ -->
      <div v-if="!current" class="py-8 text-center">
        <span class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500">
          <LucideIcon name="UserPlus" class="h-7 w-7" />
        </span>
        <p class="mt-4 text-sm font-bold text-gray-900 dark:text-gray-50">هیچ حسابی ثبت نشده است</p>
        <p class="mt-1 text-xs leading-6 text-gray-500 dark:text-gray-400">برای استفاده از پروفایل، ابتدا وارد حساب کاربری شوید.</p>
      </div>

      <!-- ============ تب ۱: اطلاعات من ============ -->
      <template v-else-if="tab === 'info'">
        <!-- کارت خلاصه -->
        <div class="mt-4 flex items-center gap-3">
          <span class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 text-base font-bold text-white">
            {{ current.fullName.charAt(0) }}
          </span>
          <div class="min-w-0 flex-1">
            <p class="truncate text-sm font-bold text-gray-900 dark:text-gray-50">{{ current.fullName }}</p>
            <p class="mt-0.5 truncate text-xs text-gray-500 dark:text-gray-400" dir="ltr">{{ current.phone }}</p>
          </div>
          <button
            v-if="!editing"
            type="button"
            class="inline-flex min-h-10 flex-shrink-0 items-center gap-1.5 rounded-xl border border-gray-300 dark:border-gray-700 px-3 text-xs font-semibold text-gray-700 dark:text-gray-300 transition hover:bg-gray-50 dark:hover:bg-gray-800"
            @click="startEditing"
          >
            <LucideIcon name="Pencil" class="h-4 w-4" />
            ویرایش
          </button>
        </div>

        <!-- حالت فقط‌خواندنی -->
        <dl v-if="!editing" class="mt-4 divide-y divide-gray-100 dark:divide-gray-800">
          <div v-for="item in [
            { label: 'نام و نام خانوادگی', value: current.fullName },
            { label: 'شماره موبایل', value: current.phone, ltr: true },
            { label: 'ایمیل', value: current.email || '—', ltr: true },
            { label: 'جنسیت', value: current.gender === 'female' ? 'زن' : current.gender === 'male' ? 'مرد' : '—' },
            { label: 'تاریخ تولد', value: current.birthDate || '—' },
            { label: 'بیمه تکمیلی', value: current.insurance || '—' },
            { label: 'نشانی', value: current.address || '—' },
            { label: 'نکات پزشکی', value: current.medicalNote || '—' },
          ]" :key="item.label" class="flex items-start gap-3 py-2.5">
            <dt class="w-28 flex-shrink-0 text-xs text-gray-500 dark:text-gray-400">{{ item.label }}</dt>
            <dd class="min-w-0 flex-1 text-sm font-medium leading-6 text-gray-900 dark:text-gray-50" :dir="item.ltr ? 'ltr' : undefined" :class="item.ltr ? 'text-right' : undefined">{{ item.value }}</dd>
          </div>
          <div class="flex items-start gap-3 py-2.5">
            <dt class="w-28 flex-shrink-0 text-xs text-gray-500 dark:text-gray-400">تاریخ عضویت</dt>
            <dd class="min-w-0 flex-1 text-sm font-medium text-gray-900 dark:text-gray-50">{{ current.createdAt }}</dd>
          </div>
        </dl>

        <!-- فرم ویرایش -->
        <form v-else class="mt-4 space-y-4" novalidate @submit.prevent="saveProfile">
          <div v-if="editErrors.form" class="rounded-xl bg-rose-50 dark:bg-rose-950/40 px-3 py-2.5 text-sm font-medium text-rose-600 dark:text-rose-400">
            {{ editErrors.form }}
          </div>

          <div class="space-y-2">
            <label for="edit-fullName" class="block text-sm font-medium text-gray-700 dark:text-gray-300">نام و نام خانوادگی</label>
            <input
              id="edit-fullName"
              v-model="editForm.fullName"
              type="text"
              autocomplete="name"
              dir="auto"
              placeholder="مثال: عرفان بهاری"
              :class="[fieldBase, editErrors.fullName ? fieldErr : fieldOk]"
            />
            <p v-if="editErrors.fullName" class="text-xs text-rose-600 dark:text-rose-400">{{ editErrors.fullName }}</p>
          </div>

          <div class="space-y-2">
            <label for="edit-phone" class="block text-sm font-medium text-gray-700 dark:text-gray-300">شماره موبایل</label>
            <input
              id="edit-phone"
              v-model="editForm.phone"
              type="tel"
              inputmode="numeric"
              autocomplete="tel"
              dir="ltr"
              placeholder="09123456789"
              class="text-right"
              :class="[fieldBase, editErrors.phone ? fieldErr : fieldOk]"
            />
            <p v-if="editErrors.phone" class="text-xs text-rose-600 dark:text-rose-400">{{ editErrors.phone }}</p>
          </div>

          <div class="space-y-2">
            <label for="edit-email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">ایمیل (اختیاری)</label>
            <input
              id="edit-email"
              v-model="editForm.email"
              type="email"
              autocomplete="email"
              dir="ltr"
              placeholder="name@example.com"
              class="text-right"
              :class="[fieldBase, editErrors.email ? fieldErr : fieldOk]"
            />
            <p v-if="editErrors.email" class="text-xs text-rose-600 dark:text-rose-400">{{ editErrors.email }}</p>
          </div>

          <div class="space-y-2">
            <label for="edit-password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">رمز عبور جدید (اختیاری)</label>
            <PasswordField
              id="edit-password"
              v-model="newPassword"
              autocomplete="new-password"
              dir="ltr"
              placeholder="حداقل ۸ کاراکتر"
              class="text-right"
              :class="[fieldBase, editErrors.password ? fieldErr : fieldOk]"
            />
            <p v-if="editErrors.password" class="text-xs text-rose-600 dark:text-rose-400">{{ editErrors.password }}</p>
          </div>

          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div class="space-y-2">
              <label for="edit-gender" class="block text-sm font-medium text-gray-700 dark:text-gray-300">جنسیت</label>
              <select id="edit-gender" v-model="editForm.gender" :class="[fieldBase, fieldOk]">
                <option value="">انتخاب کنید</option>
                <option value="female">زن</option>
                <option value="male">مرد</option>
              </select>
            </div>
            <div class="space-y-2">
              <label for="edit-birthDate" class="block text-sm font-medium text-gray-700 dark:text-gray-300">تاریخ تولد</label>
              <PersianDatePicker id="edit-birthDate" v-model="editForm.birthDate" />
            </div>
          </div>

          <div class="space-y-2">
            <label for="edit-insurance" class="block text-sm font-medium text-gray-700 dark:text-gray-300">بیمه تکمیلی</label>
            <input id="edit-insurance" v-model="editForm.insurance" type="text" dir="auto" placeholder="مثال: بیمه تکمیلی پاسارگاد" :class="[fieldBase, fieldOk]" />
          </div>

          <div class="space-y-2">
            <label for="edit-address" class="block text-sm font-medium text-gray-700 dark:text-gray-300">نشانی</label>
            <textarea id="edit-address" v-model="editForm.address" rows="2" dir="auto" placeholder="نشانی کامل" :class="[fieldBase, fieldOk]"></textarea>
          </div>

          <div class="space-y-2">
            <label for="edit-medicalNote" class="block text-sm font-medium text-gray-700 dark:text-gray-300">نکات پزشکی</label>
            <textarea id="edit-medicalNote" v-model="editForm.medicalNote" rows="3" dir="auto" placeholder="بیماری‌ها، حساسیت‌ها، داروهای مصرفی" :class="[fieldBase, fieldOk]"></textarea>
          </div>

          <div class="flex gap-2 pt-1">
            <button type="submit" class="min-h-11 flex-1 rounded-xl bg-primary-700 text-sm font-bold text-white transition hover:bg-primary-600 dark:bg-primary-500">
              ذخیره تغییرات
            </button>
            <button type="button" class="min-h-11 flex-1 rounded-xl border border-gray-300 dark:border-gray-700 text-sm font-semibold text-gray-700 dark:text-gray-300 transition hover:bg-gray-50 dark:hover:bg-gray-800" @click="editing = false">
              انصراف
            </button>
          </div>
        </form>
      </template>

      <!-- ============ تب ۲: حذف حساب ============ -->
      <template v-else>
        <div class="mt-4 rounded-2xl border border-rose-200 bg-rose-50 dark:bg-rose-950/40 p-4">
          <div class="flex items-start gap-2">
            <LucideIcon name="AlertTriangle" class="mt-0.5 h-5 w-5 flex-shrink-0 text-rose-600 dark:text-rose-400" />
            <div>
              <p class="text-sm font-bold text-rose-700 dark:text-rose-300">حذف حساب «{{ current?.fullName }}»</p>
              <p class="mt-1 text-xs leading-6 text-rose-600 dark:text-rose-400">این عملیات برگشت‌پذیر نیست.</p>
            </div>
          </div>
        </div>

        <p class="mt-4 text-sm font-semibold text-gray-900 dark:text-gray-50">مواردی که حذف می‌شوند:</p>
        <ul class="mt-2 space-y-2">
          <li v-for="item in ['اطلاعات هویتی و تماس', 'سابقه نوبت‌های رزروشده', 'برنامه تمرینی و سابقه پیشرفت', 'صورت‌حساب‌ها و پرداخت‌ها', 'پیام‌های تبادل‌شده با کلینیک']" :key="item" class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <LucideIcon name="X" class="h-4 w-4 flex-shrink-0 text-rose-500" />
            {{ item }}
          </li>
        </ul>

        <label class="mt-4 flex min-h-11 cursor-pointer items-start gap-3 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 p-3">
          <input v-model="confirmed" type="checkbox" class="mt-0.5 h-5 w-5 rounded border-gray-300 dark:border-gray-700 text-rose-600 dark:text-rose-400 focus:ring-rose-500" />
          <span class="text-sm leading-6 text-gray-700 dark:text-gray-300">تأیید می‌کنم که عواقب حذف حساب را خوانده‌ام و می‌خواهم حساب حذف شود.</span>
        </label>

        <div class="mt-4 space-y-2">
          <label for="delete-confirm" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            برای فعال‌شدن دکمه، نام کاربری حساب (شماره موبایل یا ایمیل) را وارد کنید
          </label>
          <input
            id="delete-confirm"
            v-model="confirmText"
            type="text"
            dir="auto"
            :placeholder="current?.phone || 'شماره موبایل یا ایمیل'"
            class="block w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-base text-gray-900 dark:text-gray-50 placeholder:text-gray-400 transition focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
          />
        </div>

        <button
          type="button"
          :disabled="!canDelete"
          class="mt-4 min-h-12 w-full rounded-xl bg-rose-600 text-sm font-bold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-40"
          @click="submitDelete"
        >
          حذف کامل حساب کاربری
        </button>
      </template>
    </div>
  </div>
</template>
