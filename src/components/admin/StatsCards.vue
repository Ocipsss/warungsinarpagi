<script setup>
const props = defineProps({ stats: Object })
</script>
<template>
  <div class="grid grid-cols-3 gap-3">
    <div class="bg-white p-3 rounded-xl border"><p class="text-xs text-slate-500">Total</p><p class="text-xl font-bold">{{ stats.total }}</p></div>
    <div class="bg-amber-50 border-amber-200 border p-3 rounded-xl"><p class="text-xs text-amber-700">Hampir Habis</p><p class="text-xl font-bold text-amber-700">{{ stats.lowStock }}</p></div>
    <div class="bg-red-50 border-red-200 border p-3 rounded-xl"><p class="text-xs text-red-700">Habis</p><p class="text-xl font-bold text-red-700">{{ stats.outOfStock }}</p></div>
  </div>
</template>
