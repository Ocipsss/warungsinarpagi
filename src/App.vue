<script setup>
import { ShoppingBag, Flame, Search } from 'lucide-vue-next'
import { useCatalog } from './composables/useCatalog'
import ProductCard from './components/ProductCard.vue'
import CartDrawer from './components/CartDrawer.vue'

const { 
  categories, 
  selectedCategory, 
  searchQuery, 
  filteredProducts, 
  isLoading, 
  setCategory 
} = useCatalog()
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-800 font-sans pb-24">
    <!-- Header / Navbar -->
    <header class="sticky top-0 z-10 bg-emerald-600 text-white shadow-md p-4">
      <div class="max-w-md mx-auto flex justify-between items-center">
        <div>
          <h1 class="text-xl font-bold tracking-tight">Warung Sinar Pagi</h1>
          <p class="text-xs text-emerald-100">Katalog Digital & Pesan via WA</p>
        </div>
        <div class="relative bg-emerald-700 p-2 rounded-full">
          <ShoppingBag :size="20" class="text-white" />
        </div>
      </div>
    </header>

    <main class="max-w-md mx-auto p-4 space-y-5">
      <!-- Banner Promo -->
      <div class="bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex items-start gap-3 shadow-xs">
        <Flame class="text-amber-500 shrink-0 mt-0.5" :size="20" />
        <div class="text-sm text-amber-900">
          <p class="font-semibold">Siap Antar Area Kost!</p>
          <p class="text-xs text-amber-700 mt-0.5">Pesan Pop Mie seduh, es kopi, atau cemilan langsung kirim ke WhatsApp.</p>
        </div>
      </div>

      <!-- Search Input -->
      <div class="relative">
        <Search class="absolute left-3 top-2.5 text-slate-400" :size="18" />
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Cari produk di warung..." 
          class="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      <!-- Kategori Filter -->
      <section>
        <h2 class="text-xs font-bold text-slate-500 mb-2.5 uppercase tracking-wider">Kategori</h2>
        <div class="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button 
            @click="setCategory('SEMUA')"
            :class="[
              'text-xs font-medium px-4 py-2 rounded-full shrink-0 transition',
              selectedCategory === 'SEMUA' 
                ? 'bg-emerald-600 text-white shadow-xs' 
                : 'bg-white border border-slate-200 text-slate-700'
            ]"
          >
            Semua
          </button>

          <button 
            v-for="cat in categories" 
            :key="cat.id"
            @click="setCategory(cat.name)"
            :class="[
              'text-xs font-medium px-4 py-2 rounded-full shrink-0 transition',
              selectedCategory === cat.name 
                ? 'bg-emerald-600 text-white shadow-xs' 
                : 'bg-white border border-slate-200 text-slate-700'
            ]"
          >
            {{ cat.name }}
          </button>
        </div>
      </section>

      <!-- Grid Produk -->
      <section>
        <div v-if="isLoading" class="text-center py-10 text-slate-400 text-sm">
          Memuat produk...
        </div>

        <div v-else-if="filteredProducts.length === 0" class="text-center py-10 text-slate-400 text-sm">
          Produk tidak ditemukan.
        </div>

        <div v-else class="grid grid-cols-2 gap-3">
          <ProductCard 
            v-for="product in filteredProducts" 
            :key="product.id" 
            :product="product" 
          />
        </div>
      </section>
    </main>

    <!-- Floating Cart & Drawer -->
    <CartDrawer />
  </div>
</template>
