<script setup lang="ts">
useHead({
  title: 'فیزیوکلینیک | مرکز تخصصی فیزیوتراپی و توانبخشی',
})

const { isDark } = useTheme()
// اطلاعات پیش‌نمایش عمداً ثابت و ساختگی هستند و به حساب یا ذخیره‌سازی کاربر وصل نیستند.
const previewProfile = {
  firstName: 'کاربر',
  initial: 'ک',
  doctor: 'دکتر نمونه',
  specialty: 'فیزیوتراپی عمومی',
  appointmentDate: 'سه‌شنبه ۲۷ آبان',
  appointmentTime: '۱۰:۳۰ صبح',
  daysUntilAppointment: '۲',
  remainingSessions: '۴',
  treatmentProgress: '۶۸٪',
  accountBalance: '۴۵۰',
  completedExercises: '۲',
  totalExercises: '۵',
}

const stats = [
  { value: '۱۵+', label: 'سال تجربه بالینی' },
  { value: '۱۲٬۰۰۰+', label: 'بیمار درمان‌شده' },
  { value: '۸', label: 'متخصص و فیزیوتراپیست' },
  { value: '۹۸٪', label: 'رضایت بیماران' },
]

const highlights = [
  {
    title: 'ارزیابی دقیق در جلسه اول',
    desc: 'تشخیص عملکردی و طراحی مسیر درمان از همان ابتدا.',
    icon: 'CircleCheck',
  },
  {
    title: 'تجهیزات به‌روز و استاندارد',
    desc: 'الکتروتراپی، لیزر و تجهیزات توانبخشی مدرن.',
    icon: 'Zap',
  },
  {
    title: 'پذیرش بیمه‌های تکمیلی',
    desc: 'همکاری با اکثر بیمه‌های پایه و تکمیلی کشور.',
    icon: 'ShieldCheck',
  },
]

const services = [
  { title: 'فیزیوتراپی ارتوپدی', desc: 'درمان کمردرد، گردن‌درد، آرتروز و آسیب‌های عضلانی‌اسکلتی.', icon: 'Activity' },
  { title: 'توانبخشی پس از جراحی', desc: 'بازگشت تدریجی و ایمن عملکرد پس از عمل‌های ارتوپدی.', icon: 'Home' },
  { title: 'درمان درد مزمن', desc: 'رویکرد چندوجهی برای دردهای طولانی‌مدت و مقاوم به درمان.', icon: 'Heart' },
  { title: 'ورزش‌درمانی', desc: 'برنامه تمرینی اختصاصی، پیشرونده و متناسب با شرایط شما.', icon: 'Dumbbell' },
  { title: 'منوال تراپی', desc: 'تکنیک‌های دستی برای آزادسازی مفاصل و بافت نرم.', icon: 'Hand' },
  { title: 'الکتروتراپی و لیزر', desc: 'کاهش درد و تسریع التیام بافت با تجهیزات تخصصی.', icon: 'Zap' },
  { title: 'سوزن خشک', desc: 'رفع نقاط ماشه‌ای و اسپاسم‌های مقاوم عضلانی.', icon: 'Syringe' },
  { title: 'توانبخشی عصبی', desc: 'بازتوانی حرکتی پس از سکته و آسیب‌های عصبی.', icon: 'Brain' },
]

const steps = [
  { title: 'رزرو آنلاین نوبت', desc: 'در کمتر از یک دقیقه زمان و متخصص دلخواه را انتخاب کنید.' },
  { title: 'ارزیابی و تشخیص', desc: 'معاینه دقیق عملکردی و بررسی سابقه درمانی شما.' },
  { title: 'برنامه درمانی اختصاصی', desc: 'ترکیبی از درمان دستی، تمرین‌درمانی و تجهیزات تخصصی.' },
  { title: 'پیگیری و بهبود پایدار', desc: 'پایش پیشرفت و آموزش تمرین‌های خانگی برای ماندگاری نتیجه.' },
]

const team = [
  { name: 'دکتر سارا محمدی', role: 'متخصص طب فیزیکی و توانبخشی', initial: 'س' },
  { name: 'دکتر امیر رضایی', role: 'فیزیوتراپیست، گرایش ارتوپدی', initial: 'ا' },
  { name: 'دکتر نگار کریمی', role: 'متخصص توانبخشی عصبی', initial: 'ن' },
  { name: 'دکتر حسین نوری', role: 'فیزیوتراپیست ورزشی', initial: 'ح' },
]

const testimonials = [
  { name: 'مریم رستمی', text: 'بعد از دو ماه کمردرد مزمن، با برنامه‌ای که دادند بدون جراحی بهتر شدم. برخورد کادر بسیار حرفه‌ای بود.', rating: 5 },
  { name: 'علی کاظمی', text: 'توانبخشی بعد از عمل رباط زانو را اینجا گذروندم. تمرین‌ها مرحله‌به‌مرحله و کاملاً قابل انجام در خانه بود.', rating: 5 },
  { name: 'زهرا احمدی', text: 'دیسک گردن داشتم و از هر حرکتی می‌ترسیدم. با صبر و توضیح کامل، الان بدون درد به کارم برگشتم.', rating: 4 },
]

