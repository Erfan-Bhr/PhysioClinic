export type ThemeName = 'light' | 'dark'

const STORAGE_KEY = 'physio-theme'

/** اعمال تم روی ریشهٔ سند */
function applyTheme(value: ThemeName) {
  if (!import.meta.client) return
  const root = document.documentElement
  root.classList.toggle('dark', value === 'dark')
  root.style.colorScheme = value
}

export function useTheme() {
  /** تم فعال — مقدار اولیه همیشه روشن است تا رندر سرور و کلاینت یکسان بماند. */
  const theme = useState<ThemeName>('theme', () => 'light')

  /** بارگذاری تم ذخیره‌شده در مرورگر (فقط سمت کلاینت) */
  function initTheme() {
    if (!import.meta.client) return
    const saved = localStorage.getItem(STORAGE_KEY) as ThemeName | null
    if (saved === 'light' || saved === 'dark') {
      theme.value = saved
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      theme.value = 'dark'
    }
    applyTheme(theme.value)
  }

  function setTheme(value: ThemeName) {
    theme.value = value
    if (import.meta.client) localStorage.setItem(STORAGE_KEY, value)
    applyTheme(value)
  }

  function toggleTheme() {
    setTheme(theme.value === 'dark' ? 'light' : 'dark')
  }

  const isDark = computed(() => theme.value === 'dark')

  return { theme, isDark, initTheme, setTheme, toggleTheme }
}