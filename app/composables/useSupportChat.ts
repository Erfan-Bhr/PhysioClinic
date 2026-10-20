export interface SupportMessage {
  id: string
  sender: 'visitor' | 'support'
  text: string
  createdAt: string
}

export interface SupportTicket {
  id: string
  visitorName: string
  createdAt: string
  status: 'open' | 'answered'
  messages: SupportMessage[]
}

const STORAGE_KEY = 'physio-support-tickets'

export function useSupportChat() {
  const tickets = useState<SupportTicket[]>('physio-support-tickets-state', () => [])
  const initialized = useState('physio-support-tickets-initialized', () => false)

  function initialize() {
    if (!import.meta.client || initialized.value) return
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      tickets.value = stored ? JSON.parse(stored) as SupportTicket[] : []
    } catch {
      tickets.value = []
    }
    initialized.value = true
  }

  function persist() {
    if (!import.meta.client) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets.value))
    } catch {
      // Keep the conversation in the current app state if storage is unavailable.
    }
  }

  function createTicket(text: string, visitorName = 'کاربر') {
    const message = text.trim()
    if (!message) return null
    const id = `T-${Date.now().toString(36).toUpperCase()}`
    const createdAt = new Date().toISOString()
    const ticket: SupportTicket = {
      id,
      visitorName,
      createdAt,
      status: 'open',
      messages: [{ id: `${id}-1`, sender: 'visitor', text: message, createdAt }],
    }
    tickets.value.unshift(ticket)
    persist()
    return ticket
  }

  function sendMessage(ticketId: string, text: string, sender: SupportMessage['sender']) {
    const message = text.trim()
    const ticket = tickets.value.find((item) => item.id === ticketId)
    if (!ticket || !message) return
    ticket.messages.push({ id: `${ticketId}-${Date.now()}`, sender, text: message, createdAt: new Date().toISOString() })
    ticket.status = sender === 'support' ? 'answered' : 'open'
    persist()
  }

  function syncFromStorage(event: StorageEvent) {
    if (event.key !== STORAGE_KEY) return
    try {
      tickets.value = event.newValue ? JSON.parse(event.newValue) as SupportTicket[] : []
    } catch {
      tickets.value = []
    }
  }

  onMounted(() => {
    initialize()
    window.addEventListener('storage', syncFromStorage)
  })
  onBeforeUnmount(() => window.removeEventListener('storage', syncFromStorage))

  return { tickets, initialize, createTicket, sendMessage }
}
