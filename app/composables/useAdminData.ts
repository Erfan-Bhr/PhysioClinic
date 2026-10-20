export interface AdminAppointment {
  id: number
  patient: string
  phone: string
  therapist: string
  service: string
  date: string
  time: string
  status: 'در انتظار' | 'تأییدشده' | 'انجام‌شده' | 'لغوشده'
  amount: number
}

export interface AdminPatient {
  id: number
  name: string
  phone: string
  email: string
  diagnosis: string
  sessions: number
  status: 'فعال' | 'غیرفعال'
}

export interface AdminTherapist {
  id: number
  name: string
  specialty: string
  phone: string
  status: 'فعال' | 'مرخصی'
}

export interface AdminService {
  id: number
  name: string
  duration: number
  price: number
  status: 'فعال' | 'غیرفعال'
}

export interface AdminPayment {
  id: number
  patient: string
  service: string
  date: string
  amount: number
  status: 'پرداخت‌شده' | 'در انتظار پرداخت'
}

export interface AdminMessage {
  id: number
  sender: string
  subject: string
  body: string
  date: string
  read: boolean
}

export interface AdminData {
  appointments: AdminAppointment[]
  patients: AdminPatient[]
  therapists: AdminTherapist[]
  services: AdminService[]
  payments: AdminPayment[]
  messages: AdminMessage[]
  settings: { clinicName: string; phone: string; address: string; hours: string }
}

const STORAGE_KEY = 'physio-admin-data'

function createInitialData(): AdminData {
  return {
    appointments: [
      { id: 1001, patient: 'مریم رستمی', phone: '۰۹۱۲۱۲۳۴۵۶۷', therapist: 'دکتر سارا محمدی', service: 'فیزیوتراپی ارتوپدی', date: '۱۴۰۵/۰۷/۲۷', time: '۰۹:۰۰', status: 'تأییدشده', amount: 850000 },
      { id: 1002, patient: 'علی کاظمی', phone: '۰۹۱۲۲۳۴۵۶۷۸', therapist: 'دکتر امیر رضایی', service: 'توانبخشی پس از جراحی', date: '۱۴۰۵/۰۷/۲۷', time: '۱۰:۳۰', status: 'در انتظار', amount: 950000 },
      { id: 1003, patient: 'زهرا احمدی', phone: '۰۹۱۲۳۴۵۶۷۸۹', therapist: 'دکتر نگار کریمی', service: 'توانبخشی عصبی', date: '۱۴۰۵/۰۷/۲۸', time: '۱۲:۰۰', status: 'تأییدشده', amount: 1100000 },
      { id: 1004, patient: 'رضا موسوی', phone: '۰۹۱۲۳۴۵۶۷۸۰', therapist: 'دکتر حسین نوری', service: 'ورزش‌درمانی', date: '۱۴۰۵/۰۷/۲۶', time: '۱۶:۰۰', status: 'انجام‌شده', amount: 800000 },
    ],
    patients: [
      { id: 2001, name: 'مریم رستمی', phone: '۰۹۱۲۱۲۳۴۵۶۷', email: 'maryam@example.com', diagnosis: 'کمردرد مزمن', sessions: 8, status: 'فعال' },
      { id: 2002, name: 'علی کاظمی', phone: '۰۹۱۲۲۳۴۵۶۷۸', email: 'ali@example.com', diagnosis: 'توانبخشی رباط زانو', sessions: 5, status: 'فعال' },
      { id: 2003, name: 'زهرا احمدی', phone: '۰۹۱۲۳۴۵۶۷۸۹', email: 'zahra@example.com', diagnosis: 'دیسک گردن', sessions: 12, status: 'فعال' },
      { id: 2004, name: 'رضا موسوی', phone: '۰۹۱۲۳۴۵۶۷۸۰', email: 'reza@example.com', diagnosis: 'آسیب ورزشی شانه', sessions: 0, status: 'غیرفعال' },
    ],
    therapists: [
      { id: 3001, name: 'دکتر سارا محمدی', specialty: 'متخصص طب فیزیکی و توانبخشی', phone: '۰۲۱۹۱۰۰۱۲۳۴', status: 'فعال' },
      { id: 3002, name: 'دکتر امیر رضایی', specialty: 'فیزیوتراپیست ارتوپدی', phone: '۰۹۱۲۱۱۱۱۱۱۱', status: 'فعال' },
      { id: 3003, name: 'دکتر نگار کریمی', specialty: 'متخصص توانبخشی عصبی', phone: '۰۹۱۲۲۲۲۲۲۲۲', status: 'فعال' },
      { id: 3004, name: 'دکتر حسین نوری', specialty: 'فیزیوتراپیست ورزشی', phone: '۰۹۱۲۳۳۳۳۳۳۳', status: 'مرخصی' },
    ],
    services: [
      { id: 4001, name: 'فیزیوتراپی ارتوپدی', duration: 45, price: 850000, status: 'فعال' },
      { id: 4002, name: 'توانبخشی پس از جراحی', duration: 60, price: 950000, status: 'فعال' },
      { id: 4003, name: 'ورزش‌درمانی', duration: 45, price: 800000, status: 'فعال' },
      { id: 4004, name: 'توانبخشی عصبی', duration: 60, price: 1100000, status: 'فعال' },
    ],
    payments: [
      { id: 5001, patient: 'مریم رستمی', service: 'فیزیوتراپی ارتوپدی', date: '۱۴۰۵/۰۷/۲۵', amount: 850000, status: 'پرداخت‌شده' },
      { id: 5002, patient: 'علی کاظمی', service: 'توانبخشی رباط زانو', date: '۱۴۰۵/۰۷/۲۶', amount: 950000, status: 'در انتظار پرداخت' },
      { id: 5003, patient: 'زهرا احمدی', service: 'توانبخشی عصبی', date: '۱۴۰۵/۰۷/۲۶', amount: 1100000, status: 'پرداخت‌شده' },
    ],
    messages: [
      { id: 6001, sender: 'مریم رستمی', subject: 'سؤال درباره تمرین منزل', body: 'آیا تمرین کشش را در روزهای استراحت هم انجام بدهم؟', date: 'امروز، ۰۸:۳۰', read: false },
      { id: 6002, sender: 'علی کاظمی', subject: 'درخواست تغییر نوبت', body: 'امکان جابه‌جایی نوبت روز دوشنبه به سه‌شنبه وجود دارد؟', date: 'دیروز، ۱۶:۱۰', read: false },
      { id: 6003, sender: 'زهرا احمدی', subject: 'ارسال تصویر MRI', body: 'گزارش جدید تصویربرداری را برای بررسی ارسال کردم.', date: 'دیروز، ۱۲:۴۰', read: true },
    ],
    settings: {
      clinicName: 'فیزیوکلینیک',
      phone: '۰۲۱-۹۱۰۰۱۲۳۴',
      address: 'تهران، خیابان ولیعصر، محدوده میدان ونک',
      hours: 'شنبه تا پنجشنبه، ۸ الی ۲۰',
    },
  }
}

export function useAdminData() {
  const data = useState<AdminData>('physio-admin-data-state', createInitialData)

  function initialize() {
    if (!import.meta.client) return
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) Object.assign(data.value, createInitialData(), JSON.parse(stored))
      else persist()
    } catch {
      persist()
    }
  }

  function persist() {
    if (!import.meta.client) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data.value))
    } catch {
      // Keep the current session usable if browser storage is unavailable.
    }
  }

  return { data, initialize, persist }
}
