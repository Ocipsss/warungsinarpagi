<script setup>
import { UtensilsCrossed, Coffee, CupSoda, Cookie, Pill, Sparkles, Candy, Snowflake, Soup, Heart, Wrench, Package, Flame, Cigarette } from 'lucide-vue-next'
const props = defineProps({ categories: { type: Array, default: () => [] }, selectedCategory: { type: String, default: 'SEMUA' } })
const emit = defineEmits(['select'])
const iconComponents = { UtensilsCrossed, Coffee, CupSoda, Cookie, Pill, Sparkles, Candy, Snowflake, Soup, Heart, Wrench, Package, Flame, Cigarette }
function selectCat(name) { emit('select', name) }
</script>
<template>
  <section>
    <h2 class="text-xs font-bold text-slate-500 mb-2.5 uppercase tracking-wider">Kategori ({{ categories.length }} Kategori)</h2>
    <div class="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
      <button @click="selectCat('SEMUA')" :class="['text-xs font-medium px-4 py-2 rounded-full shrink-0 flex items-center gap-1.5', selectedCategory === 'SEMUA' ? 'bg-emerald-600 text-white' : 'bg-white border text-slate-700']"><Package :size="14" /> Semua</button>
      <button v-for="cat in categories" :key="cat.id" @click="selectCat(cat.name)" :class="['text-xs font-medium px-3 py-2 rounded-full shrink-0 flex items-center gap-1.5', selectedCategory === cat.name ? 'bg-emerald-600 text-white shadow' : 'bg-white border text-slate-700']"><component :is="iconComponents[cat.icon] || Package" :size="14" />{{ cat.name }} ({{ cat.count }})</button>
    </div>
  </section>
</template>
