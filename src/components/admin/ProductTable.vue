<script setup>
import { Edit2, Trash2 } from 'lucide-vue-next'
const props = defineProps({ products: Array })
const emit = defineEmits(['edit','delete'])
</script>
<template>
  <div class="bg-white rounded-xl border overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead class="bg-slate-50 text-xs text-slate-500"><tr><th class="text-left p-3">Produk</th><th class="text-left p-3">Kategori</th><th class="text-left p-3">Harga</th><th class="text-left p-3">Stok</th><th class="text-right p-3">Aksi</th></tr></thead>
        <tbody>
          <tr v-for="p in products" :key="p.id" class="border-t hover:bg-slate-50">
            <td class="p-3"><p class="font-semibold">{{ p.name }}</p><p class="text-[11px] text-slate-400">{{ p.id.substring(0,8) }}</p></td>
            <td class="p-3"><span class="text-xs bg-slate-100 px-2 py-0.5 rounded-full">{{ p.category }}</span></td>
            <td class="p-3 font-bold">Rp {{ p.price.toLocaleString('id-ID') }}</td>
            <td class="p-3"><span :class="['text-xs px-2 py-0.5 rounded-full font-bold', p.stock===0 ? 'bg-red-100 text-red-600' : p.isLowStock ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600']">{{ p.stock }}</span></td>
            <td class="p-3"><div class="flex justify-end gap-1"><button @click="emit('edit', p)" class="bg-blue-50 text-blue-600 p-1.5 rounded-lg"><Edit2 :size="14"/></button><button @click="emit('delete', p)" class="bg-red-50 text-red-600 p-1.5 rounded-lg"><Trash2 :size="14"/></button></div></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