const faqs = [
  { q: 'آیا برای فیزیوتراپی نیاز به ارجاع پزشک دارم؟', a: 'برای شروع درمان، ارجاع پزشک الزامی نیست؛ اما اگر بیمه شما برای پرداخت هزینه نیاز به نسخه دارد، همراه داشتن ارجاع پزشک کمک می‌کند.' },
  { q: 'هر جلسه چقدر طول می‌کشد و چند جلسه لازم است؟', a: 'هر جلسه معمولاً بین ۳۰ تا ۶۰ دقیقه است. تعداد جلسات بسته به نوع آسیب متفاوت است و در جلسه اول به‌طور شفاف اعلام می‌شود.' },
  { q: 'آیا بیمه هزینه‌ها را پوشش می‌دهد؟', a: 'با اکثر بیمه‌های پایه و تکمیلی قرارداد داریم. برای اطمینان از میزان پوشش، پیش از نوبت با پشتیبانی تماس بگیرید.' },
  { q: 'درمان فیزیوتراپی دردناک است؟', a: 'بیشتر تکنیک‌ها بدون درد یا با ناراحتی خفیف انجام می‌شوند. هدف ما بازگشت بدون درد و ایمن است و شدت درمان بر اساس تحمل شما تنظیم می‌شود.' },
  { q: 'برای جلسه اول چه چیزی همراه بیاورم؟', a: 'کارت ملی، کارت بیمه، گزارش‌ها و تصاویر پزشکی قبلی (MRI یا رادیولوژی) و لباس راحت ورزشی.' },
]

const faDigits = ['۱', '۲', '۳', '۴', '۵']

const profileFeatures = [
  'مشاهده و جابجایی نوبت‌های آینده بدون تماس تلفنی',
  'برنامه تمرینی روزانه با تیک‌زدن هر تمرین',
  'نمودار روند کاهش درد و پیشرفت دامنه حرکت',
  'صورت‌حساب، پرداخت آنلاین و گفتگو با پزشک معالج',
]
</script>

