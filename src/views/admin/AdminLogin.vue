<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '../../services/admin/authService.js'
import { Lock } from 'lucide-vue-next'

const router = useRouter()
const pin = ref('')
const error = ref('')
const loading = ref(false)

async function login() {
  loading.value = true
  error.value = ''
  const ok = await authService.login(pin.value)
  if (ok) router.push('/admin/dashboard')
  else error.value = 'PIN salah! Cek PIN Kasir POS (300993 / 081194)'
  loading.value = false
}
</script>

<template>
  <div class="min-h-screen bg-slate-900 flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl">
      <div class="text-center mb-6">
        <div class="bg-emerald-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3"><Lock class="text-emerald-600" :size="28" /></div>
        <h1 class="text-xl font-bold">Admin Sinar Pagi</h1>
        <p class="text-xs text-slate-500 mt-1">PIN dari tabel operators</p>
      </div>
      <div class="space-y-4">
        <input v-model="pin" type="password" inputmode="numeric" placeholder="PIN (300993)" class="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-emerald-500 outline-none" @keyup.enter="login" />
        <p v-if="error" class="text-xs text-red-500 bg-red-50 p-2 rounded-lg">{{ error }}</p>
        <button @click="login" :disabled="loading" class="w-full bg-emerald-600 text-white font-bold py-3 rounded-xl">{{ loading ? '...' : 'Masuk' }}</button>
        <p class="text-[11px] text-center text-slate-400">Default: 300993 / 081194</p>
      </div>
    </div>
  </div>
</template>
