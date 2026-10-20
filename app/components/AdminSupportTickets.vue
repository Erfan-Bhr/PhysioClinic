<script setup lang="ts">
import type { SupportTicket } from '~/composables/useSupportChat'

defineProps<{
  tickets: SupportTicket[]
}>()

const emit = defineEmits<{
  reply: [ticketId: string, message: string]
}>()

const replies = reactive<Record<string, string>>({})

function submitReply(ticketId: string) {
  const message = replies[ticketId]?.trim()
  if (!message) return
  emit('reply', ticketId, message)
  replies[ticketId] = ''
}
</script>

<template>
  <section class="space-y-5">
    <header>
      <p class="text-sm text-gray-500 dark:text-gray-400">گفتگوهای دریافت‌شده از کاربران</p>
      <h1 class="mt-1 text-2xl font-extrabold">تیکت‌های پشتیبانی</h1>
    </header>

    <article
      v-for="ticket in tickets"
      :key="ticket.id"
      class="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900"
    >
      <div class="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-3 dark:border-gray-800">
        <div>
          <h2 class="font-bold">
            {{ ticket.visitorName }}
            <span class="font-normal text-gray-500">· {{ ticket.id }}</span>
          </h2>
          <p class="mt-1 text-xs text-gray-500">
            {{ new Date(ticket.createdAt).toLocaleString('fa-IR') }}
          </p>
        </div>

        <span
          class="rounded-full px-2.5 py-1 text-xs font-semibold"
          :class="ticket.status === 'open'
            ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300'
            : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'"
        >
          {{ ticket.status === 'open' ? 'نیاز به پاسخ' : 'پاسخ‌داده شده' }}
        </span>
      </div>

      <div class="max-h-80 space-y-3 overflow-y-auto py-4">
        <div
          v-for="message in ticket.messages"
          :key="message.id"
          class="rounded-xl p-3"
          :class="message.sender === 'support'
            ? 'bg-primary-50 dark:bg-primary-950/40'
            : 'bg-gray-50 dark:bg-gray-950/70'"
        >
          <p class="mb-1 text-[11px] font-semibold text-gray-500">
            {{ message.sender === 'support' ? 'پشتیبانی' : 'کاربر' }}
          </p>
          <p class="whitespace-pre-wrap text-sm leading-6">{{ message.text }}</p>
        </div>
      </div>

      <form
        class="flex items-end gap-2 border-t border-gray-100 pt-3 dark:border-gray-800"
        @submit.prevent="submitReply(ticket.id)"
      >
        <textarea
          v-model="replies[ticket.id]"
          rows="1"
          maxlength="2000"
          aria-label="پاسخ را بنویسید..."
          placeholder="پاسخ را بنویسید..."
          class="min-h-11 flex-1 resize-y rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-950"
        />
        <button
          type="submit"
          :disabled="!replies[ticket.id]?.trim()"
          class="inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary-700 px-4 text-sm font-bold text-white transition hover:bg-primary-600 disabled:opacity-50 dark:bg-primary-500 dark:text-gray-950"
        >
          <LucideIcon name="Send" class="h-4 w-4" />
          ارسال پاسخ
        </button>
      </form>
    </article>

    <div
      v-if="!tickets.length"
      class="rounded-2xl border border-dashed border-gray-300 p-10 text-center text-sm text-gray-500 dark:border-gray-700"
    >
      هنوز تیکتی ثبت نشده است.
    </div>
  </section>
</template>
