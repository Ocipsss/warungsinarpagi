<script setup>
import { ref } from 'vue'
import { useCartStore } from '../stores/cartStore'

const cartStore = useCartStore()
const isOpen = ref(false)
const customerInfo = ref({ name: '', room: '' })

const STORE_PHONE = '628123456789' // Ganti nomor WA Warung Sinar Pagi

function handleCheckout() {
  if (!customerInfo.value.name) {
    alert('Isi nama pemesan dulu ya!')
    return
  }
  cartStore.checkoutViaWhatsApp(STORE_PHONE, customerInfo.value)
}
</script>

<template>
  <!-- Floating Cart Button -->
  <button 
    @click="isOpen = true"
    class="fixed bottom-4 right-4 bg-emerald-600 text-white px-4 py-3 rounded-full shadow-lg font-bold flex items-center gap-2 z-40"
  >
    🛒 <span>{{ cartStore.totalItems }} Item</span>
  </button>

  <!-- Overlay & Drawer -->
  <div v-if="isOpen" class="fixed inset-0 bg-black/50 z-50 flex justify-end">
    <div class="bg-white w-full max-w-md h-full p-4 flex flex-col justify-between">
      <div>
        <div class="flex justify-between items-center mb-4">
          <h2 class="font-bold text-lg">Keranjang Belanja</h2>
          <button @click="isOpen = false" class="text-gray-500 text-xl font-bold">&times;</button>
        </div>

        <!-- List Item -->
        <div v-if="cartStore.items.length === 0" class="text-center py-10 text-gray-400">
          Keranjang masih kosong nih.
        </div>

        <div v-else class="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
          <div 
            v-for="item in cartStore.items" 
            :key="item.id" 
            class="flex items-center justify-between border-b pb-2"
          >
            <div>
              <p class="font-semibold text-sm">{{ item.name }}</p>
              <p class="text-xs text-gray-500">Rp {{ item.price.toLocaleString('id-ID') }} x {{ item.quantity }}</p>
            </div>
            <div class="flex items-center gap-2">
              <button @click="cartStore.updateQuantity(item.id, item.quantity - 1)" class="px-2 bg-gray-200 rounded">-</button>
              <span class="text-sm font-bold">{{ item.quantity }}</span>
              <button @click="cartStore.updateQuantity(item.id, item.quantity + 1)" class="px-2 bg-gray-200 rounded">+</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Checkout Form -->
      <div v-if="cartStore.items.length > 0" class="border-t pt-4 space-y-3">
        <div class="flex justify-between font-bold text-base">
          <span>Total:</span>
          <span>Rp {{ cartStore.totalPrice.toLocaleString('id-ID') }}</span>
        </div>
        <input 
          v-model="customerInfo.name" 
          type="text" 
          placeholder="Nama Pemesan (contoh: Mas Budi)" 
          class="w-full border p-2 rounded text-sm"
        />
        <input 
          v-model="customerInfo.room" 
          type="text" 
          placeholder="No. Kamar / Rumah (opsional)" 
          class="w-full border p-2 rounded text-sm"
        />
        <button 
          @click="handleCheckout"
          class="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2"
        >
          Kirim Pesanan ke WhatsApp
        </button>
      </div>
    </div>
  </div>
</template>
