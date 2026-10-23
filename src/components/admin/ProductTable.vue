<script setup>
import { Edit2, Trash2, PackageCheck, AlertTriangle, XCircle } from 'lucide-vue-next'

const props = defineProps({
  products: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['edit', 'delete'])

function formatRupiah(val) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val || 0)
}
</script>

<template>
  <div class="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
    <div class="overflow-x-auto">
      <table class="w-full text-sm text-left">
        <thead class="bg-slate-50 text-xs text-slate-500 uppercase tracking-wider border-b">
          <tr>
            <th class="p-3">Produk</th>
            <th class="p-3">Kategori</th>
            <th class="p-3">Harga Jual</th>
            <th class="p-3 text-center">Stok</th>
            <th class="p-3 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-for="p in products" :key="p.id" class="hover:bg-slate-50/80 transition">
            <td class="p-3">
              <div class="flex items-center gap-2.5">
                <img 
                  :src="p.imageUrl || 'https://placehold.co/100x100?text=SP'" 
                  :alt="p.name" 
                  class="w-9 h-9 rounded-lg object-cover bg-slate-100 shrink-0 border"
                />
                <div class="min-w-0">
                  <p class="font-semibold text-slate-800 truncate text-xs sm:text-sm">{{ p.name }}</p>
                  <p class="text-[10px] font-mono text-slate-400">ID: {{ String(p.id).substring(0, 8) }}</p>
                </div>
              </div>
            </td>
            <td class="p-3">
              <span class="text-[11px] font-medium bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full whitespace-nowrap">
                {{ p.category || 'UMUM' }}
              </span>
            </td>
            <td class="p-3 font-bold text-slate-800 whitespace-nowrap">
              {{ formatRupiah(p.price) }}
              <span class="text-[10px] text-slate-400 font-normal">/ {{ p.unit || 'PCS' }}</span>
            </td>
            <td class="p-3 text-center">
              <span 
                :class="[
                  'inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full font-bold',
                  (p.stock <= 0 || !p.isAvailable)
                    ? 'bg-red-100 text-red-600' 
                    : p.isLowStock 
                      ? 'bg-amber-100 text-amber-700' 
                      : 'bg-emerald-100 text-emerald-700'
                ]"
              >
                <component 
                  :is="(p.stock <= 0 || !p.isAvailable) ? XCircle : p.isLowStock ? AlertTriangle : PackageCheck" 
                  :size="12" 
                />
                {{ p.stock }}
              </span>
            </td>
            <td class="p-3 text-right">
              <div class="flex justify-end gap-1.5">
                <button 
                  @click="emit('edit', p)" 
                  class="bg-blue-50 hover:bg-blue-100 text-blue-600 p-1.5 rounded-lg transition"
                  title="Edit Produk"
                >
                  <Edit2 :size="14" />
                </button>
                <button 
                  @click="emit('delete', p)" 
                  class="bg-red-50 hover:bg-red-100 text-red-600 p-1.5 rounded-lg transition"
                  title="Hapus Produk"
                >
                  <Trash2 :size="14" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