<template>
  <div class="w-full min-w-0 overflow-x-clip">
    <!-- ================= HERO ================= -->
    <section class="relative overflow-hidden bg-gradient-to-b from-primary-50 dark:from-primary-950 via-white dark:via-gray-950 to-white dark:to-gray-950">
      <div class="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-primary-200/40 blur-3xl"></div>
      <div class="pointer-events-none absolute -right-20 top-40 h-52 w-52 rounded-full bg-primary-300/30 blur-3xl"></div>

      <div class="relative mx-auto max-w-7xl px-4 pb-10 pt-8 sm:px-6 sm:pt-12 lg:px-8">
        <span class="inline-flex items-center gap-2 rounded-full border border-primary-200 dark:border-primary-800 bg-white/80 dark:bg-gray-900/80 px-3 py-1.5 text-xs font-medium text-primary-800 dark:text-primary-300">
          <span class="relative flex h-2 w-2">
            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-500 opacity-75"></span>
            <span class="relative inline-flex h-2 w-2 rounded-full bg-primary-600"></span>
          </span>
          پذیرش نوبت‌های مرداد باز است
        </span>

        <h1 class="mt-5 text-3xl font-extrabold leading-[1.35] text-gray-900 dark:text-gray-50 sm:text-4xl lg:text-5xl lg:leading-[1.3]">
          دوباره بدون درد
          <span class="bg-gradient-to-l from-primary-600 to-primary-800 bg-clip-text text-transparent">حرکت کنید</span>
        </h1>

        <p class="mt-4 max-w-xl text-base leading-8 text-gray-600 dark:text-gray-400 sm:text-lg">
          در فیزیوکلینیک، درمان شما از یک ارزیابی دقیق شروع می‌شود و با برنامه‌ای اختصاصی، تمرین‌درمانی و تجهیزات به‌روز ادامه پیدا می‌کند — تا به زندگی روزمره و ورزش بازگردید.
        </p>

        <div class="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
          <NuxtLink
            to="/register"
            class="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary-700 px-5 text-base font-semibold text-white shadow-lg shadow-primary-700/20 transition hover:bg-primary-600 dark:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-600/40 focus:ring-offset-2"
          >
            رزرو آنلاین نوبت
            <LucideIcon name="CalendarPlus" class="h-4 w-4" />
          </NuxtLink>

          <a
            href="#services"
            class="inline-flex min-h-12 items-center justify-center rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-5 text-base font-semibold text-gray-700 dark:text-gray-300 transition hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            مشاهده خدمات کلینیک
          </a>
        </div>

        <div class="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-gray-600 dark:text-gray-400">
          <span class="flex items-center gap-1.5">
            <span class="flex text-amber-400" aria-hidden="true">
              <LucideIcon name="Star" class="h-4 w-4" />
            </span>
            <span class="font-medium text-gray-900 dark:text-gray-50">۴٫۹ از ۵</span>
            <span>از ۱٬۲۰۰ نظر بیماران</span>
          </span>
        </div>

        <NuxtLink
          to="/profile"
          class="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-primary-800 dark:text-primary-300 transition hover:text-primary-600"
        >
          <LucideIcon name="Home" class="h-4 w-4" />
          قبلاً ثبت‌نام کرده‌اید؟ ورود به پروفایل من
        </NuxtLink>

        <!-- کارت تزئینی موبایل -->
        <div class="relative mt-8">
          <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 p-6 shadow-xl dark:shadow-black/40 shadow-primary-900/20">
            <div class="pointer-events-none absolute inset-0 opacity-20">
              <svg class="h-full w-full" viewBox="0 0 200 200" fill="none" aria-hidden="true">
                <circle cx="160" cy="40" r="55" stroke="white" stroke-width="1.5" />
                <circle cx="160" cy="40" r="85" stroke="white" stroke-width="1.5" />
                <circle cx="40" cy="170" r="45" stroke="white" stroke-width="1.5" />
              </svg>
            </div>

            <div class="relative">
              <LucideIcon name="Activity" class="h-12 w-12 text-primary-200 animate-float" />
              <p class="mt-4 text-lg font-bold text-white">مسیر درمان شما، شفاف و قابل اندازه‌گیری</p>
              <p class="mt-2 text-sm leading-7 text-primary-100">
                در هر جلسه میزان بهبودی، دامنه حرکت و قدرت عضلانی شما ثبت و با جلسات قبل مقایسه می‌شود.
              </p>

              <div class="mt-5 grid grid-cols-2 gap-3">
                <div class="rounded-2xl bg-white/10 p-3 backdrop-blur-sm">
                  <p class="text-xs text-primary-100">میانگین کاهش درد</p>
                  <p class="mt-1 text-lg font-extrabold text-white">۶۲٪</p>
                </div>
                <div class="rounded-2xl bg-white/10 p-3 backdrop-blur-sm">
                  <p class="text-xs text-primary-100">بازگشت به کار</p>
                  <p class="mt-1 text-lg font-extrabold text-white">۳ هفته</p>
                </div>
              </div>
            </div>
          </div>

          <div class="absolute -bottom-3 right-2 flex items-center gap-2 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-2 shadow-lg">
            <span class="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600">
              <LucideIcon name="Check" class="h-4 w-4" />
            </span>
            <span class="text-xs font-semibold text-gray-700 dark:text-gray-300">مجوز رسمی وزارت بهداشت</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= STATS ================= -->
    <section class="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 gap-3 rounded-3xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-sm dark:shadow-black/30 sm:p-6">
        <div v-for="stat in stats" :key="stat.label" class="rounded-2xl bg-gray-50 dark:bg-gray-950 px-3 py-4 text-center">
          <p class="text-2xl font-extrabold text-primary-800 dark:text-primary-300">{{ stat.value }}</p>
          <p class="mt-1 text-xs leading-5 text-gray-600 dark:text-gray-400">{{ stat.label }}</p>
        </div>
      </div>
    </section>

    <!-- ================= HIGHLIGHTS ================= -->
    <section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div class="grid gap-3 md:grid-cols-3">
        <div
          v-for="item in highlights"
          :key="item.title"
          class="flex items-start gap-3 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-sm dark:shadow-black/30"
        >
          <span class="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-primary-50 dark:bg-primary-900/40 text-primary-700 dark:text-primary-400">
            <LucideIcon :name="item.icon" class="h-5 w-5" />
          </span>
          <div>
            <h3 class="text-sm font-bold text-gray-900 dark:text-gray-50">{{ item.title }}</h3>
            <p class="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= SERVICES ================= -->
    <section id="services" class="bg-white dark:bg-gray-900 py-12 lg:py-16">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-2xl text-center">
          <span class="text-xs font-bold uppercase tracking-wider text-primary-700 dark:text-primary-400">خدمات تخصصی</span>
          <h2 class="mt-2 text-2xl font-extrabold leading-9 text-gray-900 dark:text-gray-50 sm:text-3xl">هر آسیب، درمان مخصوص خودش را دارد</h2>
          <p class="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-400 sm:text-base">
            تیم ما با ترکیبی از درمان دستی، تمرین‌درمانی و تجهیزات تخصصی، برنامه‌ای متناسب با شرایط دقیق شما طراحی می‌کند.
          </p>
        </div>

        <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
          <article
            v-for="service in services"
            :key="service.title"
            class="group rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-950/60 p-5 transition hover:border-primary-200 hover:bg-white hover:shadow-lg hover:shadow-primary-900/5 dark:hover:border-primary-700 dark:hover:bg-gray-800 dark:hover:shadow-black/30"
          >
            <span class="flex h-12 w-12 items-center justify-center rounded-2xl bg-white dark:bg-gray-900 text-primary-700 dark:text-primary-400 shadow-sm dark:shadow-black/30 transition group-hover:bg-primary-700 group-hover:text-white dark:group-hover:bg-primary-500 dark:group-hover:text-white">
              <LucideIcon :name="service.icon" class="h-6 w-6" />
            </span>
            <h3 class="mt-4 text-base font-bold text-gray-900 dark:text-gray-50">{{ service.title }}</h3>
            <p class="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">{{ service.desc }}</p>
          </article>
        </div>

        <div class="mt-8 text-center">
          <NuxtLink
            to="/register"
            class="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-primary-200 dark:border-primary-800 bg-primary-50 dark:bg-primary-900/40 px-5 text-base font-semibold text-primary-800 dark:text-primary-300 transition hover:bg-primary-100 dark:hover:bg-primary-900/70 sm:w-auto"
          >
            <LucideIcon name="CalendarPlus" class="h-4 w-4" />
            مشاوره و تعیین وقت با متخصص
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ================= PROCESS ================= -->
    <section id="process" class="py-12 lg:py-16">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="max-w-2xl">
          <span class="text-xs font-bold uppercase tracking-wider text-primary-700 dark:text-primary-400">روند درمان</span>
          <h2 class="mt-2 text-2xl font-extrabold leading-9 text-gray-900 dark:text-gray-50 sm:text-3xl">از اولین تماس تا بهبودی پایدار</h2>
          <p class="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-400 sm:text-base">
            یک مسیر روشن و مرحله‌به‌مرحله که می‌دانید در هر نقطه از آن کجای درمان هستید.
          </p>
        </div>

        <ol class="mt-8 space-y-2 lg:mt-12">
          <li v-for="(step, i) in steps" :key="step.title" class="flex gap-4">
            <div class="flex flex-col items-center">
              <span class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-700 text-sm font-bold text-white">
                {{ faDigits[i] }}
              </span>
              <span v-if="i < steps.length - 1" class="mt-1 w-px flex-1 bg-primary-200"></span>
            </div>
            <div class="pb-6">
              <h3 class="text-base font-bold text-gray-900 dark:text-gray-50">{{ step.title }}</h3>
              <p class="mt-1.5 text-sm leading-6 text-gray-600 dark:text-gray-400">{{ step.desc }}</p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <!-- ================= PATIENT PROFILE ================= -->
    <section id="patient-profile" class="bg-white dark:bg-gray-900 py-12 lg:py-16">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-2xl text-center">
          <span class="text-xs font-bold uppercase tracking-wider text-primary-700 dark:text-primary-400">پروفایل بیمار</span>
          <h2 class="mt-2 text-2xl font-extrabold leading-9 text-gray-900 dark:text-gray-50 sm:text-3xl">تمام مسیر درمانت، در یک صفحه</h2>
          <p class="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-400 sm:text-base">
            نوبت‌ها، تمرین‌های روزانه، نمودار پیشرفت و صورت‌حساب — همه در پروفایل اختصاصی شما و همیشه در دسترس از موبایل.
          </p>
        </div>

        <!-- پیش‌نمایش پروفایل -->
        <div class="mx-auto mt-7 max-w-md">
          <div class="rounded-[28px] border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-800 p-2.5 shadow-xl dark:shadow-black/40 shadow-primary-900/5" aria-hidden="true">
            <div class="overflow-hidden rounded-[22px] bg-gray-50 dark:bg-gray-950">
              <!-- نوار بالای پیش‌نمایش -->
              <div class="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-2.5">
                <div class="flex items-center gap-2">
                  <span class="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-primary-600 to-primary-800 text-[11px] font-bold text-white">{{ previewProfile.initial }}</span>
                  <div class="min-w-0">
                    <p class="truncate text-[11px] font-bold text-gray-900 dark:text-gray-50">سلام، {{ previewProfile.firstName }}</p>
                    <p class="text-[9px] text-gray-500 dark:text-gray-400">چهارشنبه ۲۵ مرداد ۱۴۰۴</p>
                  </div>
                </div>
                <div class="flex flex-shrink-0 items-center gap-1.5 text-gray-500 dark:text-gray-400">
                  <span class="flex h-6 w-6 items-center justify-center rounded-lg border border-gray-200 dark:border-gray-800"><LucideIcon :name="isDark ? 'Sun' : 'Moon'" class="h-3.5 w-3.5" /></span>
                  <span class="relative flex h-6 w-6 items-center justify-center rounded-lg border border-gray-200 dark:border-gray-800">
                    <LucideIcon name="Bell" class="h-3.5 w-3.5" />
                    <span class="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-rose-500"></span>
                  </span>
                  <span class="flex h-6 w-6 items-center justify-center rounded-lg border border-gray-200 dark:border-gray-800"><LucideIcon name="Home" class="h-3.5 w-3.5" /></span>
                </div>
              </div>

              <div class="space-y-2.5 p-3">
                <!-- کارت نوبت -->
                <div class="rounded-2xl bg-gradient-to-br from-primary-700 to-primary-900 p-3 text-white">
                  <div class="flex items-center justify-between">
                    <span class="text-[10px] text-primary-100">نوبت بعدی شما</span>
                    <span class="rounded-full bg-white/15 px-2 py-0.5 text-[9px] font-semibold">{{ previewProfile.daysUntilAppointment }} روز دیگر</span>
                  </div>
                  <p class="mt-1.5 text-xs font-bold">{{ previewProfile.doctor }}</p>
                  <p class="mt-0.5 text-[10px] text-primary-100">{{ previewProfile.specialty }}</p>
                  <div class="mt-2 grid grid-cols-2 gap-1.5">
                    <span class="flex items-center gap-1.5 rounded-xl bg-white/10 px-2 py-1.5 text-[9px]"><LucideIcon name="Calendar" class="h-3 w-3 flex-shrink-0" />{{ previewProfile.appointmentDate }}</span>
                    <span class="flex items-center gap-1.5 rounded-xl bg-white/10 px-2 py-1.5 text-[9px]"><LucideIcon name="Clock" class="h-3 w-3 flex-shrink-0" />{{ previewProfile.appointmentTime }}</span>
                  </div>
                  <div class="mt-2 flex gap-1.5">
                    <span class="flex min-h-7 flex-1 items-center justify-center rounded-lg bg-white text-[9px] font-bold text-primary-800">جزئیات نوبت</span>
                    <span class="flex min-h-7 flex-1 items-center justify-center rounded-lg border border-white/25 text-[9px] font-semibold">لغو / جابجایی</span>
                  </div>
                </div>

                <!-- سه کارت خلاصه -->
                <div class="grid grid-cols-3 gap-2">
                  <div class="rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-2 text-center">
                    <LucideIcon name="Calendar" class="mx-auto h-3.5 w-3.5 text-primary-700 dark:text-primary-400" />
                    <p class="text-sm font-extrabold text-gray-900 dark:text-gray-50">{{ previewProfile.remainingSessions }}</p>
                    <p class="text-[9px] text-gray-500 dark:text-gray-400">جلسه باقی‌مانده</p>
                  </div>
                  <div class="rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-2 text-center">
                    <LucideIcon name="TrendingUp" class="mx-auto h-3.5 w-3.5 text-primary-700 dark:text-primary-400" />
                    <p class="text-sm font-extrabold text-primary-700 dark:text-primary-400">{{ previewProfile.treatmentProgress }}</p>
                    <p class="text-[9px] text-gray-500 dark:text-gray-400">پیشرفت درمان</p>
                  </div>
                  <div class="rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-2 text-center">
                    <LucideIcon name="Receipt" class="mx-auto h-3.5 w-3.5 text-primary-700 dark:text-primary-400" />
                    <p class="text-sm font-extrabold text-gray-900 dark:text-gray-50">{{ previewProfile.accountBalance }}</p>
                    <p class="text-[9px] text-gray-500 dark:text-gray-400">هزار تومان</p>
                  </div>
                </div>

                <div class="grid grid-cols-4 gap-1.5">
                  <div v-for="action in [{ label: 'رزرو نوبت', icon: 'CalendarPlus' }, { label: 'تمرین‌ها', icon: 'Dumbbell' }, { label: 'گفتگو', icon: 'MessageCircle' }, { label: 'صورت‌حساب', icon: 'FileText' }]" :key="action.label" class="flex flex-col items-center gap-1 rounded-xl border border-gray-100 bg-white px-1 py-2 dark:border-gray-800 dark:bg-gray-900">
                    <LucideIcon :name="action.icon" class="h-3.5 w-3.5 text-primary-700 dark:text-primary-400" />
                    <span class="text-[8px] font-medium text-gray-600 dark:text-gray-400">{{ action.label }}</span>
                  </div>
                </div>

                <!-- برنامه تمرینی -->
                <div class="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900/90 p-3 shadow-sm dark:shadow-black/20">
                  <div class="flex items-center justify-between">
                    <div>
                      <span class="text-[11px] font-bold text-gray-900 dark:text-gray-50">برنامه تمرینی امروز</span>
                      <p class="mt-0.5 text-[9px] text-gray-500 dark:text-gray-400">{{ previewProfile.completedExercises }} از {{ previewProfile.totalExercises }} تمرین انجام شد</p>
                    </div>
                    <span class="text-[10px] font-bold text-primary-700 dark:text-primary-400">۴۰٪</span>
                  </div>
                  <div class="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                    <div class="h-full w-[40%] rounded-full bg-primary-600 dark:bg-primary-400"></div>
                  </div>
                  <div class="mt-2.5 space-y-1.5">
                    <div class="flex items-center gap-2">
                      <span class="flex h-3.5 w-3.5 items-center justify-center rounded bg-primary-600 text-white dark:bg-primary-500">
                        <LucideIcon name="Check" class="h-2.5 w-2.5" />
                      </span>
                      <span class="text-[10px] text-gray-400 dark:text-gray-500 line-through">کشش همسترینگ</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <span class="flex h-3.5 w-3.5 items-center justify-center rounded bg-primary-600 text-white dark:bg-primary-500"><LucideIcon name="Check" class="h-2.5 w-2.5" /></span>
                      <span class="text-[10px] text-gray-400 dark:text-gray-500 line-through">تقویت عضلات مرکزی</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <span class="h-3.5 w-3.5 rounded border-2 border-gray-300 dark:border-gray-700"></span>
                      <span class="text-[10px] text-gray-700 dark:text-gray-300">تمرین تعادل روی یک پا</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <span class="h-3.5 w-3.5 rounded border-2 border-gray-300 dark:border-gray-700"></span>
                      <span class="text-[10px] text-gray-700 dark:text-gray-300">تمرین دامنه حرکتی زانو</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- نوار تب پایین پیش‌نمایش -->
              <div class="flex items-stretch justify-between border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-2">
                <span class="relative flex flex-col items-center gap-0.5 pb-1 text-primary-700 dark:text-primary-400">
                  <LucideIcon name="Home" class="h-4 w-4" />
                  <span class="text-[8px] font-semibold">خانه</span>
                  <span class="absolute bottom-0 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-primary-600"></span>
                </span>
                <span class="flex flex-col items-center gap-0.5 text-gray-300 dark:text-gray-600">
                  <LucideIcon name="Dumbbell" class="h-4 w-4" />
                  <span class="text-[8px] font-semibold">تمرین‌ها</span>
                </span>
                <span class="flex flex-col items-center gap-0.5 text-gray-300 dark:text-gray-600">
                  <LucideIcon name="Calendar" class="h-4 w-4" />
                  <span class="text-[8px] font-semibold">نوبت‌ها</span>
                </span>
                <span class="flex flex-col items-center gap-0.5 text-gray-300 dark:text-gray-600">
                  <LucideIcon name="Receipt" class="h-4 w-4" />
                  <span class="text-[8px] font-semibold">مالی</span>
                </span>
                <span class="flex flex-col items-center gap-0.5 text-gray-300 dark:text-gray-600">
                  <LucideIcon name="User" class="h-4 w-4" />
                  <span class="text-[8px] font-semibold">پرونده</span>
                </span>
              </div>
            </div>
          </div>

          <p class="mt-3 text-center text-xs text-gray-500 dark:text-gray-400">پیش‌نمایش موبایل با اطلاعات نمونه و غیرواقعی</p>
        </div>

        <!-- قابلیت‌ها -->
        <ul class="mx-auto mt-7 grid max-w-md gap-2.5">
          <li
            v-for="feature in profileFeatures"
            :key="feature"
            class="flex items-center gap-2.5 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-950/60 px-4 py-3"
          >
            <span class="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/60 text-primary-700 dark:text-primary-300">
              <LucideIcon name="Check" class="h-3.5 w-3.5" />
            </span>
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ feature }}</span>
          </li>
        </ul>

        <!-- دکمه ورود به پروفایل -->
        <div class="mx-auto mt-7 max-w-md">
          <NuxtLink
            to="/profile"
            class="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary-700 px-5 text-base font-bold text-white shadow-lg shadow-primary-700/20 transition hover:bg-primary-600 dark:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-600/40 focus:ring-offset-2"
          >
            <LucideIcon name="Home" class="h-5 w-5" />
            ورود به پروفایل من
          </NuxtLink>
          <p class="mt-2.5 text-center text-xs text-gray-500 dark:text-gray-400">
            حساب کاربری ندارید؟
            <NuxtLink to="/register" class="font-semibold text-primary-700 dark:text-primary-400 hover:text-primary-600">رایگان ثبت‌نام کنید</NuxtLink>
          </p>
        </div>
      </div>
    </section>

    <!-- ================= TEAM ================= -->
    <section id="team" class="bg-white dark:bg-gray-900 py-12 lg:py-16">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex items-end justify-between gap-4">
          <div>
            <span class="text-xs font-bold uppercase tracking-wider text-primary-700 dark:text-primary-400">تیم درمان</span>
            <h2 class="mt-2 text-2xl font-extrabold leading-9 text-gray-900 dark:text-gray-50 sm:text-3xl">متخصصانی که کنار شما می‌مانند</h2>
          </div>
        </div>
        <p class="mt-3 max-w-2xl text-sm leading-7 text-gray-600 dark:text-gray-400 sm:text-base">
          برای دیدن همهٔ متخصصان، کارت‌ها را در موبایل به کنار بکشید.
        </p>
      </div>

      <div class="no-scrollbar mx-auto mt-6 flex w-full max-w-7xl snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:px-6 lg:px-8">
        <article
          v-for="member in team"
          :key="member.name"
          class="w-[76%] flex-shrink-0 snap-start rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-950/60 p-5 transition-colors hover:border-primary-200 hover:bg-white dark:hover:border-primary-700 dark:hover:bg-gray-800 sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-3rem)/4)]"
        >
          <span class="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 text-xl font-extrabold text-white">
            {{ member.initial }}
          </span>
          <h3 class="mt-4 text-base font-bold text-gray-900 dark:text-gray-50">{{ member.name }}</h3>
          <p class="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">{{ member.role }}</p>
          <div class="mt-4 flex items-center gap-2 text-xs text-primary-700 dark:text-primary-400">
            <LucideIcon name="Calendar" class="h-4 w-4" />
            <span>نوبت‌دهی فعال در این هفته</span>
          </div>
        </article>
      </div>
    </section>

    <!-- ================= TESTIMONIALS ================= -->
    <section id="testimonials" class="py-12 lg:py-16">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <span class="text-xs font-bold uppercase tracking-wider text-primary-700 dark:text-primary-400">تجربه بیماران</span>
        <h2 class="mt-2 text-2xl font-extrabold leading-9 text-gray-900 dark:text-gray-50 sm:text-3xl">آنچه بیماران ما می‌گویند</h2>
      </div>

      <div class="no-scrollbar mx-auto mt-6 flex w-full max-w-7xl snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:px-6 lg:px-8">
        <article
          v-for="item in testimonials"
          :key="item.name"
          class="w-[86%] flex-shrink-0 snap-start rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm dark:shadow-black/30 sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)]"
        >
          <div class="flex text-amber-400" aria-hidden="true">
            <LucideIcon name="Star" class="h-4 w-4" />
            <LucideIcon name="Star" class="h-4 w-4 text-gray-200" />
          </div>
          <p class="mt-4 text-sm leading-7 text-gray-700 dark:text-gray-300">«{{ item.text }}»</p>
          <div class="mt-4 flex items-center gap-3 border-t border-gray-100 dark:border-gray-800 pt-4">
            <span class="flex h-9 w-9 items-center justify-center rounded-full bg-primary-50 dark:bg-primary-900/40 text-sm font-bold text-primary-800 dark:text-primary-300">
              {{ item.name.charAt(0) }}
            </span>
            <span class="text-sm font-semibold text-gray-900 dark:text-gray-50">{{ item.name }}</span>
          </div>
        </article>
      </div>
    </section>

    <!-- ================= FAQ ================= -->
    <section id="faq" class="bg-white dark:bg-gray-900 py-12 lg:py-16">
      <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <span class="text-xs font-bold uppercase tracking-wider text-primary-700 dark:text-primary-400">سوالات متداول</span>
          <h2 class="mt-2 text-2xl font-extrabold leading-9 text-gray-900 dark:text-gray-50 sm:text-3xl">پیش از رزرو نوبت بدانید</h2>
        </div>

        <div class="mt-8 space-y-3">
          <details
            v-for="faq in faqs"
            :key="faq.q"
            class="faq-item group rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-950/60 transition-colors open:border-primary-200 open:bg-white dark:open:border-primary-700 dark:open:bg-gray-800"
          >
            <summary class="flex list-none cursor-pointer items-center justify-between gap-3 rounded-2xl px-4 py-4 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 [&::-webkit-details-marker]:hidden">
              <span class="text-sm font-bold text-gray-900 dark:text-gray-50 sm:text-base">{{ faq.q }}</span>
              <span class="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-white dark:bg-gray-900 text-primary-700 dark:text-primary-400 shadow-sm dark:shadow-black/30 transition duration-300 ease-in-out group-open:rotate-180">
                <LucideIcon name="ChevronDown" class="h-4 w-4" />
              </span>
            </summary>
            <div class="faq-answer">
              <p class="faq-answer-content px-4 pb-4 text-sm leading-7 text-gray-600 dark:text-gray-400">{{ faq.a }}</p>
            </div>
          </details>
        </div>
      </div>
    </section>

    <!-- ================= CTA ================= -->
    <section class="px-4 py-10 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-br from-primary-700 to-primary-900 px-5 py-8 text-center shadow-xl dark:shadow-black/40 shadow-primary-900/20 sm:px-8 sm:py-12">
        <h2 class="text-xl font-extrabold leading-8 text-white sm:text-3xl sm:leading-10">
          امروز اولین قدم را بردارید، فردا راحت‌تر حرکت کنید
        </h2>
        <p class="mx-auto mt-3 max-w-xl text-sm leading-7 text-primary-100 sm:text-base">
          همین حالا نوبت خود را رزرو کنید؛ کارشناسان ما برای انتخاب بهترین متخصص و زمان، همراه شما هستند.
        </p>
        <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <NuxtLink
            to="/register"
            class="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white dark:bg-gray-900 px-5 text-base font-bold text-primary-800 dark:text-primary-300 transition hover:bg-primary-50"
          >
            <LucideIcon name="CalendarPlus" class="h-4 w-4" />
            رزرو نوبت آنلاین
          </NuxtLink>
          <a
            href="tel:+982191001234"
            class="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/30 px-5 text-base font-semibold text-white transition hover:bg-white/10"
          >
            تماس با کلینیک
          </a>
        </div>

        <NuxtLink
          to="/profile"
          class="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-100 underline-offset-4 transition hover:text-white hover:underline"
        >
          <LucideIcon name="Home" class="h-4 w-4" />
          بیمار فعلی هستید؟ ورود به پروفایل
        </NuxtLink>
      </div>
    </section>

    <!-- ================= CONTACT ================= -->
    <section id="contact" class="scroll-mt-28 pb-14 lg:scroll-mt-20 lg:pb-20">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <span class="text-xs font-bold uppercase tracking-wider text-primary-700 dark:text-primary-400">تماس و مراجعه</span>
        <h2 class="mt-2 text-2xl font-extrabold leading-9 text-gray-900 dark:text-gray-50 sm:text-3xl">ما را پیدا کنید</h2>

        <div class="mt-6 space-y-3">
          <div class="flex items-start gap-3 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-sm dark:shadow-black/30">
            <span class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary-50 dark:bg-primary-900/40 text-primary-700 dark:text-primary-400">
              <LucideIcon name="MapPin" class="h-5 w-5" />
            </span>
            <div>
              <h3 class="text-sm font-bold text-gray-900 dark:text-gray-50">نشانی کلینیک</h3>
              <p class="mt-1 text-sm leading-7 text-gray-600 dark:text-gray-400">تهران، خیابان ولیعصر، بالاتر از میدان ونک، پلاک ۱۲۴، طبقه دوم</p>
            </div>
          </div>

          <div class="flex items-start gap-3 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-sm dark:shadow-black/30">
            <span class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary-50 dark:bg-primary-900/40 text-primary-700 dark:text-primary-400">
              <LucideIcon name="Phone" class="h-5 w-5" />
            </span>
            <div>
              <h3 class="text-sm font-bold text-gray-900 dark:text-gray-50">تلفن تماس</h3>
              <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                <a href="tel:+982191001234" class="font-semibold text-gray-900 dark:text-gray-50 hover:text-primary-700">۰۲۱-۹۱۰۰۱۲۳۴</a>
                <span class="mx-1 text-gray-300">|</span>
                <a href="tel:+989123456789" class="font-semibold text-gray-900 dark:text-gray-50 hover:text-primary-700">۰۹۱۲۳۴۵۶۷۸۹</a>
              </p>
            </div>
          </div>

          <div class="flex items-start gap-3 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-sm dark:shadow-black/30">
            <span class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary-50 dark:bg-primary-900/40 text-primary-700 dark:text-primary-400">
              <LucideIcon name="Clock" class="h-5 w-5" />
            </span>
            <div>
              <h3 class="text-sm font-bold text-gray-900 dark:text-gray-50">ساعات کاری</h3>
              <p class="mt-1 text-sm leading-7 text-gray-600 dark:text-gray-400">شنبه تا چهارشنبه ۸ الی ۲۰ · پنجشنبه ۸ الی ۱۴ · جمعه تعطیل</p>
            </div>
          </div>
        </div>

        <div class="mt-4 overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm dark:shadow-black/30">
          <ClinicMap />
          <div class="flex flex-col gap-2 border-t border-gray-100 dark:border-gray-800 p-4 sm:flex-row sm:items-center sm:justify-between">
            <p class="text-sm text-gray-600 dark:text-gray-400">نزدیک‌ترین ایستگاه مترو: ونک، ۷ دقیقه پیاده</p>
            <a
              href="https://www.openstreetmap.org/?mlat=35.75756&amp;mlon=51.40996#map=17/35.75756/51.40996"
              target="_blank"
              rel="noopener"
              class="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary-700 px-4 text-sm font-semibold text-white transition hover:bg-primary-600 dark:bg-primary-500 dark:text-gray-950 dark:hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-600/40 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            >
              <LucideIcon name="Navigation" class="h-4 w-4" />
              مسیریابی
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
