import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },

  vite: {
    plugins: [tailwindcss()]
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: { lang: 'fa', dir: 'rtl' },
      title: 'کلینیک فیزیوتراپی و توانبخشی',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      // اعمال تم پیش از اولین رنگ‌آمیزی، تا از پرش روشن/تیره (FOUC) جلوگیری شود
      script: [
        {
          type: 'text/javascript',
          innerHTML:
            "(function(){try{var s=localStorage.getItem('physio-theme');var d=s?s==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;var r=document.documentElement;r.classList.toggle('dark',d);r.style.colorScheme=d?'dark':'light'}catch(e){}})()",
        },
      ],
    }
  },

  css: [
    '~/assets/css/fonts.css',
    '~/assets/css/main.css'
  ],
})
