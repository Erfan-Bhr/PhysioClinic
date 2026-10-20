<script setup lang="ts">
const { tickets, createTicket, sendMessage } = useSupportChat()
const route = useRoute()
const mobileMenuOpen = useState<boolean>('mobile-menu-open', () => false)
const isOpen = ref(false)
const draft = ref('')
const messagesContainer = ref<HTMLElement | null>(null)

watch(isOpen, (open) => {
  if (!import.meta.client) return
  document.body.style.overflow = open ? 'hidden' : ''
})

onBeforeUnmount(() => {
  if (import.meta.client) document.body.style.overflow = ''
})

const widgetPosition = computed(() => {
  if (route.path === '/') return 'bottom-24 left-4 sm:bottom-20 sm:left-6 lg:bottom-6'
  if (route.path === '/profile') return 'bottom-20 left-4 sm:bottom-4 sm:left-6'
  if (route.path.startsWith('/admin')) return 'bottom-0.5 left-4 sm:bottom-0.5 sm:left-6'
  if (route.path === '/login' || route.path === '/register') {
    return 'bottom-16 left-4 sm:bottom-1 sm:left-6 lg:bottom-6'
  }
  // سایر صفحات در موبایل نوار اقدام چسبان دارند؛ دکمه بالای آن می‌ماند.
  return 'bottom-[5.75rem] left-4 sm:bottom-4 sm:left-6'
})

const activeTicket = computed(() => tickets.value[0] ?? null)

function send() {
  const text = draft.value.trim()
  if (!text) return

  if (activeTicket.value) sendMessage(activeTicket.value.id, text, 'visitor')
  else createTicket(text)
  draft.value = ''
  nextTick(() => {
    if (messagesContainer.value) messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  })
}

function formatTime(value: string) {
  return new Intl.DateTimeFormat('fa-IR', { hour: '2-digit', minute: '2-digit' }).format(new Date(value))
}
</script>

<template>
  <Transition
    enter-active-class="transition-opacity duration-200 ease-out"
    enter-from-class="opacity-0"
    leave-active-class="transition-opacity duration-150 ease-in"
    leave-to-class="opacity-0"
  >
    <button
      v-if="route.path !== '/admin' && isOpen && !mobileMenuOpen"
      type="button"
      class="fixed inset-0 z-[70] cursor-default bg-gray-900/40 text-transparent backdrop-blur-sm"
      aria-label="بستن گفتگوی پشتیبانی"
      @click="isOpen = false"
    ></button>
  </Transition>
  <div v-if="route.path !== '/admin' && !mobileMenuOpen" class="fixed z-[80] flex flex-col items-end gap-3" :class="widgetPosition">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-3 scale-95 opacity-0"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="translate-y-3 scale-95 opacity-0"
    >
      <section
        v-if="isOpen"
        class="support-chat-panel flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-gray-950/20 dark:border-gray-700 dark:bg-gray-900"
        role="dialog"
        aria-modal="false"
        aria-labelledby="support-chat-title"
      >
        <header class="flex items-center gap-3 bg-primary-800 px-4 py-3 text-white dark:bg-primary-950">
          <span class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white/10">
            <LucideIcon name="Headset" class="h-5 w-5" />
          </span>
          <div class="min-w-0 flex-1">
            <h2 id="support-chat-title" class="truncate text-sm font-bold">پشتیبانی فیزیوکلینیک</h2>
            <p class="mt-0.5 text-xs text-primary-100">ثبت و پیگیری درخواست پشتیبانی</p>
          </div>
          <button type="button" class="rounded-lg p-2 text-primary-100 transition hover:bg-white/10 hover:text-white" aria-label="بستن پنجره پشتیبانی" @click="isOpen = false">
            <LucideIcon name="X" class="h-5 w-5" />
          </button>
        </header>

        <div ref="messagesContainer" class="flex-1 space-y-3 overflow-y-auto bg-gray-50 p-4 dark:bg-gray-950">
          <div class="max-w-[90%] rounded-2xl rounded-tr-sm bg-white px-3.5 py-3 text-sm leading-6 text-gray-700 shadow-sm dark:bg-gray-900 dark:text-gray-200">
            سلام! پیام خود را برای پشتیبانی بنویسید. درخواست شما ثبت می‌شود و پاسخ در همین گفتگو نمایش داده خواهد شد.
          </div>
          <p v-if="activeTicket" class="text-center text-[11px] text-gray-400">شماره تیکت: {{ activeTicket.id }}</p>
          <div v-for="message in activeTicket?.messages ?? []" :key="message.id" class="flex" :class="message.sender === 'visitor' ? 'justify-end' : 'justify-start'">
            <div class="max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm leading-6" :class="message.sender === 'visitor' ? 'rounded-tl-sm bg-primary-700 text-white dark:bg-primary-600' : 'rounded-tr-sm bg-white text-gray-700 shadow-sm dark:bg-gray-900 dark:text-gray-200'">
              <p class="whitespace-pre-wrap break-words">{{ message.text }}</p>
              <time class="mt-1 block text-left text-[10px] opacity-70" :datetime="message.createdAt">{{ formatTime(message.createdAt) }}</time>
            </div>
          </div>
        </div>

        <form class="flex items-end gap-2 border-t border-gray-200 bg-white p-3 dark:border-gray-800 dark:bg-gray-900" @submit.prevent="send">
          <textarea v-model="draft" rows="1" maxlength="2000" aria-label="پیام به پشتیبانی" placeholder="پیام خود را بنویسید..." class="max-h-24 min-h-11 flex-1 resize-y rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm leading-6 outline-none transition focus:border-primary-500 dark:border-gray-700 dark:bg-gray-950" @keydown.enter.exact.prevent="send"></textarea>
          <button type="submit" :disabled="!draft.trim()" class="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-primary-700 text-white transition hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-primary-500 dark:text-gray-950" aria-label="ارسال پیام">
            <LucideIcon name="Send" class="h-4 w-4" />
          </button>
        </form>
      </section>
    </Transition>

    <button type="button" class="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary-700 text-white shadow-xl shadow-primary-900/25 transition hover:-translate-y-0.5 hover:bg-primary-600 focus:outline-none focus:ring-4 focus:ring-primary-500/30 dark:bg-primary-500 dark:text-gray-950" :aria-label="isOpen ? 'بستن پشتیبانی' : 'گفتگو با پشتیبانی'" :aria-expanded="isOpen" @click="isOpen = !isOpen">
      <LucideIcon :name="isOpen ? 'X' : 'Headset'" class="h-6 w-6" />
    </button>
  </div>
</template>
