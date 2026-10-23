<script setup>
import { ref, watch } from 'vue'
import { X, Save } from 'lucide-vue-next'

const props = defineProps({
  isOpen: Boolean,
  editingProduct: Object,
  categories: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['close', 'save'])

const form = ref({
  name: '',
  category: '',
  price: 0,
  stock: 0,
  minStock: 2,
  unit: 'PCS',
  imageUrl: ''
})

watch(() => props.editingProduct, (p) => {
  if (p) {
    form.value = {
      id: p.id,
      name: p.name || '',
      category: p.category || (props.categories[0]?.name || 'UMUM'),
      price: p.price ?? p.price_sell ?? 0,
      stock: p.stock ?? p.qty ?? 0,
      minStock: p.minStock ?? 2,
      unit: p.unit || 'PCS',
      imageUrl: p.imageUrl || ''
    }
  } else {
    form.value = {
      name: '',
      category: props.categories[0]?.name || 'UMUM',
      price: 0,
      stock: 0,
      minStock: 2,
      unit: 'PCS',
      imageUrl: ''
    }
  }
}, { immediate: true })

function save() {
  if (!form.value.name.trim() || form.value.price <= 0) {
    alert('Nama produk dan harga jual wajib diisi dengan benar!')
    return
  }
  
  emit('save', {
    ...form.value,
    isAvailable: form.value.stock > 0,
    isLowStock: form.value.stock > 0 && form.value.stock <= form.value.minStock
  })
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen" class="fixed inset-0 z-[70] flex items-end sm:items-center justify-center">
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="emit('close')"></div>
        <div class="relative bg-white w-full max-w-md rounded-t-2xl sm:rounded-2xl p-5 space-y-4 animate-slide-up max-h-[90vh] overflow-auto">
          <div class="flex justify-between items-center border-b pb-3">
            <h2 class="font-bold text-lg text-slate-800">{{ editingProduct ? 'Edit Produk' : 'Tambah Produk' }}</h2>
            <button @click="emit('close')" class="bg-gray-100 hover:bg-gray-200 p-1.5 rounded-full transition">
              <X :size="18" class="text-slate-600" />
            </button>
          </div>

          <div class="space-y-3">
            <div>
              <label class="text-xs font-bold text-slate-500">Nama Produk</label>
              <input v-model="form.name" placeholder="Contoh: INDOMIE GORENG" class="w-full border rounded-xl px-3 py-2 text-sm mt-1 focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="text-xs font-bold text-slate-500">Kategori</label>
                <select v-model="form.category" class="w-full border rounded-xl px-3 py-2 text-sm mt-1 outline-none">
                  <option v-for="cat in categories" :key="cat.id || cat.name" :value="cat.name">
                    {{ cat.name }}
                  </option>
                </select>
              </div>
              <div>
                <label class="text-xs font-bold text-slate-500">Satuan</label>
                <input v-model="form.unit" placeholder="PCS / BUNGKUS" class="w-full border rounded-xl px-3 py-2 text-sm mt-1 outline-none" />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="text-xs font-bold text-slate-500">Harga Jual (Rp)</label>
                <input v-model.number="form.price" type="number" class="w-full border rounded-xl px-3 py-2 text-sm mt-1 outline-none" />
              </div>
              <div>
                <label class="text-xs font-bold text-slate-500">Stok Utama</label>
                <input v-model.number="form.stock" type="number" class="w-full border rounded-xl px-3 py-2 text-sm mt-1 outline-none" />
              </div>
            </div>

            <div>
              <label class="text-xs font-bold text-slate-500">Batas Stok Minimum (Warning)</label>
              <input v-model.number="form.minStock" type="number" class="w-full border rounded-xl px-3 py-2 text-sm mt-1 outline-none" />
            </div>

            <div>
              <label class="text-xs font-bold text-slate-500">URL Gambar Produk (Opsional)</label>
              <input v-model="form.imageUrl" placeholder="https://..." class="w-full border rounded-xl px-3 py-2 text-sm mt-1 outline-none text-xs" />
            </div>
          </div>

          <button @click="save" class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg transition">
            <Save :size="18" />
            {{ editingProduct ? 'Simpan Perubahan' : 'Tambah Produk Baru' }}
          </button>
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
