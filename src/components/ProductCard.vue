<script setup>
import { useCartStore } from '../stores/cartStore'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const cartStore = useCartStore()
</script>

<template>
  <div class="border rounded-xl p-3 bg-white shadow-sm flex flex-col justify-between">
    <div>
      <div class="w-full h-32 bg-gray-100 rounded-lg overflow-hidden mb-2">
        <img 
          :src="product.imageUrl" 
          :alt="product.name" 
          class="w-full h-full object-cover"
          @error="(e) => e.target.src = 'https://placehold.co/300x300?text=Sinar+Pagi'"
        />
      </div>
      <span class="text-xs text-emerald-600 font-semibold uppercase">{{ product.category }}</span>
      <h3 class="font-bold text-sm text-gray-800 line-clamp-2 leading-tight">{{ product.name }}</h3>
    </div>

    <div class="mt-3 flex items-center justify-between">
      <div>
        <p class="text-xs text-gray-400">Rp {{ product.price.toLocaleString('id-ID') }} / {{ product.unit }}</p>
        <p class="text-xs font-semibold text-gray-500">Stok: {{ product.stock }}</p>
      </div>
      <button 
        @click="cartStore.addItem(product)"
        class="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition"
      >
        + Beli
      </button>
    </div>
  </div>
</template>
