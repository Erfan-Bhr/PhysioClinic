interface AdminAccount {
  username: string
  fullName: string
  phone: string
  password: string
}

const ACCOUNT_KEY = 'physio-admin-account'
const SESSION_KEY = 'physio-admin-session'
const DEFAULT_ACCOUNT: AdminAccount = {
  username: 'admin1234',
  fullName: 'admin1234',
  phone: '09998887777',
  password: '11111111',
}

function normalizePhone(value: string) {
  return value.replace(/[۰-۹]/g, (digit) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(digit))).replace(/[٠-٩]/g, (digit) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(digit))).replace(/[\s-]/g, '')
}

export function useAdminAuth() {
  const account = useState<AdminAccount>('physio-admin-account-state', () => ({ ...DEFAULT_ACCOUNT }))
  const isAuthenticated = useState('physio-admin-authenticated', () => false)

  function initialize() {
    if (!import.meta.client) return
    try {
      const storedAccount = localStorage.getItem(ACCOUNT_KEY)
      if (storedAccount) {
        const parsed = JSON.parse(storedAccount) as Partial<AdminAccount>
        if (parsed.phone && parsed.fullName && parsed.password) {
          Object.assign(account.value, { ...DEFAULT_ACCOUNT, ...parsed })
        } else {
          Object.assign(account.value, DEFAULT_ACCOUNT)
          localStorage.setItem(ACCOUNT_KEY, JSON.stringify(account.value))
        }
      } else {
        localStorage.setItem(ACCOUNT_KEY, JSON.stringify(account.value))
      }
      isAuthenticated.value = localStorage.getItem(SESSION_KEY) === account.value.username
    } catch {
      isAuthenticated.value = false
    }
  }

  function login(identifier: string, password: string) {
    if (!import.meta.client) return false
    initialize()
    const matchesUsername = identifier.trim() === account.value.username
    const matchesPhone = normalizePhone(identifier) === normalizePhone(account.value.phone)
    if ((!matchesUsername && !matchesPhone) || password !== account.value.password) return false
    try {
      localStorage.setItem(SESSION_KEY, account.value.username)
    } catch {
      // The current session can still continue if browser storage is blocked.
    }
    isAuthenticated.value = true
    return true
  }

  function logout() {
    if (import.meta.client) localStorage.removeItem(SESSION_KEY)
    isAuthenticated.value = false
  }

  return { account, isAuthenticated, initialize, login, logout }
}
