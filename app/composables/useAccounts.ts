export interface Account {
  id: string
  fullName: string
  phone: string
  email: string
  gender: 'female' | 'male' | ''
  birthDate: string
  address: string
  insurance: string
  medicalNote: string
  createdAt: string
  password: string
}

export type AccountDraft = Omit<Account, 'id' | 'createdAt'>

const seedAccount: Account = {
  id: 'a-1',
  fullName: 'عرفان بهاری',
  phone: '۰۹۱۲۳۴۵۶۷۸۹',
  email: 'erfan@example.com',
  gender: 'female',
  birthDate: '۱۳۶۸/۰۴/۱۹',
  address: 'تهران، سعادت‌آباد، خیابان علامه شمالی، پلاک ۱۸، واحد ۵',
  insurance: 'بیمه تکمیلی پاسارگاد',
  medicalNote: 'کمردرد مزمن از سال ۱۴۰۲ · آلرژی به پنی‌سیلین',
  createdAt: '۳۰ تیر ۱۴۰۴',
  password: '12345678',
}

/** ارقام فارسی/عربی را به لاتین تبدیل می‌کند (برای اعتبارسنجی و مقایسه) */
export function toLatinDigits(value: string) {
  return value
    .replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)))
}

/** اعتبارسنجی مشترک فرم‌های حساب (در ثبت‌نام و پنل کاربری استفاده می‌شود) */
export function validateAccountBasics(form: { fullName?: string; phone?: string; email?: string }) {
  const errors: Record<string, string> = {}
  const phoneDigits = toLatinDigits(form.phone || '').replace(/[\s-]/g, '')

  if (!form.fullName?.trim() || form.fullName.trim().length < 3) {
    errors.fullName = 'نام و نام خانوادگی را کامل وارد کنید'
  }
  if (!/^09\d{9}$/.test(phoneDigits)) {
    errors.phone = 'شماره موبایل باید ۱۱ رقم و با ۰۹ شروع شود'
  }
  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = 'ساختار ایمیل درست نیست'
  }
  return errors
}

export interface AuthResult {
  ok: boolean
  error?: string
  account?: Account
}

/**
 * حساب‌ها و نشست کاربر — فقط در حافظهٔ برنامه نگه داشته می‌شود و
 * با رفرش صفحه به حالت اولیه بازمی‌گردد (یعنی کاربر خارج می‌شود).
 * برای اتصال به API کافی است بدنهٔ همین توابع جایگزین شوند.
 */
export function useAccounts() {
  const accounts = useState<Account[]>('accounts', () => [structuredClone(seedAccount)])
  /** شناسهٔ حساب وارد‌شده — خالی یعنی هیچ‌کس وارد نشده است */
  const currentId = useState<string>('currentAccountId', () => '')

  const current = computed(() => accounts.value.find((a) => a.id === currentId.value) ?? null)
  const isLoggedIn = computed(() => current.value !== null)

  function findByPhoneOrEmail(identifier: string) {
    const raw = identifier.trim()
    const digits = toLatinDigits(raw).replace(/[\s-]/g, '')
    const email = raw.toLowerCase()

    return accounts.value.find((a) => {
      const accountDigits = toLatinDigits(a.phone).replace(/[\s-]/g, '')
      return accountDigits === digits || (a.email && a.email.toLowerCase() === email)
    })
  }

  function login(identifier: string, password: string): AuthResult {
    const account = findByPhoneOrEmail(identifier)
    if (!account) return { ok: false, error: 'حسابی با این شماره موبایل یا ایمیل پیدا نشد' }
    if (account.password !== password) return { ok: false, error: 'رمز عبور نادرست است' }

    currentId.value = account.id
    return { ok: true, account }
  }

  function logout() {
    currentId.value = ''
  }

  /** ساخت حساب جدید. اگر activate=true باشد، بلافاصله وارد همان حساب می‌شود. */
  function createAccount(draft: AccountDraft, activate = true): AuthResult {
    const digits = toLatinDigits(draft.phone).replace(/[\s-]/g, '')
    if (accounts.value.some((a) => toLatinDigits(a.phone).replace(/[\s-]/g, '') === digits)) {
      return { ok: false, error: 'این شماره موبایل قبلاً ثبت شده است' }
    }
    if (draft.email && accounts.value.some((a) => a.email.toLowerCase() === draft.email.toLowerCase())) {
      return { ok: false, error: 'این ایمیل قبلاً ثبت شده است' }
    }

    const account: Account = {
      ...draft,
      id: `a-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      createdAt: 'امروز',
    }
    accounts.value.push(account)
    if (activate) currentId.value = account.id
    return { ok: true, account }
  }

  function updateAccount(id: string, patch: Partial<Omit<Account, 'id' | 'createdAt'>>) {
    const account = accounts.value.find((a) => a.id === id)
    if (!account) return false
    Object.assign(account, patch)
    return true
  }

  function deleteAccount(id: string) {
    const index = accounts.value.findIndex((a) => a.id === id)
    if (index === -1) return
    accounts.value.splice(index, 1)
    if (currentId.value === id) currentId.value = ''
  }

  return {
    accounts,
    currentId,
    current,
    isLoggedIn,
    login,
    logout,
    createAccount,
    updateAccount,
    deleteAccount,
  }
}
