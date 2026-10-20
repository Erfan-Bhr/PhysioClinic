<script setup lang="ts">
type LatLng = [number, number]

interface LeafletMap {
  setView(center: LatLng, zoom: number): LeafletMap
  invalidateSize(): void
  remove(): void
}

interface LeafletLayer {
  addTo(map: LeafletMap): LeafletLayer
  bindPopup(content: string): LeafletLayer
  openPopup(): LeafletLayer
}

interface LeafletApi {
  map(element: HTMLElement, options?: Record<string, unknown>): LeafletMap
  tileLayer(url: string, options?: Record<string, unknown>): LeafletLayer
  marker(position: LatLng): LeafletLayer
}

const VANAK_SQUARE: LatLng = [35.75756, 51.40996]
const mapElement = ref<HTMLElement | null>(null)
const loadError = ref(false)
const { isDark } = useTheme()

let mapInstance: LeafletMap | null = null
let leafletPromise: Promise<LeafletApi> | null = null
let visibilityObserver: IntersectionObserver | null = null

function loadLeaflet(): Promise<LeafletApi> {
  const browserWindow = window as Window & { L?: LeafletApi }
  if (browserWindow.L) return Promise.resolve(browserWindow.L)
  if (leafletPromise) return leafletPromise

  leafletPromise = new Promise((resolve, reject) => {
    const cssId = 'leaflet-css'
    if (!document.getElementById(cssId)) {
      const stylesheet = document.createElement('link')
      stylesheet.id = cssId
      stylesheet.rel = 'stylesheet'
      stylesheet.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
      document.head.appendChild(stylesheet)
    }

    const script = document.createElement('script')
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
    script.async = true
    script.onload = () => browserWindow.L ? resolve(browserWindow.L) : reject(new Error('Leaflet did not initialize'))
    script.onerror = () => reject(new Error('Leaflet failed to load'))
    document.head.appendChild(script)
  })

  return leafletPromise
}

async function initializeMap() {
  try {
    const L = await loadLeaflet()
    if (!mapElement.value) return

    mapInstance = L.map(mapElement.value, { scrollWheelZoom: false }).setView(VANAK_SQUARE, 16)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapInstance)
    L.marker(VANAK_SQUARE).addTo(mapInstance).bindPopup('میدان ونک، تهران').openPopup()

    requestAnimationFrame(() => mapInstance?.invalidateSize())
  } catch {
    loadError.value = true
  }
}

onMounted(() => {
  if (!mapElement.value || !('IntersectionObserver' in window)) {
    void initializeMap()
    return
  }

  visibilityObserver = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) {
      visibilityObserver?.disconnect()
      visibilityObserver = null
      void initializeMap()
    }
  }, { rootMargin: '200px' })

  visibilityObserver.observe(mapElement.value)
})

onBeforeUnmount(() => {
  visibilityObserver?.disconnect()
  mapInstance?.remove()
  mapInstance = null
})
</script>

<template>
  <div class="clinic-map relative isolate z-0 h-64 w-full bg-gray-100 dark:bg-gray-800 sm:h-80" :class="{ 'clinic-map--dark': isDark }" aria-label="نقشه محدوده میدان ونک تهران">
    <div ref="mapElement" class="h-full w-full" />
    <div v-if="loadError" class="absolute inset-0 flex items-center justify-center bg-gray-100 px-4 text-center text-sm text-gray-600 dark:bg-gray-800 dark:text-gray-300">
      بارگذاری نقشه ممکن نشد. برای مشاهده موقعیت از دکمه مسیریابی استفاده کنید.
    </div>
  </div>
</template>
