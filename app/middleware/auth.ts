/**
 * فقط کاربران وارد‌شده به پروفایل دسترسی دارند.
 * اگر کسی نباشد، به صفحهٔ ورود هدایت می‌شود و بعد از ورود
 * به همان صفحه‌ای برمی‌گردد که قصد دیدنش را داشت.
 */
export default defineNuxtRouteMiddleware((to) => {
  const { isLoggedIn } = useAccounts()

  if (!isLoggedIn.value) {
    return navigateTo({
      path: '/login',
      query: to.fullPath === '/profile' ? {} : { redirect: to.fullPath },
    })
  }
})
