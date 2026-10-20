<script setup lang="ts">
import {
  Activity, AlertCircle, AlertTriangle, ArrowLeft, Bell, Brain, Building2, Calendar,
  CalendarDays, CalendarPlus, Check, ChevronDown, CircleCheck, Clock, CreditCard,
  Dumbbell, Eye, EyeOff, FileText, Hand, Headset, Heart, HelpCircle, Home, House, LayoutDashboard, LogOut,
  MapPin, Menu, MessageCircle, MessagesSquare, Moon, Navigation, Pencil, Phone,
  Plus, Receipt, Send, Settings, ShieldCheck, Star, Stethoscope, Sun, Syringe,
  Trash2, TrendingUp, User, UserPlus, UserRound, UserRoundPlus, Users, Wallet, X,
  Zap,
} from 'lucide-vue-next'

const props = defineProps<{
  name: string
  class?: string
}>()

const icons = {
  Activity, AlertCircle, AlertTriangle, ArrowLeft, Bell, Brain, Building2, Calendar,
  CalendarDays, CalendarPlus, Check, ChevronDown, CircleCheck, Clock, CreditCard,
  Dumbbell, Eye, EyeOff, FileText, Hand, Headset, Heart, HelpCircle, Home, House, LayoutDashboard, LogOut,
  MapPin, Menu, MessageCircle, MessagesSquare, Moon, Navigation, Pencil, Phone,
  Plus, Receipt, Send, Settings, ShieldCheck, Star, Stethoscope, Sun, Syringe,
  Trash2, TrendingUp, User, UserPlus, UserRound, UserRoundPlus, Users, Wallet, X,
  Zap,
} as const

const icon = computed(() => icons[props.name as keyof typeof icons] ?? HelpCircle)
</script>

<template>
  <component :is="icon" v-bind="$attrs" :class="props.class" aria-hidden="true" />
</template>
