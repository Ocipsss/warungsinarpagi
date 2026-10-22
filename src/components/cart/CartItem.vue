<script setup>
import { CheckCircle2, Minus, Plus, Trash2 } from 'lucide-vue-next'
const props = defineProps({ item: Object })
const emit = defineEmits(['decrease','increase','remove'])
function getTotal(item){ return (item.price + (item.selectedService?.price||0)) * item.quantity }
</script>
<template>
  <div class="flex gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
    <div class="flex-1 min-w-0">
      <p class="font-semibold text-sm truncate">{{ item.name }}</p>
      <p v-if="item.selectedService" class="text-[11px] text-amber-600 flex items-center gap-1"><CheckCircle2 :size="12"/>{{ item.selectedService.name }}</p>
      <p class="text-xs text-slate-500 mt-1">Rp {{ getTotal(item).toLocaleString('id-ID') }} ({{ item.quantity }}x)</p>
    </div>
    <div class="flex items-center gap-2">
      <button @click="emit('decrease', item)" class="w-7 h-7 bg-white border rounded-full flex items-center justify-center"><component :is="item.quantity<=1 ? Trash2 : Minus" :size="14" /></button>
      <span class="text-sm font-bold w-5 text-center">{{ item.quantity }}</span>
      <button @click="emit('increase', item)" class="w-7 h-7 bg-white border rounded-full flex items-center justify-center"><Plus :size="14" /></button>
    </div>
  </div>
</template>
