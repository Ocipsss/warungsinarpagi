<script setup>
import { ref, onMounted } from 'vue'
import { useCartStore } from '../stores/cartStore'
import { ShoppingBag, MapPin, QrCode, Banknote, FileText, User } from 'lucide-vue-next'

const cartStore = useCartStore()
const isOpen = ref(false)
const customerInfo = ref({ name: '', kostName: '', room: '', paymentMethod: 'QRIS', notes: '' })

const STORE_PHONE = import.meta.env.VITE_STORE_PHONE || '089516477760'

onMounted(() => {
  const saved = cartStore.getSavedCustomer()
  if (saved) customerInfo.value = { ...customerInfo.value, ...saved }
})

function handleCheckout() {
  if (!customerInfo.value.name || !customerInfo.value.kostName || !customerInfo.value.room) {
    alert('Isi Nama, Nama Kost, dan No. Kamar dulu ya!')
    return
  }
  cartStore.checkoutViaWhatsApp(STORE_PHONE, customerInfo.value)
}
</script>

<template>
  <button 
    @click="isOpen = true"
    class="fixed bottom-4 right-4 left-4 mx-auto max-w-md bg-emerald-600 text-white px-4 py-3 rounded-full shadow-lg font-bold flex items-center justify-between z-40"
  >
    <span class="flex items-center gap-2"><ShoppingBag :size="18" /> {{ cartStore.totalItems }} Item</span>
    <span>Rp {{ cartStore.totalPrice.toLocaleString('id-ID') }} → Checkout</span>
  </button>

  <div v-if="isOpen" class="fixed inset-0 bg-black/50 z-50 flex justify-end" @click.self="isOpen = false">
    <div class="bg-white w-full max-w-md h-full p-4 flex flex-col justify-between overflow-y-auto">
      <div>
        <div class="flex justify-between items-center mb-4">
          <h2 class="font-bold text-lg">Keranjang Belanja</h2>
          <button @click="isOpen = false" class="text-gray-500 text-xl font-bold">&times;</button>
        </div>

        <div v-if="cartStore.items.length === 0" class="text-center py-10 text-gray-400">Keranjang masih kosong nih.</div>

        <div v-else class="space-y-3 max-h-[40vh] overflow-y-auto pr-1">
          <div v-for="item in cartStore.items" :key="item.cartKey" class="flex items-center justify-between border-b pb-2">
            <div class="flex-1">
              <p class="font-semibold text-sm">{{ item.name }}</p>
              <p class="text-[11px] text-amber-600" v-if="item.selectedService">{{ item.selectedService.name }} +Rp{{ item.selectedService.price.toLocaleString() }}</p>
              <p class="text-xs text-gray-500">Rp {{ item.price.toLocaleString('id-ID') }} x {{ item.quantity }}</p>
            </div>
            <div class="flex items-center gap-2">
              <button @click="cartStore.updateQuantity(item.cartKey, item.quantity - 1)" class="px-2 bg-gray-200 rounded">-</button>
              <span class="text-sm font-bold">{{ item.quantity }}</span>
              <button @click="cartStore.updateQuantity(item.cartKey, item.quantity + 1)" class="px-2 bg-gray-200 rounded">+</button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="cartStore.items.length > 0" class="border-t pt-4 space-y-3">
        <div class="flex justify-between font-bold text-base">
          <span>Total:</span><span>Rp {{ cartStore.totalPrice.toLocaleString('id-ID') }}</span>
        </div>

        <div class="space-y-2">
          <div class="relative">
            <User class="absolute left-2 top-2.5 text-gray-400" :size="16" />
            <input v-model="customerInfo.name" placeholder="Nama Pemesan (Wajib)" class="w-full border p-2 pl-8 rounded text-sm" />
          </div>
          <div class="relative">
            <MapPin class="absolute left-2 top-2.5 text-gray-400" :size="16" />
            <input v-model="customerInfo.kostName" placeholder="Nama Kost (Wajib) ex: Wisma Asri" class="w-full border p-2 pl-8 rounded text-sm" />
          </div>
          <input v-model="customerInfo.room" placeholder="No. Kamar (Wajib) ex: Kamar 104" class="w-full border p-2 rounded text-sm" />
          
          <div class="flex gap-2">
            <button @click="customerInfo.paymentMethod = 'QRIS'" :class="customerInfo.paymentMethod === 'QRIS' ? 'bg-emerald-600 text-white' : 'bg-white border'" class="flex-1 py-2 rounded text-xs font-bold flex items-center justify-center gap-1"><QrCode :size="14" /> QRIS</button>
            <button @click="customerInfo.paymentMethod = 'COD'" :class="customerInfo.paymentMethod === 'COD' ? 'bg-emerald-600 text-white' : 'bg-white border'" class="flex-1 py-2 rounded text-xs font-bold flex items-center justify-center gap-1"><Banknote :size="14" /> Cash COD</button>
          </div>

          <div class="relative">
            <FileText class="absolute left-2 top-2.5 text-gray-400" :size="16" />
            <textarea v-model="customerInfo.notes" placeholder="Catatan (Opsional) ex: Kopinya agak manis" class="w-full border p-2 pl-8 rounded text-sm h-16"></textarea>
          </div>
        </div>

        <button @click="handleCheckout" class="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold">Kirim Pesanan ke WhatsApp</button>
        <p class="text-[10px] text-gray-400 text-center">Data kost akan disimpan otomatis untuk pesanan berikutnya</p>
      </div>
    </div>
  </div>
</template>
