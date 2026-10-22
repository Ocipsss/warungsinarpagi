<script setup>
import { ref } from 'vue'
import { useCartStore } from '../stores/cartStore'

const props = defineProps({
  product: { type: Object, required: true }
})

const cartStore = useCartStore()
const selectedServiceId = ref(null)

function getSelectedService() {
  if (!selectedServiceId.value) return null
  return props.product.availableServices?.find(s => s.id === selectedServiceId.value) || null
}

function handleAdd() {
  cartStore.addItem(props.product, getSelectedService())
  selectedServiceId.value = null
}
</script>

<template>
  <div class="border rounded-xl p-3 bg-white shadow-sm flex flex-col justify-between">
    <div>
      <div class="w-full h-32 bg-gray-100 rounded-lg overflow-hidden mb-2 relative">
        <img 
          :src="product.imageUrl" 
          :alt="product.name" 
          class="w-full h-full object-cover"
          loading="lazy"
          @error="(e) => e.target.src = 'https://placehold.co/300x300?text=Sinar+Pagi'"
        />
        <span v-if="!product.isAvailable" class="absolute top-1 left-1 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">HABIS</span>
        <span v-else-if="product.isLowStock" class="absolute top-1 left-1 bg-amber-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">SISA {{ product.stock }}</span>
      </div>
      <span class="text-[10px] text-emerald-600 font-semibold uppercase tracking-wide">{{ product.category }}</span>
      <h3 class="font-bold text-sm text-gray-800 line-clamp-2 leading-tight">{{ product.name }}</h3>
    </div>

    <div class="mt-2 space-y-2">
      <div>
        <p class="text-xs text-gray-800 font-bold">Rp {{ product.price.toLocaleString('id-ID') }} / {{ product.unit }}</p>
        <p class="text-[10px] text-gray-400">Stok: {{ product.stock }}</p>
      </div>

      <select 
        v-if="product.availableServices?.length > 0"
        v-model="selectedServiceId"
        class="w-full border border-amber-200 bg-amber-50 text-[11px] p-1.5 rounded-lg focus:ring-2 focus:ring-amber-300 outline-none"
      >
        <option :value="null">Mentah (bawa pulang)</option>
        <option v-for="svc in product.availableServices" :key="svc.id" :value="svc.id">
          {{ svc.name }} +Rp{{ svc.price.toLocaleString('id-ID') }}
        </option>
      </select>

      <button 
        @click="handleAdd"
        :disabled="!product.isAvailable"
        class="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-3 py-2 rounded-lg text-xs font-bold transition"
      >
        {{ product.isAvailable ? '+ Tambah' : 'Habis' }}
      </button>
    </div>
  </div>
</template>
