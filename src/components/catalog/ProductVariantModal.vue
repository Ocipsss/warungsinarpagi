<script setup>
import { ref } from 'vue'
import { X, Flame, Snowflake, Coffee, UtensilsCrossed, Check } from 'lucide-vue-next'

const props = defineProps({
  product: { type: Object, required: true },
  isOpen: { type: Boolean, default: false }
})

const emit = defineEmits(['close', 'confirm'])

const selectedServiceId = ref(null)

function getIconForService(serviceName) {
  const name = serviceName.toLowerCase()
  if (name.includes('es') || name.includes('dingin') || name.includes('cekek')) return Snowflake
  if (name.includes('seduh') || name.includes('panas') || name.includes('teko')) return Flame
  if (name.includes('kopi') || name.includes('ice')) return Coffee
  return UtensilsCrossed
}

function selectService(id) {
  selectedServiceId.value = id
}

function confirm() {
  const service = selectedServiceId.value 
    ? props.product.availableServices.find(s => s.id === selectedServiceId.value)
    : null
  emit('confirm', service)
  selectedServiceId.value = null
  emit('close')
}

function close() {
  selectedServiceId.value = null
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen" class="fixed inset-0 z-[60] flex items-end sm:items-center justify-center">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="close"></div>

        <!-- Modal Content - Bottom Sheet di mobile, Center di desktop -->
        <div class="relative bg-white w-full max-w-md rounded-t-[20px] sm:rounded-[20px] shadow-2xl max-h-[80vh] flex flex-col animate-slide-up">
          <!-- Handle bar (mobile) -->
          <div class="flex justify-center pt-3 pb-2 sm:hidden">
            <div class="w-10 h-1 bg-gray-300 rounded-full"></div>
          </div>

          <!-- Header -->
          <div class="px-5 pb-4 border-b border-gray-100 flex justify-between items-start">
            <div class="flex-1">
              <h3 class="font-bold text-[16px] text-slate-800">{{ product.name }}</h3>
              <p class="text-xs text-slate-500 mt-1">{{ product.category }} • Stok {{ product.stock }} {{ product.unit }}</p>
            </div>
            <button @click="close" class="ml-3 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition">
              <X :size="16" class="text-slate-600" />
            </button>
          </div>

          <!-- Options -->
          <div class="flex-1 overflow-y-auto px-5 py-4 space-y-3">
            <p class="text-xs font-bold text-slate-500 uppercase tracking-wider">Pilih Penyajian</p>
            
            <!-- Opsi Mentah -->
            <button
              @click="selectService(null)"
              :class="[
                'w-full text-left p-3.5 rounded-xl border-2 transition-all flex items-center justify-between',
                selectedServiceId === null 
                  ? 'border-emerald-500 bg-emerald-50' 
                  : 'border-gray-200 bg-white hover:border-gray-300'
              ]"
            >
              <div class="flex items-center gap-3">
                <div :class="['p-2.5 rounded-full', selectedServiceId === null ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-500']">
                  <UtensilsCrossed :size="18" />
                </div>
                <div>
                  <p class="font-semibold text-sm text-slate-800">Mentah - Bawa Pulang</p>
                  <p class="text-[11px] text-slate-500">Tanpa diseduh, langsung bawa</p>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-sm font-bold text-slate-800">Rp {{ product.price.toLocaleString('id-ID') }}</span>
                <div v-if="selectedServiceId === null" class="bg-emerald-500 rounded-full p-0.5">
                  <Check :size="14" class="text-white" />
                </div>
              </div>
            </button>

            <!-- Opsi Service (Seduh, Es, dll) -->
            <button
              v-for="svc in product.availableServices"
              :key="svc.id"
              @click="selectService(svc.id)"
              :class="[
                'w-full text-left p-3.5 rounded-xl border-2 transition-all flex items-center justify-between',
                selectedServiceId === svc.id 
                  ? 'border-emerald-500 bg-emerald-50' 
                  : 'border-gray-200 bg-white hover:border-gray-300'
              ]"
            >
              <div class="flex items-center gap-3">
                <div :class="['p-2.5 rounded-full', selectedServiceId === svc.id ? 'bg-emerald-500 text-white' : 'bg-amber-100 text-amber-600']">
                  <component :is="getIconForService(svc.name)" :size="18" />
                </div>
                <div>
                  <p class="font-semibold text-sm text-slate-800">{{ svc.name }}</p>
                  <p class="text-[11px] text-slate-500">+Rp{{ svc.price.toLocaleString('id-ID') }} biaya servis</p>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-sm font-bold text-slate-800">Rp {{ (product.price + svc.price).toLocaleString('id-ID') }}</span>
                <div v-if="selectedServiceId === svc.id" class="bg-emerald-500 rounded-full p-0.5">
                  <Check :size="14" class="text-white" />
                </div>
              </div>
            </button>
          </div>

          <!-- Footer Action -->
          <div class="p-5 border-t border-gray-100 bg-white rounded-b-[20px]">
            <button 
              @click="confirm"
              class="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-200"
            >
              Tambah ke Keranjang • Rp {{ 
                selectedServiceId 
                  ? (product.price + (product.availableServices.find(s=>s.id===selectedServiceId)?.price||0)).toLocaleString('id-ID')
                  : product.price.toLocaleString('id-ID')
              }}
            </button>
            <p class="text-[11px] text-center text-gray-400 mt-2.5">Pilihan servis sesuai PRD Warung Sinar Pagi</p>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.25s ease;
}
.modal-enter-from, .modal-leave-to {
  opacity: 0;
}
.modal-enter-active .animate-slide-up {
  animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.modal-leave-active .animate-slide-up {
  animation: slideDown 0.25s ease forwards;
}
@keyframes slideUp {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}
@keyframes slideDown {
  from { transform: translateY(0); }
  to { transform: translateY(100%); }
}
</style>
