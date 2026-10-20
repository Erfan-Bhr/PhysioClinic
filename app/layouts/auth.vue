<template>
  <div class="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-950">
    <header class="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div class="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <NuxtLink to="/" class="flex min-w-0 items-center gap-2 sm:gap-3">
          <div class="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-primary-700 text-sm font-bold text-white sm:h-10 sm:w-10">
            فیزیو
          </div>
          <div class="flex min-w-0 flex-col">
            <span class="truncate text-sm font-bold text-gray-900 dark:text-gray-50 sm:text-base">کلینیک فیزیوتراپی</span>
            <span class="hidden truncate text-[10px] text-gray-500 dark:text-gray-400 sm:block sm:text-xs">درمان و توانبخشی تخصصی</span>
          </div>
        </NuxtLink>

        <div class="flex flex-shrink-0 items-center gap-2">
          <ThemeToggle />
          <NuxtLink
            to="/"
            class="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-gray-200 text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            aria-label="بازگشت به خانه"
          >
            <LucideIcon name="House" class="h-5 w-5" />
          </NuxtLink>
        </div>
      </div>
    </header>

    <main class="flex flex-1 items-center justify-center px-4 py-8 sm:py-12 lg:py-16">
      <div class="w-full max-w-6xl">
        <slot />
      </div>
    </main>

    <footer class="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 py-4">
      <div class="mx-auto max-w-7xl px-4 text-center text-xs text-gray-500 dark:text-gray-400 sm:px-6 lg:px-8">
        <p>تمام حقوق محفوظ است © ۱۴۰۴ کلینیک فیزیوتراپی و توانبخشی</p>
      </div>
    </footer>
  </div>
</template>
