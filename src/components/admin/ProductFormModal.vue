<script setup>
import { ref, watch } from 'vue'
import { X, Save } from 'lucide-vue-next'
import { REAL_CATEGORIES } from '../../constants/categories.js'

const props = defineProps({ isOpen: Boolean, editingProduct: Object })
const emit = defineEmits(['close','save'])

const form = ref({ name: '', category: 'SNACK 1K', price_sell: 0, qty: 0, minStock: 2 })

watch(() => props.editingProduct, (p) => {
  if (p) {
    form.value = { name: p.name, category: p.category, price_sell: p.price, qty: p.stock, minStock: p.minStock }
  } else {
    form.value = { name: '', category: 'SNACK 1K', price_sell: 0, qty: 0, minStock: 2 }
  }
}, { immediate: true })

function save() {
  if (!form.value.name || form.value.price_sell <= 0) { alert('Nama dan harga wajib!'); return }
  emit('save', form.value)
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen" class="fixed inset-0 z-[70] flex items-end sm:items-center justify-center">
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="emit('close')"></div>
        <div class="relative bg-white w-full max-w-md rounded-t-2xl sm:rounded-2xl p-5 space-y-4 animate-slide-up max-h-[90vh] overflow-auto">
          <div class="flex justify-between items-center">
            <h2 class="font-bold text-lg">{{ editingProduct ? 'Edit Produk' : 'Tambah Produk' }}</h2>
            <button @click="emit('close')" class="bg-gray-100 p-1.5 rounded-full"><X :size="18" /></button>
          </div>
          <div class="space-y-3">
            <div><label class="text-xs font-bold text-slate-500">Nama Produk</label><input v-model="form.name" class="w-full border rounded-xl px-3 py-2.5 text-sm mt-1 focus:ring-2 focus:ring-emerald-500 outline-none" /></div>
            <div><label class="text-xs font-bold text-slate-500">Kategori</label><select v-model="form.category" class="w-full border rounded-xl px-3 py-2.5 text-sm mt-1"><option v-for="cat in REAL_CATEGORIES" :key="cat" :value="cat">{{ cat }}</option></select></div>
            <div class="grid grid-cols-2 gap-3"><div><label class="text-xs font-bold text-slate-500">Harga</label><input v-model.number="form.price_sell" type="number" class="w-full border rounded-xl px-3 py-2.5 text-sm mt-1" /></div><div><label class="text-xs font-bold text-slate-500">Stok</label><input v-model.number="form.qty" type="number" class="w-full border rounded-xl px-3 py-2.5 text-sm mt-1" /></div></div>
            <div><label class="text-xs font-bold text-slate-500">Min Stok</label><input v-model.number="form.minStock" type="number" class="w-full border rounded-xl px-3 py-2.5 text-sm mt-1" /></div>
          </div>
          <button @click="save" class="w-full bg-emerald-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2"><Save :size="18" />{{ editingProduct ? 'Simpan' : 'Tambah' }}</button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: opacity 0.25s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.modal-enter-active .animate-slide-up { animation: slideUp 0.32s cubic-bezier(0.16, 1, 0.3, 1); }
@keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
</style>
